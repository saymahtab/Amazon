//@ts-nocheck
"use client";

export default function AddToCart({ product }) {
  const handleClick = () => {
    const existingCart = JSON.parse(localStorage.getItem("cart")) || [];

    const found = existingCart.find((item) => item.id === product.id);

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
