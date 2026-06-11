import Link from "next/link";

export default function ProductCard({ product }) {
  return (
    <Link href={`/products/${product._id}`}>
      <div className="border rounded-lg p-4 shadow-sm hover:shadow-md transition cursor-pointer">
        <h2 className="text-lg font-semibold">
          {product.title}
        </h2>

        <p className="text-gray-600 mt-2 line-clamp-2">
          {product.description}
        </p>

        <div className="mt-4">
          <span className="line-through text-gray-400 mr-2">
            ₹{product.mrp}
          </span>

          <span className="font-bold text-green-600">
            ₹{product.price}
          </span>

             <Link
          href={`/checkout?productId=${product._id}`}
          className="inline-block mt-8 px-6 py-3 bg-red-600 text-red-200 rounded-lg"
        >
          Buy Now
        </Link>
        </div>
      </div>
    </Link>
  );
}