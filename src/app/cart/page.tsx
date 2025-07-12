//@ts-nocheck
"use client"
import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Trash2, Plus, Minus, ShoppingCart, Star, Shield, Truck, ArrowRight } from "lucide-react"

export default function Cart() {
  const [cartItems, setCartItems] = useState([])
  const [totalPrice, setTotalPrice] = useState(0);
  const [savings, setSavings] = useState(0);

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(savedCart);
    
    const total = savedCart.reduce((sum, item) => sum + item.price * item.quantity, 0)
    const totalSavings = savedCart.reduce((sum, item) => {
      const originalPrice = item.price / (1 - item.discountPercentage / 100);
      return sum + ((originalPrice - item.price) * item.quantity);
    }, 0);
    
    setTotalPrice(total);
    setSavings(totalSavings);
  }, []);

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity <= 0) return;
    
    const updatedCart = cartItems.map(item => 
      item.id === id ? { ...item, quantity: newQuantity } : item
    );
    
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    
    const total = updatedCart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    setTotalPrice(total);
  };

  const removeItem = (id) => {
    const updatedCart = cartItems.filter(item => item.id !== id);
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    
    const total = updatedCart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    setTotalPrice(total);
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star 
        key={i} 
        className={`w-4 h-4 ${i < Math.floor(rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} 
      />
    ));
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-white text-black">
        <div className="max-w-7xl mx-auto px-4 py-8 border border-black/10">
          <div className="bg-white p-8 text-center">
            <ShoppingCart className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h2 className="text-2xl font-medium text-gray-900 mb-2">Your Amazon Cart is empty</h2>
            <p className="text-gray-600 mb-6">Your shopping cart is waiting. Give it purpose – fill it with groceries, clothing, household supplies, electronics, and more.</p>
            <Link href="/products" className="inline-block bg-yellow-400 hover:bg-yellow-500 text-black font-medium py-2 px-6 rounded-full transition-colors">
              Shop today's deals
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-black/80">
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Cart Items */}
          <div className="lg:col-span-2 border border-black/10">
            <div className="bg-white">
              <div className="p-6 border-b border-gray-200">
                <h1 className="text-2xl font-medium text-gray-900">Shopping Cart</h1>
                <p className="text-sm text-gray-600 mt-1">
                  {cartItems.length} {cartItems.length === 1 ? 'item' : 'items'}
                </p>
              </div>
              
              <div className="divide-y divide-gray-200">
                {cartItems.map((item) => (
                  <div key={item.id} className="p-6">
                    <div className="flex flex-col sm:flex-row gap-4">
                      {/* Product Image */}
                      <div className="flex-shrink-0">
                        <Link href={`/products/${item.id}`}>
                          <div className="w-32 h-32 bg-gray-50 rounded-lg overflow-hidden cursor-pointer">
                            <Image
                              src={item.thumbnail}
                              alt={item.title}
                              width={128}
                              height={128}
                              className="w-full h-full object-contain"
                            />
                          </div>
                        </Link>
                      </div>

                      {/* Product Details */}
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-col h-full">
                          <div className="flex-1">
                            <Link href={`/products/${item.id}`} className="text-lg font-medium text-gray-900 hover:text-blue-600 line-clamp-2">
                              {item.title}
                            </Link>
                            
                            <div className="flex items-center gap-2 mt-2">
                              <div className="flex">
                                {renderStars(item.rating)}
                              </div>
                              <span className="text-sm text-gray-600">({item.rating})</span>
                            </div>

                            <div className="mt-2 space-y-1 text-sm text-gray-600">
                              <p><span className="font-medium">Brand:</span> {item.brand}</p>
                              <p><span className="font-medium">Category:</span> {item.category}</p>
                              <p className={`font-medium ${item.availabilityStatus === 'In Stock' ? 'text-green-600' : 'text-red-600'}`}>
                                {item.availabilityStatus}
                              </p>
                            </div>

                            <div className="flex items-center gap-2 mt-2">
                              <Truck className="w-4 h-4 text-green-600" />
                              <span className="text-sm text-green-600">Free Delivery</span>
                            </div>
                          </div>

                          {/* Price and Actions */}
                          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mt-4">
                            <div className="flex items-center gap-4">
                              {/* Quantity Controls */}
                              <div className="flex items-center border border-gray-300 rounded">
                                <button
                                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                  disabled={item.quantity <= 1}
                                  className="p-2 hover:bg-gray-100 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                  <Minus className="w-4 h-4" />
                                </button>
                                <span className="px-4 py-2 border-x border-gray-300 min-w-[60px] text-center">
                                  {item.quantity}
                                </span>
                                <button
                                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                  className="p-2 hover:bg-gray-100 cursor-pointer"
                                >
                                  <Plus className="w-4 h-4" />
                                </button>
                              </div>

                              {/* Remove Button */}
                              <button
                                onClick={() => removeItem(item.id)}
                                className="flex items-center gap-1 cursor-pointer text-sm text-red-600 hover:text-red-700 hover:underline"
                              >
                                <Trash2 className="w-4 h-4" />
                                Remove
                              </button>
                            </div>

                            {/* Price */}
                            <div className="text-right">
                              <div className="text-xl font-medium text-gray-900">
                                ${(item.price * item.quantity).toFixed(2)}
                              </div>
                              <div className="text-sm text-gray-600">
                                ${item.price.toFixed(2)} each
                              </div>
                              {item.discountPercentage > 0 && (
                                <div className="text-sm text-red-600">
                                  {Math.round(item.discountPercentage)}% off
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Cart Actions */}
              <div className="p-6 border-t border-gray-200 bg-gray-50 ">
                <div className="flex flex-col sm:flex-row gap-4 justify-between items-center">
                  <Link href="/products" className="text-blue-600 hover:underline text-sm">
                    ← Continue Shopping
                  </Link>
                  <div className="text-right">
                    <div className="text-lg font-medium text-gray-900">
                      Subtotal ({cartItems.reduce((sum, item) => sum + item.quantity, 0)} items): 
                      <span className="text-xl ml-2">${totalPrice.toFixed(2)}</span>
                    </div>
                    {savings > 0 && (
                      <div className="text-sm text-green-600">
                        You saved ${savings.toFixed(2)}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white p-6 sticky top-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Order Summary</h2>
              
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span>Subtotal ({cartItems.reduce((sum, item) => sum + item.quantity, 0)} items):</span>
                  <span>${totalPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping:</span>
                  <span className="text-green-600">FREE</span>
                </div>
                {savings > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>Savings:</span>
                    <span>-${savings.toFixed(2)}</span>
                  </div>
                )}
                <div className="border-t border-gray-200 pt-3">
                  <div className="flex justify-between text-lg font-medium">
                    <span>Total:</span>
                    <span>${totalPrice.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              <button className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-medium py-3 px-4 rounded-full mt-6 transition-colors flex items-center justify-center gap-2">
                Proceed to Checkout
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="mt-4 space-y-2 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4 text-blue-600" />
                  <span>Secure checkout</span>
                </div>
                <div className="flex items-center gap-2">
                  <Truck className="w-4 h-4 text-blue-600" />
                  <span>Free delivery on orders over $35</span>
                </div>
              </div>

              {/* Recommended Products */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <h3 className="text-sm font-medium text-gray-900 mb-3">Customers also bought</h3>
                <div className="space-y-3">
                  {cartItems.slice(0, 2).map((item) => (
                    <div key={`rec-${item.id}`} className="flex gap-3 p-3 border border-gray-200 rounded hover:shadow-sm transition-shadow">
                      <div className="w-12 h-12 bg-gray-50 rounded overflow-hidden">
                        <Image
                          src={item.thumbnail}
                          alt={item.title}
                          width={48}
                          height={48}
                          className="w-full h-full object-contain"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 line-clamp-2">{item.title}</p>
                        <p className="text-sm text-gray-600">${item.price.toFixed(2)}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}