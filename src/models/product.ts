import { IProduct } from "@/types/modelTypes";
import mongoose, { Schema } from "mongoose";

// Define the Product Schema
const ProductSchema: Schema = new Schema({
  EquipmentName: { type: String, required: true },
  Category: { type: String, required: true },
  Description: { type: String, required: true },
  Brand: { type: String, required: true },
  Price: { type: String, required: true },
  Location: { type: String, required: true },
  Availability: { type: String, required: true },
  Condition: { type: String, required: true },
  Specifications: {
    Power: { type: String, required: true },
    FuelType: { type: String, required: true },
  },
  Accessories: { type: String },
  RentalTerms: { type: String, required: true },
  Videos: [{ type: String }],
  Ratings: { type: String },
  DeliveryOptions: { type: String, required: true },
  Insurance: { type: String },
  Service: { type: String, required: true },
  UsageInstructions: { type: String },
  ContactInformation: { type: String, required: true },
  url: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
});

// Adding an index for Category field to optimize queries related to categories
ProductSchema.index({ Category: "text" });

const Product =
  mongoose.models?.Product ||
  mongoose.model<IProduct>("Product", ProductSchema);

export default Product;
