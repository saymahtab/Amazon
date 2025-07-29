import Card from "@/components/Home/Card";
import { notFound } from "next/navigation";

interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  brand: string;
  category: string;
  availabilityStatus: string;
  thumbnail: string;
}

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: {
    search?: string;
    min?: string;
    max?: string;
    category?: string;
  };
}) {
  let products: Product[] = [];
  try {
    const response = await fetch("http://dummyjson.com/products?limit=194");
    const data = await response.json();

    products = data?.products || [];
  } catch {
    notFound();
  }

  const { search, min, max, category } = searchParams;

  let filteredProducts = products;

  if (search) {
    filteredProducts = filteredProducts.filter(
      (product: Product) =>
        product.title.toLowerCase().includes(search.toLowerCase()) ||
        product.description.toLowerCase().includes(search.toLowerCase())
    );
  }

  if (min) {
    filteredProducts = filteredProducts.filter(
      (product: Product) => product.price > Number(min)
    );
  }
  if (max) {
    filteredProducts = filteredProducts.filter(
      (product: Product) => product.price < Number(max)
    );
  }
  if (category?.length) {
    const selectedCategories = category.split(","); // Convert string to array
    filteredProducts = filteredProducts.filter((product: Product) =>
      selectedCategories.includes(product.category)
    );
  }

  return (
    <div className="px-2 py-2 sm:p-6 w-full">
      {/* Header Section */}
      <div className="mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">
              All Products
            </h1>
            <p className="text-sm text-gray-600 mt-1">
              {products.length} results
            </p>
          </div>

          {/* Sort Dropdown */}
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">Sort by:</span>
            <select className="bg-white border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
              <option>Featured</option>
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
              <option>Customer Rating</option>
              <option>Newest Arrivals</option>
            </select>
          </div>
        </div>

        {/* Breadcrumb */}
        <nav className="text-sm text-gray-500">
          <span>Home</span>
          <span className="mx-2">›</span>
          <span className="text-gray-900">All Products</span>
        </nav>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filteredProducts.map((product: Product) => (
          <div key={product.id}>
            <Card product={product} />
          </div>
        ))}
      </div>

      {/* Load More Button */}
      <div className="flex justify-center mt-8">
        <button className="bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 font-medium py-2 px-6 rounded-md transition-colors duration-200">
          Load More Products
        </button>
      </div>
    </div>
  );
}
