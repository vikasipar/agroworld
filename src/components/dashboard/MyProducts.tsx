"use client";
import React, { useEffect } from "react";
import { TbAlertTriangle } from "react-icons/tb";
import { getAllProducts } from "@/actions/getProduct";
import { useQuery } from "@tanstack/react-query";
import { getCookie } from "@/hooks/useCookies";
import { IProduct } from "@/types/modelTypes";
import { useRouter } from "next/navigation";
import ProductCard from "@/components/products/ProductCard";

const MyProducts = () => {
  const router = useRouter();
  const userId = getCookie("userId");

  useEffect(() => {
    if (!userId) {
      router.push("/"); // Redirect to home if no user ID is found
    }
  }, [userId, router]);

  // Use useQuery directly in the component's body
  const { isLoading, isError, data, error } = useQuery<IProduct[]>({
    queryKey: ["products"],
    queryFn: getAllProducts,
    staleTime: 5 * 60 * 1000, // Cache data for 5 minutes
  });

  // Filter the products by the user ID
  const myProducts = data?.filter((product) => product.provider === userId);

  // Loading state
  if (isLoading) {
    return <div>Loading...</div>;
  }

  // Error state
  if (isError) {
    return (
      <div>
        Error: {error instanceof Error ? error.message : "An error occurred"}
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen">
      {myProducts && myProducts.length === 0 ? (
        <div className="w-full h-[50vh] flex flex-col justify-center items-center gap-y-2 md:gap-y-8">
          <TbAlertTriangle className="text-6xl text-yellow-300" />
          <p className="text-base md:text-xl font-semibold text-stone-500">
            You haven't added any products yet!
          </p>
        </div>
      ) : (
        <div className="flex flex-wrap items-center justify-center md:justify-start gap-4">
          {myProducts?.map((product: IProduct) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default MyProducts;
