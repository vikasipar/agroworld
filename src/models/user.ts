import { IUser } from "@/types/modelTypes";
import mongoose, { Schema } from "mongoose";

// Define the User Schema
const UserSchema: Schema = new Schema({
  name: { type: String, required: true },
  role: { type: String, enum: ["user", "provider"], required: true },
  email: { type: String, required: true, unique: true },
  delete: { type: Boolean, required: true, default: false },
});

const User = mongoose.models?.User || mongoose.model<IUser>("User", UserSchema);

export default User;
