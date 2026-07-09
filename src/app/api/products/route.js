import connectDB from "@/app/lib/mongodb.js";
import Product from "@/app/models/product.model.js";

export async function POST(req) {
  try {
    await connectDB();

    const body = await req.json();

    body.mrp = Number(body.mrp);
    body.price = Number(body.price);

    const product = await Product.create(body);

    return Response.json(
      {
        success: true,
        message: "Product created successfully",
        data: product,
      },
      {
        status: 201,
      }
    );
  } catch (error) {
    console.error(error);

    return Response.json(
      {
        success: false,
        message: "Internal Server Error",
      },
      {
        status: 500,
      }
    );
  }
}

export async function GET() {
  try {
    await connectDB();

    const products = await Product.find().sort({
      createdAt: -1,
    });

    return Response.json(
      {
        success: true,
        message: "Products fetched successfully",
        data: products,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error(error);

    return Response.json(
      {
        success: false,
        message: "Internal Server Error",
      },
      {
        status: 500,
      }
    );
  }
}