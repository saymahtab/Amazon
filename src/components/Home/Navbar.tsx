// components/Navbar.tsx
import { Menu } from "lucide-react";
import Link from "next/link";

const navItems = [
  "All",
  "Fresh",
  "MX Player",
  "Sell",
  "Bestsellers",
  "Today's Deals",
  "Mobiles",
  "Prime",
  "Customer Service",
  "New Releases",
  "Fashion",
  "Amazon Pay",
  "Electronics",
  "Home & Kitchen",
  "Computers",
  "Books",
  "Car & Motorbike"
];

export default function Navbar() {
  return (
    <nav className="bg-[#232f3e] text-white text-sm">
      <div className="flex items-center overflow-x-auto scrollbar-hide whitespace-nowrap px-2 gap-1.5">
        {navItems.map((item, idx) => (
          <Link
            href='/products'
            key={idx}
            className="flex items-center gap-1 px-2 hover:scale-[101%] py-2 cursor-pointer border border-transparent hover:border-white rounded-sm"
          >
            {item === "All" && <Menu size={18} />}
            <span className={`${item === "All" ? "font-medium" : ""}`}>{item}</span>
          </Link>
        ))}
      </div>
    </nav>
  );
}
