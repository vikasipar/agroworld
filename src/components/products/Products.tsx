import React from "react";
import { getAllProducts } from "@/actions/getProduct";
import { IProduct } from "@/types/modelTypes";
import { useQuery } from "@tanstack/react-query";
import dynamic from "next/dynamic";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { getCookie } from "@/hooks/useCookies";

// Dynamically import ProductCard for code splitting
const ProductCard = dynamic(() => import("./ProductCard"));

const Products = () => {
  const userId: string | null = getCookie("userId");

  // Fetch all products data with extended caching and performance optimizations
  const { isLoading, isError, data, error } = useQuery<IProduct[]>({
    queryKey: ["products"],
    queryFn: getAllProducts,
    staleTime: 30 * 60 * 1000, // Cache data for 30 minutes
    cacheTime: 60 * 60 * 1000, // Keep data in cache for 60 minutes even if inactive
    refetchOnWindowFocus: false, // Disable refetching when the window regains focus for performance
    refetchOnMount: false, // Disable refetching when component remounts if data is fresh
  });

  // Loading and error handling
  if (isLoading) {
    return <p className="text-center text-green-600">Loading products...</p>;
  }

  if (isError) {
    return (
      <p className="text-center text-red-600">
        Error loading products: {error instanceof Error ? error.message : "Unknown error"}
      </p>
    );
  }

  // Group products by category
  const productsByCategory = data?.reduce((acc:any, product:any) => {
    if (!acc[product.Category]) {
      acc[product.Category] = [];
    }
    acc[product.Category].push(product);
    return acc;
  }, {} as Record<string, IProduct[]>);

  return (
    <div className="p-4">
      {productsByCategory && Object.keys(productsByCategory).length > 0 ? (
        Object.keys(productsByCategory).map((category) => {
          const filteredProducts = productsByCategory[category].filter(
            (prod:IProduct) => prod.Available && prod.provider !== userId
          );

          return filteredProducts.length > 0 ? (
            <div key={category} className="mb-8">
              <h2 className="text-3xl font-semibold text-green-500 mb-4">
                {category.replace(/-/g, " ")}
              </h2>
              <div className="flex items-center justify-start">
                <Carousel className="w-[96%] mx-auto my-9">
                  <CarouselContent className="space-x-10">
                    {filteredProducts.map((product:IProduct) => (
                      <CarouselItem className="basis-1/4" key={product.slug}>
                        <ProductCard product={product} />
                      </CarouselItem>
                    ))}
                  </CarouselContent>

                  {filteredProducts.length > 4 && (
                    <>
                      <CarouselPrevious />
                      <CarouselNext />
                    </>
                  )}
                </Carousel>
              </div>
            </div>
          ) : null; // Don't render anything if there are no filtered products
        })
      ) : (
        <p className="text-center text-gray-600">No products available.</p>
      )}
    </div>
  );
};

export default Products;
