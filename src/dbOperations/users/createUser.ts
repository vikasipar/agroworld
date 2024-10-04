import dbConnect from "@/lib/dbConnect";
import User from "@/models/user";

export async function createUser(
  name: string,
  role: "user" | "provider",
  email: string
) {
  await dbConnect();

  try {
    // Create new user document
    const newUser = new User({
      name,
      role,
      email,
      delete: false,
    });

    // Save the user in MongoDB
    await newUser.save();

    return "User saved to database";
  } catch (error) {
    console.error("Error saving user:", error);
    throw new Error("Failed to save user");
  }
}
