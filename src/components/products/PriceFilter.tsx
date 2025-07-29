"use client";
import { useState, useRef, useEffect } from "react";

interface PriceFilterProps {
  minPrice: number;
  maxPrice: number;
  setMinPrice: (price: number) => void;
  setMaxPrice: (price: number) => void;
  handleGo: () => void;
}

export default function PriceFilter({
  minPrice,
  maxPrice,
  setMinPrice,
  setMaxPrice,
  handleGo,
}: PriceFilterProps) {
  const [isDragging, setIsDragging] = useState<string | null>(null);

  const sliderRef = useRef<HTMLDivElement>(null);
  const minValue = 0;
  const maxValue = 100;

  const getPercentage = (value: number) => {
    return ((value - minValue) / (maxValue - minValue)) * 100;
  };

  const handleMouseDown = (type: string) => {
    setIsDragging(type);
  };

  const handleMouseUp = () => {
    setIsDragging(null);
  };

  useEffect(() => {
    if (isDragging) {
      const handleMouseMove = (e: MouseEvent) => {
        if (!isDragging || !sliderRef.current) return;
        const rect = sliderRef.current.getBoundingClientRect();
        const percentage = Math.min(
          Math.max(0, (e.clientX - rect.left) / rect.width),
          1
        );
        const value = Math.round(minValue + percentage * (maxValue - minValue));
        if (isDragging === "min") {
          setMinPrice(Math.min(value, maxPrice - 1)); // gap of $1
        } else if (isDragging === "max") {
          setMaxPrice(Math.max(value, minPrice + 1));
        }
      };
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
      return () => {
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
      };
    }
  }, [
    isDragging,
    minPrice,
    maxPrice,
    minValue,
    maxValue,
    setMinPrice,
    setMaxPrice,
  ]);

  return (
    <div className="w-full max-w-md mx-auto p-2 bg-white">
      <div className="mb-2">
        <h3 className="text-sm font-semibold">Price</h3>
        <div className="text-gray-600 text-sm">
          ${minPrice} - ${maxPrice}+
        </div>
      </div>

      <div className="relative mb-3 p-2">
        {/* Slider Track */}
        <div
          ref={sliderRef}
          className="relative h-1 bg-gray-200 rounded-full cursor-pointer"
        >
          {/* Active Range */}
          <div
            className="absolute h-1 bg-[#007185] rounded-full"
            style={{
              left: `${getPercentage(minPrice)}%`,
              width: `${getPercentage(maxPrice) - getPercentage(minPrice)}%`,
            }}
          />

          {/* Min Handle */}
          <div
            className="absolute w-6 h-6 bg-white border-7 border-[#007185] rounded-full cursor-pointer shadow-lg transform -translate-x-1/2 -translate-y-1/2 hover:scale-110 transition-transform"
            style={{
              left: `${getPercentage(minPrice)}%`,
              top: "50%",
            }}
            onMouseDown={() => handleMouseDown("min")}
          />

          {/* Max Handle */}
          <div
            className="absolute w-6 h-6 bg-white border-7 border-[#007185] rounded-full cursor-pointer shadow-lg transform -translate-x-1/2 -translate-y-1/2 hover:scale-110 transition-transform"
            style={{
              left: `${getPercentage(maxPrice)}%`,
              top: "50%",
            }}
            onMouseDown={() => handleMouseDown("max")}
          />
        </div>
      </div>

      {/* Go Button */}
      <div className="flex justify-start">
        <button
          className="px-4 py-1 cursor-pointer bg-white border border-gray-300 rounded-full hover:bg-gray-50 transition-colors"
          onClick={handleGo}
        >
          Go
        </button>
      </div>
    </div>
  );
}
