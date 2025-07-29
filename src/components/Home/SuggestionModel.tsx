import { categoryList } from "@/data/products";
import { ChevronDown } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";

export default function SuggestionModel() {
  const searchParams = useSearchParams();

  const category = searchParams.get("category");

  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState("All");

  useEffect(() => {
    if (!category) {
      setSelected("All");
    } else {
      const firstCategory = category.split(",")[0];
      setSelected(firstCategory);
    }
  }, [category]);
  const [width, setWidth] = useState(100); // initial width in px
  const containerRef = useRef(null);

  const router = useRouter();

  const handleSelect = (category: string) => {
    setSelected(category);
    setOpen(false);
    const query = `category=` + category;
    router.push(`/products?` + query);
  };

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Adjust width based on text length
  useEffect(() => {
    const span = document.createElement("span");
    span.style.visibility = "hidden";
    span.style.fontSize = "14px";
    span.style.padding = "8px";
    span.style.fontWeight = "500";
    span.style.whiteSpace = "nowrap";
    span.textContent = selected;
    document.body.appendChild(span);
    const newWidth = span.offsetWidth + 40; // some padding
    setWidth(Math.max(newWidth, 100));
    document.body.removeChild(span);
  }, [selected]);

  return (
    <div
      className="relative z-30 text-black/80"
      ref={containerRef}
      style={{ width }}
    >
      {/* Button */}
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex items-center justify-between text-xs bg-[#D4D4D4] text-black/60 hover:text-black/80 w-full h-full px-3 py-3 rounded-l-sm hover:bg-[#dfdfdf] cursor-pointer gap-1"
      >
        <span className="truncate">{selected}</span>
        <ChevronDown size={15} />
      </button>

      {/* Dropdown */}
      {open && (
        <ul className="absolute left-0 top-full min-w-full max-h-96 overflow-y-auto bg-white border border-gray-300 rounded-sm shadow-lg mt-1 text-sm z-50">
          {categoryList.map((cat, index) => (
            <li
              key={index}
              onClick={() => handleSelect(cat)}
              className="px-4 py-2 hover:bg-[#f3f3f3] cursor-pointer whitespace-nowrap"
            >
              {cat}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
