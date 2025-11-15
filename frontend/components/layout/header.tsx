"use client";

import Link from "next/link";
import { ShoppingCart, Menu, X, SearchIcon, User } from "lucide-react";
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
import Searching from "../search";
import { MobileMenu } from "./mobile-menu";

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { totalItems } = useCart();

  const [open, setOpen] = useState(false);

  const logo = "/tasfin-logo-text-black-bg-transparent-2.png";

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-12 items-center justify-between overflow-hidden">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            {logo ? (
              <Image
                src={logo}
                alt="Logo"
                width={600}
                height={600}
                className="h-12 w-auto md:h-16 lg:h-24 object-contain"
              />
            ) : (
              <div className="flex h-full items-center justify-center">
                <span className="text-muted-foreground">No image</span>
              </div>
            )}
          </Link>

          {/* Desktop Navigation */}
          <NavigationMenu
            className="hidden md:flex items-center gap-8"
            viewport={false}
          >
            <NavigationMenuList>
              <NavigationMenuItem className="transition-all duration-300">
                <NavigationMenuLink
                  asChild
                  className={`${navigationMenuTriggerStyle()} transition-colors duration-300`}
                >
                  <Link href="/">Home</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink
                  asChild
                  className={`${navigationMenuTriggerStyle()} transition-colors duration-300`}
                >
                  <Link href="/products">Shop</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink
                  asChild
                  className={`${navigationMenuTriggerStyle()} transition-colors duration-300`}
                >
                  <Link href="/about">About</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink
                  asChild
                  className={`${navigationMenuTriggerStyle()} transition-colors duration-300`}
                >
                  <Link href="/support">Support</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          <>
            <Button
              onClick={() => setOpen(true)}
              variant="outline"
              size={"sm"}
              className="w-32 sm:w-64 md:w-80 flex items-center justify-between gap-2 no-hover cursor-pointer bg-transparent border-border text-foreground"
            >
              <div className="flex items-center justify-between gap-2">
                <SearchIcon />
                <span className="text-muted-foreground">Type...</span>
              </div>
            </Button>

            <Searching open={open} setOpen={setOpen} />
          </>

          {/* Cart & Mobile Menu */}
          <div className="flex items-center gap-1">
            <Link href="/cart">
              <Button
                variant="ghost"
                size="icon"
                className="relative transition-colors duration-300 cursor-pointer bg-transparent lg:border lg:hover:border-primary"
              >
                <ShoppingCart className="h-5 w-5" />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
              </Button>
            </Link>

            <Link href="/dashboard">
              <Button
                variant="ghost"
                size="icon"
                className="relative transition-colors duration-300 cursor-pointer bg-transparent lg:border lg:hover:border-primary"
              >
                <User className="h-5 w-5" />
              </Button>
            </Link>

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
        </div>

        {/* Mobile Navigation */}
        <MobileMenu isOpen={mobileMenuOpen} onClose={setMobileMenuOpen} />
      </div>
    </header>
  );
}
