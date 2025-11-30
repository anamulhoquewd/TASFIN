"use client";

import { ICartItem } from "@/interfaces/global";
import React, { createContext, useContext, useState, useEffect } from "react";

const CART_KEY = "tasfin-cart";
const CART_TIME_KEY = "tasfin-cart-time";
const EXPIRY_HOURS = 24;

interface CartContextType {
  items: ICartItem[];
  addItem: (
    newItem: Omit<ICartItem, "quantity"> & { quantity?: number }
  ) => void;
  removeItem: (productId: string, variantId: string) => void;
  updateQuantity: (
    productId: string,
    variantId: string,
    quantity: number
  ) => void;
  clearCart: () => void;
  totalItems: number;
  subtotal: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<ICartItem[]>([]);

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
        setItems(JSON.parse(savedCart));
      }
    }
  }, []);

  // ✅ Save cart + save timestamp every time cart changes
  useEffect(() => {
    localStorage.setItem(CART_KEY, JSON.stringify(items));
    localStorage.setItem(CART_TIME_KEY, Date.now().toString());
  }, [items]);

  const addItem = (
    newItem: Omit<ICartItem, "quantity"> & { quantity?: number }
  ) => {
    setItems((currentItems) => {
      const index = currentItems.findIndex(
        (item) =>
          item.productId === newItem.productId &&
          item.variantId === newItem.variantId
      );

      if (index > -1) {
        const updated = [...currentItems];
        const existing = updated[index];

        updated[index] = {
          ...existing,
          quantity: Math.min(
            existing.quantity + (newItem.quantity || 1),
            existing.maxStock
          ),
        };
        return updated;
      }

      return [...currentItems, { ...newItem, quantity: newItem.quantity || 1 }];
    });
  };

  const removeItem = (productId: string, variantId: string) => {
    setItems((currentItems) =>
      currentItems.filter(
        (item) =>
          !(item.productId === productId && item.variantId === variantId)
      )
    );
  };

  const updateQuantity = (
    productId: string,
    variantId: string,
    quantity: number
  ) => {
    setItems((currentItems) =>
      currentItems.map((item) =>
        item.productId === productId && item.variantId === variantId
          ? {
              ...item,
              quantity: Math.min(Math.max(1, quantity), item.maxStock),
            }
          : item
      )
    );
  };

  const clearCart = () => {
    setItems([]);
    localStorage.removeItem(CART_KEY);
    localStorage.removeItem(CART_TIME_KEY);
  };

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        totalItems,
        subtotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within a CartProvider");
  return ctx;
}
