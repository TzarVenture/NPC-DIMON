import ProductCard from "./ProductCard";

export default function ProductGrid({
  products,
}) {
  if (!products.length) {
    return (
      <p className="text-center py-10">
        No products found
      </p>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {products.map((product) => (
        <ProductCard
          key={product._id}
          product={product}
        />
      ))}
    </div>
  );
}