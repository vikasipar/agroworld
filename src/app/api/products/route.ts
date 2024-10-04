import { NextResponse, NextRequest } from "next/server";
import dbConnect from "@/lib/dbConnect";
import { getAllProducts } from "@/dbOperations/product/getProduct";
import { IProduct } from "@/types/modelTypes";
import Product from "@/models/product";

// get products data
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

// post product data
export async function POST(req: NextRequest) {
  const productData = await req.json();

  try {
    await dbConnect();

    // Create a new product document
    const newProduct = new Product(productData);

    // Save the product in MongoDB
    await newProduct.save();

    return NextResponse.json({ message: "Product saved to database" }, { status: 201 });
  } catch (error) {
    console.error("Error saving product:", error);
    return NextResponse.json({ message: "Error saving product" }, { status: 500 });
  }
}
