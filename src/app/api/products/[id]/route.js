import  connectDB  from "@/lib/mongodb.js";
import Product from "@/models/product.model.js";
import {
  successResponse,
  errorResponse,
} from "@/utils/response";

export async function GET(req, { params }) {
  try {
    await connectDB();

    const { id } = await params;
    console.log(id);
    const product = await Product.findById(
      id
    );

    if (!product) {
      return errorResponse(
        "Product not found",
        404
      );
    }

    return successResponse(product);
  } catch (error) {
    return errorResponse(
      "Internal Server Error"
    );
  }
}

export async function DELETE(req, { params }) {
  try {
    await connectDB();

    let { id } = await params;
    const product =
      await Product.findByIdAndDelete(
        id
      );

    if (!product) {
      return errorResponse(
        "Product not found",
        404
      );
    }

    return successResponse({
      message: "Deleted successfully",
    });
  } catch (error) {
    return errorResponse(
      "Internal Server Error"
    );
  }
}