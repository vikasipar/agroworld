"use client";
import React from 'react';
import dynamic from "next/dynamic";
import Hero from "@/components/homepage/Hero";

const Articles = dynamic(() => import("@/components/articles/Articles"), {
  ssr: false,
});
const Products = dynamic(() => import("@/components/products/Products"), {
  ssr: false,
});
const Videos = dynamic(() => import("@/components/videos/Videos"), {
  ssr: false,
});

function HomePage() {
  return (
    <div className="p-4 overflow-x-hidden">
      <Hero />
      <Products />
      <Articles />
      <Videos />
    </div>
  )
}

export default HomePage;