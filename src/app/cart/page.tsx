"use client";
import React, { useState, useEffect } from "react";
import { getProductBySlug } from "@/actions/getProduct";
import { IProduct } from "@/types/modelTypes";
import { getCookie } from "@/hooks/useCookies";
import CartItem from "@/components/cart/CartItem";
import { MdRemoveShoppingCart } from "react-icons/md";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

interface Item {
  productId: string;
  quantity: number;
}

const CartPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [totalItems, setTotalItems] = useState<number>(0);
  const [productData, setProductData] = useState<
    (IProduct & { quantity: number })[]
  >([]);
  const [productCache, setProductCache] = useState<{ [key: string]: IProduct }>(
    {}
  );

  const router = useRouter();
  const userId: string | null = getCookie("userId");

  // Fetch products only when not cached
  const fetchProducts = async (cartItems: Item[]) => {
    if (!getCookie("userEmail")) {
      router.push("/auth/login");
    }

    const fetchedProducts = await Promise.all(
      cartItems.map(async (item: Item) => {
        // Check if the product is already cached
        if (productCache[item.productId]) {
          return { ...productCache[item.productId], quantity: item.quantity };
        }

        // Fetch product and update cache
        const product = await getProductBySlug(item.productId);
        if (product) {
          setProductCache((prevCache) => ({
            ...prevCache,
            [item.productId]: product,
          }));
          return { ...product, quantity: item.quantity };
        }
        return null; // In case the product is not found
      })
    );

    const validProducts = fetchedProducts.filter(
      (product) => product !== null
    ) as (IProduct & { quantity: number })[];
    setProductData(validProducts);
    setIsLoading(false);
  };

  // Load products on mount
  useEffect(() => {
    const cartItems = JSON.parse(
      localStorage.getItem("cartItems") || "[]"
    ) as Item[];
    setTotalItems(cartItems.length);

    if (cartItems.length > 0) {
      fetchProducts(cartItems);
    } else {
      setIsLoading(false); // No items in cart
    }
  }, []);

  // Listen to storage changes and update cart
  useEffect(() => {
    const handleStorageChange = () => {
      const cartItems = JSON.parse(
        localStorage.getItem("cartItems") || "[]"
      ) as Item[];
      setTotalItems(cartItems.length);

      if (cartItems.length > 0) {
        fetchProducts(cartItems); // Fetch products again
      } else {
        setProductData([]); // Clear product data if cart is empty
      }
    };

    // Listen to storage events
    window.addEventListener("storage", handleStorageChange);
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [productCache]); // Ensure this listens to changes in cache

  // Handle quantity change in CartItem
  const handleQuantityChange = (productId: string, newQuantity: number) => {
    setProductData((prevData) =>
      prevData.map((item) =>
        item.slug === productId ? { ...item, quantity: newQuantity } : item
      )
    );

    // Update local storage
    const cartItems = JSON.parse(
      localStorage.getItem("cartItems") || "[]"
    ) as Item[];
    const updatedCartItems = cartItems.map((item: Item) =>
      item.productId === productId ? { ...item, quantity: newQuantity } : item
    );
    localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
  };

  // Remove item from cart
  const handleRemoveItem = (productId: string) => {
    const updatedCartItems = JSON.parse(
      localStorage.getItem("cartItems") || "[]"
    ).filter((item: Item) => item.productId !== productId);
    localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));

    // Update state
    setProductData((prevData) =>
      prevData.filter((item) => item.slug !== productId)
    );
    setTotalItems(updatedCartItems.length); // Update total items count
  };

  // Redirect to shop
  const redirectToEquipments = () => {
    router.push("/equipments");
  };

  if (!getCookie("userEmail")) {
    router.push("/auth/login");
  }

  return (
    <section
      className={`w-screen overflow-hidden p-10 flex md:w-full min-h-screen`}
    >
      {isLoading ? (
        <div>Loading...</div>
      ) : totalItems !== 0 ? (
        <div className="flex flex-col w-full">
          <div className="">
            <h3 className="uppercase font-semibold text-2xl text-stone-600">
              Items in cart
            </h3>
          </div>
          <div className="w-[56%] mx-auto space-y-2 mt-8">
            {productData.map((item, index) => (
              <CartItem
                key={index}
                product={item}
                onQuantityChange={handleQuantityChange}
                onRemoveItem={handleRemoveItem} // Pass remove handler
              />
            ))}
          </div>
          <button className="border-2 w-[42%] shadow-2xl drop-shadow-lg mx-auto mt-9 py-3 uppercase bg-[#ffbf00] hover:bg-[#ffa500] text-stone-900 rounded-md text-sm font-semibold">
            Proceed to Checkout
          </button>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center w-fit mx-auto mb-40">
          <MdRemoveShoppingCart className="text-4xl" />
          <h3 className="text-3xl my-4">
            Cart Is <span className="text-orange-600">Empty!</span>
          </h3>
          <p>Must add items to the cart before you proceed to checkout.</p>
          <Button
            variant="primary"
            className="w-[80%] mt-9 font-semibold"
            onClick={redirectToEquipments}
          >
            Return to shop
          </Button>
        </div>
      )}
    </section>
  );
};

export default CartPage;
