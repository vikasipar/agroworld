"use client";
import React, { useState } from "react";
import { IoSearchOutline } from "react-icons/io5";
import ProductCard from "./ProductCard";
import { categories } from "@/doc/categories.json";

const SearchProduct = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const filterProducts = () => {
    const lowercasedQuery = searchQuery.toLowerCase();

    return categories.flatMap((category) =>
      category.products.filter(
        (product: any) =>
          product.EquipmentName.toLowerCase().includes(lowercasedQuery) ||
          product.Category.toLowerCase().includes(lowercasedQuery)
      )
    );
  };

  const filteredProducts = filterProducts();

  return (
    <div>
      <div className="h-[160px] w-full flex items-center justify-center">
        <div className="w-[40%] border-[1px] border-green-600 outline-none rounded-lg px-4 py-1 flex items-center justify-around">
          <input
            type="text"
            className="w-[94%] border-0 outline-none px-4 py-1"
            placeholder="Search equipments"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <IoSearchOutline className="text-2xl text-green-500" />
        </div>
      </div>

      {/* Display Filtered Products */}
      <div className="w-full p-6">
        {filteredProducts.length > 0 && (
          <p className="-mt-14 mb-16 text-center w-full text-stone-400">
            {filteredProducts.length} items found
          </p>
        )}
        {filteredProducts.length > 0 ? (
          <div className="flex flex-wrap items-center justify-center gap-8">
            {filteredProducts.map((product: any, index: number) => (
              <ProductCard key={index} product={product} />
            ))}
          </div>
        ) : (
          <p className="text-center text-2xl mt-8 text-green-600">
            No results found
          </p>
        )}
      </div>
    </div>
  );
};

export default SearchProduct;
