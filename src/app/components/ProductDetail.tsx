

"use client";

import Image from "next/image";
import { useState } from "react";
import { urlFor } from "@/sanity/lib/image";
import { toast } from "react-toastify";
import { useCart } from "../Context/CartContext";
import { FC } from "react";

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
}

interface CartItem extends Product {
  quantity: number;
}

const ProductDetail: FC<{ product: Product }> = ({ product }) => {
  const [quantity, setQuantity] = useState(1);
  const cartContext = useCart();
  
  if (!cartContext) {
    return <p className="text-center text-red-500">Cart context not found!</p>;
  }

  const { addToCart } = cartContext;

  const handleAddToCart = () => {
    const cartItem: CartItem = { ...product, quantity }; // ✅ Ensure quantity is added
    addToCart(cartItem, quantity);
    
    toast.success(`${product.name} successfully added to cart!`, {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: "light",
    });
  };

  if (!product) {
    return <p className="text-center text-red-500">Product not found!</p>;
  }

  return (
    <div className="flex flex-col md:flex-row items-center justify-center min-h-screen bg-gray-100 p-6">
      <div className="w-full md:w-1/3 flex justify-center">
        <Image src={urlFor(product.imageUrl).url()} alt={product.name} width={350} height={300} className="border-4 shadow-lg" />
      </div>

      <div className="w-full md:w-2/3 bg-white p-6 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-black">{product.name}</h1>
        <p className="text-black mt-5">{product.description}</p>
        <div className="ml-4 mt-5">
          <ul className="list-disc space-y-1">
            <li>Premium material</li>
            <li>Handmade upholstery</li>
            <li>Quality timeless classic</li>
          </ul>
        </div>
        <p className="text-2xl font-semibold text-gray-900 mt-5">${product.price}</p>

        {/* Quantity Controls */}
        <div className="mt-4 flex items-center gap-4">
          <button
            onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
            className="px-4 py-2 bg-gray-300 text-lg font-bold rounded-full"
          >
            -
          </button>
          <span className="text-lg font-semibold">{quantity}</span>
          <button
            onClick={() => setQuantity((prev) => prev + 1)}
            className="px-4 py-2 bg-gray-300 text-lg font-bold rounded-full"
          >
            +
          </button>
        </div>

        {/* Add to Cart Button */}
        <button
          onClick={handleAddToCart}
          className="mt-6 px-6 py-3 bg-blue-600 text-white text-lg font-semibold rounded-lg hover:bg-blue-700 shadow-md transition"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductDetail;
