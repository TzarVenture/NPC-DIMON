import Product from "@/models/product.model.js";

export const createProduct = async (data) => {
  return Product.create(data);
};

export const getProducts = async () => {
  return Product.find().sort({
    createdAt: -1,
  });
};