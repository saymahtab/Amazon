"use client";
import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import CategoryDropdown from "./CategoryDropdown";

export default function SearchBar() {
  const router = useRouter();
  const [inputText, setInputText] = useState("");
  const [isFocused, setIsFocused] = useState(false); // Track focus state

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    router.push(`/products/?search=${inputText}`);
    setIsFocused(false);
  };

  return (
    <>
      {/* Backdrop */}
      {isFocused && (
        <div
          onClick={() => setIsFocused(false)}
          className="fixed inset-0 bg-black opacity-60 z-10 transition-opacity duration-300"
        ></div>
      )}

      {/* Search Bar */}
      <form
        onSubmit={handleSubmit}
        className="hidden sm:flex w-1/2 items-center z-20 relative border-3 rounded-md border-transparent focus-within:border-amber-500 transition duration-100 "
      >
        <CategoryDropdown />

        <input
          onFocus={() => setIsFocused(true)}
          onBlur={() => setTimeout(() => setIsFocused(false), 200)} // slight delay so user can click search
          value={inputText}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setInputText(e.target.value)}
          type="text"
          placeholder="Search Amazon.in"
          className="bg-white text-black py-2 px-3 w-full outline-none"
        />
        <button
          type="submit"
          className="flex items-center hover:bg-yellow-500 cursor-pointer gap-1 text-sm bg-[#FEBD69] text-black p-2.5 rounded-r-sm"
        >
          <Search size={20} />
        </button>
      </form>
    </>
  );
}
