import { IRequest } from "@/types/modelTypes";
import mongoose, { Schema } from "mongoose";

// Define the Request Schema
const RequestSchema: Schema = new Schema({
  senderId: { type: String, required: true },
  senderName: { type: String, required: true },
  senderEmail: { type: String, required: true },
  providerId: { type: String, required: true },
  requestAccepted: { type: Boolean, required: true, default: false },
  productId: { type: String, required: true },
  productSlug: { type: String, required: true },
});

const Request =
  mongoose.models?.Request || mongoose.model<IRequest>("Request", RequestSchema);

export default Request;
