"use client";

import { ICartItem, IWishlistItem } from "@/interfaces/context";
import React, { createContext, useContext, useState, useEffect } from "react";

const CART_KEY = "tasfin-cart";
const CART_TIME_KEY = "tasfin-cart-time";
const EXPIRY_HOURS = 24;
const WISHLIST_KEY = "tasfin-wishlist";

interface CartContextType {
  cartItems: ICartItem[];
  wishlist: IWishlistItem[];
  addToWishlist: (wishlistItem: IWishlistItem) => void;
  addCartItem: (
    newCartItem: Omit<ICartItem, "quantity"> & { quantity?: number }
  ) => void;
  totalWishlist: number;
  isInWishlist: (productId: string) => boolean;
  clearWishlist: () => void;
  removeFromWishlist: (productId: string) => void;

  removeCartItem: (productId: string, variantId: string) => void;
  updateCartQuantity: (
    productId: string,
    variantId: string,
    quantity: number
  ) => void;
  clearCart: () => void;
  totalCartItems: number;
  subtotal: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cartItems, setCartItems] = useState<ICartItem[]>([]);
  const [wishlist, setWishlist] = useState<IWishlistItem[]>([]);

  // Add to wishlist
  const addToWishlist = (wishlistItem: IWishlistItem) => {
    setWishlist((current) => {
      const exists = current.find(
        (i) => i.productId === wishlistItem.productId
      );
      if (exists) return current; // already in wishlist
      return [...current, { ...wishlistItem, addedAt: Date.now() }];
    });
  };

  // Remove from wishlist
  const removeFromWishlist = (productId: string) => {
    setWishlist((current) =>
      current.filter((i) => !(i.productId === productId))
    );
  };

  // Check if item is in wishlist
  const isInWishlist = (productId: string) =>
    wishlist.some((i) => i.productId === productId);

  // Total wishlist items
  const totalWishlist = wishlist.length;

  // Clear wishlist
  const clearWishlist = () => {
    setWishlist([]);
    localStorage.removeItem(WISHLIST_KEY);
  };

  // Load wishlist from localStorage
  useEffect(() => {
    const saved = localStorage.getItem(WISHLIST_KEY);
    if (saved) setWishlist(JSON.parse(saved));
  }, []);

  // Save wishlist whenever it changes
  useEffect(() => {
    localStorage.setItem(WISHLIST_KEY, JSON.stringify(wishlist));
  }, [wishlist]);

  // ✅ Load cart + auto-clear after 24 hours
  useEffect(() => {
    const savedCart = localStorage.getItem(CART_KEY);
    const savedTime = localStorage.getItem(CART_TIME_KEY);

    if (savedCart && savedTime) {
      const savedTimestamp = Number(savedTime);
      const now = Date.now();

      // 24 hours in milliseconds
      const expiryMs = EXPIRY_HOURS * 60 * 60 * 1000;

      if (now - savedTimestamp > expiryMs) {
        // Cart expired → clear
        localStorage.removeItem(CART_KEY);
        localStorage.removeItem(CART_TIME_KEY);
      } else {
        setCartItems(JSON.parse(savedCart));
      }
    }
  }, []);

  // ✅ Save cart + save timestamp every time cart changes
  useEffect(() => {
    localStorage.setItem(CART_KEY, JSON.stringify(cartItems));
    localStorage.setItem(CART_TIME_KEY, Date.now().toString());
  }, [cartItems]);

  const addCartItem = (
    newCartItem: Omit<ICartItem, "quantity"> & { quantity?: number }
  ) => {
    setCartItems((currentCartItems) => {
      const index = currentCartItems.findIndex(
        (item) =>
          item.productId === newCartItem.productId &&
          item.variantId === newCartItem.variantId
      );

      if (index > -1) {
        const updated = [...currentCartItems];
        const existing = updated[index];

        updated[index] = {
          ...existing,
          quantity: Math.min(
            existing.quantity + (newCartItem.quantity || 1),
            existing.maxStock
          ),
        };
        return updated;
      }

      return [
        ...currentCartItems,
        { ...newCartItem, quantity: newCartItem.quantity || 1 },
      ];
    });
  };

  const removeCartItem = (productId: string, variantId: string) => {
    setCartItems((currentCartItems) =>
      currentCartItems.filter(
        (cartItem) =>
          !(
            cartItem.productId === productId && cartItem.variantId === variantId
          )
      )
    );
  };

  const updateCartQuantity = (
    productId: string,
    variantId: string,
    quantity: number
  ) => {
    setCartItems((currentCartItems) =>
      currentCartItems.map((cartItem) =>
        cartItem.productId === productId && cartItem.variantId === variantId
          ? {
              ...cartItem,
              quantity: Math.min(Math.max(1, quantity), cartItem.maxStock),
            }
          : cartItem
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
    localStorage.removeItem(CART_KEY);
    localStorage.removeItem(CART_TIME_KEY);
  };

  const totalCartItems = cartItems.reduce(
    (sum, cartItem) => sum + cartItem.quantity,
    0
  );
  const subtotal = cartItems.reduce(
    (sum, cartItem) => sum + cartItem.price * cartItem.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addCartItem,
        removeCartItem,
        updateCartQuantity,
        clearCart,
        totalCartItems,
        subtotal,

        wishlist,
        addToWishlist,
        isInWishlist,
        totalWishlist,
        clearWishlist,
        removeFromWishlist,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCartAndWishlist() {
  const ctx = useContext(CartContext);
  if (!ctx)
    throw new Error("useCartAndWishlist must be used within a CartProvider");
  return ctx;
}
