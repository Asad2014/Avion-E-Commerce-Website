
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const Checkout = () => {
  interface CartItem {
    price: number;
    discount: number;
    quantity: number;
    totalPrice?: number;
  }

  const [cart, setCart] = useState<CartItem[]>([]);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
    city: "",
    postalCode: "",
    country: "Pakistan",
  });

  const router = useRouter();

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart") || "[]");
    setCart(storedCart);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Update cart prices with discount
  const updatedCart = cart.map((item) => ({
    ...item,
    totalPrice: Math.round(
      (Number(item.price) || 0) * (1 - (Number(item.discount) || 0) / 100) * (Number(item.quantity) || 1)
    ),
  }));

  const totalAmount = updatedCart.reduce((acc, item) => acc + (item.totalPrice || 0), 0);
  const shippingCost = totalAmount > 500 ? 0 : 50;
  const finalTotal = totalAmount + shippingCost;

  // 🛒 Handle Order Submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const orderData = {
      _type: "order",
      name: formData.name,
      email: formData.email,
      address: formData.address,
      city: formData.city,
      postalCode: formData.postalCode,
      country: formData.country,
      cart: updatedCart,
      totalAmount: finalTotal,
      status: "pending",
    };

    try {
      const response = await fetch(`/api/order`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
      });

      const result = await response.json();
      console.log("✅ Order Saved:", result);

      if (result.success) {
        setOrderPlaced(true);
        localStorage.removeItem("cart");
        setTimeout(() => {
          router.push("/thankyou");
        }, 2000);
      } else {
        throw new Error(result.message);
      }
    } catch (error) {
      console.error("❌ Error saving order:", error);
      alert("Something went wrong. Please try again!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen max-w-[800px] mx-auto relative">
      <div className="container mx-auto px-4 py-4">
        <h1 className="text-[24px] md:text-[36px] font-semibold my-2 text-center">Checkout</h1>
      </div>

      <div className="container mx-auto">
        <div className="bg-white shadow-md rounded-md p-4">
          <h2 className="text-lg font-semibold mb-4">Billing Information</h2>
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">Full Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="mt-2 p-3 border border-gray-300 rounded-md w-full"
                  required
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="mt-2 p-3 border border-gray-300 rounded-md w-full"
                  required
                />
              </div>
            </div>

            <div>
              <label htmlFor="address" className="block text-sm font-medium text-gray-700">Shipping Address</label>
              <input
                type="text"
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                className="mt-2 p-3 border border-gray-300 rounded-md w-full"
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div>
                <label htmlFor="city" className="block text-sm font-medium text-gray-700">City</label>
                <input
                  type="text"
                  id="city"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  className="mt-2 p-3 border border-gray-300 rounded-md w-full"
                  required
                />
              </div>

              <div>
                <label htmlFor="postalCode" className="block text-sm font-medium text-gray-700">Postal Code</label>
                <input
                  type="text"
                  id="postalCode"
                  name="postalCode"
                  value={formData.postalCode}
                  onChange={handleChange}
                  className="mt-2 p-3 border border-gray-300 rounded-md w-full"
                  required
                />
              </div>
            </div>

            <div className="mt-4">
              <label htmlFor="country" className="block text-sm font-medium text-gray-700">Country</label>
              <select
                id="country"
                name="country"
                value={formData.country}
                onChange={handleChange}
                className="mt-2 p-3 border border-gray-300 rounded-md w-full"
                required
              >
                <option value="Pakistan">Pakistan</option>
                <option value="USA">USA</option>
                <option value="UK">UK</option>
              </select>
            </div>

            <div className="mt-6 flex justify-between">
              <div>
                <p className="text-lg font-semibold">Total:</p>
                <p className="text-xl font-bold">PKR {finalTotal}</p>
              </div>
              <button
                type="submit"
                className="bg-blue-600 text-white py-2 px-4 rounded-md"
                disabled={loading}
              >
                {loading ? "Placing Order..." : "Place Order"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Checkout;



