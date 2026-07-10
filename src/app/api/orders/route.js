import connectDB from "@/app/lib/mongodb";
import Order from "@/app/models/order.model";
import { NextResponse } from "next/server";
import Razorpay from "razorpay";

const razorpay = new Razorpay({
  key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_SECRET_ID,
});

export async function POST(req) {
  try {
    await connectDB();

    const body = await req.json();
    const shippingCharge = Number(body.shippingCharge) || 0;
    const totalAmount = body.product.price + shippingCharge;

    const razorpayOrder = await razorpay.orders.create({
      amount: totalAmount * 100,
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
      notes: {
        productId: body.product._id,
        productTitle: body.product.title,
        customerEmail: body.customer.email,
      },
    });

    // return Response.json({message: "request reached"})

    const order = await Order.create({
      customer: body.customer,

      shippingAddress: body.shippingAddress,

      product: {
        productId: body.product._id,

        title: body.product.title,

        price: body.product.price,

        quantity: 1,
      },

      amount: totalAmount,

      payment: {
        razorpayOrderId: razorpayOrder.id,
        status: "pending",
      },

      shipping: {
        status: "pending",
        shippingCharge: shippingCharge,
      },
    });

    return Response.json(
      {
        success: true,
        message: "Order created successfully",
        data: order,
        razorpayOrderId: razorpayOrder.id,
      },
      {
        status: 201,
      },
    );
  } catch (error) {
    console.error(error);

    return Response.json(
      {
        success: false,
        message: "Failed to create order",
      },
      {
        status: 500,
      },
    );
  }
}
