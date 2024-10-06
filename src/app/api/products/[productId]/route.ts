import { NextResponse } from "next/server";
import { getProductByProductId } from "@/dbOperations/product/getProduct";

// get product by id
export async function GET(
    _req: Request, 
    { params }: { params: { productId: string } }
  ) {
    try {
      const product = await getProductByProductId(params.productId);
      
      if (!product) {
        return NextResponse.json(
          { message: "Product not found!" }, 
          { status: 404 }
        );
      }
  
      return NextResponse.json(product, { status: 200 });
    } catch (error) {
      return NextResponse.json(
        { message: "GET Product Error", error: error }, 
        { status: 500 }
      );
    }
  }