"use client";

import { useCartAndWishlist } from "@/lib/cart-context";
import { Store, Heart, ShoppingCart, User } from "lucide-react";
import Link from "next/link";
import React from "react";

function BottomActions() {
  const { totalCartItems, totalWishlist } = useCartAndWishlist();
  return (
    <div className="md:hidden fixed bottom-0 left-0 w-full z-50 flex justify-around pt-1 bg-background/95 backdrop-blur-sm border-t border-border">
      <Link href={"/shop"}>
        <button className="relative transition-colors duration-300 bg-transparent hover:bg-transparent cursor-pointer flex flex-col items-center p-1 gap-0.5">
          <div className="relative">
            <Store className="w-4 h-4 text-muted-foreground hover:text-foreground" />
          </div>
          <span className="text-sm font-cormorant font-light capitalize">
            Shop
          </span>
        </button>
      </Link>
      <Link href={"/wishlist"}>
        <button className="relative transition-colors duration-300 bg-transparent hover:bg-transparent cursor-pointer flex flex-col items-center p-1 gap-0.5">
          <div className="relative">
            <Heart className="w-4 h-4 text-muted-foreground hover:text-foreground" />
            <span className="absolute -top-1 -right-4 h-5 w-5 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center">
              {totalWishlist}
            </span>
          </div>
          <span className="text-sm font-cormorant font-light capitalize">
            Wishlist
          </span>
        </button>
      </Link>
      <Link href={"/cart"}>
        <button className="relative transition-colors duration-300 bg-transparent hover:bg-transparent cursor-pointer flex flex-col items-center p-1 gap-0.5">
          <div className="relative">
            <ShoppingCart className="w-4 h-4 text-muted-foreground hover:text-foreground" />
            <span className="absolute -top-1 -right-4 h-5 w-5 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center">
              {totalCartItems}
            </span>
          </div>
          <span className="text-sm font-cormorant font-light capitalize">
            Cart
          </span>
        </button>
      </Link>
      <Link href={"/account"}>
        <button className="relative transition-colors duration-300 bg-transparent hover:bg-transparent cursor-pointer flex flex-col items-center p-1 gap-0.5">
          <div className="relative">
            <User className="w-4 h-4 text-muted-foreground hover:text-foreground" />
          </div>
          <span className="text-sm font-cormorant font-light capitalize">
            Account
          </span>
        </button>
      </Link>
    </div>
  );
}

export default BottomActions;
