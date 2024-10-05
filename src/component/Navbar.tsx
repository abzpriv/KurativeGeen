'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { FaSearch, FaUser, FaShoppingCart, FaBars, FaTimes, FaPhone, FaWhatsapp } from 'react-icons/fa';
import styles from './Navbar.module.css';
import Image from 'next/image';
import logo from '../assets/Logo.png';
import { StaticImageData } from 'next/image';
import { FaTrash } from 'react-icons/fa';

export type CartItem = {
  id: number;
  name: string;
  price: string;
  quantity: number;
  image: StaticImageData;
};
type NavbarProps = {
  cart: CartItem[];
  setCart: React.Dispatch<React.SetStateAction<CartItem[]>>; 
};

// Use NavbarProps in the component definition
const Navbar: React.FC<NavbarProps> = ({ cart, setCart }) => {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);

  const menuItems = [
    { name: 'Women', link: '/women' },
    { name: 'Men', link: '/men' },
    { name: 'Kids', link: '/kids' },
    // { name: '50+', link: '/fifty-plus' },
    // { name: 'All Products', link: '/products' },
    // { name: 'Best Sellers', link: '/best-sellers' },
  ];
  
  const womenBrands = ['Wellwoman', 'Perfectil', 'Pregnacare', 'Feroglobin', 'Osteocare'];
  const womenNeeds = ['Pregnancy', 'Skincare', 'Immune Support', 'Energy', 'Menopause'];
  const womenNutrients = ['Vitamin B', 'Vitamin C', 'Vitamin D', 'Calcium', 'Zinc'];

  const menBrands = ['Men’s Multivitamin A', 'Men’s Multivitamin B', 'Zinc Plus', 'Energy Boost', 'Muscle Support'];
  const menNeeds = ['Energy', 'Muscle Support', 'Heart Health', 'Men’s Health'];
  const menNutrients = ['Vitamin A', 'Vitamin E', 'Iron', 'Zinc'];

  const kidsBrands = ['Kid’s Multivitamin A', 'Kid’s Multivitamin B', 'Vitamin C Chewables', 'Omega-3 Gummies'];
  const kidsNeeds = ['Growth', 'Brain Development', 'Immune Support'];
  const kidsNutrients = ['Vitamin D', 'Calcium', 'Iron'];

  const handleMouseEnter = (item: string) => {
    setActiveMenu(item);
  };
  const getQueryString = () => { 
  return cart
    .map(item => `id=${item.id}&name=${encodeURIComponent(item.name)}&price=${item.price}&quantity=${item.quantity}`)
    .join('&');
};


  const handleMouseLeave = () => {
    setActiveMenu(null);
  };
  const getTotalItemsInCart = () => {
  return cart.reduce((total, item) => total + item.quantity, 0);
};

  const handleAddToCart = () => {
    
    setIsCartOpen(true);
  };

  const increaseQuantity = (id: number) => {
    setCart(prevCart =>
      prevCart.map(item =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };
  useEffect(() => {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
  }, [setCart]);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const decreaseQuantity = (id: number) => {
    setCart(prevCart =>
      prevCart.map(item =>
        item.id === id ? { ...item, quantity: item.quantity > 1 ? item.quantity - 1 : 1 } : item
      )
    );
  };

  useEffect(() => {
    if (cart.length > 0) {
      setIsCartOpen(true);
    } else {
      setIsCartOpen(false);
    }
  }, [cart]);
  

  return (
    <>
    {/* Upper Navbar */}
      <div className="fixed top-0 left-0 w-full bg-green-800 text-white py-2 z-50 hidden md:flex">
        <div className="container mx-auto flex justify-center items-center space-x-4">
          <span className="flex items-center">
            <FaPhone className="mr-1" /> 
            +123 456 7890 
          </span>
          <span className="flex items-center">
            <FaWhatsapp className="mr-1" /> 
            +123 456 7890
          </span>
          <span>25 Years of Experience ||</span>
          <Link href="/contact" className="text-white bg-green-600 hover:bg-green-700 py-1 px-3 rounded transition duration-200">
            Contact Us
          </Link>
        </div>
      </div>
    <nav className="fixed top-0 lg:top-2 left-0 w-full bg-gray-50 lg:mt-10 shadow-lg z-50">
      <div className="container mx-auto flex items-center justify-between px-4 py-2 md:px-6 md:py-4">
        {/* Mobile Menu Icon */}
        <div className="md:hidden">
          <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} aria-label="Toggle menu">
            {isMobileMenuOpen ? <FaTimes className="text-green-700 text-2xl" /> : <FaBars className="text-green-700 text-2xl" />}
          </button>
        </div>

        {/* Centered Logo */}
       <div className="flex-grow text-center md:text-left">
       <Link href="/" aria-label="Home">
        <Image src={logo} alt="Kurative Logo" className="md:w-16 w-10 md:mb-0 mb-2" />
        </Link>
       </div>


        {/* Navbar Links for Desktop */}
        <ul className="hidden md:flex justify-center lg:mr-72 space-x-2 items-center flex-grow">
            {menuItems.map(({ name, link }) => (
              <li
                key={name}
                onMouseEnter={() => handleMouseEnter(name)}
                onMouseLeave={handleMouseLeave}
                className="relative group"
              >
                <Link
                  href={link} 
                  className="text-green-700 text-xs md:text-sm lg:text-base font-semibold py-2 px-2 transition duration-300 hover:text-green-900 whitespace-nowrap"
                >
                  {name}
                </Link>

              {activeMenu === name && (
                  <div className={`fixed inset-x-0 top-0 bg-white bg-opacity-95 h-[50vh] mt-28 overflow-y-auto z-10 ${styles.dropdownVisible}`}>
                    <div className="grid grid-cols-3 gap-6 md:gap-8 p-4 md:p-10">
                      {/* Brand Links */}
                      <div>
                        <h4 className="font-bold text-gray-700 mb-2">Shop By Brand</h4>
                        <ul className="space-y-2">
                          {name === 'Women' && womenBrands.map((brand) => (
                            <li key={brand}>
                              <Link href="#" className="text-green-700 hover:text-green-900 transition duration-200 ">
                                {brand}
                              </Link>
                            </li>
                          ))}
                          {name === 'Men' && menBrands.map((brand) => (
                            <li key={brand}>
                              <Link href="#" className="text-green-700 hover:text-green-900 transition duration-200 ">
                                {brand}
                              </Link>
                            </li>
                          ))}
                          {name === 'Kids' && kidsBrands.map((brand) => (
                            <li key={brand}>
                              <Link href="#" className="text-green-700 hover:text-green-900 transition duration-200 ">
                                {brand}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Needs Links */}
                      <div>
                        <h4 className="font-bold text-gray-700 mb-2">Shop By Need</h4>
                        <ul className="space-y-2">
                          {name === 'Women' && womenNeeds.map((need) => (
                            <li key={need}>
                              <Link href="#" className="text-green-700 hover:text-green-900 transition duration-200 hover:underline">
                                {need}
                              </Link>
                            </li>
                          ))}
                          {name === 'Men' && menNeeds.map((need) => (
                            <li key={need}>
                              <Link href="#" className="text-green-700 hover:text-green-900 transition duration-200 hover:underline">
                                {need}
                              </Link>
                            </li>
                          ))}
                          {name === 'Kids' && kidsNeeds.map((need) => (
                            <li key={need}>
                              <Link href="#" className="text-green-700 hover:text-green-900 transition duration-200 hover:underline">
                                {need}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Nutrients Links */}
                      <div>
                        <h4 className="font-bold text-gray-700 mb-2">Shop By Nutrient</h4>
                        <ul className="space-y-2">
                          {name === 'Women' && womenNutrients.map((nutrient) => (
                            <li key={nutrient}>
                              <Link href="#" className="text-green-700 hover:text-green-900 transition duration-200 hover:underline">
                                {nutrient}
                              </Link>
                            </li>
                          ))}
                          {name === 'Men' && menNutrients.map((nutrient) => (
                            <li key={nutrient}>
                              <Link href="#" className="text-green-700 hover:text-green-900 transition duration-200 hover:underline">
                                {nutrient}
                              </Link>
                            </li>
                          ))}
                          {name === 'Kids' && kidsNutrients.map((nutrient) => (
                            <li key={nutrient}>
                              <Link href="#" className="text-green-700 hover:text-green-900 transition duration-200 hover:underline">
                                {nutrient}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                )}
              </li>
            ))}
          </ul>

        {/* Icons for Desktop */}
        <div className="relative flex justify-end items-center space-x-4 p-4">
      {/* Search Icon */}
      <div className={`relative ${isSearchOpen ? 'mb-2' : ''}`}>
  {isSearchOpen ? (
    <FaTimes
      className="text-green-700 text-xl hover:text-green-900 transition mt-2 duration-200 cursor-pointer"
      onClick={() => setIsSearchOpen(false)}
    />
  ) : (
    <FaSearch
      className="text-green-700 text-xl hover:text-green-900 transition duration-200 cursor-pointer"
      onClick={() => setIsSearchOpen(true)}
    />
  )}

  {/* Search Input Container */}
  {isSearchOpen && (
    <div className="absolute left-1/2 transform -translate-x-[60%] lg:-translate-x-[105%] top-0 z-10 bg-white rounded-2xl shadow-lg lg:mt-0 mt-10 transition-transform duration-300 w-64">
      <input
        type="text"
        placeholder="Search..."
        className="w-full p-2 rounded-2xl border text-black border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-200 pr-10"
        onBlur={() => setIsSearchOpen(false)}
      />
      <FaSearch
        className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 cursor-pointer"
        onClick={() => {
          console.log("Search action triggered!");
        }}
      />
    </div>
  )}
</div>


          <Link href="/login" aria-label="Profile">
         <FaUser className="text-green-700 text-xl hover:text-green-900 transition duration-200" />
        </Link>


          <Link href="#" aria-label="Add to Cart" onClick={handleAddToCart}>
            <div className="relative">
              <FaShoppingCart className="text-green-700 text-xl hover:text-green-900 transition duration-200" />
              {getTotalItemsInCart() > 0 && (
              <span className="absolute -top-1 -right-1 bg-green-900 text-white text-xs rounded-full px-1">
             {getTotalItemsInCart()}
             </span>
              )}
            </div>
          </Link>
        </div>
      </div>

      {/* Cart Sidebar */}
     {isCartOpen && (
  <div className="fixed inset-y-0 right-0 bg-white shadow-lg w-64 md:w-80 lg:w-96 p-6 z-50 transition-transform transform translate-x-0 rounded-lg border border-gray-200 overflow-y-auto">
    <div className="flex justify-between items-center">
      <h2 className="text-lg md:text-xl lg:text-2xl font-semibold text-green-600">Shopping Cart</h2>
      <button
        onClick={() => setIsCartOpen(false)}
        aria-label="Close cart"
        className="text-lg md:text-xl lg:text-2xl text-gray-600 hover:text-red-600 transition duration-200"
      >
        <FaTimes />
      </button>
    </div>
    <div className="mt-4">
      {cart.length === 0 ? (
        <p className="text-gray-600 text-sm md:text-base lg:text-lg text-center">Your cart is empty.</p>
      ) : (
        <ul className="divide-y divide-gray-200">
          {cart.map(item => (
            <li key={item.id} className="flex items-center justify-between py-4">
              <div className="flex items-center space-x-4">
                <Image src={item.image} alt={item.name} className="w-16 h-16 rounded-md object-cover" />
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-800 font-medium">{item.name}</span>
                  </div>
                  <div className="flex items-center justify-between mt-1">
                    <span className="text-gray-600">{item.price}</span>
                    <div className="flex items-center lg:ml-10 space-x-2">
                      <button onClick={() => decreaseQuantity(item.id)} className="text-gray-600 hover:text-red-600">
                        -
                      </button>
                      <span className="mx-2 text-sm text-black">{item.quantity}</span>
                      <button onClick={() => increaseQuantity(item.id)} className="text-gray-600 hover:text-green-600">
                        +
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="justify-end">
                <button
                  onClick={() => {
                    // Logic to remove the item from the cart
                    setCart(prevCart => prevCart.filter(cartItem => cartItem.id !== item.id));
                  }}
                  className="text-green-600 hover:text-red-600 transition duration-200"
                  aria-label="Delete item"
                >
                  <FaTrash />
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>

    {/* Total Price and Quantity Section */}
    {cart.length > 0 && (
  <div className="mt-4">
    <div className="flex justify-between items-center">
      <span className="text-gray-800 font-medium">Total Price:</span>
      <span className="text-green-600 font-semibold text-lg">
        {Math.round(cart.reduce((total, item) => total + parseFloat(item.price) * item.quantity, 0)).toLocaleString()} PKR
        </span>

        </div>
        <div className="flex justify-between items-center mt-1">
          <span className="text-gray-800 font-medium">Total Quantity:</span>
          <span className="text-green-600 font-semibold text-lg">
            {cart.reduce((total, item) => total + item.quantity, 0)}
          </span>
        </div>

          <Link href={`/payment?${getQueryString()}`}>
        <button
          className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-500 transition duration-200 shadow-lg transform hover:scale-105"
        >
          Checkout
        </button>
      </Link>

      </div>
    )}
  </div>
)}


      {/* Mobile Menu */}
      {isMobileMenuOpen && (
  <div className="md:hidden bg-white shadow-lg p-4 absolute w-full top-16 left-0 z-50">
    <ul className="space-y-2">
      {menuItems.map((item) => (
        <li key={item.link}> {/* Use a unique link as the key */}
          <Link
            href={item.link} 
            className="text-green-700 text-lg font-semibold block py-2 transition duration-200 hover:text-green-900"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            {item.name}
          </Link>
        </li>
      ))}
    </ul>
  </div>
)}

    </nav>
    </>
  );
};

export default Navbar
