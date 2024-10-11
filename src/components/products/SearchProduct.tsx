"use client";
import React, { useState, useMemo } from "react";
import { IoSearchOutline } from "react-icons/io5";
import ProductCard from "./ProductCard";
import { getAllProducts } from "@/actions/getProduct";
import { IProduct } from "@/types/modelTypes";
import { useQuery } from "@tanstack/react-query";
import { useDebounce } from "@/hooks/useDebounce";
import { getCookie } from "@/hooks/useCookies";

const SearchProduct = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const userId = getCookie("userId");
  // Debounce the search query to avoid triggering a search on every keystroke
  const debouncedSearchQuery = useDebounce(searchQuery, 2000);

  // Fetch all products data
  const { isLoading, isError, data, error } = useQuery<IProduct[]>({
    queryKey: ["products"],
    queryFn: getAllProducts,
    staleTime: 5 * 60 * 1000, // Cache data for 5 minutes to optimize performance
  });

  // Memoize filtered products to optimize performance
  // const filteredProducts = useMemo(() => {
  const filteredProducts = useMemo(() => {
    if (!data) return [];

    const lowercasedQuery = debouncedSearchQuery.toLowerCase();

    return data.filter(
      (product: IProduct) =>
        product.provider !== userId &&
        product.Available &&
        (product.EquipmentName.toLowerCase().includes(lowercasedQuery) ||
          product.Category.toLowerCase().includes(lowercasedQuery) ||
          product.Brand.toLowerCase().includes(lowercasedQuery))
    );
  }, [data, debouncedSearchQuery]);

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

  return (
    <div>
      <div className="h-[160px] w-full flex items-center justify-center">
        <div className="w-[80%] md:w-[40%] border-[1px] border-green-600 outline-none rounded-lg px-4 py-1 flex items-center justify-around">
          <input
            type="text"
            className="w-[90%] md:w-[94%] border-0 outline-none px-4 py-1"
            placeholder="Search equipments"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <IoSearchOutline className="text-xl md:text-2xl text-green-500" />
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
            {filteredProducts.map((product: IProduct) => (
              <ProductCard key={product.slug} product={product} />
            ))}
          </div>
        ) : (
          <p className="text-center text-lg md:text-2xl mt-8 text-stone-600">
            No results found
          </p>
        )}
      </div>
    </div>
  );
};

export default SearchProduct;
