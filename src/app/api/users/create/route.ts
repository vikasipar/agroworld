// app/api/users/route.ts
import { NextRequest, NextResponse } from "next/server";
import { createUser } from "@/dbOperations/users/createUser";

export async function POST(req: NextRequest) {
  const { name, role, email } = await req.json();

  try {
    // Call the createUser function to save the user in the database
    const response = await createUser(name, role, email);

    return NextResponse.json({ message: response }, { status: 201 });
  } catch (error) {
    console.error("Error in user creation:", error);
    return NextResponse.json(
      { error: "Failed to save user to database" },
      { status: 500 }
    );
  }
}
