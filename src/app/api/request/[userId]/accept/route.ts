import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Request from "@/models/request";
import Product from "@/models/product";

export async function PATCH(
  req: Request,
  { params }: { params: { userId: string } }
) {
  try {
    await dbConnect();
    const { userId } = params;

    // Parse the request body
    const { productId } = await req.json(); // Get productId from the request body

    // Find the request by its ID and update the request status
    const request = await Request.findByIdAndUpdate(
      userId,
      { requestAccepted: true },
      { new: true }
    );

    if (!request) {
      return NextResponse.json(
        { message: "Request not found" },
        { status: 404 }
      );
    }

    // Update the product availability to false based on productId
    await Product.findByIdAndUpdate(
      productId, // Use the productId from the request body
      { Available: false }, // Set Available to false
      { new: true } // Return the updated product
    );

    return NextResponse.json({ message: "Request accepted", request });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
