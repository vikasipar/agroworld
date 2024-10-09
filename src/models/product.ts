import { IProduct } from "@/types/modelTypes";
import mongoose, { Schema } from "mongoose";

// Define the Product Schema
const ProductSchema: Schema = new Schema({
  EquipmentName: { type: String, required: true },
  Category: { type: String, required: true },
  Description: { type: String, required: true },
  Brand: { type: String },
  Price: { type: String, required: true },
  Location: { type: String, required: true },
  Available: { type: Boolean, default: true },
  // Condition: { type: String },
  Specifications: {
    Power: { type: String },
    FuelType: { type: String },
  },
  Accessories: { type: String },
  // RentalTerms: { type: String },
  // Videos: [{ type: String }],
  Ratings: { type: String, default: "4" },
  DeliveryOptions: { type: String },
  // Insurance: { type: String },
  // Service: { type: String },
  // UsageInstructions: { type: String },
  ContactInformation: { type: String, required: true },
  url: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  provider: { type: String, required: true },
});

// Adding an index for Category field to optimize queries related to categories
ProductSchema.index({ Category: "text" });

const Product =
  mongoose.models?.Product ||
  mongoose.model<IProduct>("Product", ProductSchema);

export default Product;
