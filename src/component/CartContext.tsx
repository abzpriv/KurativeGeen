'use client'; 

import { createContext, useContext, useEffect, useState } from 'react';

interface CartItem {
  _id: string;
  image: string;
  name: string;
  price: number; 
  quantity: number;
  tablets?: number;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  updateCart: (item: CartItem) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart);
        console.log('Loaded cart from localStorage:', parsedCart);
        setCart(parsedCart);
      } catch (error) {
        console.error('Error parsing cart from localStorage:', error);
      }
    } else {
      console.log('No cart found in localStorage');
    }
  }, []);

  useEffect(() => {
    if (cart.length > 0) {
      localStorage.setItem('cart', JSON.stringify(cart));
      console.log('Saved cart to localStorage:', cart);
    } else {
      localStorage.removeItem('cart');
      console.log('Cart is empty, removed from localStorage');
    }
  }, [cart]); 

  const addToCart = (item: CartItem) => {
    setCart((prevCart) => {
      const existingItemIndex = prevCart.findIndex(cartItem => cartItem._id === item._id);
      if (existingItemIndex > -1) {
        const updatedCart = [...prevCart];
        updatedCart[existingItemIndex].quantity += item.quantity;
        return updatedCart;
      }
      return [...prevCart, item];
    });
  };

  const updateCart = (item: CartItem) => {
    setCart((prevCart) => {
      return prevCart.map(cartItem =>
        cartItem._id === item._id ? item : cartItem
      );
    });
  };

  const clearCart = () => {
    setCart([]);
    localStorage.removeItem('cart');
    console.log('Cart cleared and removed from localStorage');
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, updateCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
