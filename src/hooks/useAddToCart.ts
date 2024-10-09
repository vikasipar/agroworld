import { toast } from "sonner";

export const addToCartHandler = (productId: string) => {
  // Get the existing cart from localStorage or initialize an empty array if not found
  const cartItems = JSON.parse(localStorage.getItem("cartItems") || "[]");

  // Find if the product is already in the cart
  const existingProduct = cartItems.find(
    (item: any) => item.productId === productId
  );

  if (existingProduct) {
    // If the product exists, increase the quantity
    existingProduct.quantity += 1;
  } else {
    // If the product doesn't exist, add it with quantity 1
    cartItems.push({ productId, quantity: 1 });
  }

  // Save the updated cart back to localStorage
  localStorage.setItem("cartItems", JSON.stringify(cartItems));

  toast("Product added to cart!");
  // console.log('Cart updated:', cartItems);
};

// const addToCartHandler = async (product: any) => {
//   // Add product to the cart logic here
//   // console.log("Product added", product._id);
//   const paylload = {
//     productId: product.slug,
//     quantity: 1,
//   }
//   try {
//     const userId = getCookie("userId");
//     const response = await fetch(`/api/cart/${userId}`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(paylload),
//     });

//     if (!response.ok) {
//       throw new Error("Failed to submit product data");
//     }

//     const result = await response.json();
//     //   console.log("Product data submitted successfully:", result);
//     toast("Product added to cart!");
//   } catch (error) {
//     console.error("Error submitting product data:", error);
//   }
// };
