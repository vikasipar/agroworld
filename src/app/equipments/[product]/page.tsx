"use client";
import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import data from "@/doc/data.json";
import StarRating from "@/components/products/StarRating";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import categoriesData from "@/doc/categories.json";
import ProductCard from "@/components/products/ProductCard";

const ProductPage = () => {
  const [currentProduct, setCurrentProduct] = useState<any>(null);
  const [similarProducts, setSimilarProducts] = useState<any[]>([]);
  const { product } = useParams();

  useEffect(() => {
    const foundProduct = data.products.find((prod) => prod.slug === product);
    setCurrentProduct(foundProduct || null); // Set to null if not found
  }, [product]);

  useEffect(() => {
    if (currentProduct) {
      const foundCategory = currentProduct.Category;
      const foundSimilarProducts = categoriesData.categories
        .find((category) => category.name === foundCategory)
        ?.products.filter((prod) => prod.slug !== currentProduct.slug) || []; // Exclude the current product
      setSimilarProducts(foundSimilarProducts); // Set similar products
    }
  }, [currentProduct]);

  const addToCartHandler = (product:any) => {
    // Add product to the cart logic here
  };

  if (!currentProduct) {
    return <p>Loading...</p>; // Show loading while the product is being fetched
  }

  const {
    EquipmentName,
    Brand,
    Price,
    Description,
    url,
    Ratings,
    Condition,
    Specifications,
    Accessories,
    RentalTerms,
    DeliveryOptions,
    Service,
    UsageInstructions,
    ContactInformation,
  } = currentProduct;

  return (
    <>
      <div className="md:flex flex-row-reverse h-[90vh] w-[90%] md:w-[85%] my-auto mx-auto items-center">
        <div className="md:w-[50%] text-left">
          <h1 className="text-2xl md:text-[2.4rem] text-gray-900 font-extrabold leading-tight">
            {EquipmentName}
          </h1>
          <p className="text-xl font-light text-green-600">{Brand}</p>
          <h3 className="text-[1.5rem] uppercase font-bold text-gray-900">
            ₹ {Price}
          </h3>
          <p className="md:text-xl uppercase font-bold text-green-600 my-2">
            {currentProduct.Category}
          </p>
          <p className="my-3 md:my-auto text-justify text-gray-800">
            {Description}
          </p>
          <div className="flex items-start my-2">
            <span className="flex items-end mx-0">
              <StarRating rating={Ratings} />
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
            src={url}
            alt={EquipmentName}
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
            <td>{Condition}</td>
          </tr>
          {Specifications.Power && (
            <tr>
              <td>Power:</td>
              <td>{Specifications.Power}</td>
            </tr>
          )}
          <tr>
            <td>Fuel Type:</td>
            <td>{Specifications.FuelType}</td>
          </tr>
          <tr>
            <td>Accessories:</td>
            <td>{Accessories}</td>
          </tr>
          <tr>
            <td>Rental Terms:</td>
            <td>{RentalTerms}</td>
          </tr>
          <tr>
            <td>Delivery Options:</td>
            <td>{DeliveryOptions}</td>
          </tr>
          <tr>
            <td>Service:</td>
            <td>{Service}</td>
          </tr>
          <tr>
            <td>Usage Instructions:</td>
            <td>{UsageInstructions}</td>
          </tr>
          <tr>
            <td>Contact:</td>
            <td>{ContactInformation}</td>
          </tr>
        </tbody>
      </table>

      <h3 className="mx-20 font-semibold text-2xl">Related equipments:</h3>
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
