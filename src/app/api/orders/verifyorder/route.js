import connectDB from "@/app/lib/mongodb";
import Order from "@/app/models/order.model";
import { NextResponse } from "next/server";
import crypto from "crypto";
import { createShiprocketOrder, assignAwb } from "@/lib/shiprocket";

const generateSignature = (razorpayOrderId, razorpayPaymentId) => {
  return crypto
    .createHmac("sha256", process.env.RAZORPAY_SECRET_ID)
    .update(`${razorpayOrderId}|${razorpayPaymentId}`)
    .digest("hex");
};

export async function POST(request) {
  try {
    await connectDB();

    const { orderId, razorpayPaymentId, razorpaySignature } =
      await request.json();

    const generatedSignature = generateSignature(orderId, razorpayPaymentId);

    if (generatedSignature !== razorpaySignature) {
      return NextResponse.json(
        {
          success: false,
          message: "Payment verification failed",
        },
        {
          status: 400,
        },
      );
    }

    const order = await Order.findOne({
      "payment.razorpayOrderId": orderId,
    });

    if (!order) {
      return NextResponse.json(
        {
          success: false,
          message: "Order not found",
        },
        {
          status: 404,
        },
      );
    }

    order.payment.razorpayPaymentId = razorpayPaymentId;

    order.payment.razorpaySignature = razorpaySignature;

    order.payment.status = "paid";

    // Place order in Shiprocket
    try {
      const shippingCharge = order.shipping?.shippingCharge || 0;
      const srOrder = await createShiprocketOrder(order, shippingCharge);
      
      order.shipping.shiprocketOrderId = srOrder.shiprocketOrderId;
      order.shipping.status = "processing";
      console.log(`[SHIPROCKET] Order created successfully. Order ID: ${srOrder.shiprocketOrderId}, Shipment ID: ${srOrder.shipmentId}`);

      // Assign AWB to shipment
      try {
        const awbDetails = await assignAwb(srOrder.shipmentId);
        order.shipping.awbCode = awbDetails.awbCode;
        order.shipping.courierName = awbDetails.courierName;
        order.shipping.trackingUrl = awbDetails.trackingUrl;
        console.log(`[SHIPROCKET] AWB assigned successfully. Courier: ${awbDetails.courierName}, AWB: ${awbDetails.awbCode}, Tracking URL: ${awbDetails.trackingUrl}`);
      } catch (awbError) {
        console.error("Failed to assign Shiprocket AWB:", awbError);
      }
    } catch (shiprocketError) {
      console.error("Failed to create order in Shiprocket:", shiprocketError);
    }

    await order.save();

    return NextResponse.json(
      {
        success: true,
        message: "Payment verified successfully",
        order,
      },
      {
        status: 200,
      },
    );
  } catch (error) {
    console.error("Verify Payment Error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to verify payment",
      },
      {
        status: 500,
      },
    );
  }
}
