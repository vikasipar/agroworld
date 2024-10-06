import { ICart, CartProducts } from "@/types/modelTypes";
import { NextResponse } from "next/server";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

// get all cart items by usetId
export async function getAllCartItems(userId: string|null): Promise<CartProducts[]> {
  const res = await fetch(`${API_URL}/api/cart/${userId}`);
  if (!res.ok) throw new Error("Network response was not ok");
  return res.json();
}
