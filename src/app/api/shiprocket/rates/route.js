import { getShippingRates } from "@/lib/shiprocket";
import { NextResponse } from "next/server";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const deliveryPostcode = searchParams.get("delivery_postcode");
    const weightVal = searchParams.get("weight") || "0.5";

    if (!deliveryPostcode) {
      return NextResponse.json(
        { success: false, message: "delivery_postcode query parameter is required." },
        { status: 400 }
      );
    }

    const weight = parseFloat(weightVal);
    if (isNaN(weight)) {
      return NextResponse.json(
        { success: false, message: "Invalid weight value." },
        { status: 400 }
      );
    }

    const shippingInfo = await getShippingRates(deliveryPostcode, weight);

    return NextResponse.json({
      success: true,
      data: shippingInfo,
    });
  } catch (error) {
    console.error("Rates API Error:", error);
    return NextResponse.json(
      { success: false, message: error.message || "Failed to calculate shipping rates." },
      { status: 500 }
    );
  }
}
