import { NextRequest, NextResponse } from "next/server";

export async function POST(request) {
  try {
    const { token, orderData } = await request.json();

    const res = await fetch(
      `${process.env.SHIPROCKET_API_URL}/orders/create/adhoc`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(orderData),
      }
    );

    if (!res.ok) {
      const errorData = await res.json();
      return NextResponse.json(
        { error: "Order creation failed", details: errorData },
        { status: 500 }
      );
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
