//@ts-nocheck
"use client";
import { categoryList } from "@/data/products";
import { noSSR } from "next/dynamic";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function CategoryFilter({
  setSelectedCategories,
  selectedCategories,
}) {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (pathname === "/products") {
      let url = "/products?";
      if (selectedCategories.length > 0) {
        url += `category=${selectedCategories.join(",")}`;
      }
      router.push(url);
    }
  }, [selectedCategories, pathname]);

  const handleCategoryChange = (category) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  return (
    <div className="w-full max-w-md mx-auto p-2 bg-white">
      <div className="mb-1">
        <h3 className="text-sm font-semibold text-gray-900">Category</h3>
      </div>

      <div className="space-y-1">
        {categoryList.map((category) => (
          <label key={category} className="flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={selectedCategories.includes(category)}
              onChange={() => handleCategoryChange(category)}
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
            />
            <span className="ml-1 text-sm text-gray-700">{category}</span>
          </label>
        ))}
      </div>
    </div>
  );
}
