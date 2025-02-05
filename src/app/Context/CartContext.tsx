

"use client";
import { createContext, useContext, useState, useEffect } from "react";

// Cart Item Type
interface CartItem {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  quantity: number;
}

// Cart Context Type
interface CartContextType {
  cart: CartItem[];
  cartQuantity: number;
  addToCart: (product: CartItem, quantity: number) => void;
  removeFromCart: (id: number) => void;
  clearCart: () => void;  // ✅ Order place hone ke baad cart clear karne ke liye
}

// Creating Context
const CartContext = createContext<CartContextType | undefined>(undefined);

// Custom Hook to use Cart Context
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};

// Cart Provider Component
export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartQuantity, setCartQuantity] = useState(0);

  // ✅ Load Cart from localStorage when component mounts
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart") || "[]");
    setCart(storedCart);
    setCartQuantity(storedCart.reduce((acc: number, item: CartItem) => acc + item.quantity, 0));
  }, []);

  // ✅ Function to Add Item to Cart
  const addToCart = (product: CartItem, quantity: number) => {
    const updatedCart = [...cart];
    const existingProductIndex = updatedCart.findIndex((item) => item.id === product.id);

    if (existingProductIndex !== -1) {
      updatedCart[existingProductIndex].quantity += quantity;
    } else {
      updatedCart.push({ ...product, quantity });
    }

    setCart(updatedCart);
    setCartQuantity(updatedCart.reduce((acc, item) => acc + item.quantity, 0));
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  // ✅ Function to Remove Item from Cart
  const removeFromCart = (id: number) => {
    const updatedCart = cart.filter((item) => item.id !== id);
    setCart(updatedCart);
    setCartQuantity(updatedCart.reduce((acc, item) => acc + item.quantity, 0));
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  // ✅ Function to Clear Cart (for order success)
  const clearCart = () => {
    setCart([]);
    setCartQuantity(0);
    localStorage.removeItem("cart");
  };

  return (
    <CartContext.Provider value={{ cart, cartQuantity, addToCart, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};
