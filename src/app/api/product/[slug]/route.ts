import { NextResponse } from "next/server";
import { getProductBySlug } from "@/dbOperations/product/getProduct";

export async function GET(
  _req: Request, 
  { params }: { params: { slug: string } }
) {
  try {
    const product = await getProductBySlug(params.slug);
    
    if (!product) {
      return NextResponse.json(
        { message: "Product not found!" }, 
        { status: 404 }
      );
    }

    return NextResponse.json(product, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "GET Product error", error: error }, 
      { status: 500 }
    );
  }
}
