"use client";
import { useEffect, useState } from "react";
import { client } from "@/sanity/lib/client";
import imageUrlBuilder from "@sanity/image-url";
import Image from "next/image";
import Link from "next/link";

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
     
      
      <h1 className="text-4xl font-semibold mt-20 mb-8 text-center sm:text-left md:ml-12 ml-0">
       Our Popular Products
      </h1>

      <div className="max-w-[1250px] mx-auto">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {products.slice(5, 9).map((product: Product) => (
          <div key={product.id} className="flex flex-col items-center bg-gray-100 shadow-md rounded-lg overflow-hidden transition-transform transform hover:scale-105 hover:shadow-xl">
          <Link href={`/Product/${product.id}`}>
            <Image
              src={urlFor(product.image)} 
              alt={product.name}
              height={300}
              width={300}
              className="h-[250px] w-[250px] object-cover"
            />
          </Link>
          {/* Product Details */}
          <div className="p-4 text-center">
            {/* Product Name */}
            <p className="text-lg font-medium text-gray-800">{product.name}</p>
            {/* Product Price */}
            <h3 className="text-xl font-semibold text-gray-900 mt-2">${product.price}</h3>
          </div>
        </div>
      
        ))}
      </div>
    </div>
    </div>
  );
}