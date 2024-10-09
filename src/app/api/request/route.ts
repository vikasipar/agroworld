import { NextResponse, NextRequest } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Request from "@/models/request";

// post Requests data
export async function POST(req: NextRequest) {
  const requestData = await req.json();

  try {
    await dbConnect();

    // Create a new request document
    const newRequest = new Request(requestData);

    // Save the request in MongoDB
    await newRequest.save();

    return NextResponse.json({ message: "Request saved to database" }, { status: 201 });
  } catch (error) {
    console.error("Error sending request:", error);
    return NextResponse.json({ message: "Error sending request" }, { status: 500 });
  }
}
