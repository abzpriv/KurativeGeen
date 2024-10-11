'use client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { StaticImageData } from 'next/image';
import Footer from './Footer';
import Navbar from './Navbar';
import CustomerReviews from './CustomerReviews';
import NutrientInformation from './NutrientsInformation';
import Faqs from './Faqs';

type Product = {
  _id: string;
  name: string;
  price: number;
  image: StaticImageData;
  quantity: number; 
  description?: string; 
  tablets: number; 
  urduDescription?: string;
  specialistNutrients?: {
    name: string;
    description: string;
    image: StaticImageData;
  }[];
  nutrientCount?: number;
};

type ProductDetailProps = {
  product: Product | null; 
};

const ProductDetail: React.FC<ProductDetailProps> = ({ product }) => {
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
  
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart);
        setCart(parsedCart);
      } catch (error) {
        console.error('Error parsing cart from localStorage:', error);
      }
    }
  }, []);

  useEffect(() => {
    if (cart.length > 0) {
      localStorage.setItem('cart', JSON.stringify(cart));
    }
  }, [cart]); 

  useEffect(() => {
  console.log('Product data:', product);
}, [product]);


  const handleAddToCart = (product: Product) => {
    const existingProductIndex = cart.findIndex(item => item._id === product._id);
    let updatedCart: Product[];

    if (existingProductIndex !== -1) {
      updatedCart = cart.map((item, index) =>
        index === existingProductIndex ? { ...item, quantity: item.quantity + 1 } : item
      );
    } else {
      updatedCart = [...cart, { ...product, quantity: 1 }];
    }

    setCart(updatedCart); 
  };

  const handleButtonClick = (section: 'reviews' | 'nutrients' | 'faqs') => {
    setActiveSection(section); 
  };

  if (!product) {
  return 
}

  return (
    <section>
      <Navbar cart={cart} setCart={setCart} />
      <section className="bg-white py-10 lg:mt-36 mt-16 shadow-lg rounded-lg">
        <div className="container mx-auto flex flex-col lg:flex-row items-center">
          {/* Product Image */}
          <div className="lg:w-1/2 mb-8 lg:ml-16 lg:mb-0">
            <Image
              src={product.image}
              alt={product.name}
              width={500} 
              height={500} 
              className="rounded-lg shadow-xl transform transition duration-300 w-auto h-56 lg:w-auto lg:h-96 hover:scale-105"
            />
          </div>

          {/* Product Info */}
          <div className="lg:w-1/2 lg:pl-12">
            <h1 className="text-3xl sm:text-4xl font-bold text-green-800 lg:ml-0 ml-3 hover:text-green-600 transition duration-300">{product.name}</h1>
            <p className="text-base sm:text-lg text-gray-700 mt-3 max-w-2xl leading-relaxed ">
              <span className="font-semibold lg:ml-0 ml-3 text-green-800">Description:</span>
              <span className="block mt-2 lg:ml-0 ml-3 lg:text-sm text-xs text-justify">
                {isEnglish ? (
                  product.description
                ) : (
                  <span className="font-bold lg:text-lg lg:leading-8">{product.urduDescription}</span> 
                )}
              </span>
            </p>
            <button 
              className="mt-4 px-4 py-2 lg:ml-0 ml-3 bg-green-700 text-white rounded-lg hover:bg-green-600"
              onClick={toggleLanguage}
            >
              {isEnglish ? 'اردو ترجمہ دکھائیں' : 'Show English Translation'}
            </button>

            <p className="text-sm lg:ml-0 ml-3 text-gray-500 mt-4">Total Tablets: <span className="font-semibold text-green-600">{product.tablets}</span></p>

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
                onClick={() => handleAddToCart(product)}
              >
                Add to Cart
              </button>
            </div>

            {/* Price */}
            <p className="text-lg lg:ml-0 ml-3 sm:text-2xl font-bold text-green-900 mt-4">Price: <span className="text-green-700">{product.price}</span></p>
          </div>
        </div>
        <section>
  <div className="bg-gray-200 mt-8 py-8 shadow-md rounded-lg text-center">
    <h2 className="text-xl font-semibold text-green-800">{product.name}</h2>
    <span className="text-sm text-gray-500">
      Contains {product.nutrientCount || 0} nutrients, including:
    </span>
    <div className="flex flex-wrap justify-center mt-4 gap-4 sm:gap-2"> 
  {product.specialistNutrients?.map((nutrient, index) => (
    <div key={index} className="flex flex-col items-center w-1/3 sm:w-1/4 md:w-1/6 px-2">
      {/* Image with responsive sizes */}
      <Image 
  src={nutrient.image} 
  alt={nutrient.name} 
  width={150} 
  height={150}
  className="rounded-full shadow-lg" 
/>

      <h4 className="text-[8px] sm:text-[9px] md:text-sm font-semibold text-green-800 mt-4 mb-2 text-center">
        {nutrient.name}
      </h4>
      <p className="text-[7px] sm:text-[8px] md:text-sm text-gray-700 text-center max-w-xs">
        {nutrient.description}
      </p>
    </div>
  ))}
</div>

  </div>
</section>

        {/* Nutrient Information */}
        <section>
          <div className="flex w-full justify-between">
            <button 
              className={`flex-1 px-2 py-1 sm:px-3 sm:py-2 border border-black rounded-l ${activeSection === 'reviews' ? 'bg-gray-300 text-green-800' : 'bg-gray-200 text-green-800 hover:bg-gray-300'} text-[10px] sm:text-[12px] md:text-base`}
              onClick={() => handleButtonClick('reviews')}
            >
              Reviews
            </button>
            <button 
              className={`flex-1 px-2 py-1 sm:px-3 sm:py-2 border border-black ${activeSection === 'nutrients' ? 'bg-gray-300 text-green-800' : 'bg-gray-200 text-green-800 hover:bg-gray-300'} text-[10px] sm:text-[12px] md:text-base`}
              onClick={() => handleButtonClick('nutrients')}
            >
              Nutrients Information
            </button>
            <button 
              className={`flex-1 px-2 py-1 sm:px-3 sm:py-2 border border-black rounded-r ${activeSection === 'faqs' ? 'bg-gray-300 text-green-800' : 'bg-gray-200 text-green-800 hover:bg-gray-300'} text-[10px] sm:text-[12px] md:text-base`}
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

// Server-side data fetching
export async function getServerSideProps(context: { params: { productId: string } }) {
  const { productId } = context.params;

  try {
    const response = await fetch(`/api/productsDetail/${productId}`); 
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const product: Product = await response.json();

    return {
      props: {
        product,
      },
    };
  } catch (error) {
    console.error('Failed to fetch product:', error);
    return {
      props: {
        product: null, 
      },
    };
  }
}

export default ProductDetail;
