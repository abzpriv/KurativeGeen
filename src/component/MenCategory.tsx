'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import dailyPinkImage from '../assets/ImageDailyPink.png';
import familyImage from '../assets/ImageFamily.png';
import MenImage from '../assets/MenImage.jpg';
import Footer from './Footer';
import Navbar from './Navbar';
import { StaticImageData } from 'next/image';
import Link from 'next/link';
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import MenSupplement from '../assets/MenSupplement.jpg';
import MenSupplement2 from '../assets/MenSupplement2.png';
import MenSupplement3 from '../assets/MenSupplement3.jpg';


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

const MenCategory = () => {
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
          src={MenImage}
          alt="Women's Category"
          layout="fill"
          objectFit="cover"
          className="rounded-b-3xl shadow-lg"
        />
      </div>
     <section className="bg-white mt-10">
  <div className="container mx-auto text-center">
     <h2 className="lg:text-4xl text-2xl font-bold text-green-700 mb-4">
         Optimize Your Health with Targeted Supplements
        </h2>
      <p className="lg:text-lg text-sm text-gray-700 mb-8 max-w-5xl mx-auto">
       Fuel your body with our expertly crafted multivitamins designed to meet men`s unique health needs. From boosting energy levels to enhancing overall wellness, our supplements are formulated to support you in every stage of life. Discover the ideal blend to elevate your health journey today!
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
  {/* First Block: Men's Health Supplements */}
  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
    <div className="relative">
      <Image
        src={MenSupplement}
        alt="Men's Health Supplements"
        className="w-full h-full object-cover rounded-lg shadow-lg"
      />
    </div>
    <div className="flex flex-col justify-center">
      <h2 className="text-3xl font-bold text-green-800 mb-4">Men`s Health Supplements</h2>
      <p className="text-gray-600 mb-4">
        Our supplements are designed to meet the specific health needs of men, supporting muscle growth, energy, and endurance.
      </p>
      <p className="text-gray-500">
        Discover premium formulas that fuel your workouts, enhance recovery, and promote overall vitality.
      </p>
    </div>
  </div>

  {/* Second Block: Fitness and Nutritional Solutions for Men */}
  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
    <div className="flex flex-col justify-center">
      <h2 className="text-3xl font-bold text-green-800 mb-4">Fitness and Nutritional Solutions for Men</h2>
      <p className="text-gray-600 mb-4">
        Our fitness-focused supplements provide the nutrients you need to perform at your best, whether in the gym or in your daily routine.
      </p>
      <p className="text-gray-500">
        Packed with protein, vitamins, and minerals, our supplements are tailored to help you achieve your fitness goals and maintain peak performance.
      </p>
    </div>
    <div className="relative">
      <Image
        src={MenSupplement2}
        alt="Men's Fitness and Nutrition"
        className="w-full h-full object-cover rounded-lg shadow-lg"
      />
    </div>
  </div>

  {/* Third Block: Empowering Men Through Community */}
  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
    <div className="relative">
      <Image 
        src={MenSupplement3}
        alt="Men's Wellness Community"
        className="w-full h-full object-cover rounded-lg shadow-lg"
      />
    </div>
    <div className="flex flex-col justify-center">
      <h2 className="text-3xl font-bold text-green-800 mb-4">Join the Men`s Wellness Community</h2>
      <p className="text-gray-600 mb-4">
        Connect with other men focused on health, fitness, and personal growth in our supportive community.
      </p>
      <p className="text-gray-500">
        Share your experiences, motivate each other, and work together to reach your full potential.
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

export default MenCategory;
