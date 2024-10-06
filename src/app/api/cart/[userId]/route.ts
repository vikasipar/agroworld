import { NextResponse } from "next/server";
import { getCartItems, removeProductFromCart } from "@/dbOperations/cart/getCartItems";
import { addCartItem } from "@/dbOperations/cart/getCartItems";
import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "@/lib/dbConnect";

// get cart items by userId
export async function GET(
  _req: Request,
  { params }: { params: { userId: string } }
) {
  try {
    const items = await getCartItems(params.userId);

    if (!items) {
      return NextResponse.json(
        { message: "Product not found!" },
        { status: 404 }
      );
    }

    return NextResponse.json(items, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "GET Product Error", error: error },
      { status: 500 }
    );
  }
}

// Post cart items by userId
export async function POST(
  req: Request,
  { params }: { params: { userId: string } }
) {
  try {
    const body = await req.json();

    if (!body.productId || !body.quantity) {
      return NextResponse.json(
        { message: "Product ID and quantity are required." },
        { status: 400 }
      );
    }

    const cartItem = {
      userId: params.userId,
      productId: body.productId,
      quantity: body.quantity,
    };

    const addedItem = await addCartItem(cartItem);

    if (!addedItem) {
      return NextResponse.json(
        { message: "Unable to add product to cart." },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { message: "Product added to cart successfully!", cartItem: addedItem },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "POST Cart Error", error: error },
      { status: 500 }
    );
  }
}

// delete cart item
export async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "DELETE") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const userId = req.query.userId as string; // Get userId from the URL
  const { productId } = req.body;

  if (!userId || !productId) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  try {
    const result = await removeProductFromCart(userId, productId);

    if (result.modifiedCount === 0) {
      return res.status(404).json({ message: "Product not found in cart" });
    }

    return res.status(200).json({ message: "Product removed successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Failed to remove product", error });
  }
}
