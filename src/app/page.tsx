'use client';
import Articles from '@/components/articles/Articles';
import Hero from '@/components/homepage/Hero';
import Products from '@/components/products/Products';
import Videos from '@/components/videos/Videos';

export default function Home() {

  return (
    <div className="p-4 overflow-x-hidden">
      <Hero/>
      <Products/>
      <Articles/>
      <Videos />
    </div>
  );
}
