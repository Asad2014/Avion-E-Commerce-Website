
// "use client";

// import { useState, useEffect } from "react";
// import { useRouter } from "next/navigation";

// const Checkout = () => {
//   interface CartItem {
//     name: string;
//     image: string;
//     price: number;
//     discount: number;
//     quantity: number;
//     totalPrice?: number;
//   }

//   const [cart, setCart] = useState<CartItem[]>([]);
//   const [orderPlaced, setOrderPlaced] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     contactNumber: "", // ✅ Added contact number field
//     address: "",
//     city: "",
//     postalCode: "",
//     country: "Pakistan",
//   });

//   const router = useRouter();

//   useEffect(() => {
//     const storedCart = JSON.parse(localStorage.getItem("cart") || "[]");
//     setCart(storedCart);
//   }, []);

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
//     const { name, value } = e.target;
//     setFormData((prevState) => ({
//       ...prevState,
//       [name]: value,
//     }));
//   };

//   // Update cart prices with discount
//   const updatedCart = cart.map((item) => ({
//     ...item,
//     totalPrice: Math.round(
//       (Number(item.price) || 0) * (1 - (Number(item.discount) || 0) / 100) * (Number(item.quantity) || 1)
//     ),
//   }));

//   const totalAmount = updatedCart.reduce((acc, item) => acc + (item.totalPrice || 0), 0);
//   const shippingCost = totalAmount > 500 ? 0 : 50;
//   const finalTotal = totalAmount + shippingCost;

//   // Handle Order Submission
//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setLoading(true);

//     const orderData = {
//       _type: "order",
//       name: formData.name,
//       email: formData.email,
//       contactNumber: formData.contactNumber, // ✅ Include in order data
//       address: formData.address,
//       city: formData.city,
//       postalCode: formData.postalCode,
//       country: formData.country,
//       cart: updatedCart,
//       totalAmount: finalTotal,
//       status: "pending",
//     };

//     try {
//       const response = await fetch(`/api/order`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(orderData),
//       });

//       const result = await response.json();
//       console.log("✅ Order Saved:", result);

//       if (result.success) {
//         setOrderPlaced(true);
//         localStorage.removeItem("cart");
//         setTimeout(() => {
//           router.push("/thankyou");
//         }, 2000);
//       } else {
//         throw new Error(result.message);
//       }
//     } catch (error) {
//       console.error("❌ Error saving order:", error);
//       alert("Something went wrong. Please try again!");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="bg-gray-50 min-h-screen max-w-[800px] mx-auto relative">
//       <div className="container mx-auto px-4 py-4">
//         <h1 className="text-[24px] md:text-[36px] font-semibold my-2 text-center">Checkout</h1>
//       </div>

//       <div className="container mx-auto">
//         <div className="bg-white shadow-md rounded-md p-4">
//           <h2 className="text-lg font-semibold mb-4">Billing Information</h2>
//           <form onSubmit={handleSubmit}>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
//               <div>
//                 <label htmlFor="name" className="block text-sm font-medium text-gray-700">Full Name</label>
//                 <input
//                   type="text"
//                   id="name"
//                   name="name"
//                   value={formData.name}
//                   onChange={handleChange}
//                   className="mt-2 p-3 border border-gray-300 rounded-md w-full"
//                   required
//                 />
//               </div>

//               <div>
//                 <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
//                 <input
//                   type="email"
//                   id="email"
//                   name="email"
//                   value={formData.email}
//                   onChange={handleChange}
//                   className="mt-2 p-3 border border-gray-300 rounded-md w-full"
//                   required
//                 />
//               </div>
//             </div>

//             {/* ✅ Contact Number Field */}
//             <div className="mb-4">
//               <label htmlFor="contactNumber" className="block text-sm font-medium text-gray-700">Contact Number</label>
//               <input
//                 type="text"
//                 id="contactNumber"
//                 name="contactNumber"
//                 value={formData.contactNumber}
//                 onChange={handleChange}
//                 className="mt-2 p-3 border border-gray-300 rounded-md w-full"
//                 required
//               />
//             </div>

//             <div>
//               <label htmlFor="address" className="block text-sm font-medium text-gray-700">Shipping Address</label>
//               <input
//                 type="text"
//                 id="address"
//                 name="address"
//                 value={formData.address}
//                 onChange={handleChange}
//                 className="mt-2 p-3 border border-gray-300 rounded-md w-full"
//                 required
//               />
//             </div>

//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
//               <div>
//                 <label htmlFor="city" className="block text-sm font-medium text-gray-700">City</label>
//                 <input
//                   type="text"
//                   id="city"
//                   name="city"
//                   value={formData.city}
//                   onChange={handleChange}
//                   className="mt-2 p-3 border border-gray-300 rounded-md w-full"
//                   required
//                 />
//               </div>

//               <div>
//                 <label htmlFor="postalCode" className="block text-sm font-medium text-gray-700">Postal Code</label>
//                 <input
//                   type="text"
//                   id="postalCode"
//                   name="postalCode"
//                   value={formData.postalCode}
//                   onChange={handleChange}
//                   className="mt-2 p-3 border border-gray-300 rounded-md w-full"
//                   required
//                 />
//               </div>
//             </div>

//             <div className="mt-4">
//               <label htmlFor="country" className="block text-sm font-medium text-gray-700">Country</label>
//               <select
//                 id="country"
//                 name="country"
//                 value={formData.country}
//                 onChange={handleChange}
//                 className="mt-2 p-3 border border-gray-300 rounded-md w-full"
//                 required
//               >
//                 <option value="Pakistan">Pakistan</option>
//                 <option value="USA">USA</option>
//                 <option value="UK">UK</option>
//               </select>
//             </div>

//             <div className="mt-6 flex justify-between">
//               <div>
//                 <p className="text-lg font-semibold">Total:</p>
//                 <p className="text-xl font-bold">$ {finalTotal}</p>
//               </div>
//               <button
//                 type="submit"
//                 className="bg-blue-600 text-white py-2 px-4 rounded-md"
//                 disabled={loading}
//               >
//                 {loading ? "Placing Order..." : "Place Order"}
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Checkout;




// "use client";

// import { useState, useEffect } from "react";
// import React from "react";
// import { loadStripe } from "@stripe/stripe-js";
// import { Elements, PaymentElement, useStripe, useElements } from "@stripe/react-stripe-js";
// import { useRouter } from "next/navigation";
// import { useCart, } from "../Context/CartContext";

// const stripeKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;

// if (!stripeKey) {
//   console.error("Stripe Publishable Key is missing.");
// }

// const stripePromise = stripeKey ? loadStripe(stripeKey) : null;

// // Checkout Form Component
// const CheckoutForm = ({ clientSecret }: { clientSecret: string }) => {
//   const stripe = useStripe();
//   const elements = useElements();
//   const [message, setMessage] = useState("");
//   const router = useRouter();

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!stripe || !elements) return;

//     const { error } = await stripe.confirmPayment({
//       elements,
//       confirmParams: { return_url: `http://localhost:3000/thank-you` },
//     });

//     if (error) {
//       setMessage(error.message || "Payment failed.");
//     } else {
//       router.push("/thank-you");
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit} className="space-y-4">
//       <PaymentElement />
//       <button type="submit" disabled={!stripe} className="w-full bg-blue-600 text-white py-2 rounded-md">
//         Pay Now
//       </button>
//       {message && <p className="text-red-500 text-sm">{message}</p>}
//     </form>
//   );
// };

// // Main PaymentForm Component
// const PaymentForm = () => {
//   const { state: { items } } = useCart();
//   const [clientSecret, setClientSecret] = useState("");
//   const [loading, setLoading] = useState(true);
//   const [isModalOpen, setIsModalOpen] = useState(false);

//   const closeModal = () => setIsModalOpen(false);

//   interface CartItem {
//     name: string;
//     quantity: number;
//     price: number;
//   }

//   const total: number = items.reduce((acc: number, item: CartItem) => acc + item.price * item.quantity, 0);

//   // Billing information state
//   const [customer, setCustomer] = useState({
//     name: "",
//     email: "",
//     phone: "",
//     address: "",
//     city: "",
//     country: "",
//     paymentMethod: "",
//   });

//   // Sample city options
//   const cities = ["Karachi", "Lahore", "Islamabad", "Peshawar", "Quetta", "Multan", "Faisalabad", "Rawalpindi", "Hyderabad", "Sialkot"];

//   // Handle input changes for billing info
//   const handleBillingChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
//     setCustomer({ ...customer, [e.target.name]: e.target.value });
//   };

//   // Fetch clientSecret from backend
//   useEffect(() => {
//     const fetchClientSecret = async () => {
//       try {
//         const response = await fetch("/api/create-payment-intent", {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({ amount: total }),
//         });

//         if (!response.ok) {
//           throw new Error(`HTTP error! Status: ${response.status}`);
//         }

//         const data = await response.json();
//         if (!data.clientSecret) throw new Error("Invalid response from server");

//         setClientSecret(data.clientSecret);
//       } catch (error) {
//         console.error("Error fetching payment intent:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchClientSecret();
//   }, [total]);

//   return (
//     <div>
     
//       <div className="flex flex-col lg:flex-row gap-8 p-4">
//         <div className="flex-1 bg-white p-6 rounded-md shadow-md">
//           <h1 className="text-3xl font-extrabold text-[#2A254B] mb-6">Billing Information</h1>
//           {/* Billing form */}
//           <form className="space-y-4">
//             <input type="text" name="name" value={customer.name} onChange={handleBillingChange} placeholder="Name" required />
//             <input type="email" name="email" value={customer.email} onChange={handleBillingChange} placeholder="Email" required />
//             <input type="text" name="phone" value={customer.phone} onChange={handleBillingChange} placeholder="Contact Number" required />
//             <input type="text" name="address" value={customer.address} onChange={handleBillingChange} placeholder="Address" required />
//             <select name="city" value={customer.city} onChange={handleBillingChange} required>
//               <option value="">Select City</option>
//               {cities.map((city) => (
//                 <option key={city} value={city}>{city}</option>
//               ))}
//             </select>
//             <input type="text" name="country" value={customer.country} onChange={handleBillingChange} placeholder="Country" required />
//           </form>
//         </div>

//         <div className="w-full md:w-[45%] p-6 rounded-xl bg-[#e9e5ff]">
//           <h1 className="text-2xl font-extrabold text-[#2A254B] mb-6">Order Summary</h1>
//           {items.map((item: { name: string; quantity: number; price: number }, index: number) => (
//             <div key={index} className="flex justify-between py-2 border-b">
//               <p className="text-sm font-medium text-gray-700">{item.name} x {item.quantity}</p>
//               <p className="text-sm font-semibold text-gray-700">£ {item.price * item.quantity}</p>
//             </div>
//           ))}
//           <div className="mt-4">
//             <p className="text-xl text-gray-600 font-bold">Total: £ {total}</p>
//           </div>

//           {loading ? (
//             <p className="text-center text-gray-600">Loading payment details...</p>
//           ) : clientSecret && stripePromise ? (
//             <Elements options={{ clientSecret }} stripe={stripePromise}>
//               <CheckoutForm clientSecret={clientSecret} />
//             </Elements>
//           ) : (
//             <p className="text-center text-red-500">Failed to load payment details.</p>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PaymentForm;



"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const Checkout = () => {
  interface CartItem {
    name: string;
    image: string;
    price: number;
    discount: number;
    quantity: number;
    totalPrice?: number;
  }

  const [cart, setCart] = useState<CartItem[]>([]);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [loading, setLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    contactNumber: "",
    address: "",
    city: "",
    postalCode: "",
    country: "Pakistan",
    cardHolder: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
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

  const updatedCart = cart.map((item) => ({
    ...item,
    totalPrice: Math.round(
      (Number(item.price) || 0) * (1 - (Number(item.discount) || 0) / 100) * (Number(item.quantity) || 1)
    ),
  }));

  const totalAmount = updatedCart.reduce((acc, item) => acc + (item.totalPrice || 0), 0);
  const shippingCost = totalAmount > 500 ? 0 : 50;
  const finalTotal = totalAmount + shippingCost;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const orderData = {
      _type: "order",
      ...formData,
      paymentMethod,
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
            <input type="text" name="name" placeholder="Full Name" value={formData.name} onChange={handleChange} className="mt-2 p-3 border border-gray-300 rounded-md w-full" required />
            <input type="email" name="email" placeholder="Email Address" value={formData.email} onChange={handleChange} className="mt-2 p-3 border border-gray-300 rounded-md w-full" required />
            <input type="text" name="contactNumber" placeholder="Contact Number" value={formData.contactNumber} onChange={handleChange} className="mt-2 p-3 border border-gray-300 rounded-md w-full" required />
            <input type="text" name="address" placeholder="Shipping Address" value={formData.address} onChange={handleChange} className="mt-2 p-3 border border-gray-300 rounded-md w-full" required />
            <input type="text" name="city" placeholder="City" value={formData.city} onChange={handleChange} className="mt-2 p-3 border border-gray-300 rounded-md w-full" required />
            <input type="text" name="postalCode" placeholder="Postal Code" value={formData.postalCode} onChange={handleChange} className="mt-2 p-3 border border-gray-300 rounded-md w-full" required />
            <select name="country" value={formData.country} onChange={handleChange} className="mt-2 p-3 border border-gray-300 rounded-md w-full" required>
              <option value="Pakistan">Pakistan</option>
              <option value="USA">USA</option>
              <option value="UK">UK</option>
            </select>
            <h2 className="text-lg font-semibold mt-4">Payment Method</h2>
            <select name="paymentMethod" value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)} className="mt-2 p-3 border border-gray-300 rounded-md w-full" required>
              <option value="cod">Cash on Delivery</option>
              <option value="card">Credit/Debit Card</option>
            </select>
            {paymentMethod === "card" && (
              <>
                <h2 className="text-lg font-semibold mt-4">Payment Information</h2>
                <input type="text" name="cardHolder" placeholder="Cardholder Name" value={formData.cardHolder} onChange={handleChange} className="mt-2 p-3 border border-gray-300 rounded-md w-full" required />
                <input type="text" name="cardNumber" placeholder="Card Number" value={formData.cardNumber} onChange={handleChange} className="mt-2 p-3 border border-gray-300 rounded-md w-full" required />
                <input type="text" name="expiryDate" placeholder="Expiry Date (MM/YY)" value={formData.expiryDate} onChange={handleChange} className="mt-2 p-3 border border-gray-300 rounded-md w-full" required />
                <input type="text" name="cvv" placeholder="CVV" value={formData.cvv} onChange={handleChange} className="mt-2 p-3 border border-gray-300 rounded-md w-full" required />
              </>
            )}
            <div className="mt-6 flex justify-between">
              <p className="text-lg font-semibold">Total: <span className="text-xl font-bold">$ {finalTotal}</span></p>
              <button type="submit" className="bg-blue-600 text-white py-2 px-4 rounded-md" disabled={loading}>{loading ? "Placing Order..." : "Place Order"}</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Checkout;

