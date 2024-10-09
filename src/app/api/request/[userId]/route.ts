import { NextResponse } from "next/server";
import { getAllRequests } from "@/dbOperations/request/getRequests";

// get requests by userId
export async function GET(
  _req: Request, 
  { params }: { params: { userId: string } }
) {
  try {
    const requests = await getAllRequests(params.userId);
    
    if (!requests) {
      return NextResponse.json(
        { message: "Requests not found!" }, 
        { status: 404 }
      );
    }

    return NextResponse.json(requests, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "GET Requests Error", error: error }, 
      { status: 500 }
    );
  }
}

