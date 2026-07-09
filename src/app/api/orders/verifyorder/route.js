import connectDB from "@/app/lib/mongodb";
import Order from "@/app/models/order.model";
import { NextResponse } from "next/server";
import crypto from "crypto";

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
