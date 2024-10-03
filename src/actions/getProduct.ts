"use server";

import { IProduct } from "@/types/modelTypes";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function getProduct(slug: string | string[]): Promise<IProduct> {
  const res = await fetch(`${API_URL}/api/product/${slug}`);
  if (!res.ok) throw new Error("Network response was not ok");
  return res.json();
}
