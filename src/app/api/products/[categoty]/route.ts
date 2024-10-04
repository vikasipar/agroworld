import { NextResponse } from "next/server";
import { getProductsByCategory } from "@/dbOperations/product/getProduct";

export async function GET(
  _req: Request,
  { params }: { params: { slug: string } }
) {
  try {
    const products = await getProductsByCategory(params.slug); // Ensure params.slug is defined

    if (!products || products.length === 0) {
      return NextResponse.json(
        { message: "Products not found!" },
        { status: 404 }
      );
    }

    return NextResponse.json(products, { status: 200 });
  } catch (error) {
    console.error("Error fetching products by category:", error); // Log error for debugging
    return NextResponse.json(
      { message: "GET Products By Category Error", error: error || error },
      { status: 500 }
    );
  }
}
