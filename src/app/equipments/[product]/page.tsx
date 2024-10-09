"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import StarRating from "@/components/products/StarRating";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { getAllProducts } from "@/actions/getProduct";
import { IProduct, IRequest } from "@/types/modelTypes";
import { getCookie } from "@/hooks/useCookies";
import { toast } from "sonner";
import { usePayment } from "@/hooks/usePayment";
import RelatedProducts from "@/components/products/RelatedProducts";
import ProductDetails from "@/components/products/ProductDetails";

const ProductPage = () => {
  const { product: productSlug } = useParams(); // Get the product slug from the URL
  const [currentProduct, setCurrentProduct] = useState<IProduct | null>(null); // Set the current product
  const [relatedProducts, setRelatedProducts] = useState<IProduct[]>([]); // Set related products
  const [isUserLoggedIn, setIsUserLoggedIn] = useState<boolean>(false);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [isPaymentDone, setIsPaymentDone] = useState<boolean>(false);
  const userId: string | null = getCookie("userId");

  useEffect(() => {
    const userEmail: any = getCookie("useEmail");
    const userName: any = getCookie("userName");
    if (userEmail) {
      setIsUserLoggedIn(true);
    } else {
      setIsUserLoggedIn(false);
    }
  }, []);

  // Fetch all products data
  const { isLoading, isError, data, error } = useQuery<IProduct[]>({
    queryKey: ["products"],
    queryFn: getAllProducts,
    staleTime: 5 * 60 * 1000, // Cache data for 5 minutes to optimize performance
  });

  // Set current product based on the productSlug and filter related products from the same category
  useEffect(() => {
    if (data) {
      // Find the product that matches the productSlug
      const product = data.find((p) => p.slug === productSlug);
      setCurrentProduct(product || null);

      // Group products from the same category as related products, excluding the current product
      if (product) {
        const related = data.filter(
          (p) =>
            p.provider !== userId && // Exclude products from the same provider
            p.Category === product.Category && // Match category
            p.slug !== productSlug && // Exclude the current product
            p.Available // Only include available products
        );
        setRelatedProducts(related);
      }
    }
  }, [data, productSlug, userId]); // Include userId in the dependency array

  // Handle payment
  const handlePayment = () => {
    const userEmail: any = getCookie("useEmail");
    const userName: any = getCookie("userName");
    // if (isUserLoggedIn) {
      usePayment(userEmail, userName, setIsProcessing, setIsPaymentDone);
    // }
    // }else return;
  };

  // send request to provider after payment
  useEffect(() => {
    const sendRequest = async () => {
      // Ensure currentProduct and user information exist before sending the request
      const userEmail = getCookie("userEmail"); // Ensure this is spelled correctly
      const userName = getCookie("userName");

      if (isPaymentDone && currentProduct && userId && userEmail && userName) {
        const payload: IRequest = {
          senderId: userId,
          senderName: userName,
          senderEmail: userEmail,
          providerId: currentProduct.provider || "", // Use empty string fallback if undefined
          requestAccepted: false,
          productId: currentProduct._id || "", // Ensure _id is defined
          productSlug: currentProduct.slug || "", // Ensure slug is defined
        };

        try {
          const response = await fetch("/api/request", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
          });

          if (!response.ok) {
            throw new Error("Failed to submit request");
          }

          const result = await response.json();
          toast.success("Request sent successfully!");
        } catch (error) {
          console.error("Error submitting request data:", error);
          toast.error("Error sending request.");
        }
      }
    };

    sendRequest();
  }, [isPaymentDone, currentProduct, userId]); // Make sure to include necessary dependencies

  // Loading or error handling
  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isError || !data || !currentProduct) {
    return (
      <p>
        Product not found: {productSlug} | {error?.message}
      </p>
    ); // Display error message if available
  }

  return (
    <>
      <div className="md:flex flex-row-reverse h-[90vh] w-[90%] md:w-[85%] my-auto mx-auto items-center">
        <div className="md:w-[50%] text-left ml-4">
          <h1 className="text-2xl md:text-[2.4rem] text-gray-900 font-extrabold leading-tight">
            {currentProduct.EquipmentName}
          </h1>
          <p className="text-xl font-light text-red-600">
            {currentProduct.Brand}
          </p>
          <h3 className="text-[1.5rem] uppercase font-bold text-gray-900">
            ₹ {currentProduct.Price}
          </h3>
          <p className="md:text-xl uppercase font-bold text-green-600 my-2">
            {currentProduct.Category.replace(/-/g, " ")}
          </p>
          <p className="my-3 md:my-auto text-justify text-gray-800">
            {currentProduct.Description}
          </p>
          <p className="my-3 md:my-auto text-justify text-gray-400">
            {currentProduct.provider}
          </p>
          <div className="flex items-start my-2">
            <span className="flex items-end mx-0">
              <StarRating rating={currentProduct.Ratings} />
              <span className="text-gray-500 text-sm">&nbsp; 214</span>
            </span>
          </div>
          <script src="https://checkout.razorpay.com/v1/checkout.js"></script>
          <Button
            onClick={handlePayment}
            variant="primary"
            className="mt-9 uppercase w-[60%] text-xl py-4 h-12"
            disabled={isUserLoggedIn || isProcessing}
          >
            {isProcessing ? "Processing" : "Rent Now"}
          </Button>
        </div>
        <div className="hidden md:block w-[50%]">
          <Image
            src={currentProduct.url}
            alt={currentProduct.EquipmentName}
            width={520}
            height={460}
            loading="lazy"
            className="object-cover p-1 w-[620px] h-auto aspect-auto overflow-x-hidden overflow-y-visible m-0"
          />
        </div>
      </div>
      <ProductDetails currentProduct={currentProduct} />
      <RelatedProducts relatedProducts={relatedProducts} />
    </>
  );
};

export default ProductPage;
