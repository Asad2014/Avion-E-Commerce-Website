

// "use client";

// import Image from "next/image";
// import { useState, useCallback } from "react";
// import { urlFor } from "@/sanity/lib/image";
// import { toast } from "react-toastify";

// interface Product {
//   id: number;
//   name: string;
//   description: string;
//   price: number;
//   imageUrl: string;
// }

// interface CartItem extends Product {
//   quantity: number;
// }

// const ProductDetail = ({ product }: { product: Product }) => {
//   const [quantity, setQuantity] = useState(1);

//   if (!product) {
//     return <p className="text-center text-red-500">Product not found!</p>;
//   }

//   const handleAddToCart = useCallback(() => {
//     const cart: CartItem[] = JSON.parse(localStorage.getItem("cart") || "[]");

//     const existingProductIndex = cart.findIndex((item) => item.id === product.id);

//     if (existingProductIndex !== -1) {
//       cart[existingProductIndex].quantity += quantity;
//     } else {
//       cart.push({ ...product, quantity });
//     }

//     // Update cart in localStorage
//     localStorage.setItem("cart", JSON.stringify(cart));

//     // Update cart count in localStorage for the header
//     localStorage.setItem("cartQuantity", JSON.stringify(cart.reduce((acc, item) => acc + item.quantity, 0)));

//     toast.success(`${product.name} successfully added to cart!`, {
//       position: "top-right",
//       autoClose: 2000,
//       hideProgressBar: false,
//       closeOnClick: true,
//       pauseOnHover: true,
//       draggable: true,
//       theme: "light",
//     });
//   }, [product, quantity]);

//   return (
//     <div className="flex flex-col md:flex-row items-center justify-center min-h-screen bg-gray-100 p-6">
//       {/* Left Side: Your Image */}
//       <div className="w-full md:w-1/3 flex justify-center">
//         <Image
//           src={urlFor(product.imageUrl).url()} // Replace this with your actual image URL
//           alt="Your Image"
//           width={350}
//           height={300}
//           className=" border-4  shadow-lg"
//         />
//       </div>

//       {/* Right Side: Product Details */}
//       <div className="w-full md:w-2/3 bg-white p-6 rounded-lg shadow-lg">
//         <h1 className="text-3xl font-bold text-black">{product.name}</h1>
//         <p className="text-black mt-5">{product.description}</p>
//         <div className="ml-4 mt-5">
//           <ul className="list-disc space-y-1">
//             <li>Premium material</li>
//             <li>Handmade upholstery</li>
//             <li>Quality timeless classic</li>
//           </ul>
//         </div>
//         <p className="text-2xl font-semibold text-gray-900 mt-5">${product.price}</p>

//         {/* Quantity Controls */}
//         <div className="mt-4 flex items-center gap-4">
//           <button
//             aria-label="Decrease quantity"
//             onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
//             className="px-4 py-2 bg-gray-300 text-lg font-bold rounded-full"
//           >
//             -
//           </button>
//           <span className="text-lg font-semibold">{quantity}</span>
//           <button
//             aria-label="Increase quantity"
//             onClick={() => setQuantity((prev) => prev + 1)}
//             className="px-4 py-2 bg-gray-300 text-lg font-bold rounded-full"
//           >
//             +
//           </button>
//         </div>

//         {/* Add to Cart Button */}
//         <button
//           onClick={handleAddToCart}
//           className="mt-6 px-6 py-3 bg-blue-600 text-white text-lg font-semibold rounded-lg hover:bg-blue-700 shadow-md transition"
//         >
//           Add to Cart
//         </button>
//       </div>
//     </div>
//   );
// };

// export default ProductDetail;


"use client";

import Image from "next/image";
import { useState, useCallback } from "react";
import { urlFor } from "@/sanity/lib/image";
import { toast } from "react-toastify";

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

const ProductDetail = ({ product }: { product: Product }) => {
  const [quantity, setQuantity] = useState(1);

  // ✅ Ensure useCallback is always called at the top level
  const handleAddToCart = useCallback(() => {
    if (!product) return;

    const cart: CartItem[] = JSON.parse(localStorage.getItem("cart") || "[]");

    const existingProductIndex = cart.findIndex((item) => item.id === product.id);

    if (existingProductIndex !== -1) {
      cart[existingProductIndex].quantity += quantity;
    } else {
      cart.push({ ...product, quantity });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    localStorage.setItem("cartQuantity", JSON.stringify(cart.reduce((acc, item) => acc + item.quantity, 0)));

    toast.success(`${product.name} successfully added to cart!`, {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: "light",
    });
  }, [product, quantity]);

  // ✅ Early return comes after hooks are defined
  if (!product) {
    return <p className="text-center text-red-500">Product not found!</p>;
  }

  return (
    <div className="flex flex-col md:flex-row items-center justify-center min-h-screen bg-gray-100 p-6">
      <div className="w-full md:w-1/3 flex justify-center">
        <Image
          src={urlFor(product.imageUrl).url()}
          alt={product.name}
          width={350}
          height={300}
          className="border-4 shadow-lg"
        />
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
            aria-label="Decrease quantity"
            onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
            className="px-4 py-2 bg-gray-300 text-lg font-bold rounded-full"
          >
            -
          </button>
          <span className="text-lg font-semibold">{quantity}</span>
          <button
            aria-label="Increase quantity"
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
