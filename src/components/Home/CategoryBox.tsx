// components/CategoryBox.tsx
import { products } from "@/data/products";
import Image from "next/image";
import Link from "next/link";

export default function CategoryBox({
  title,
  category,
  bgColor,
}: {
  title: string;
  category: string;
  bgColor: string;
}) {


  const productsArray: any[] = products.filter((p) => p.category === category);

  return (
    <div className="flex flex-col gap-3 w-full sm:w-[48%] lg:w-[23%] justify-start bg-white p-4">
      <p className="font-semibold text-base md:text-lg lg:text-xl">{title}</p>
      <div className="flex flex-wrap gap-3 items-start">
        {productsArray.slice(0, 4).map((product) => (
          <Link href={`/products?category=${category}`} key={product.id} className="flex flex-col items-start cursor-pointer">
            <div className={`${bgColor} overflow-hidden`}>
              <Image
                height={120}
                width={120}
                className="w-[90px] h-[90px] sm:w-[110px] sm:h-[110px] md:w-[120px] md:h-[120px] lg:w-[145px] lg:h-[145px] object-contain"
                src={product.thumbnail}
                alt="product-image"
              />
            </div>
            <p className="text-xs font-medium mt-1">
              {product.title.split(" ")[0]}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
