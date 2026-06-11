import  connectDB  from "@/lib/mongodb.js";
import Product from "@/models/product.model.js";
import { createProductSchema } from "@/validations/product.validation";
import {
  successResponse,
  errorResponse,
} from "@/utils/response";

export async function POST(req) {
  try {
    await connectDB();

    const body = await req.json();

    body.mrp = Number(body.mrp);
    body.price = Number(body.price);

    const validation =
      createProductSchema.safeParse(body);

    if (!validation.success) {
      return errorResponse(
        validation.error.errors[0].message,
        400
      );
    }

    const product = await Product.create(
      validation.data
    );

    return successResponse(product, 201);
  } catch (error) {
    console.log(error);

    return errorResponse(
      "Internal Server Error"
    );
  }
}

export async function GET() {
  try {
    await connectDB();

    const products = await Product.find().sort({
      createdAt: -1,
    });

    return successResponse(products);
  } catch (error) {
    return errorResponse(
      "Internal Server Error"
    );
  }
}