import Product from "../models/Product";

// Create Product
export const createProduct = async (data) => {
  try {
    const product = await Product.create(data);

    return {
      success: true,
      data: product,
    };
  } catch (error) {
    throw new Error(error.message);
  }
};

// Get All Products
export const getProducts = async (filters = {}) => {
  try {
    const products = await Product.find(filters)
      .sort({ createdAt: -1 });

    return {
      success: true,
      count: products.length,
      data: products,
    };
  } catch (error) {
    throw new Error(error.message);
  }
};

// Get Single Product
export const getProductById = async (id) => {
  try {
    const product = await Product.findById(id);

    if (!product) {
      throw new Error("Product not found");
    }

    return {
      success: true,
      data: product,
    };
  } catch (error) {
    throw new Error(error.message);
  }
};

// Get Product By Slug
export const getProductBySlug = async (slug) => {
  try {
    const product = await Product.findOne({ slug });

    if (!product) {
      throw new Error("Product not found");
    }

    return {
      success: true,
      data: product,
    };
  } catch (error) {
    throw new Error(error.message);
  }
};

// Update Product
export const updateProduct = async (id, data) => {
  try {
    const product = await Product.findByIdAndUpdate(
      id,
      data,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!product) {
      throw new Error("Product not found");
    }

    return {
      success: true,
      data: product,
    };
  } catch (error) {
    throw new Error(error.message);
  }
};

// Delete Product
export const deleteProduct = async (id) => {
  try {
    const product = await Product.findByIdAndDelete(id);

    if (!product) {
      throw new Error("Product not found");
    }

    return {
      success: true,
      message: "Product deleted successfully",
    };
  } catch (error) {
    throw new Error(error.message);
  }
};