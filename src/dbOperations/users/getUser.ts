import User from "@/models/user";
import dbConnect from "@/lib/dbConnect";

export async function getUserByEmail(email: string) {
  await dbConnect();

  try {
    // Find the user by email
    const user = await User.findOne({ email });

    // If no user is found, return null
    if (!user) {
      return null;
    }

    return user;
  } catch (error) {
    console.error("Error fetching user:", error);
    throw new Error("Failed to fetch user");
  }
}
