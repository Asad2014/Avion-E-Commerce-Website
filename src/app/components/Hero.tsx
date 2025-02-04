
import Image from 'next/image';
import React from 'react';
import Link from 'next/link';

const Hero = () => {
  return (
    <main className="w-full flex flex-col lg:flex-row md:h-[584px] h-fit mx-auto px-10 mt-10">
      {/* Content Section */}
      <div className="md:h-[584px] lg:w-[calc(100%-520px)] bg-[#2A254B] flex flex-col justify-around items-start lg:pt-10 px-5 md:p-10 xl:p-0">
        {/* Title */}
        <div className="xl:w-[513px] flex flex-col gap-6 xl:ml-[60px] mb-10">
          <p className="text-xl md:text-3xl lg:text-4xl font-light leading-7 text-white tracking-wide mt-10 lg:mt-0">
            The furniture brand for the future, with timeless designs
          </p>
          <Link href="/products">
            <button className="hidden md:block w-[170px] h-[56px] bg-[#F9F9F926] text-white text-lg tracking-wider hover:bg-[#4a393978]">
              View collection
            </button>
          </Link>
        </div>

        {/* Description */}
        <div className="xl:w-[602px] w-full xl:ml-[60px]">
          <p className="text-lg md:text-xl text-white font-light leading-7 tracking-wider">
            A new era in eco-friendly furniture with Avion, the French luxury
            retail brand with elegant fonts, tasteful colors, and a modern way
            to display things digitally.
          </p>
          <Link href="/products">
            <button className="mt-10 mb-8 md:hidden w-full h-[56px] bg-[#F9F9F926] text-white text-lg tracking-wider hover:bg-[#4a393978]">
              View collection
            </button>
          </Link>
        </div>
      </div>

      {/* Image Section */}
      <div className="w-full lg:w-[520px] h-auto flex justify-center">
        <Image
          src="/main chiar.png" 
          alt="Modern Furniture Display"
          width={520}
          height={584}
          className="w-full h-auto object-cover"
        />
      </div>
    </main>
  );
};

export default Hero;
