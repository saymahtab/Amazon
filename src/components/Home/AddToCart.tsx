"use client";

interface Product {
  id: number;
  title: string;
  price: number;
  thumbnail: string;
  rating: number;
  brand: string;
  category: string;
  availabilityStatus: string;
  discountPercentage: number;
}

interface CartItem extends Product {
  quantity: number;
}

export default function AddToCart({ product }: { product: Product }) {
  const handleClick = () => {
    const savedCartData = localStorage.getItem("cart");
    const existingCart = savedCartData ? JSON.parse(savedCartData) : [];

    const found = existingCart.find((item: CartItem) => item.id === product.id);

    if (found) {
      found.quantity += 1;
    } else {
      existingCart.push({ ...product, quantity: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(existingCart));

    alert("added to cart");
  };

  return (
    <div className="p-3 pt-2">
      <button
        onClick={handleClick}
        className="w-28 absolute bottom-2 right-2 cursor-pointer text-sm bg-yellow-400 hover:bg-yellow-500 transition-colors text-black font-medium py-1.5 rounded-full"
      >
        Add to Cart
      </button>
    </div>
  );
}
