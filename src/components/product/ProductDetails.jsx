export default function ProductDetails({
  product,
}) {
  const discount = Math.round(
    ((product.mrp - product.price) /
      product.mrp) *
      100
  );

  return (
    <div className="max-w-4xl mx-auto">
      <div className="border rounded-xl p-8">
        <h1 className="text-3xl font-bold">
          {product.title}
        </h1>

        <div className="flex items-center gap-3 mt-4">
          <span className="text-3xl font-bold">
            ₹{product.price}
          </span>

          <span className="line-through text-gray-500">
            ₹{product.mrp}
          </span>

          <span className="text-green-600 font-medium">
            {discount}% OFF
          </span>
        </div>

        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-2">
            Description
          </h2>

          <p className="text-gray-700 leading-7">
            {product.description}
          </p>
        </div>
      </div>
    </div>
  );
}