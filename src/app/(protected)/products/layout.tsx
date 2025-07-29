"use client";
import CategoryFilter from "@/components/products/CategoryFilter";
import PriceFilter from "@/components/products/PriceFilter";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export default function Productlayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const searchParams = useSearchParams();
  const router = useRouter();

  const minValue = searchParams.get("min");
  const maxValue = searchParams.get("max");
  const query = searchParams.get("search");
  const category = searchParams.get("category");

  const [minPrice, setMinPrice] = useState(minValue ? parseInt(minValue) : 0);
  const [maxPrice, setMaxPrice] = useState(maxValue ? parseInt(maxValue) : 100);
  const [selectedCategories, setSelectedCategories] = useState<string[]>(() => {
    return category ? category.split(",") : [];
  });

  const handleGo = () => {
    let url = "/products?";
    if (query) url += "search=" + query;
    if (minPrice) url += "&min=" + minPrice;
    if (maxPrice) url += "&max=" + maxPrice;
    router.push(url);
  };

  return (
    <div className="bg-white text-black/80 min-h-screen">
      <div className="flex flex-col lg:flex-row items-start gap-1 max-w-full">
        {/* Sidebar Filters */}
        <div className="hidden lg:block w-full lg:w-64 flex-shrink-0">
          <div className="bg-white overflow-hidden">
            <div className="p-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Filters</h3>
            </div>
            <div className="divide-y divide-gray-200">
              <div className="p-4">
                <PriceFilter
                  minPrice={minPrice}
                  setMinPrice={setMinPrice}
                  maxPrice={maxPrice}
                  setMaxPrice={setMaxPrice}
                  handleGo={handleGo}
                />
              </div>
              <div className="p-4">
                <CategoryFilter
                  selectedCategories={selectedCategories}
                  setSelectedCategories={setSelectedCategories}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="bg-white w-full border border-gray-200 min-h-screen">
          {children}
        </div>
      </div>
    </div>
  );
}
