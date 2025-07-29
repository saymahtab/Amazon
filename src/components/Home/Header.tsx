import { ShoppingCart } from "lucide-react";
import Image from "next/image";
import Navbar from "../Home/Navbar";
import SearchBar from "../Home/SearchBar";
import Link from "next/link";

export default function Header() {
  return (
    <>
      <header className="bg-[#131921] flex items-center justify-between p-1.5">
        {/* amazon logo  */}
        <Link href='/' className="py-1 px-2 hover:scale-[100.1%] border border-transparent cursor-pointer hover:border-white rounded-sm">
          <Image
            src="/merazon.png"
            alt="Amazon Logo"
            height={110}
            width={110}
          />
        </Link>
        {/* search bar  */}
        <SearchBar />

        {/* buttons  */}
        <div className="flex items-center justify-center gap-2">
          <Link href='/login' className="flex items-end text-sm font-semibold gap-0.5 border border-transparent hover:border-white px-3 py-3 rounded-sm cursor-pointer hover:scale-[101%]">
            Login
          </Link>
          <Link href='/orders' className="flex flex-col hover:scale-[102%] items-start text-sm border border-transparent hover:border-white px-3 py-2 rounded-sm cursor-pointer ">
            <span className="font-extralight text-xs">Returns</span>
            <p className="font-semibold text-md leading-4">& Orders</p>
          </Link>
          <Link href='/cart' className="flex items-end text-sm font-semibold gap-0.5 border border-transparent hover:border-white px-3 py-2 rounded-sm cursor-pointer hover:scale-[101%]">
            <ShoppingCart size={33} />
            Cart
          </Link>
        </div>
      </header>
      <Navbar />
    </>
  );
}
