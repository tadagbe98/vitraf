"use client";

import { createContext, useContext, useState, useEffect } from 'react';

// Define the shape of a single item in the cart
export type ShopItem = {
  id: string;
  src: string;
  name: string;
  price: number;
  description: string;
  aiHint?: string;
};

// Define the shape of a cart item, which includes quantity
export type CartItem = ShopItem & {
  quantity: number;
};

// Define the shape of the cart context
interface CartContextType {
  cartItems: CartItem[];
  addItem: (item: ShopItem) => void;
  removeItem: (itemId: string) => void;
  updateItemQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  itemCount: number;
  cartTotal: number;
  isAnimating: boolean;
}

// Create the context with a default undefined value
const CartContext = createContext<CartContextType | undefined>(undefined);

// CartProvider component to wrap around the application
export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isAnimating, setIsAnimating] = useState(false);

  // Load cart from localStorage on initial render
  useEffect(() => {
    try {
      const storedCart = localStorage.getItem('vitraf_cart');
      if (storedCart) {
        setCartItems(JSON.parse(storedCart));
      }
    } catch (error) {
      console.error("Failed to parse cart from localStorage", error);
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('vitraf_cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const addItem = (item: ShopItem) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(i => i.id === item.id);
      if (existingItem) {
        // If item exists, increase quantity
        return prevItems.map(i =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      } else {
        // If item doesn't exist, add it with quantity 1
        return [...prevItems, { ...item, quantity: 1 }];
      }
    });
    
    // Trigger animation
    setIsAnimating(true);
    const timer = setTimeout(() => setIsAnimating(false), 500); // Duration should match animation
    return () => clearTimeout(timer);
  };

  const removeItem = (itemId: string) => {
    setCartItems(prevItems => prevItems.filter(i => i.id !== itemId));
  };

  const updateItemQuantity = (itemId: string, quantity: number) => {
    setCartItems(prevItems => {
      if (quantity <= 0) {
        return prevItems.filter(i => i.id !== itemId);
      }
      return prevItems.map(i =>
        i.id === itemId ? { ...i, quantity } : i
      );
    });
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const itemCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  const cartTotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <CartContext.Provider value={{ cartItems, addItem, removeItem, updateItemQuantity, clearCart, itemCount, cartTotal, isAnimating }}>
      {children}
    </CartContext.Provider>
  );
};

// Custom hook to use the cart context
export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
