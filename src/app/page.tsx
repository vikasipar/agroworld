'use client';
import Hero from '@/components/homepage/Hero';
import Products from '@/components/products/Products';

export default function Home() {

  return (
    <div className="p-4">
      <Hero/>
      <Products/>
    </div>
  );
}
