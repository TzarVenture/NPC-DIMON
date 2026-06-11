import { NextResponse } from "next/server";
import connectDB from "../../config/mongodb";
import {
  createProduct,
  getProducts,
} from "../../controllers/productController";

export async function GET() {
  await connectDB();

  const result = await getProducts();

  return NextResponse.json(result);
}

export async function POST(req) {
  await connectDB();

  const body = await req.json();

  const result = await createProduct(body);

  return NextResponse.json(result, {
    status: 201,
  });
}