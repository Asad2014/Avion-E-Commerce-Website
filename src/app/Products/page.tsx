"use client";
import { useEffect, useState } from "react";
import Image from 'next/image';
import ProductListing from '../components/ProductListing';
import { client } from "@/sanity/lib/client";
import imageUrlBuilder from "@sanity/image-url";
import { FaCaretDown } from "react-icons/fa";


// Sanity image URL builder
const builder = imageUrlBuilder(client);
function urlFor(source: string) {
     return builder.image(source).url();
 }

interface Product {
  category: string;
  id: string;
  price: number;
  description: string;
  stockLevel: number;
  discountPercentage: number;
  isFeaturedProduct: boolean;
  name: string;
  image: string;
}

// Fetch products from Sanity
async function fetchProducts(): Promise<Product[]> {
    const query = `*[_type == "product"]{
      category,
      "id": _id,
      price,
      description,
      stockLevel,
      discountPercentage,
      isFeaturedProduct,
      name,
      "image": image.asset._ref
    }`;
    return await client.fetch(query);
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetchProducts().then(setProducts);
  }, []);

  return (
    <div>
      
      <div className="flex justify-between items-center w-full h-16 bg-white px-6 shadow-md">
  {/* Left Section */}
  <div className="hidden md:flex items-center gap-4">
    <button className="flex items-center px-4 py-2 gap-2 text-sm text-gray-800">
      <span>Category</span>
      <FaCaretDown size={16} className="text-gray-800" />
    </button>

    <button className="flex items-center px-4 py-2 gap-2 text-sm text-gray-800">
      <span>Product type</span>
      <FaCaretDown size={16} className="text-gray-800" />
    </button>

    <button className="flex items-center px-4 py-2 gap-2 text-sm text-gray-800">
      <span>Price</span>
      <FaCaretDown size={16} className="text-gray-800" />
    </button>

    <button className="flex items-center px-4 py-2 gap-2 text-sm text-gray-800">
      <span>Brand</span>
      <FaCaretDown size={16} className="text-gray-800" />
    </button>
  </div>

  {/* Right Section */}
  <div className="hidden md:flex items-center gap-4">
    <span className="text-md text-gray-800">Sorting by:</span>
    <button className="flex items-center px-4 py-2 gap-2 text-sm text-gray-800">
      <span>Date added</span>
      <FaCaretDown size={16} className="text-gray-800" />
    </button>
  </div>

  {/* Mobile View Toggle */}
  <div className="flex md:hidden">
    <button className="flex items-center px-4 py-2 gap-2 text-sm text-gray-800">
      <span>Sorting</span>
      <FaCaretDown size={16} className="text-gray-800" />
    </button>
    <button className="flex items-center px-4 py-2 gap-2 text-sm text-gray-800">
      <span>Filter</span>
      <FaCaretDown size={16} className="text-gray-800" />
    </button>
  </div>
</div>

        <div className="flex justify-center">
          <Image src="/frame.png" alt="frame" 
          width={1500}
          height={800}/>
          
        </div>

        
      {/* Product Listing Section */}
      <h1 className="text-center text-3xl font-semibold mt-20 mb-10">All Products</h1>
      <div className="max-w-[1180px] mx-auto">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-20">
        {products.map((product: Product) => (
          <ProductListing product={product} key={product.id} />
        ))}
      </div>
      </div>
      </div>
    
  );
}


