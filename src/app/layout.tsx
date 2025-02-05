
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer"; 
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; 
import { CartProvider } from "./Context/CartContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Avion",
  description: "E-commerce Website",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    
    <html lang="en">
      <body className={inter.className}>

      
          <CartProvider> 
            <Header /> 
            {children} 
            <Footer /> 
            <ToastContainer />
          </CartProvider>
      
      </body>
    </html>
    
  );
}
    


