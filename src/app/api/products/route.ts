import { NextRequest, NextResponse } from "next/server";
import { getAllProducts } from "@/dbOperations/product/getProduct";

export async function GET() {
  try {
    const products = await getAllProducts();
    return NextResponse.json(products);
  } catch (error) {
    const errormessage = { message: "Get All Products Error!", error: error };
    return errormessage;
  }
}

// export const GET = async (req: Request) => {
//   console.log("get request is working!");

//   const message = { success: true, message: "GET request successful" };

//   return NextResponse.json(message);
// };
