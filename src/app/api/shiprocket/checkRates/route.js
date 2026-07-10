import { NextRequest, NextResponse } from "next/server";

export async function GET(request) {
  const { searchParams } = new URL(request.url);

  const token = searchParams.get('token');
  const pickup_postcode = searchParams.get('pickup_postcode') ?? '';
  const delivery_postcode = searchParams.get('delivery_postcode') ?? '';
  const weight = searchParams.get('weight') ?? '';
  const cod = '0';

  const queryParams = new URLSearchParams({
    pickup_postcode,
    delivery_postcode,
    weight,
    cod,
    mode: 'Surface'
  });

  const res = await fetch(
    `${process.env.SHIPROCKET_API_URL}/courier/serviceability?${queryParams}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      }
    }
  );

  if (!res.ok) {
    return NextResponse.json(
      { error: "Failed to fetch rates" },
      { status: 500 }
    );
  }

  const rates = await res.json();
  return NextResponse.json(rates);
}
