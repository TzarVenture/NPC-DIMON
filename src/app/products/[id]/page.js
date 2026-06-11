import { notFound } from "next/navigation";

import ProductDetails from "@/components/product/ProductDetails";
import { getProduct } from "@/services/product.service";

export default async function ProductPage({
  params,
}) {
  const { id } = await params;

  let product;
    
  try {
    product = await getProduct(id);
  } catch {
    notFound();
  }

  return (
    <main className="max-w-7xl mx-auto px-5 py-10">
      <ProductDetails product={product} />
    </main>
  );
}