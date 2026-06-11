export default function CheckoutCard({
  product,
}) {
  return (
    <div className="border rounded-xl p-6">

      <h2 className="text-2xl font-semibold">
        Order Summary
      </h2>

      <div className="mt-6">
        <h3 className="font-medium">
          {product.title}
        </h3>

        <p className="text-gray-500 mt-2">
          {product.description}
        </p>

        <div className="mt-4">
          <span className="text-xl font-bold">
            ₹{product.price}
          </span>
        </div>
      </div>

      <hr className="my-6" />

      <div className="flex justify-between">
        <span>Total</span>

        <span className="font-bold">
          ₹{product.price}
        </span>
      </div>

      <button
        className="w-full mt-6 bg-black text-white py-3 rounded-lg"
      >
        Place Order
      </button>

    </div>
  );
}