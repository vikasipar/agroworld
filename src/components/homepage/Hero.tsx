'use client'
import React from "react";
import Image from "next/image";
import HeroImg from "@/static/logo.jpg";

const Hero = () => {
  return (
    <div className="flex justify-center items-center h-[84dvh] w-[93%] mx-auto">
      <div className="w-[57%]">
        <Image src={HeroImg} alt="hero image" className="w-full h-auto" />
      </div>
      <div className="w-[43%] space-y-3 text-justify">
        <h1 className="text-6xl font-semibold text-green-500">AgroWorld</h1>
        <h2 className="text-3xl font-semibold text-green-600">Grow smarter, farm better!</h2>
        <p className="text-lg text-green-900">
          Need farm machinery for short term? We offer a wide selection of
          high-quality equipment for rent, ensuring you have the right tools
          when you need them. From tractors to tillers, we've got you covered!
        </p>
      </div>
    </div>
  );
};

export default Hero;
