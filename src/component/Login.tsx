'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import Footer from './Footer';
import Navbar from './Navbar';
import { StaticImageData } from 'next/image';


type CartItem = {
  id: number;
  name: string;
  price: string;
  quantity: number;
  image: StaticImageData;
};

const Login = () => {
  const [cart, setCart] = useState<CartItem[]>([]); 

  return (
    <section>
      <Navbar cart={cart} setCart={setCart} />

      <section className="bg-white min-h-screen mt-16 lg:mt-36 flex items-center justify-center">
        <div className="shadow-2xl rounded-3xl p-12 w-full max-w-2xl border border-gray-100">
          <div className="mb-8 text-center">
            <p className="text-4xl font-medium text-gray-700 mb-2">
              Sign in without a password
            </p>
            <p className="text-sm text-gray-500 mb-4">
              Receive a secure sign link to view your orders, details, Rewards Points, and manage your subscriptions.
            </p>
            <Link href="#" aria-label="Get a Sign In Link">
              <button className="bg-green-600 text-white py-3 px-6 rounded-full shadow-md hover:bg-green-500 transition duration-300 transform hover:scale-105">
                Get a Sign In Link
              </button>
            </Link>
          </div>

          <div className="flex items-center my-6">
            <div className="flex-grow border-t border-gray-300"></div>
            <span className="mx-2 text-gray-500">OR</span>
            <div className="flex-grow border-t border-gray-300"></div>
          </div>

          <div className="mb-8">
            <p className="text-lg font-medium text-gray-700 mb-2">Sign in using your existing password</p>
            <p className="text-sm text-gray-500 mb-4">Please enter your email and password to sign in.</p>

            <form>
              <div className="mb-4">
                <input
                  type="email"
                  placeholder="Email"
                  className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition shadow-sm hover:shadow-lg"
                  required
                />
              </div>
              <div className="mb-4">
                <input
                  type="password"
                  placeholder="Password"
                  className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition shadow-sm hover:shadow-lg"
                  required
                />
              </div>
              <div className="flex justify-center">
                <button
                  type="submit"
                  className="w-52 bg-green-600 text-white py-3 rounded-full hover:bg-green-500 transition duration-300 shadow-md hover:shadow-lg transform hover:scale-105"
                >
                  Sign In
                </button>
              </div>
            </form>

            <div className="text-center mt-4">
              <Link href="#" className="text-green-700 ">
                Forgotten Password?
              </Link>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </section>
  );
};

export default Login;
