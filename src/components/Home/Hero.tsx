//@ts-nocheck
import {
  Categories,
  categoryColors,
  categoryTitles,
} from "@/data/products";
import CategoryBox from "./CategoryBox";
import Card from "./Card";
import { HeroSlider } from "./HeroSlider";
import Link from "next/link";

export default async function HeroSection() {
  
  const response = await fetch('http://dummyjson.com/products?limit=20');
  const data = await response.json();

  const products = data?.products || []

  return (
    <div className="flex flex-wrap items-start justify-center w-full gap-5 md:gap-6 relative">
      <HeroSlider />
      <div className="flex flex-wrap items-start h-full justify-center w-full gap-5 pt-60 z-0">
        {/* 1. Beauty */}
        {Categories.map((category, index) => (
          <CategoryBox
            key={index}
            title={categoryTitles[index]}
            category={category}
            bgColor={categoryColors[category]}
          />
        ))}
      </div>

      {/* Recommended products */}
      <div className="w-full flex flex-col items-start justify-center gap-4 px-1 sm:px-6 lg:px-8 pb-10">
        <div className="flex items-center justify-between w-full">
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold text-gray-800">
            Recommended Products
          </h2>
          <Link
            href="/products"
            className="px-3 py-1 text-blue-600 font-medium text-xs sm:text-base hover:text-blue-700 hover:underline cursor-pointer transition-colors duration-200 flex items-center gap-1"
          >
            Show all
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </Link>
        </div>

        {/* Horizontal scrollable container */}
        <div className="w-full relative">
          <div className="flex gap-2 overflow-x-auto pb-4 snap-x snap-mandatory scroll-smooth [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
            {products.map((product) => (
              <div
                key={product.id}
                className="flex-none w-full sm:w-56 md:w-64 lg:w-72 snap-start"
              >
                <Card product={product} />
              </div>
            ))}
          </div>

          {/* Scroll indicators/gradient overlays */}
          <div className="absolute top-0 left-0 w-8 h-full bg-gradient-to-r from-white to-transparent pointer-events-none z-10"></div>
          <div className="absolute top-0 right-0 w-8 h-full bg-gradient-to-l from-white to-transparent pointer-events-none z-10"></div>
        </div>

        {/* Mobile scroll hint */}
        <div className="flex sm:hidden items-center gap-2 text-sm text-gray-500 mt-2">
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M7 16l-4-4m0 0l4-4m-4 4h18"
            />
          </svg>
          <span>Swipe to see more products</span>
        </div>
      </div>
    </div>
  );
}
