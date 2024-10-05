'use client';

import Image from 'next/image';
import ImageLanding12 from '../assets/Image2Landing.jpg';
import ImageLanding13 from '../assets/Image3Landing.jpg';
import ImageLanding14 from '../assets/Image4Landing.jpg';
import { useEffect, useState } from 'react';
import Navbar from './Navbar';
import familyImage from '../assets/ImageFamily.png';
import CustomerReviews from './CustomerReviews';
import Footer from './Footer';
import { StaticImageData } from 'next/image';
import dailyPinkImage from '../assets/ImageDailyPink.png';
import familyFun from '../assets/ImageFun.jpg';
import FeatureImageQuality from '../assets/FeatureQualityImage.jpg';
import CustomerSatisfaction  from '../assets/CustomerSatisfication.jpg';
import ImageFeature3 from '../assets/FeaturedImage3.jpg';
import AffordablePrice from '../assets/AffordablePrice.png';
import SustainedSource from '../assets/SustainedSource.png';
import ExpertImage from '../assets/ExpertImage.png';
import Image1HighQuality from '../assets/Image1HighQuality.jpeg';
import ExpertImage1 from '../assets/ExpertImage1.jpg';
import CommunityImage from '../assets/CoomunityImage.jpg';
import Link from 'next/link';

type Product = {
  id: number;
  name: string;
  price: string;
  image: StaticImageData;
  quantity: number; 
};

const LandingPage: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const images = [ImageLanding12, ImageLanding14, ImageLanding13];
  const [cart, setCart] = useState<Product[]>([]);
  const [currentProductIndex, setCurrentProductIndex] = useState(0);
  const products = [
  { id: 1, image: familyImage, name: 'Xtreme', price: '1500 PKR', quantity: 1, tablets:10 },
  { id: 2, image: dailyPinkImage, name: 'Daily Pink', price: '1500 PKR', quantity: 1, tablets:30 },
  { id: 3, image: familyImage, name: 'Xtreme', price: '1500 PKR', quantity: 1, tablets:10 },
  { id: 4, image: dailyPinkImage, name: 'Daily Pink', price: '1500 PKR', quantity: 1, tablets:30 },
  { id: 5, image: familyImage, name: 'Xtreme', price: '1500 PKR', quantity: 1, tablets:10 },
];


  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % images.length);
    }, 6000); 
    return () => clearInterval(interval);
  }, [images.length]);


  const [visibleItems, setVisibleItems] = useState(1);

   useEffect(() => {
    const updateVisibleItems = () => {
      const screenWidth = window.innerWidth;
      if (screenWidth < 640) {
        setVisibleItems(1);
      } else if (screenWidth < 1024) {
        setVisibleItems(2);
      } else {
        setVisibleItems(3); 
      }
    };

    updateVisibleItems();
    window.addEventListener('resize', updateVisibleItems);

    return () => window.removeEventListener('resize', updateVisibleItems);
  }, []);

const handlePrev = () => {
  if (currentProductIndex > 0) {
    setCurrentProductIndex(currentProductIndex - 1);
  }
};

const handleNext = () => {
  if (currentProductIndex + visibleItems < products.length) {
    setCurrentProductIndex(currentProductIndex + 1);
  }
};
    useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      const parsedCart: Product[] = JSON.parse(savedCart);
      setCart(parsedCart);
      console.log('Loaded cart from localStorage:', parsedCart);
    } else {
      console.log('No cart found in localStorage');
    }
  }, []);

  // Save cart to local storage whenever it changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
    console.log('Saved cart to localStorage:', cart);
  }, [cart]);

  const handleAddToCart = (product: Product) => {
    const existingProductIndex = cart.findIndex(item => item.id === product.id);
    
    let updatedCart: Product[];
    if (existingProductIndex !== -1) {
      updatedCart = cart.map((item, index) => 
        index === existingProductIndex ? { ...item, quantity: item.quantity + 1 } : item
      );
      console.log(`Updated quantity for product ${product.name}:`, updatedCart[existingProductIndex].quantity);
    } else {
      updatedCart = [...cart, { ...product, quantity: 1 }];
      console.log(`Added new product to cart:`, product.name);
    }

    setCart(updatedCart);
    console.log('Current cart state after update:', updatedCart);
  };
  return (
    <section>
      <section>
      <Navbar cart={cart} setCart={setCart} />
      </section>
      <section className="relative w-full h-screen flex flex-col justify-center lg:mt-36 mt-16 overflow-hidden px-4 sm:px-6 md:px-8 lg:px-12 xl:px-20">
        <div className="absolute inset-0 z-0 w-full h-full overflow-hidden">
          <div className="sliderWrapper w-full h-full relative">
            {images.map((image, index) => (
              <div
                key={index}
                className={`slide absolute w-full h-full transition-opacity duration-2000 ease-in-out ${
                  index === currentSlide ? 'opacity-100' : 'opacity-0'
                }`}
              >
                <Image
                  src={image}
                  alt={`Slide Image ${index + 1}`}
                  layout="fill"
                  objectFit="cover"
                />
              </div>
            ))}
          </div>
        </div>

        <div className="relative z-10 text-left flex flex-col space-y-4 sm:space-y-6 md:space-y-8">
          <h1 className="text-white text-xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight tracking-wide mb-6 sm:mb-8 lg:mb-10 text-center relative drop-shadow-[0_6px_15px_rgba(0,0,0,0.9)] animate-[fadeInUp_1.5s_ease-out_forwards] transition-transform duration-1000 ease-in-out">
            Kurative Green
             
            <br />
            <span className="relative text-2xl sm:text-3xl md:text-4xl inline-block text-transparent ml-4 bg-clip-text bg-gradient-to-r from-green-300 to-green-500 px-4 py-2 
            font-extrabold rounded-full transform hover:scale-110 transition-transform duration-700 ease-out shadow-[0_10px_10px_rgba(0,0,0,0.5)] after:absolute after:inset-0 after:rounded-full after:blur-lg after:bg-gradient-to-r after:from-green-300 after:to-green-500 after:opacity-30 hover:after:opacity-30 before:absolute before:-inset-1 before:bg-black before:rounded-full before:blur-md before:opacity-20 hover:before:opacity-10">
              Best Seller
            </span>
          </h1>
        </div>

        {/* Conditional Buttons */}
       <div className="relative z-10 text-center mt-8">
  {currentSlide === 0 && (
    <Link href="/women">
      <button className="px-6 py-2 sm:py-3 bg-green-700 text-white font-bold rounded-lg hover:bg-green-400 transition-colors duration-2000">
        Shop for Women
      </button>
    </Link>
  )}
  {currentSlide === 1 && (
    <Link href="/men">
      <button className="px-6 py-2 sm:py-3 bg-green-700 text-white font-bold rounded-lg hover:bg-green-400 transition-colors duration-2000">
        Shop for Men
      </button>
    </Link>
  )}
  {currentSlide === 2 && (
    <Link href="/kids">
      <button className="px-6 py-2 sm:py-3 bg-green-700 text-white font-bold rounded-lg hover:bg-green-400 transition-colors duration-2000">
        Shop for Kids
      </button>
    </Link>
  )}
</div>

        <style jsx>{`
          .sliderWrapper {
            position: relative;
            width: 100%;
            height: 100%;
          }

          .slide {
            animation: fade 18s infinite ease-in-out;
            transition: opacity 3s ease-in-out;
          }

          @keyframes fade {
            0% { opacity: 0; }
            8% { opacity: 1; }
            25% { opacity: 1; }
            33% { opacity: 0; }
            100% { opacity: 0; }
          }

          .slide:nth-child(1) { animation-delay: 0s; }
          .slide:nth-child(2) { animation-delay: 6s; }
          .slide:nth-child(3) { animation-delay: 12s; }
        `}</style>
      </section>

      <section className="bg-gradient-to-r from-white to-gray-50 py-24">
  <div className="container mx-auto px-6 sm:px-8 md:px-12 lg:px-16 xl:px-24">
    <h2 className="text-5xl font-extrabold text-green-800 mb-8 text-left leading-tight tracking-wide">
      Shop by Need
    </h2>
    <div className="border-l-4 border-green-800 h-full pl-6 mb-8"></div>
    <h3 className="text-3xl font-bold text-green-800 mb-8 text-left leading-tight tracking-wider">
      Trending Products
    </h3>

    <div className="relative flex items-center justify-center">
      {/* Left Arrow */}
      {currentProductIndex > 0 && (
        <button
          onClick={handlePrev}
          className="bg-green-800 text-white rounded-full p-4 absolute left-6 hover:bg-green-600 hover:scale-105 transition-transform duration-300 ease-in-out shadow-2xl z-10"
        >
          &lt;
        </button>
      )}

      {/* Product Display */}
       <div className="overflow-hidden w-full relative">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{
                transform: `translateX(-${(currentProductIndex * 100) / visibleItems}%)`,
              }}
            >
          {products.map((product) => (
            <div
              key={product.id}
              className="min-w-[33.33%] sm:min-w-[50%] md:min-w-[25%] mx-4 sm:mx-2 md:mx-3 flex-shrink-0 rounded-xl bg-white p-8 sm:p-4 md:p-6"
            >
              {/* Product Image */}
              <div className="relative w-full h-64 sm:h-40 md:h-52 bg-white rounded-lg shadow-xl overflow-hidden mb-6 hover:shadow-2xl transition-all duration-300 ease-in-out">
                <Image
                  src={product.image}
                  alt={product.name}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-lg"
                />
              </div>
              {/* Product Details */}
              <div className="text-center">
                <h4 className="text-2xl sm:text-lg md:text-xl font-semibold text-green-800 mb-4">
                  {product.name}
                </h4>
                 <p className="text-gray-500 text-lg sm:text-sm md:text-base  font-medium">Tablets: {product.tablets}</p>
                <p className="text-gray-500 text-lg sm:text-sm md:text-base mb-4 font-medium">Price: {product.price}</p>
                <button 
                  className="mt-4 px-8 py-3 sm:px-4 sm:py-2 md:px-6 md:py-3 bg-green-800 text-white text-lg sm:text-sm md:text-base font-bold rounded-full hover:bg-green-600 hover:scale-105 transition-all duration-300 ease-in-out shadow-lg"
                  onClick={() => handleAddToCart(product)}
                >
                  Buy Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Right Arrow */}
      {currentProductIndex + (visibleItems === 1 ? 1 : 2) < products.length && (
        <button
          onClick={handleNext}
          className="bg-green-800 text-white rounded-full hover:bg-green-600 hover:scale-105 p-4 absolute right-6 transition-transform duration-300 ease-in-out shadow-2xl z-10"
        >
          &gt;
        </button>
      )}
    </div>
  </div>
</section>


<section className="bg-white py-16">
  <div className="container mx-auto flex flex-col md:flex-row items-center px-4 sm:px-6 md:px-8 lg:px-12 xl:px-20">
    {/* Left Side Image */}
    <div className="md:w-1/2 mb-8 md:mb-0 relative">
      <Image 
        src={familyFun}
        alt="Supplements You Can Trust" 
        layout="responsive" 
        width={600} 
        height={400} 
        className="rounded-lg shadow-lg "
      />
    </div>

    {/* Right Side Content */}
    <div className="md:w-1/2 md:pl-8 flex flex-col space-y-6">
      <h2 className="text-3xl font-bold text-green-700">
        Supplements You Can Trust
      </h2>
      <div className="flex flex-col space-y-4">
        <div className="bg-gray-100 p-4 rounded-lg shadow transition-shadow duration-300 hover:shadow-lg">
         <h3 className="text-xl font-semibold text-green-700">Pioneering Health Solutions</h3>
        <p className="text-gray-600">As a leader in the vitamins industry, we focus on creating innovative supplements that support your wellness journey.</p>
        </div>
        <div className="bg-gray-100 p-4 rounded-lg shadow transition-shadow duration-300 hover:shadow-lg">
          <h3 className="text-xl font-semibold text-green-700">25 Years of Innovation</h3>
         <p className="text-gray-600">For over two decades, we have redefined wellness, creating products that empower individuals and families to achieve their health goals.</p>
        </div>
        <div className="bg-gray-100 p-4 rounded-lg shadow transition-shadow duration-300 hover:shadow-lg">
          <h3 className="text-xl font-semibold text-green-700">Grounded in Research</h3>
          <p className="text-gray-600">Our formulations are developed through extensive scientific research, ensuring that each product meets the highest standards of efficacy and safety for your family.</p>
        </div>
      </div>
    </div>
  </div>
</section>
<section className="bg-white py-16">
  <div className="container mx-auto px-4">
    <div className="text-center mb-12">
      <h2 className="text-4xl font-bold text-green-800 mb-4">
        Explore Our Vitamin Supplements
      </h2>
      <p className="text-lg text-gray-600">
        Discover how our high-quality vitamin supplements can support your health and wellness journey.
      </p>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {/* Vitamin Card 1 */}
      <div className="bg-green-100 p-6 rounded-lg shadow-lg ">
        <h3 className="text-2xl font-semibold text-green-700 mb-3">Vitamin C</h3>
        <p className="text-gray-500 mb-4">
          Boost your immune system with our Vitamin C supplements, perfect for everyday health.
        </p>
        <a
          href="/products/6" 
          className="text-white bg-green-600 hover:bg-green-700 py-2 px-4 rounded-md transition duration-300"
        >
          Learn More
        </a>
      </div>
      {/* Vitamin Card 2 */}
      <div className="bg-green-100 p-6 rounded-lg shadow-lg ">
        <h3 className="text-2xl font-semibold text-green-700 mb-3">Vitamin D</h3>
        <p className="text-gray-500 mb-4">
          Support your bone health and immune function with our Vitamin D supplements.
        </p>
        <a
          href="/products/6" 
          className="text-white bg-green-600 hover:bg-green-700 py-2 px-4 rounded-md transition duration-300"
        >
          Learn More
        </a>
      </div>
      {/* Vitamin Card 3 */}
      <div className="bg-green-100 p-6 rounded-lg shadow-lg ">
        <h3 className="text-2xl font-semibold text-green-700 mb-3">Multivitamins</h3>
        <p className="text-gray-500 mb-4">
          Our all-in-one multivitamins provide essential nutrients for overall well-being.
        </p>
        <a
          href="/products/6" 
          className="text-white bg-green-600 hover:bg-green-700 py-2 px-4 rounded-md transition duration-300"
        >
          Learn More
        </a>
      </div>
    </div>
  </div>
</section>
<section className="py-16 bg-white">
  <div className="container mx-auto px-4">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
      {/* First Block */}
      <div className="relative">
        <Image
          src={Image1HighQuality}
          alt="Description of Image 1"
          className="w-full h-full object-cover rounded-lg shadow-lg"
        />
      </div>
      <div className="flex flex-col justify-center">
        <h2 className="text-3xl font-bold text-green-800 mb-4">High-Quality Supplements</h2>
        <p className="text-gray-600 mb-4">
          Our supplements are crafted with the highest quality ingredients to support your health and wellness.
        </p>
        <p className="text-gray-500">
          Experience the difference with our scientifically formulated products that cater to your unique needs.
        </p>
      </div>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
      {/* Second Block */}
      <div className="flex flex-col justify-center">
        <h2 className="text-3xl font-bold text-green-800 mb-4">Tailored Nutritional Solutions</h2>
       <p className="text-gray-600 mb-4">
         Experience the benefits of a supplement plan designed specifically for your health and wellness aspirations.
       </p>
       <p className="text-gray-500">
        Unlock your full potential with our tailored solutions that align with your lifestyle and dietary preferences.
       </p>

      </div>
      <div className="relative">
        <Image
          src={ExpertImage1}
          alt="Description of Image 2"
          className="w-full h-full object-cover rounded-lg shadow-lg"
        />
      </div>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {/* Third Block */}
      <div className="relative">
        <Image 
          src={CommunityImage}
          alt="Description of Image 3"
          className="w-full h-full object-cover rounded-lg shadow-lg"
        />
      </div>
      <div className="flex flex-col justify-center">
        <h2 className="text-3xl font-bold text-green-800 mb-4">Join Our Community</h2>
        <p className="text-gray-600 mb-4">
          Connect with like-minded individuals and share your wellness journey with our vibrant community.
        </p>
        <p className="text-gray-500">
          Together, we can achieve our health goals and inspire each other along the way.
        </p>
      </div>
    </div>
  </div>
</section>


<section className="bg-white">
  <div className="container mx-auto text-center px-4 sm:px-6 md:px-8 lg:px-12 xl:px-20">
    <h2 className="text-4xl font-bold text-green-800 mb-3">Why Choose Us?</h2>
    <p className="text-lg text-gray-600 mb-10">
      Discover the reasons our products are trusted by thousands.
    </p>

    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {/* Feature 1 */}
      <div className="bg-white rounded-lg shadow-lg p-6 ">
  <div className="mb-4 flex items-center justify-center">
    <Image
      src={FeatureImageQuality}
      alt="Quality Ingredients"
      width={200} 
      height={200} 
      className="object-contain" 
    />
  </div>
  <h3 className="text-2xl font-semibold text-green-700 mb-2">Quality Ingredients</h3>
  <p className="text-gray-500">
    We use only the finest ingredients, ensuring premium quality in every product.
  </p>
</div>


      {/* Feature 2 */}
      <div className="bg-white rounded-lg shadow-lg p-6 ">
        <div className="mb-4 flex items-center justify-center">
          <Image src={CustomerSatisfaction} alt="Customer Satisfaction" width={200} height={200} className="object-contain"  />
        </div>
        <h3 className="text-2xl font-semibold text-green-700 mb-2">Customer Satisfaction</h3>
        <p className="text-gray-500">
          Our customers love us! Join the community that experiences real results.
        </p>
      </div>

      {/* Feature 3 */}
      <div className="bg-white rounded-lg shadow-lg p-6 ">
        <div className="mb-4 flex items-center justify-center">
          <Image src={ImageFeature3} alt="Scientifically Backed" width={200} height={200} className="object-contain"  />
        </div>
        <h3 className="text-2xl font-semibold text-green-700 mb-2">Scientifically Backed</h3>
        <p className="text-gray-500">
          Our formulations are based on solid scientific research to ensure effectiveness.
        </p>
      </div>

      {/* Feature 4 (Center Image) */}
      <div className="bg-white rounded-lg shadow-lg p-6 ">
        <div className="mb-4 flex items-center justify-center">
          <Image src={SustainedSource} alt="Sustainably Sourced" width={200} height={200} />
        </div>
        <h3 className="text-2xl font-semibold text-green-700 mb-2">Sustainably Sourced</h3>
        <p className="text-gray-500">
          We are committed to sustainability and source our ingredients responsibly.
        </p>
      </div>

      {/* Feature 5 */}
      <div className="bg-white rounded-lg shadow-lg p-6 ">
        <div className="mb-4 flex justify-center items-center">
          <Image src={ExpertImage} alt="Expertly Formulated" width={200} height={200} />
        </div>
        <h3 className="text-2xl font-semibold text-green-700 mb-2">Expertly Formulated</h3>
        <p className="text-gray-500">
          Our team of experts develops products tailored to your health needs.
        </p>
      </div>

      {/* Feature 6 */}
      <div className="bg-white rounded-lg shadow-lg p-6 ">
        <div className="mb-4 flex justify-center items-center">
          <Image src={AffordablePrice} alt="Affordable Pricing" width={200} height={200} />
        </div>
        <h3 className="text-2xl font-semibold text-green-700 mb-2">Affordable Pricing</h3>
        <p className="text-gray-500">
          Quality health solutions at prices that wont break the bank.
        </p>
      </div>
    </div>
  </div>
</section>





        <section>
          <CustomerReviews />
        </section>

        <section>
          <Footer />
        </section>









    </section>
  );
};

export default LandingPage;
