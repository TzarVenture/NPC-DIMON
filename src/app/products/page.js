import ProductGrid from "@/components/product/ProductGrid";
import { getProducts } from "@/services/product.service";

export const metadata = {
  title: "Products",
};

export default async function ProductsPage() {
  const products = await getProducts();

  return (
    <main className="max-w-7xl mx-auto px-5 py-10">
      <h1 className="text-3xl font-bold mb-8 text-red-600">
        Products
      </h1>

      <ProductGrid products={products} />
    </main>
  );
}