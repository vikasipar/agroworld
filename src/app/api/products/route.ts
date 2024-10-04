import { NextResponse } from "next/server";
import { getAllProducts } from "@/dbOperations/product/getProduct";
import { IProduct } from "@/types/modelTypes";

export async function GET(_req: Request) {
  try {
    const allProducts: IProduct[] = await getAllProducts();

    if (!allProducts || allProducts.length === 0) {
      return NextResponse.json(
        { message: "Products not found!" },
        { status: 404 }
      );
    }

    return NextResponse.json(allProducts, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "GET All Products Error", error: error },
      { status: 500 }
    );
  }
}
