"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";

const images = [
  "https://images-eu.ssl-images-amazon.com/images/G/31/Prime/PDED/H1/PD25_GW_Hero_H1_Static_PDED_2x_g._CB790364921_.jpg",
  "https://images-eu.ssl-images-amazon.com/images/G/31/INSLGW/PD25/pded_af_unrec_2x._CB790369171_.png",
  "https://images-eu.ssl-images-amazon.com/images/G/31/IMG25/Home/2025/PD/GW/PDED/Hero/GW_Home_PDED_Hero_PC_Home_furnishing__decor1_3000._CB790365943_.jpg",
  "https://images-eu.ssl-images-amazon.com/images/G/31/INSLGW/PD25/pded_af_2x._CB790369171_.png",
];

export const HeroSlider = () => {
  const [current, setCurrent] = useState(0);

  const nextSlide = () => {
    setCurrent((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrent((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  useEffect(() => {
    const slideInterval = setInterval(nextSlide, 4000);
    return () => clearInterval(slideInterval);
  }, []);

  return (
    <div className="absolute flex justify-center items-center w-full overflow-hidden">
      {/* Left arrow */}
      <div
        className="absolute left-0 top-0 cursor-pointer transition-all duration-300 ease-in-out border-2 border-transparent   hover:border-white rounded-lg z-10"
        onClick={prevSlide}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-[230px] w-[50px]"
          viewBox="0 0 24 24"
          fill="none"
          strokeWidth={1.5}
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.75 19.5L8.25 12l7.5-7.5"
          />
        </svg>
      </div>

      {/* Image slider */}
      <div className="flex w-full items-center justify-center overflow-hidden relative h-[80vh]">
        <div
          className="flex transition-transform duration-700 ease-in-out w-full h-full"
          style={{ transform: `translateX(-${current * 100}%)` }}
        >
          {images.map((item, index) => (
            <div key={index} className="w-full flex-shrink-0 h-[80vh] relative">
              <Image
                src={item}
                alt="carousel slide"
                fill
                className="object-cover"
                priority={index === current}
              />
            </div>
          ))}
        </div>

        {/* Bottom gradient fade */}
        <div className="absolute bottom-0 left-0 w-full h-60 bg-gradient-to-t from-[#E3E6E6] via-white/80 to-transparent pointer-events-none" />
      </div>

      {/* Right arrow */}
      <div
        className="absolute right-0 top-0 cursor-pointer transition-all duration-300 ease-in-out border-2 border-transparent   hover:border-white rounded-lg z-10"
        onClick={nextSlide}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-[230px] w-[50px]"
          viewBox="0 0 24 24"
          fill="none"
          strokeWidth={1.5}
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m8.25 4.5 7.5 7.5-7.5 7.5"
          />
        </svg>
      </div>
    </div>
  );
};
