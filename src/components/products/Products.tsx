import React from "react";
import data from "@/doc/categories.json";
import ProductCard from "./ProductCard";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const Products = () => {
  return (
    <div className="p-4">
      {data.categories.map((category, categoryIndex) => (
        <div key={categoryIndex} className="mb-4">
          <h2 className="text-3xl font-semibold text-green-500">{category.name}</h2>
          <div className="flex items-center justify-start">
            <Carousel className="w-[90%] mx-auto my-9">
              <CarouselContent className="space-x-10">
                {category.products.map((product, productIndex) => (
                  <CarouselItem className="basis-1/4" key={productIndex}>
                    <ProductCard product={product} />
                  </CarouselItem>
                ))}
              </CarouselContent>
              {category.products.length > 4 && (
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
