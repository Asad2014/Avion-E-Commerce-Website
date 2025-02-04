
"use client";

import Link from "next/link";
import { useState } from "react";
import { IoSearch } from "react-icons/io5";
import { MdOutlineShoppingCart } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { IoMdMenu, IoMdClose } from "react-icons/io";

const Header = () => {
  const addCart = []; // Define addCart variable
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State to manage the hamburger menu

  return (
    <>
      {/* Header */}
      <header className="max-w-[1440px] mx-auto h-[66px] px-5 md:px-10 sticky top-0 bg-white shadow-md z-20 flex items-center justify-between">
        {/* Search Bar (Hidden on mobile) */}
        <div className="relative items-center hidden md:block">
          {isSearchOpen && (
            <input
              type="search"
              placeholder="Search..."
              className="absolute left-10 px-4 py-2 w-60 rounded-md border focus:ring-2 focus:ring-blue-500 transition-all"
            />
          )}
          <IoSearch className="text-xl cursor-pointer" onClick={() => setIsSearchOpen(!isSearchOpen)} />
        </div>

        {/* Logo */}
        <h1 className="text-[#22202E] text-2xl font-semibold clashDisplay md:ml-20 ml-0">
          <Link href="/">Avion</Link>
        </h1>

        {/* Profile, Cart & Hamburger Menu */}
        <div className="flex items-center gap-3">
          {/* Sign In Button (Visible on large screens) */}
          <Link
            href="/sign-in"
            className="hidden md:block bg-blue-600 text-white px-4 py-2 rounded-md text-sm hover:bg-blue-700 transition"
          >
            Sign In
          </Link>

          {/* Cart Icon */}
          <Link className="relative flex justify-center items-center cursor-pointer rounded-md p-2" href="/Cart">
            <MdOutlineShoppingCart size={25} />
            <span className="absolute -top-2 -right-2 flex justify-center items-center w-[18px] h-[18px] bg-blue-700 text-center rounded-full text-white font-bold text-[10px]">
              {addCart.length}
            </span>
          </Link>

          {/* Profile Icon */}
          <CgProfile className="text-xl cursor-pointer" size={25} />

          {/* Hamburger Menu for Mobile */}
          <button className="md:hidden text-2xl font-bold" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <IoMdClose /> : <IoMdMenu />}
          </button>
        </div>
      </header>

      {/* Navbar (Always visible below header on large screens) */}
      <nav className="hidden md:flex justify-center  py-4 text-[#726E8D] text-[18px]">
        <div className="flex gap-8">
          <Link href="/Products" className="hover:text-[#5a526c]">All Products</Link>
          <Link href="/about-us" className="hover:text-[#5a526c]">About Us</Link>
          <Link href="/category/ceramic" className="hover:text-[#5a526c]">Ceramics</Link>
          <Link href="/category/Tables" className="hover:text-[#5a526c]">Tables</Link>
          <Link href="/category/chairs" className="hover:text-[#5a526c]">Chairs</Link>
          <Link href="/category/tableware" className="hover:text-[#5a526c]">Tableware</Link>
          <Link href="/category/cutlery" className="hover:text-[#5a526c]">Cutlery</Link>
        </div>
      </nav>

      {/* Mobile Menu (Navbar + Sign In) */}
      {isMenuOpen && (
        <div className="absolute top-16 right-5 w-48 bg-white p-4 rounded-md shadow-lg md:hidden flex flex-col gap-3">
          <Link href="/sign-in" className="block  text-black px-2 py-2 rounded-md text-sm  hover:bg-blue-700 transition">
            Sign In
          </Link>
          <Link href="/Products" className="hover:text-[#5a526c]">All Products</Link>
          <Link href="/about-us" className="hover:text-[#5a526c]">About Us</Link>
          <Link href="/category/ceramic" className="hover:text-[#5a526c]">Ceramics</Link>
          <Link href="/category/Tables" className="hover:text-[#5a526c]">Tables</Link>
          <Link href="/category/chairs" className="hover:text-[#5a526c]">Chairs</Link>
          <Link href="/category/tableware" className="hover:text-[#5a526c]">Tableware</Link>
          <Link href="/category/cutlery" className="hover:text-[#5a526c]">Cutlery</Link>
        </div>
      )}
    </>
  );
};


export default Header;




