import React from "react";
import { getAllProducts } from "@/actions/getProduct";
import { IProduct } from "@/types/modelTypes";
import { useQuery } from "@tanstack/react-query";
import ProductCard from "./ProductCard";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const Products = () => {
  // Fetch all products data
  const { isLoading, isError, data, error } = useQuery<IProduct[]>({
    queryKey: ["products"],
    queryFn: getAllProducts,
    staleTime: 30 * 60 * 1000, // Cache data for 5 minutes to optimize performance
  });

  // Loading and error handling
  if (isLoading) {
    return <p className="text-center text-green-600">Loading products...</p>;
  }

  if (isError) {
    return (
      <p className="text-center text-red-600">
        Error loading products:{" "}
        {error instanceof Error ? error.message : "Unknown error"}
      </p>
    );
  }

  // Group products by category
  const productsByCategory = data?.reduce((acc, product) => {
    if (!acc[product.Category]) {
      acc[product.Category] = [];
    }
    acc[product.Category].push(product);
    return acc;
  }, {} as Record<string, IProduct[]>);

  return (
    <div className="p-4">
      {productsByCategory &&
        Object.keys(productsByCategory).map((category) => (
          <div key={category} className="mb-8">
            <h2 className="text-3xl font-semibold text-green-500 mb-4">
              {category.replace(/-/g, ' ')}
            </h2>
            <div className="flex items-center justify-start">
              <Carousel className="w-[96%] mx-auto my-9">
                <CarouselContent className="space-x-10">
                  {productsByCategory[category].map((product) => (
                    <CarouselItem className="basis-1/4" key={product.slug}>
                      <ProductCard product={product} />
                    </CarouselItem>
                  ))}
                </CarouselContent>

                {productsByCategory[category].length > 4 && (
                  <>
                    <CarouselPrevious />
                    <CarouselNext />
                  </>
                )}
              </Carousel>
            </div>
          </div>
        ))}
    </div>
  );
};

export default Products;
