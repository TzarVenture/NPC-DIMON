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

    shippingAddress: {
      address: {
        type: String,
        required: true,
      },
      city: {
        type: String,
        required: true,
      },
      state: {
        type: String,
        required: true,
      },
      pincode: {
        type: String,
        required: true,
      },
      country: {
        type: String,
        default: "India",
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

      // Size chosen by the customer at checkout (e.g. "M" or "9")
      // Empty string for products with no sizing (e.g. accessories)
      selectedSize: {
        type: String,
        default: "",
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

      shippingCharge: {
        type: Number,
        default: 0,
      },
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Order ||
  mongoose.model("Order", orderSchema);