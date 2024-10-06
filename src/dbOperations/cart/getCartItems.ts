// 'use client'
import dbConnect from "@/lib/dbConnect";
import { Cart } from "@/models/cart";
// Get cart items by userId
export async function getCartItems(userId: string) {
  await dbConnect(); // Connect to the database

  const items = await Cart.findOne({ userId }); // Fetch product by slug
  return items;
}

// Function to add cart item by userId
export async function addCartItem(cartItem: {
  userId: string;
  productId: string;
  quantity: number;
}) {
  try {
    await dbConnect(); // Ensure DB connection

    // Check if the user already has this product in the cart
    const existingCart = await Cart.findOne({ userId: cartItem.userId });

    // If user has an existing cart, update it; otherwise, create a new cart entry
    if (existingCart) {
      const existingProduct = existingCart.products.find(
        (p: any) => p.productId === cartItem.productId
      );

      if (existingProduct) {
        // If product exists, update its quantity
        existingProduct.quantity += cartItem.quantity;
      } else {
        // Add new product to cart
        existingCart.products.push({
          productId: cartItem.productId,
          quantity: cartItem.quantity,
        });
      }

      // Save updated cart
      await existingCart.save();
      return existingCart;
    } else {
      // Create a new cart if no cart exists
      const newCart = new Cart({
        userId: cartItem.userId,
        products: [
          {
            productId: cartItem.productId,
            quantity: cartItem.quantity,
          },
        ],
      });

      await newCart.save();
      return newCart;
    }
  } catch (error) {
    console.error("Error adding cart item:", error);
    return null;
  }
}

// delete cart item
export const removeProductFromCart = async (userId: string, productId: string) => {
    const { db } = await dbConnect();
  
    // Use $pull to remove the product from the cart's products array
    const result = await db.collection('carts').updateOne(
      { userId: userId }, // Match the cart based on userId
      { $pull: { products: { productId: productId } } } // Remove product with specific productId
    );
  
    if (result.modifiedCount === 0) {
      throw new Error('Failed to remove product from cart or product not found');
    }
  
    return result;
  };
  