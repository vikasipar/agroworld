"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import StarRating from "@/components/products/StarRating";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import ProductCard from "@/components/products/ProductCard";
import { useQuery } from "@tanstack/react-query";
import { getAllProducts } from "@/actions/getProduct";
import { IProduct } from "@/types/modelTypes";

const ProductPage = () => {
  const { product: productSlug } = useParams(); // Get the product slug from the URL
  const [currentProduct, setCurrentProduct] = useState<IProduct | null>(null); // Set the current product
  const [relatedProducts, setRelatedProducts] = useState<IProduct[]>([]); // Set related products

  // Fetch the product data by slug
  // const { isLoading, isError, data, error } = useQuery<IProduct>({
  //   queryKey: ["product", product],
  //   queryFn: () => getProductBySlug(product),
  //   enabled: !!product,
  // });

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
      const related = data.filter(
        (p) => p.Category === product?.Category && p.slug !== productSlug
      );
      setRelatedProducts(related);
    }
  }, [data, productSlug]);

  const addToCartHandler = (product: IProduct) => {
    // Add product to the cart logic here
    console.log("Product added to cart", product);
  };

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
        <div className="md:w-[50%] text-left">
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
            {currentProduct.Category.replace(/-/g, ' ')}
          </p>
          <p className="my-3 md:my-auto text-justify text-gray-800">
            {currentProduct.Description}
          </p>
          <div className="flex items-start my-2">
            <span className="flex items-end mx-0">
              <StarRating rating={currentProduct.Ratings} />
              <span className="text-gray-500 text-sm">&nbsp; 214</span>
            </span>
          </div>
          <Button
            onClick={() => addToCartHandler(currentProduct)}
            variant="primary"
            className="mt-9 uppercase w-[60%] text-xl py-4 h-12"
          >
            Add To Cart
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

      <h3 className="mx-20 font-semibold text-2xl">About this item:</h3>
      <table className="my-8 w-fit mx-auto mb-12 text-lg" border={1}>
        <tbody>
          <tr>
            <td>Condition:</td>
            <td>{currentProduct.Condition}</td>
          </tr>
          {currentProduct.Specifications.Power && (
            <tr>
              <td>Power:</td>
              <td>{currentProduct.Specifications.Power}</td>
            </tr>
          )}
          {currentProduct.Specifications.FuelType && (
            <tr>
              <td>Fuel Type:</td>
              <td>{currentProduct.Specifications?.FuelType}</td>
            </tr>
          )}
          <tr>
            <td>Accessories:</td>
            <td>{currentProduct.Accessories}</td>
          </tr>
          <tr>
            <td>Rental Terms:</td>
            <td>{currentProduct.RentalTerms}</td>
          </tr>
          <tr>
            <td>Delivery Options:</td>
            <td>{currentProduct.DeliveryOptions}</td>
          </tr>
          <tr>
            <td>Service:</td>
            <td>{currentProduct.Service}</td>
          </tr>
          <tr>
            <td>Usage Instructions:</td>
            <td>{currentProduct.UsageInstructions}</td>
          </tr>
          <tr>
            <td>Contact:</td>
            <td>{currentProduct.ContactInformation}</td>
          </tr>
        </tbody>
      </table>

      <h3 className="mx-20 font-semibold text-2xl">Related equipment:</h3>
      <div className="w-full">
        <div className="flex flex-wrap items-center justify-start w-[90%] mx-auto gap-4 mt-4 mb-20">
          {relatedProducts.length === 0 ? (
            <p>No related products found.</p>
          ) : (
            relatedProducts.map((similarProduct, index) => (
              <ProductCard key={index} product={similarProduct} />
            ))
          )}
        </div>
      </div>
    </>
  );
};

export default ProductPage;
