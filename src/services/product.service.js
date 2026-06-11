import { apiFetch } from "@/lib/api";

export async function getProducts() {
  const response = await apiFetch(
    "/api/products"
  );

  return response.data;
}

export async function getProduct(id) {
  const response = await apiFetch(
    `/api/products/${id}`
  );

  return response.data;
}