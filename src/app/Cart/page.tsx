
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { MdLocalGroceryStore } from "react-icons/md";

const CartPage = () => {
  interface CartItem {
    id: number;
    name: string;
    price: number;
    discount: number;
    Quantity: number;
  }

  const [cart, setCart] = useState<CartItem[]>([]);

  // Load cart from localStorage on mount
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart") || "[]");
    
    // Ensure Quantity is always a valid number
    const updatedCart = storedCart.map((item: CartItem) => ({
      ...item,
      Quantity: Number(item.Quantity) || 1, // Default to 1 if NaN or invalid
    }));

    setCart(updatedCart);
  }, []);

  // Function to remove an item from cart
  const removeFromCart = (id: number) => {
    const updatedCart = cart.filter((item) => item.id !== id);
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  // Function to update quantity
  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity < 1) return; // Prevent setting quantity to 0 or negative

    const updatedCart = cart.map((item) =>
      item.id === id ? { ...item, Quantity: Number(newQuantity) } : item
    );
    
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  // Calculate total prices
  const updatedCart = cart.map((item) => ({
    ...item,
    totalPrice: Math.round(
      (Number(item.price) || 0) * (1 - (Number(item.discount) || 0) / 100) * (Number(item.Quantity) || 1)
    ),
  }));

  // Calculate total amount
  const totalAmount = updatedCart.reduce((acc, item) => acc + (item.totalPrice || 0), 0);

  // Shipping fee logic
  const shippingCost = totalAmount > 500 ? 0 : 50;

  // Final total
  const finalTotal = totalAmount + shippingCost;

  return (
    <div className="bg-gray-50 min-h-screen max-w-[800px] mx-auto">
      <div className="container mx-auto px-4 py-4">
        <p className="text-sm text-gray-600">
          <Link href="/" className="text-gray-800 hover:underline">Home</Link> / 
          <span className="text-gray-500"> Cart</span>
        </p>
        <h1 className="text-[24px] md:text-[36px] font-semibold my-2">Shopping Cart</h1>
      </div>

      <div className="container mx-auto">
        <div className="bg-white shadow-md rounded-md overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-100 text-gray-800 uppercase text-sm">
              <tr>
                <th className="py-4 px-2 sm:px-4 text-left">Product</th>
                <th className="py-4 px-2 sm:px-4 text-center">Price</th>
                <th className="py-4 px-2 sm:px-4 text-center">Quantity</th>
                <th className="py-4 px-2 sm:px-4 text-center">Delete</th>
              </tr>
            </thead>
            <tbody className="text-gray-600">
              {cart.length === 0 ? (
                <tr>
                  <td colSpan={4} className="text-center py-4">
                    <div className="flex justify-center items-center gap-x-4">
                      <MdLocalGroceryStore className="text-2xl text-blue-500" />
                      Cart Is Empty
                    </div>
                  </td>
                </tr>
              ) : (
                cart.map((item) => (
                  <tr key={item.id} className="border-b">
                    <td className="py-4 px-2 sm:px-4">{item.name}</td>
                    <td className="py-4 px-2 sm:px-4 text-center">${item.price}</td>
                    <td className="py-4 px-2 sm:px-4 text-center">
                      <div className="flex justify-center items-center gap-2">
                        <button
                          onClick={() => updateQuantity(item.id, Number(item.Quantity) - 1)}
                          className="bg-gray-200 rounded-full px-2 py-1"
                        >
                          -
                        </button>
                        <span>{item.Quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, Number(item.Quantity) + 1)}
                          className="bg-gray-200 rounded-full px-2 py-1"
                        >
                          +
                        </button>
                      </div>
                    </td>
                    <td className="py-4 px-2 sm:px-4 text-center">
                      <button 
                        onClick={() => removeFromCart(item.id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className="container mx-auto px-0 mt-8 flex flex-col lg:flex-row-reverse lg:justify-between">
        <div className="w-full lg:w-1/3 bg-white p-4 shadow-md rounded-md">
          <h2 className="text-lg font-medium mb-4">Cart Total</h2>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Subtotal:</span>
              <span>${totalAmount}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Shipping:</span>
              <span>${shippingCost}</span>
            </div>
            <div className="flex justify-between text-lg font-medium">
              <span>Total:</span>
              <span>${finalTotal}</span>
            </div>
          </div>


          <Link href="/Checkout">
          <button 
          disabled={cart.length === 0} 
         className="w-full mt-4 py-2 rounded-md bg-[#F9F9F9] text-[#2A254B] disabled:bg-gray-200 disabled:text-black hover:bg-[#2A254B] hover:text-white"
         >
         Go to checkout
        </button>
         </Link>

        </div>
      </div>
    </div>
  );
};

export default CartPage;



