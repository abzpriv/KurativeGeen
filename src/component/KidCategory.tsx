'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import dailyPinkImage from '../assets/ImageDailyPink.png';
import familyImage from '../assets/ImageFamily.png';
import KidImage from '../assets/KidImage.jpg';
import Footer from './Footer';
import Navbar from './Navbar';
import { StaticImageData } from 'next/image';
import Link from 'next/link';
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import KidSupplement from '../assets/KidSupplement.jpg';
import KidSupplement2 from '../assets/KidSupplement2.jpg';
import KidSupplement3 from '../assets/KidSupplement3.jpg';


type Product = {
  id: number;
  name: string;
  price: string;
  image: StaticImageData;
  quantity: number; 
};

const products = [
  { id: 1, image: familyImage, name: 'Xtreme', price: '1500 PKR', quantity: 1, tablets: 10 },
  { id: 2, image: dailyPinkImage, name: 'Daily Pink', price: '1500 PKR', quantity: 1, tablets: 30 },
  { id: 3, image: familyImage, name: 'Xtreme', price: '1500 PKR', quantity: 1, tablets: 10 },
  { id: 4, image: dailyPinkImage, name: 'Daily Pink', price: '1500 PKR', quantity: 1, tablets: 30 },
  { id: 5, image: familyImage, name: 'Xtreme', price: '1500 PKR', quantity: 1, tablets: 10 },
];

const moreProducts = [
  { id: 6, image: dailyPinkImage, name: 'Daily Pink', price: '1500 PKR', quantity: 1, tablets: 30 },
  { id: 7, image: familyImage, name: 'Xtreme', price: '1500 PKR', quantity: 1, tablets: 10 },
  { id: 8, image: dailyPinkImage, name: 'Daily Pink', price: '1500 PKR', quantity: 1, tablets: 30 },
  { id: 9, image: familyImage, name: 'Xtreme', price: '1500 PKR', quantity: 1, tablets: 10 },
  { id: 10, image: dailyPinkImage, name: 'Daily Pink', price: '1500 PKR', quantity: 1, tablets: 30 },
  { id: 11, image: familyImage, name: 'Xtreme', price: '1500 PKR', quantity: 1, tablets: 10 },
  { id: 12, image: dailyPinkImage, name: 'Daily Pink', price: '1500 PKR', quantity: 1, tablets: 30 },
  { id: 13, image: familyImage, name: 'Xtreme', price: '1500 PKR', quantity: 1, tablets: 10 },
  { id: 14, image: dailyPinkImage, name: 'Daily Pink', price: '1500 PKR', quantity: 1, tablets: 30 },
  { id: 15, image: familyImage, name: 'Xtreme', price: '1500 PKR', quantity: 1, tablets: 10 },
];

const KidCategory = () => {
  const [cart, setCart] = useState<Product[]>([]);
  const [currentProductIndex, setCurrentProductIndex] = useState(0);

  const handleNextProduct = () => {
    setCurrentProductIndex((prevIndex) =>
      prevIndex === moreProducts.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handlePrevProduct = () => {
    setCurrentProductIndex((prevIndex) =>
      prevIndex === 0 ? moreProducts.length - 1 : prevIndex - 1
    );
  };



      const handleAddToCart = (product: Product) => {
  const existingProductIndex = cart.findIndex(item => item.id === product.id);
  
  if (existingProductIndex !== -1) {
    const updatedCart = [...cart];
    updatedCart[existingProductIndex].quantity += 1;
    setCart(updatedCart);
  } else {
    setCart((prevCart) => [...prevCart, { ...product, quantity: 1 }]);
  }
};

  return (
    <section className="bg-white">
      <section>
        <Navbar cart={cart} setCart={setCart} />
      </section>

      {/* Full-width image */}
      <div className="w-full h-[500px] lg:mt-36 mt-16 relative">
        <Image
          src={KidImage}
          alt="Women's Category"
          layout="fill"
          objectFit="cover"
          className="rounded-b-3xl shadow-lg"
        />
      </div>
     <section className="bg-white mt-10">
  <div className="container mx-auto text-center">
    <h2 className="lg:text-4xl text-2xl font-bold text-green-700 mb-4">
      Boost Your Health with Fun Supplements!
     </h2>
     <p className="lg:text-lg text-sm text-gray-700 mb-8 max-w-5xl mx-auto">
      Keep your body strong and healthy with our yummy multivitamins made just for kids! From giving you energy to helping you feel your best, our supplements are designed to support you as you grow and play. Discover the perfect mix to make your health journey exciting today!
       </p>

  </div>
</section>



      {/* Best Seller Section */}
      <section className="bg-white py-16 ">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold text-green-700 mb-12">Best Sellers</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-8 px-4">
            {products.map((product) => (
              <div key={product.id} className="bg-white p-6 rounded-3xl shadow-lg ">
                <Image 
                  src={product.image} 
                  alt={product.name} 
                  width={200} 
                  height={200} 
                  className="rounded-lg mx-auto mb-6"
                />
                <h3 className="text-xl font-semibold text-green-700">{product.name}</h3>
                <p className="text-lg text-green-900">Price: {product.price}</p>
                <p className="text-sm text-gray-500 mb-4">Tablets: {product.tablets}</p>
                <button 
                  className="mt-4 px-8 py-3 sm:px-4 sm:py-2 md:px-6 md:py-3 bg-green-800 text-white text-lg sm:text-sm md:text-base font-bold rounded-full hover:bg-green-600 hover:scale-105 transition-all duration-300 ease-in-out shadow-lg"
                  onClick={() => handleAddToCart(product)}
                >
                  Buy Now
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Additional 12 Product Cards Section */}
<section className="bg-white py-16">
      <div className="container mx-auto text-center">
        <h2 className="text-4xl font-bold text-green-700 mb-12">More Products</h2>

        {/* Mobile Layout */}
        <div className="sm:hidden relative flex items-center justify-center">
          {/* Left Button */}
          <button
            onClick={handlePrevProduct}
            className="absolute left-0 bg-green-700 text-white p-2 rounded-full z-10 hover:bg-green-900"
          >
            <FaChevronLeft size={20} />
          </button>

          <div
            className="relative group bg-gradient-to-br from-gray-100 to-white p-8 rounded-3xl shadow-2xl"
          >
            {/* Hover effect */}
            <div className="absolute inset-0 bg-green-100 opacity-0 transition-opacity duration-500 group-hover:opacity-20 rounded-3xl"></div>

            {/* Image with Link */}
            <Link href={`/products/${moreProducts[currentProductIndex].id}`} passHref>
              <div className="relative mb-6 cursor-pointer">
                <Image
                  src={moreProducts[currentProductIndex].image}
                  alt={moreProducts[currentProductIndex].name}
                  width={250}
                  height={250}
                  className="rounded-lg mx-auto shadow-lg group-hover:scale-105 transition-transform duration-500"
                />
              </div>
            </Link>

            {/* Product Name */}
            <h3 className="text-2xl font-semibold text-green-700 transition-all duration-300 group-hover:text-green-900">
              {moreProducts[currentProductIndex].name}
            </h3>

            <p className="text-lg text-green-900 font-medium mt-2 mb-4 transition-colors duration-300 group-hover:text-green-700">
              Price: {moreProducts[currentProductIndex].price}
            </p>

            <p className="text-md text-gray-600 group-hover:text-gray-500 transition-colors duration-300">
              Tablets: {moreProducts[currentProductIndex].tablets}
            </p>
          </div>

          {/* Right Button */}
          <button
            onClick={handleNextProduct}
            className="absolute right-0 bg-green-700 text-white p-2 rounded-full z-10 hover:bg-green-900"
          >
            <FaChevronRight size={20} />
          </button>
        </div>

        {/* Desktop Layout */}
        <div className="hidden sm:grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-8 px-4">
          {moreProducts.map((product) => (
            <div
              key={product.id}
              className="relative group bg-gradient-to-br from-gray-100 to-white p-8 rounded-3xl shadow-2xl hover:shadow-[0_10px_40px_rgba(0,0,0,0.2)]"
            >
              {/* Hover effect */}
              <div className="absolute inset-0 bg-green-100 opacity-0 transition-opacity duration-500 group-hover:opacity-20 rounded-3xl"></div>

              {/* Image with Link */}
              <Link href={`/products/${product.id}`} passHref>
                <div className="relative mb-6 cursor-pointer">
                  <Image
                    src={product.image}
                    alt={product.name}
                    width={250}
                    height={250}
                    className="rounded-lg mx-auto shadow-lg group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
              </Link>

              {/* Product Name */}
              <h3 className="text-2xl font-semibold text-green-700 transition-all duration-300 group-hover:text-green-900">
                {product.name}
              </h3>

              <p className="text-lg text-green-900 font-medium mt-2 mb-4 transition-colors duration-300 group-hover:text-green-700">
                Price: {product.price}
              </p>

              <p className="text-md text-gray-600 group-hover:text-gray-500 transition-colors duration-300">
                Tablets: {product.tablets}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
    <section className="py-16 bg-white">
  <div className="container mx-auto px-4">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
      {/* First Block: Kids' Health Supplements */}
      <div className="relative">
        <Image
          src={KidSupplement}
          alt="Kids' Health Supplements"
          className="w-full h-full object-cover rounded-lg shadow-lg"
        />
      </div>
      <div className="flex flex-col justify-center">
        <h2 className="text-3xl font-bold text-green-800 mb-4">Kid`s Health Supplements</h2>
        <p className="text-gray-600 mb-4">
          Our kids supplements are specially formulated to support healthy growth, immune strength, and brain development.
        </p>
        <p className="text-gray-500">
          Ensure your children get the essential vitamins and minerals they need to thrive, with safe and effective formulas.
        </p>
      </div>
    </div>

    {/* Second Block: Nutritional Solutions for Active Kids */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
      <div className="flex flex-col justify-center">
        <h2 className="text-3xl font-bold text-green-800 mb-4">Nutritional Solutions for Active Kid`s</h2>
        <p className="text-gray-600 mb-4">
          Our supplements are perfect for kids with active lifestyles, helping them maintain energy and focus throughout the day.
        </p>
        <p className="text-gray-500">
          Packed with nutrients to support physical activities and mental sharpness, they help kids perform at their best.
        </p>
      </div>
      <div className="relative">
        <Image
          src={KidSupplement2}
          alt="Active Kids' Nutritional Solutions"
          className="w-full h-full object-cover rounded-lg shadow-lg"
        />
      </div>
    </div>

    {/* Third Block: Building Healthy Habits */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div className="relative">
        <Image 
          src={KidSupplement3}
          alt="Building Healthy Habits for Kids"
          className="w-full h-full object-cover rounded-lg shadow-lg"
        />
      </div>
      <div className="flex flex-col justify-center">
        <h2 className="text-3xl font-bold text-green-800 mb-4">Building Healthy Habits for Kid`s</h2>
        <p className="text-gray-600 mb-4">
          Join a community of parents and caregivers committed to raising healthy, active kids. 
        </p>
        <p className="text-gray-500">
          Share tips, support each other, and help your children develop lifelong habits that promote wellness.
        </p>
      </div>
    </div>
  </div>
</section>

    <section className=" py-16">
  <div className="container mx-auto text-center">
    <h2 className="text-3xl font-bold text-green-800 mb-6">Why Choose Our Supplements?</h2>
    <p className="text-lg text-gray-600 mb-8">
      Our supplements are crafted with your health in mind. Experience the benefits of our specially formulated products designed for womens unique needs.
    </p>
    
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
      <div className="bg-white p-6 rounded-lg shadow-lg ">
        <h3 className="text-xl font-semibold text-green-700 mb-4">High Quality Ingredients</h3>
        <p className="text-gray-600">
          We use only the finest ingredients to ensure maximum efficacy and safety.
        </p>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-lg ">
        <h3 className="text-xl font-semibold text-green-700 mb-4">Scientifically Formulated</h3>
        <p className="text-gray-600">
          Our products are developed based on the latest scientific research to support womens health.
        </p>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-lg ">
        <h3 className="text-xl font-semibold text-green-700 mb-4">Satisfaction Guaranteed</h3>
        <p className="text-gray-600">
          We are committed to your satisfaction. If youre not happy, well make it right.
        </p>
      </div>
    </div>
    
    <Link href="/about" passHref>
      <button className="bg-green-700 text-white px-6 py-3 rounded-full hover:bg-green-900 transition duration-300">
        Learn More About Our Products
      </button>
    </Link>
  </div>
</section>



      <section>
        <Footer />
      </section>
    </section>
  );
};

export default KidCategory;
