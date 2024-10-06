import type { NextApiRequest, NextApiResponse } from "next";
import { Cart } from "@/models/cart";
import { ICart } from "@/types/modelTypes";
import dbConnect from "@/lib/dbConnect"; // Assuming you have dbConnect function to handle MongoDB connection

// Fetch the cart for the user (GET /api/cart)
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;

  // Ensure database is connected
  await dbConnect();

  switch (method) {
    case "GET":
      return fetchCart(req, res);
    case "POST":
      return addProductToCart(req, res);
    case "PUT":
      return updateProductQuantity(req, res);
    case "DELETE":
      return removeProductFromCart(req, res);
    default:
      return res.status(405).end(`Method ${method} Not Allowed`);
  }
}

// Fetch cart products (GET)
const fetchCart = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const userId = req.query.userId as string; // Get the userId from the query

    // Find the user's cart
    const cart = await Cart.findOne({ userId });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    return res.status(200).json(cart);
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error", error });
  }
};

// Add product to cart (POST)
const addProductToCart = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { userId, productId, quantity } = req.body;

    // Ensure database connection
    await dbConnect();

    // Check if cart exists for the user
    let cart = await Cart.findOne({ userId });

    if (cart) {
      // If cart exists, check if the product already exists in the cart
      const productIndex = cart.products.findIndex(
        (item:any) => item.productId === productId
      );

      if (productIndex > -1) {
        // If product exists, update the quantity
        cart.products[productIndex].quantity += quantity;
      } else {
        // If product does not exist, add the new product
        cart.products.push({ productId, quantity });
      }
    } else {
      // If no cart exists for the user, create a new cart
      cart = new Cart({
        userId,
        products: [{ productId, quantity }],
      });
    }

    // Save the cart
    await cart.save();
    return res.status(200).json(cart);
  } catch (error) {
    console.error("Error adding product to cart:", error);
    return res.status(500).json({ message: "Internal Server Error", error });
  }
};

// Update product quantity in cart (PUT)
const updateProductQuantity = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  try {
    const { userId, productId, quantity } = req.body;

    // Find user's cart
    const cart = await Cart.findOne({ userId });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    // Find the product and update the quantity
    const product = cart.products.find((item:any) => item.productId === productId);

    if (!product) {
      return res.status(404).json({ message: "Product not found in cart" });
    }

    product.quantity = quantity;

    await cart.save();
    return res.status(200).json(cart);
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error", error });
  }
};

// Remove product from cart (DELETE)
const removeProductFromCart = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  try {
    const { userId, productId } = req.query;

    // Find user's cart
    const cart = await Cart.findOne({ userId });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    // Remove the product from the cart
    cart.products = cart.products.filter(
      (product:any) => product.productId !== productId
    );

    await cart.save();
    return res.status(200).json(cart);
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error", error });
  }
};
