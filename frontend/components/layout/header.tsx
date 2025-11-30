"use client";

import Link from "next/link";
import { ShoppingCart, Menu, X, SearchIcon, User, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useCart } from "@/lib/cart-context";
import Image from "next/image";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { MobileMenu } from "./mobile-menu";
import { navLinks } from "@/lib/utils";

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { totalItems } = useCart();

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between overflow-hidden">
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-xs tracking-[0.15em] uppercase text-muted-foreground hover:text-foreground transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Logo */}
          <Link href="/" className="absolute left-1/2 -translate-x-1/2">
            <h1 className="text-2xl sm:text-3xl tracking-[0.2em] font-light uppercase text-foreground font-cormorant">
              Tasfin
            </h1>
          </Link>

          {/* Right Actions */}
          <div className="items-center gap-2 hidden md:flex">
            <Link href="/cart">
              <Button className="relative transition-colors duration-300 bg-transparent hover:bg-transparent text-muted-foreground hover:text-foreground cursor-pointer">
                <ShoppingCart className="h-5 w-5" />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
              </Button>
            </Link>
            <Link href="/wishlist">
              <Button className="relative transition-colors duration-300 bg-transparent hover:bg-transparent text-muted-foreground hover:text-foreground cursor-pointer">
                <Heart className="h-5 w-5" />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
              </Button>
            </Link>

            <Link href="/dashboard">
              <Button className="relative transition-colors duration-300 bg-transparent hover:bg-transparent text-muted-foreground hover:text-foreground cursor-pointer">
                <User className="h-5 w-5" />
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </Button>
        </div>

        {/* Mobile Navigation */}
        <MobileMenu isOpen={mobileMenuOpen} onClose={setMobileMenuOpen} />
      </div>
    </header>
  );
}
