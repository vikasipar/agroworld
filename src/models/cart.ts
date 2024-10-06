import mongoose from "mongoose";

const CartSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  products: [
    {
      productId: { type: String, required: true },
      quantity: { type: Number, required: true, default: 1 },
    },
  ],
  dateAdded: { type: Date, default: Date.now },
});

export const Cart = mongoose.models.Cart || mongoose.model("Cart", CartSchema);
