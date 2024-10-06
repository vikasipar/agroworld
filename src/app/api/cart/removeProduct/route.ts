import { NextApiRequest, NextApiResponse } from "next";
import { removeProductFromCart } from "@/dbOperations/cart/getCartItems";

// delete cart item
export async function handler(
    req: NextApiRequest,
    res: NextApiResponse
  ) {
    if (req.method !== "DELETE") {
      return res.status(405).json({ message: "Method not allowed" });
    }
  
    const userId = req.query.userId as string;
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
  