import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    customer: {
      name: {
        type: String,
        required: true,
      },

      email: {
        type: String,
        required: true,
      },

      phone: {
        type: String,
        required: true,
      },
    },

    product: {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
      },

      title: {
        type: String,
        required: true,
      },

      price: {
        type: Number,
        required: true,
      },

      quantity: {
        type: Number,
        default: 1,
      },
    },

    amount: {
      type: Number,
      required: true,
    },

    payment: {
      razorpayOrderId: String,
      razorpayPaymentId: String,
      razorpaySignature: String,

      status: {
        type: String,
        enum: [
          "pending",
          "paid",
          "failed",
          "refunded",
        ],
        default: "pending",
      },
    },

    shipping: {
      status: {
        type: String,
        enum: [
          "pending",
          "processing",
          "shipped",
          "delivered",
          "cancelled",
        ],
        default: "pending",
      },

      shiprocketOrderId: String,

      awbCode: String,

      courierName: String,

      trackingUrl: String,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Order ||
  mongoose.model("Order", orderSchema);