import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    images: {
      type: [String],
      default: [],
    },
    description: {
      type: String,
      required: true,
    },
    mrp: {
      type: Number,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },

    // ── Identification ──────────────────────────
    sku: {
      type: String,
      default: "",
    },
    category: {
      type: String,
      default: "",
    },

    // ── Physical attributes ─────────────────────
    material: {
      type: String,
      default: "",
    },
    fit: {
      type: String,
      default: "",
    },
    colors: {
      type: [String],
      default: [],
    },

    // ── Sizing ──────────────────────────────────
    // Each product stores whatever sizes apply to it.
    // Jackets → ["XS","S","M","L","XL"]
    // Shoes   → ["6","7","8","9","10","11"]
    // No sizes → [] (size selector hidden in UI)
    sizes: {
      type: [String],
      default: [],
    },

    // ── Demographics ────────────────────────────
    gender: {
      type: String,
      default: "",
    },
    ageCategory: {
      type: String,
      default: "",
    },

    // ── Inventory / drop flags ──────────────────
    isLimited: {
      type: Boolean,
      default: false,
    },
    stock: {
      type: Number,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

const Product =
  mongoose.models.Product ||
  mongoose.model("Product", ProductSchema);

export default Product;