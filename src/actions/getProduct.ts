// "use server";

import { IProduct } from "@/types/modelTypes";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

// get all products
export async function getAllProducts(): Promise<IProduct[]> {
  const res = await fetch(`${API_URL}/api/products`);
  if (!res.ok) throw new Error("Network response was not ok");

  const products: IProduct[] = await res.json();
  return products;
}

// get all products step by step using pagination
export async function getProducts({
  limit = 8,
  offset = 0,
  query = "",
}: {
  limit: number;
  offset: number;
  query: string;
}): Promise<{ products: IProduct[]; totalPages: number }> {
  const res = await fetch(
    `${API_URL}/api/products?limit=${limit}&offset=${offset}&query=${query}`
  );
  if (!res.ok) throw new Error("Network response was not ok");

  const { products, totalPages } = await res.json();
  return { products, totalPages };
}

// get product by slug
export async function getProductBySlug(
  slug: string | string[]
): Promise<IProduct> {
  const res = await fetch(`${API_URL}/api/product/${slug}`);
  if (!res.ok) throw new Error("Network response was not ok");
  return res.json();
}

// get products by category
export async function getProductsByCategory(slug: string | string[]) {
  const res = await fetch(`${API_URL}/api/products/${slug}`);
  if (!res.ok) throw new Error("Network response was not ok");
  return res.json();
}
