'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import { StaticImageData } from 'next/image';
import Footer from './Footer';
import Navbar from './Navbar';
import CustomerReviews from './CustomerReviews';
import NutrientInformation from './NutrientsInformation';
import Faqs from './Faqs';

type Nutrient = {
  name: string; 
  description: string; 
  image: StaticImageData; 
};

type Product = {
  id: number;
  name: string;
  price: string;
  image: StaticImageData;
  quantity: number; 
  description?: string; 
  urduDescription?: string;
  tablets?: number; 
  specialistNutrients?: Nutrient[]; 
  nutrientCount?: number;
};

type ProductDetailProps = {
  selectedProduct: Product;
};

const ProductDetail: React.FC<ProductDetailProps> = ({ selectedProduct }) => {
  const [quantity, setQuantity] = useState(1);
  const [cart, setCart] = useState<Product[]>([]);
  const [isEnglish, setIsEnglish] = useState(true);
  const [activeSection, setActiveSection] = useState<'reviews' | 'nutrients' | 'faqs'>('reviews');

  const handleIncrease = () => {
    setQuantity(prev => prev + 1);
  };

  const handleDecrease = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };
  
  const toggleLanguage = () => {
    setIsEnglish(prev => !prev);
  };
  
  const handleAddToCart = (product: Product) => {
    const existingProductIndex = cart.findIndex(item => item.id === product.id);
    
    if (existingProductIndex !== -1) {
      const updatedCart = [...cart];
      updatedCart[existingProductIndex].quantity += quantity; 
      setCart(updatedCart);
    } else {
      setCart(prevCart => [...prevCart, { ...product, quantity }]);
    }
  };

  const handleButtonClick = (section: 'reviews' | 'nutrients' | 'faqs') => {
    setActiveSection(section); 
  };

  return (
    <section>
      <Navbar cart={cart} setCart={setCart} />
      <section className="bg-white py-10 lg:mt-36 mt-16 shadow-lg rounded-lg">
        <div className="container mx-auto flex flex-col lg:flex-row items-center">
          {/* Product Image */}
          <div className="lg:w-1/2 mb-8 lg:ml-16 lg:mb-0">
            <Image
              src={selectedProduct.image}
              alt={selectedProduct.name}
              className="rounded-lg shadow-xl transform transition duration-300 w-auto h-56 lg:w-auto lg:h-96 hover:scale-105"
            />
          </div>

          {/* Product Info */}
          <div className="lg:w-1/2 lg:pl-12">
            <h1 className="text-3xl sm:text-4xl font-bold text-green-800 lg:ml-0 ml-3 hover:text-green-600 transition duration-300">{selectedProduct.name}</h1>
            <p className="text-base sm:text-lg text-gray-700 mt-3 max-w-2xl leading-relaxed ">
            <span className="font-semibold lg:ml-0 ml-3 text-green-800">Description:</span>
           <span className="block mt-2 lg:ml-0 ml-3 lg:text-sm text-xs text-justify">
      {isEnglish ? (
        selectedProduct.description
      ) : (
        <span className="font-bold lg:text-lg lg:leading-8">{selectedProduct.urduDescription}</span> 
      )}
    </span>
            </p>
            <button 
           className="mt-4 px-4 py-2 lg:ml-0 ml-3 bg-green-700 text-white rounded-lg hover:bg-green-600"
         onClick={toggleLanguage}
            >
           {isEnglish ? 'اردو ترجمہ دکھائیں' : 'Show English Translation'}
          </button>


            <p className="text-sm lg:ml-0 ml-3 text-gray-500 mt-4">Total Tablets: <span className="font-semibold text-green-600">{selectedProduct.tablets}</span></p>

            {/* Quantity Controls */}
            <div className="flex items-center lg:ml-0 ml-3 mt-6">
              <button
                className="px-4 py-2 bg-green-800 text-white font-semibold rounded-l-md hover:bg-green-700 transition duration-300 shadow"
                onClick={handleDecrease}
              >
                -
              </button>
              <span className="px-4 py-1 border-t border-b text-black border-black text-lg bg-gray-100">{quantity}</span>
              <button
                className="px-4 py-2 bg-green-800 text-white font-semibold rounded-r-md hover:bg-green-700 transition duration-300 shadow"
                onClick={handleIncrease}
              >
                +
              </button>
              <button
                className="ml-4 px-8 py-2 bg-green-700 text-white text-lg font-bold rounded-full hover:bg-green-500 transition-all duration-300 ease-in-out shadow-lg"
                onClick={() => handleAddToCart(selectedProduct)}
              >
                Add to Cart
              </button>
            </div>

            {/* Price */}
            <p className="text-lg lg:ml-0 ml-3 sm:text-2xl font-bold text-green-900 mt-4">Price: <span className="text-green-700">{selectedProduct.price}</span></p>
          </div>
        </div>

        {/* Nutrient Information */}
        <section>
  <div className="bg-gray-200 mt-8 py-8 shadow-md rounded-lg text-center">
    <h2 className="text-xl font-semibold text-green-800">{selectedProduct.name}</h2>
    <span className="text-sm text-gray-500">
      Contains {selectedProduct.nutrientCount || 0} nutrients, including:
    </span>
    <div className="flex flex-wrap justify-center mt-4">
      {selectedProduct.specialistNutrients?.map((nutrient, index) => (
        <div key={index} className="flex flex-col items-center w-1/6 px-2">
          <Image 
            src={nutrient.image} 
            alt={nutrient.name} 
            className="w-16 h-16 sm:w-20 sm:h-20 rounded-full shadow-lg" 
          />
          <h4 className="text-[10px] lg:text-sm sm:text-sm font-semibold max-w-sm text-green-800 mt-6 mb-3">{nutrient.name}</h4> {/* Adjusted font size for mobile */}
          <p className="text-[9px] lg:text-sm sm:text-sm text-gray-700 max-w-sm text-center  ">{nutrient.description}</p> {/* Adjusted font size for mobile */}
        </div>
      ))}
    </div>
  </div>
</section>

        {/* Tabs for Reviews, Nutrients, FAQs */}
        <section>
          <div className="flex w-full justify-between">
            <button 
              className={`flex-1 px-4 py-2 border border-black rounded-l ${activeSection === 'reviews' ? 'bg-gray-300 text-green-800' : 'bg-gray-200 text-green-800 hover:bg-gray-300'}`}
              onClick={() => handleButtonClick('reviews')}
            >
              Reviews
            </button>
            <button 
              className={`flex-1 px-4 py-2 border border-black ${activeSection === 'nutrients' ? 'bg-gray-300 text-green-800' : 'bg-gray-200 text-green-800 hover:bg-gray-300'}`}
              onClick={() => handleButtonClick('nutrients')}
            >
              Nutrients Information
            </button>
            <button 
              className={`flex-1 px-4 py-2 border border-black rounded-r ${activeSection === 'faqs' ? 'bg-gray-300 text-green-800' : 'bg-gray-200 text-green-800 hover:bg-gray-300'}`}
              onClick={() => handleButtonClick('faqs')}
            >
              FAQs
            </button>
          </div>

          {/* Conditionally render CustomerReviews or NutrientInformation based on active section */}
          {activeSection === 'reviews' && <CustomerReviews />}
          {activeSection === 'nutrients' && <NutrientInformation />}
          {activeSection === 'faqs' && <Faqs />}
        </section>
      </section>
      <Footer />
    </section>
  );
};

export default ProductDetail;
