import { notFound } from "next/navigation";

import CheckoutCard from "@/components/checkout/CheckoutCard";
import { getProduct } from "@/services/product.service";

export default async function CheckoutPage({
  searchParams,
}) {
  const { productId } = await searchParams;

  if (!productId) {
    notFound();
  }

  let product;

  try {
    product = await getProduct(productId);
  } catch {
    notFound();
  }

  return (
    <main className="max-w-5xl mx-auto px-5 py-10">

      <h1 className="text-3xl font-bold mb-8">
        Checkout
      </h1>

      <CheckoutCard product={product} />

    </main>
  );
}