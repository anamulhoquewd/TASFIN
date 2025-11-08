"use client";

import { ICartItem } from "@/interfaces/global";
import React, { createContext, useContext, useState, useEffect } from "react";

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

  // Load cart from in-memory storage on mount
  useEffect(() => {
    // Cart will be empty on initial load
    // You can implement server-side cart sync here if needed
  }, []);

  const addItem = (
    newItem: Omit<ICartItem, "quantity"> & { quantity?: number }
  ) => {
    setItems((currentItems) => {
      const existingItemIndex = currentItems.findIndex(
        (item) =>
          item.productId === newItem.productId &&
          item.variantId === newItem.variantId
      );

      if (existingItemIndex > -1) {
        // Item exists, update quantity
        const updatedItems = [...currentItems];
        const existingItem = updatedItems[existingItemIndex];
        updatedItems[existingItemIndex] = {
          ...existingItem,
          quantity: Math.min(
            existingItem.quantity + (newItem.quantity || 1),
            existingItem.maxStock
          ),
        };
        return updatedItems;
      } else {
        // New item, add to cart
        return [
          ...currentItems,
          {
            ...newItem,
            quantity: newItem.quantity || 1,
          },
        ];
      }
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
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
