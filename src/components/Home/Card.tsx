import Image from "next/image";
import Link from "next/link";
import AddToCart from "./AddToCart";

export default function Card({ product }: any) {
  return (
    <div className="flex flex-col w-full h-[28rem] overflow-hidden bg-white border border-gray-200 relative">
      <Link href={`/products/${product.id}`}>
        <div className="flex justify-center items-center h-[180px] bg-gray-50">
          <Image
            src={product.thumbnail}
            alt={product.title}
            width={160}
            height={160}
            className="object-contain max-h-full"
          />
        </div>
        <div className="flex flex-col items-start p-2">
          <h2 className="text-[1.4rem] font-medium text-gray-900 mt-3 line-clamp-2">
            {product.title}
          </h2>
          <p className="text-xs text-gray-600 mt-1 line-clamp-2">
            {product.description}
          </p>
          <div className="flex items-center gap-2 mt-2">
            <span className="text-lg font-bold text-green-700">
              ${product.price}
            </span>
            <span className="text-xs text-red-600 font-medium">
              -{product.discountPercentage}%
            </span>
          </div>
          <div className="flex items-center gap-1 mt-1 text-yellow-500 text-sm">
            {"★".repeat(Math.round(product.rating))}
            {"☆".repeat(5 - Math.round(product.rating))}
            <span className="text-gray-600 text-xs ml-1">
              ({product.rating})
            </span>
          </div>
          <p className="text-xs text-gray-600 mt-1">
            Brand: <span className="font-medium">{product.brand}</span>
          </p>
          <p
            className={`text-xs font-medium mt-1 ${
              product.availabilityStatus === "In Stock"
                ? "text-green-600"
                : "text-red-600"
            }`}
          >
            {product.availabilityStatus}
          </p>
        </div>
      </Link>
      
      <AddToCart product={product} />
    </div>
  );
}
