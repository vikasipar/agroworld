'use client';
import Hero from '@/components/homepage/Hero';
import Navbar from '@/components/layout/Navbar';

export default function Home() {

  return (
    <div className="p-4">
      <Navbar/>
      <Hero/>
    </div>
  );
}
