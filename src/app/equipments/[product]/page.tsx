"use client";
import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import StarRating from "@/components/products/StarRating";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import categoriesData from "@/doc/categories.json";
import ProductCard from "@/components/products/ProductCard";
import { useQuery } from "@tanstack/react-query";
import { getProduct } from "@/actions/getProduct";
import { IProduct, ICategory } from "@/types/modelTypes";

const ProductPage = () => {
  const [similarProducts, setSimilarProducts] = useState<ICategory[]>([]);
  const { product } = useParams(); // Ensure correct slug from URL

  // Fetch the product data by slug
  const { isLoading, isError, data, error } = useQuery<IProduct>({
    queryKey: ["product", product],
    queryFn: () => getProduct(product),
    enabled: !!product, // Ensure the query runs only if slug is defined
  });

  // Fetch similar products based on the product category
  useEffect(() => {
    if (data) {
      const foundCategory = data.Category;

      const foundSimilarProducts =
        categoriesData.categories
          .find((category) => category.name === foundCategory)
          ?.products.filter((prod) => prod.slug !== data.slug) || []; // Exclude the current product

      setSimilarProducts(foundSimilarProducts); // Set similar products
    }
  }, [data]);

  const addToCartHandler = (product: IProduct) => {
    // Add product to the cart logic here
    console.log("Product added to cart", product);
  };

  // Loading or error handling
  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isError || !data) {
    return (
      <p>
        Product not found: {product} | {error?.message}
      </p>
    ); // Display error message if available
  }

  return (
    <>
      <div className="md:flex flex-row-reverse h-[90vh] w-[90%] md:w-[85%] my-auto mx-auto items-center">
        <div className="md:w-[50%] text-left">
          <h1 className="text-2xl md:text-[2.4rem] text-gray-900 font-extrabold leading-tight">
            {data.EquipmentName}
          </h1>
          <p className="text-xl font-light text-green-600">{data.Brand}</p>
          <h3 className="text-[1.5rem] uppercase font-bold text-gray-900">
            ₹ {data.Price}
          </h3>
          <p className="md:text-xl uppercase font-bold text-green-600 my-2">
            {data.Category}
          </p>
          <p className="my-3 md:my-auto text-justify text-gray-800">
            {data.Description}
          </p>
          <div className="flex items-start my-2">
            <span className="flex items-end mx-0">
              <StarRating rating={data.Ratings} />
              <span className="text-gray-500 text-sm">&nbsp; 214</span>
            </span>
          </div>
          <Button
            onClick={() => addToCartHandler(data)}
            variant="primary"
            className="mt-9 uppercase w-[60%] text-xl py-4 h-12"
          >
            Add To Cart
          </Button>
        </div>
        <div className="hidden md:block w-[50%]">
          <Image
            src={data.url}
            alt={data.EquipmentName}
            width={520}
            height={460}
            loading="lazy"
            className="object-cover p-1 w-[620px] h-auto aspect-auto overflow-x-hidden overflow-y-visible m-0"
          />
        </div>
      </div>

      <h3 className="mx-20 font-semibold text-2xl">About this item:</h3>
      <table className="my-8 w-fit mx-auto mb-12 text-lg" border={1}>
        <tbody>
          <tr>
            <td>Condition:</td>
            <td>{data.Condition}</td>
          </tr>
          {data.Specifications?.Power && (
            <tr>
              <td>Power:</td>
              <td>{data.Specifications.Power}</td>
            </tr>
          )}
          <tr>
            <td>Fuel Type:</td>
            <td>{data.Specifications?.FuelType}</td>
          </tr>
          <tr>
            <td>Accessories:</td>
            <td>{data.Accessories}</td>
          </tr>
          <tr>
            <td>Rental Terms:</td>
            <td>{data.RentalTerms}</td>
          </tr>
          <tr>
            <td>Delivery Options:</td>
            <td>{data.DeliveryOptions}</td>
          </tr>
          <tr>
            <td>Service:</td>
            <td>{data.Service}</td>
          </tr>
          <tr>
            <td>Usage Instructions:</td>
            <td>{data.UsageInstructions}</td>
          </tr>
          <tr>
            <td>Contact:</td>
            <td>{data.ContactInformation}</td>
          </tr>
        </tbody>
      </table>

      <h3 className="mx-20 font-semibold text-2xl">Related equipment:</h3>
      <div className="w-full">
        <div className="flex flex-wrap items-center justify-start w-[90%] mx-auto gap-4 mt-4 mb-20">
          {similarProducts.map((product, index) => (
            <ProductCard key={index} product={product} />
          ))}
        </div>
      </div>
    </>
  );
};

export default ProductPage;
