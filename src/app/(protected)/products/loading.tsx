export default function Loading() {
  return (
    <div className="px-2 py-2 sm:p-6 w-full">
      {/* Header Section Skeleton */}
      <div className="mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
          <div>
            <div className="h-8 bg-gray-200 rounded-lg w-48 animate-pulse mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-24 animate-pulse"></div>
          </div>

          {/* Sort Dropdown Skeleton */}
          <div className="flex items-center gap-2">
            <div className="h-4 bg-gray-200 rounded w-16 animate-pulse"></div>
            <div className="h-10 bg-gray-200 rounded-md w-40 animate-pulse"></div>
          </div>
        </div>

        {/* Breadcrumb Skeleton */}
        <div className="flex items-center gap-2">
          <div className="h-4 bg-gray-200 rounded w-12 animate-pulse"></div>
          <div className="h-4 bg-gray-200 rounded w-1 animate-pulse"></div>
          <div className="h-4 bg-gray-200 rounded w-20 animate-pulse"></div>
        </div>
      </div>

      {/* Products Grid Skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {Array.from({ length: 12 }).map((_, index) => (
          <div key={index} className="flex flex-col w-full h-[28rem] overflow-hidden bg-white border border-gray-200 relative animate-pulse">
            {/* Product Image Skeleton */}
            <div className="flex justify-center items-center h-[180px] bg-gray-100">
              <div className="w-32 h-32 bg-gray-200 rounded"></div>
            </div>
            
            {/* Product Details Skeleton */}
            <div className="flex flex-col items-start p-2 flex-1">
              {/* Title Skeleton */}
              <div className="h-6 bg-gray-200 rounded w-full mt-3 mb-2"></div>
              <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
              
              {/* Description Skeleton */}
              <div className="h-3 bg-gray-200 rounded w-full mt-1"></div>
              <div className="h-3 bg-gray-200 rounded w-2/3 mt-1"></div>
              
              {/* Price Skeleton */}
              <div className="flex items-center gap-2 mt-2">
                <div className="h-5 bg-gray-200 rounded w-16"></div>
                <div className="h-4 bg-gray-200 rounded w-12"></div>
              </div>
              
              {/* Rating Skeleton */}
              <div className="flex items-center gap-1 mt-1">
                <div className="h-4 bg-gray-200 rounded w-20"></div>
                <div className="h-4 bg-gray-200 rounded w-10"></div>
              </div>
              
              {/* Brand Skeleton */}
              <div className="h-3 bg-gray-200 rounded w-24 mt-1"></div>
              
              {/* Availability Skeleton */}
              <div className="h-3 bg-gray-200 rounded w-16 mt-1"></div>
            </div>
            
            {/* Add to Cart Button Skeleton */}
            <div className="absolute bottom-2 left-2 right-2">
              <div className="h-10 bg-gray-200 rounded-md w-full"></div>
            </div>
          </div>
        ))}
      </div>

      {/* Load More Button Skeleton */}
      <div className="flex justify-center mt-8">
        <div className="h-10 bg-gray-200 rounded-md w-40 animate-pulse"></div>
      </div>

      {/* Loading spinner with text */}
      <div className="flex flex-col items-center justify-center py-8">
        <div className="relative">
          <div className="w-8 h-8 border-3 border-gray-200 rounded-full animate-spin border-t-blue-600"></div>
        </div>
        <p className="mt-3 text-gray-600 font-medium text-sm">Loading products...</p>
      </div>
    </div>
  );
}