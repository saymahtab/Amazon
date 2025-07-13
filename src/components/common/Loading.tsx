export default function Loading() {
  return (
    <div className="flex flex-wrap items-start justify-center w-full gap-5 md:gap-6 relative">
      {/* Hero Slider Skeleton */}
      <div className="absolute flex justify-center items-center w-full overflow-hidden">
        {/* Left arrow skeleton */}
        <div className="absolute left-0 top-0 z-10">
          <div className="h-[230px] w-[50px] bg-gray-200 rounded-lg animate-pulse"></div>
        </div>

        {/* Image slider skeleton */}
        <div className="flex w-full items-center justify-center overflow-hidden relative h-[80vh]">
          <div className="w-full h-full bg-gray-200 animate-pulse"></div>
          
          {/* Bottom gradient fade skeleton */}
          <div className="absolute bottom-0 left-0 w-full h-60 bg-gradient-to-t from-gray-100 via-gray-50 to-transparent pointer-events-none" />
        </div>

        {/* Right arrow skeleton */}
        <div className="absolute right-0 top-0 z-10">
          <div className="h-[230px] w-[50px] bg-gray-200 rounded-lg animate-pulse"></div>
        </div>
      </div>

      {/* Category Boxes Skeleton */}
      <div className="flex flex-wrap items-start h-full justify-center w-full gap-5 pt-60 z-0">
        {Array.from({ length: 8 }).map((_, index) => (
          <div key={index} className="flex flex-col gap-3 w-full sm:w-[calc(50%-10px)] lg:w-[calc(25%-15px)] xl:w-[calc(25%-15px)] justify-start bg-white p-4 rounded-lg shadow-sm animate-pulse">
            {/* Category title skeleton */}
            <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
            
            {/* Products grid skeleton */}
            <div className="grid grid-cols-2 gap-2 sm:gap-3">
              {Array.from({ length: 4 }).map((_, productIndex) => (
                <div key={productIndex} className="flex flex-col items-center">
                  {/* Product image skeleton */}
                  <div className="bg-gray-200 rounded-lg p-2 w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 xl:w-32 xl:h-32 animate-pulse"></div>
                  
                  {/* Product name skeleton */}
                  <div className="h-3 bg-gray-200 rounded w-12 mt-2 animate-pulse"></div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Recommended Products Skeleton */}
      <div className="w-full flex flex-col items-start justify-center gap-4 px-1 sm:px-6 lg:px-8 pb-10 mt-10">
        <div className="flex items-center justify-between w-full">
          {/* Title skeleton */}
          <div className="h-8 bg-gray-200 rounded w-64 animate-pulse"></div>
          
          {/* Show all button skeleton */}
          <div className="h-6 bg-gray-200 rounded w-20 animate-pulse"></div>
        </div>

        {/* Horizontal scrollable container skeleton */}
        <div className="w-full relative">
          <div className="flex gap-2 overflow-x-auto pb-4">
            {Array.from({ length: 6 }).map((_, index) => (
              <div
                key={index}
                className="flex-none w-full sm:w-56 md:w-64 lg:w-72 snap-start"
              >
                <div className="flex flex-col w-full h-[28rem] overflow-hidden bg-white border border-gray-200 relative animate-pulse">
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
              </div>
            ))}
          </div>

          {/* Scroll indicators/gradient overlays skeleton */}
          <div className="absolute top-0 left-0 w-8 h-full bg-gradient-to-r from-white to-transparent pointer-events-none z-10"></div>
          <div className="absolute top-0 right-0 w-8 h-full bg-gradient-to-l from-white to-transparent pointer-events-none z-10"></div>
        </div>

        {/* Mobile scroll hint skeleton */}
        <div className="flex sm:hidden items-center gap-2 text-sm mt-2">
          <div className="w-4 h-4 bg-gray-200 rounded animate-pulse"></div>
          <div className="h-4 bg-gray-200 rounded w-40 animate-pulse"></div>
        </div>
      </div>

      {/* Loading spinner with text */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center justify-center z-20">
        <div className="relative">
          <div className="w-8 h-8 border-3 border-gray-200 rounded-full animate-spin border-t-blue-600"></div>
        </div>
        <p className="mt-3 text-gray-600 font-medium text-sm">Loading...</p>
      </div>
    </div>
  );
}