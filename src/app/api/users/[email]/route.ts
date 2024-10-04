import { NextRequest, NextResponse } from "next/server";
import { getUserByEmail } from "@/dbOperations/users/getUser";

export async function GET(req: NextRequest, { params }: { params: { email: string } }) {
  const { email } = params;

  try {
    // Fetch user data by email from the database
    const user = await getUserByEmail(email);

    if (!user) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ user }, { status: 200 });
  } catch (error) {
    console.error("Error fetching user:", error);
    return NextResponse.json(
      { error: "Failed to fetch user data" },
      { status: 500 }
    );
  }
}
