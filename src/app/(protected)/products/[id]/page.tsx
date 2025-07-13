'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Star, StarHalf, Share2, Heart, Truck, Shield, CreditCard, Package } from 'lucide-react';
import { products } from '@/data/products';
import Link from 'next/link';

export default function ProductDetails({ params }: { params: { id: string } }) {
  const productId = parseInt(params.id);
  const product = products.find(p => p.id === productId);
  
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 });

  if (!product) {
    return (
      <div className="min-h-screen bg-[#E3E6E6] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-semibold text-gray-900 mb-2">Product Not Found</h1>
          <p className="text-gray-600">The product you're looking for doesn't exist.</p>
        </div>
      </div>
    );
  }

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setZoomPosition({ x, y });
  };

  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    
    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />);
    }
    
    if (hasHalfStar) {
      stars.push(<StarHalf key="half" className="w-4 h-4 fill-yellow-400 text-yellow-400" />);
    }
    
    const remainingStars = 5 - Math.ceil(rating);
    for (let i = 0; i < remainingStars; i++) {
      stars.push(<Star key={`empty-${i}`} className="w-4 h-4 text-gray-300" />);
    }
    
    return stars;
  };

  const originalPrice = product.price / (1 - product.discountPercentage / 100);

  return (
    <div className="min-h-screen bg-white ">
      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Breadcrumb */}
        <nav className="text-sm text-gray-600 mb-4">
          <Link href='/' className="hover:text-blue-600 cursor-pointer">Home</Link>
          <span className="mx-2">›</span>
          <Link href={`/products?category=${product.category}`} className="hover:text-blue-600 cursor-pointer capitalize">{product.category}</Link>
          <span className="mx-2">›</span>
          <span className="text-gray-900">{product.title}</span>
        </nav>

        <div className="bg-white rounded-lg">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 p-6">
            {/* Image Section */}
            <div className="lg:col-span-1">
              <div className="sticky top-6">
                {/* Thumbnail Images */}
                <div className="flex gap-2 mb-4 lg:mb-0 lg:mr-4 overflow-x-auto lg:overflow-visible">
                  {product.images?.map((image, index) => (
                    <div
                      key={index}
                      className={`flex-shrink-0 w-16 h-16 lg:w-12 lg:h-12 border-2 cursor-pointer rounded ${
                        selectedImage === index ? 'border-blue-500' : 'border-gray-200'
                      }`}
                      onClick={() => setSelectedImage(index)}
                    >
                      <Image
                        src={image}
                        alt={`${product.title} ${index + 1}`}
                        width={48}
                        height={48}
                        className="w-full h-full object-contain rounded"
                      />
                    </div>
                  ))}
                </div>

                {/* Main Image */}
                <div className="relative mt-1">
                  <div 
                    className="relative w-full h-96 lg:h-[500px] border border-gray-200 rounded cursor-crosshair overflow-hidden"
                    onMouseEnter={() => setIsZoomed(true)}
                    onMouseLeave={() => setIsZoomed(false)}
                    onMouseMove={handleMouseMove}
                  >
                    <Image
                      src={product.images?.[selectedImage] || product.thumbnail}
                      alt={product.title}
                      fill
                      className="object-contain"
                    />
                    
                    {/* Zoom Lens */}
                    {isZoomed && (
                      <div 
                        className="absolute w-32 h-32 border-2 border-gray-400 bg-white bg-opacity-50 pointer-events-none"
                        style={{
                          left: `${zoomPosition.x}%`,
                          top: `${zoomPosition.y}%`,
                          transform: 'translate(-50%, -50%)'
                        }}
                      />
                    )}
                  </div>

                  {/* Zoomed Image */}
                  {isZoomed && (
                    <div className="absolute left-full top-0 ml-4 w-96 h-96 border border-gray-200 rounded overflow-hidden bg-white z-10 hidden lg:block">
                      <div
                        className="w-full h-full"
                        style={{
                          backgroundImage: `url(${product.images?.[selectedImage] || product.thumbnail})`,
                          backgroundSize: '200%',
                          backgroundPosition: `${zoomPosition.x}% ${zoomPosition.y}%`,
                          backgroundRepeat: 'no-repeat'
                        }}
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Product Info Section */}
            <div className="lg:col-span-1">
              <div className="space-y-4">
                <div>
                  <h1 className="text-2xl font-normal text-gray-900 leading-tight">
                    {product.title}
                  </h1>
                  <p className="text-sm text-blue-600 mt-1 hover:underline cursor-pointer">
                    Visit the {product.brand} Store
                  </p>
                </div>

                {/* Rating */}
                <div className="flex items-center gap-2">
                  <div className="flex">
                    {renderStars(product.rating)}
                  </div>
                  <span className="text-sm text-blue-600 hover:underline cursor-pointer">
                    ({product.reviews?.length || 0} reviews)
                  </span>
                </div>

                {/* Prime Badge */}
                <div className="inline-block bg-blue-600 text-white px-3 py-1 text-sm font-medium rounded">
                  Prime Day Launch
                </div>

                {/* Price */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-red-600 font-medium">
                      -{Math.round(product.discountPercentage)}%
                    </span>
                    <span className="text-3xl font-normal text-gray-900">
                      ${product.price.toFixed(2)}
                    </span>
                  </div>
                  <div className="text-sm text-gray-600">
                    M.R.P.: <span className="line-through">${originalPrice.toFixed(2)}</span>
                  </div>
                  <p className="text-sm text-gray-600">Inclusive of all taxes</p>
                </div>

                {/* EMI Options */}
                <div className="space-y-2">
                  <p className="text-sm">
                    <span className="font-medium">EMI</span> starts at ${Math.round(product.price / 12)}. No Cost EMI available 
                    <span className="text-blue-600 hover:underline cursor-pointer ml-1">EMI options ▼</span>
                  </p>
                </div>

                {/* Offers */}
                <div className="border border-red-200 bg-red-50 p-3 rounded">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-6 h-6 bg-red-100 rounded-full flex items-center justify-center">
                      <span className="text-red-600 text-xs">%</span>
                    </div>
                    <span className="text-sm font-medium text-red-600">Save Extra with 5 offers</span>
                  </div>
                  
                  <div className="space-y-2 text-sm">
                    <div className="bg-white p-2 rounded border border-gray-200">
                      <span className="font-medium text-red-600">Bank Offer (2): </span>
                      <span>Prime Savings Additional Flat $25 Instant Discount on Credit Card EMI</span>
                      <span className="text-blue-600 hover:underline cursor-pointer ml-1">| See All</span>
                    </div>
                    
                    <div className="bg-white p-2 rounded border border-gray-200">
                      <span className="font-medium text-red-600">Cashback: </span>
                      <span>Get 5% back with Amazon Pay Credit Card for Prime members. 3% back for others.</span>
                      <span className="text-blue-600 hover:underline cursor-pointer ml-1">| Details</span>
                    </div>
                  </div>
                </div>

                {/* Product Details */}
                <div className="space-y-3 text-sm">
                  <div className="grid grid-cols-1 gap-2">
                    <div><span className="font-medium">Brand:</span> {product.brand}</div>
                    <div><span className="font-medium">Category:</span> {product.category}</div>
                    <div><span className="font-medium">SKU:</span> {product.sku}</div>
                    <div><span className="font-medium">Weight:</span> {product.weight} oz</div>
                    <div><span className="font-medium">Warranty:</span> {product.warrantyInformation}</div>
                    <div><span className="font-medium">Return Policy:</span> {product.returnPolicy}</div>
                  </div>
                </div>

                {/* Description */}
                <div className="space-y-2">
                  <h3 className="font-medium text-gray-900">About this item</h3>
                  <p className="text-sm text-gray-700">{product.description}</p>
                </div>
              </div>
            </div>

            {/* Purchase Section */}
            <div className="lg:col-span-1">
              <div className="bg-white border border-gray-200 rounded-lg p-4 sticky top-6">
                <div className="space-y-4">
                  <div className="text-3xl font-normal text-gray-900">
                    ${product.price.toFixed(2)}
                  </div>

                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <Truck className="w-4 h-4 text-blue-600" />
                      <span>Free Delivery</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Package className="w-4 h-4 text-blue-600" />
                      <span>10 days Service Centre Replacement</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Shield className="w-4 h-4 text-blue-600" />
                      <span>1 Year Warranty</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CreditCard className="w-4 h-4 text-blue-600" />
                      <span>Pay on Delivery</span>
                    </div>
                  </div>

                  <div className={`text-sm font-medium ${
                    product.availabilityStatus === 'In Stock' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {product.availabilityStatus}
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Quantity:</label>
                    <select 
                      value={quantity} 
                      onChange={(e) => setQuantity(parseInt(e.target.value))}
                      className="w-20 border border-gray-300 rounded px-2 py-1 text-sm"
                    >
                      {[...Array(10)].map((_, i) => (
                        <option key={i + 1} value={i + 1}>{i + 1}</option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-2">
                    <button className="w-full cursor-pointer bg-yellow-400 hover:bg-yellow-500 text-black font-medium py-2 px-4 rounded-full transition-colors">
                      Add to Cart
                    </button>
                    <button className="w-full cursor-pointer bg-orange-400 hover:bg-orange-500 text-black font-medium py-2 px-4 rounded-full transition-colors">
                      Buy Now
                    </button>
                  </div>

                  <div className="flex justify-center gap-4 text-sm text-blue-600">
                    <button className="flex items-center gap-1 hover:underline">
                      <Heart className="w-4 h-4" />
                      Add to Wish List
                    </button>
                    <button className="flex items-center gap-1 hover:underline">
                      <Share2 className="w-4 h-4" />
                      Share
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Reviews Section */}
          <div className="border-t border-gray-200 p-6">
            <h3 className="text-xl font-medium text-gray-900 mb-4">Customer Reviews</h3>
            <div className="space-y-4">
              {product.reviews?.map((review, index) => (
                <div key={index} className="border-b border-gray-200 pb-4">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="flex">
                      {renderStars(review.rating)}
                    </div>
                    <span className="font-medium text-gray-900">{review.reviewerName}</span>
                  </div>
                  <p className="text-sm text-gray-700">{review.comment}</p>
                  <p className="text-xs text-gray-500 mt-1">
                    {new Date(review.date).toLocaleDateString()}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}