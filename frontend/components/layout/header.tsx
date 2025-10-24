"use client";

import Link from "next/link";
import {
  ShoppingCart,
  Menu,
  X,
  SearchIcon,
  Calendar,
  Smile,
  Calculator,
  User,
  CreditCard,
  Settings,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useCart } from "@/lib/cart-context";
import Image from "next/image";
import { Sheet, SheetContent, SheetHeader } from "@/components/ui/sheet";
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { useIsMobile } from "@/hooks/use-mobile";

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { totalItems } = useCart();
  const isMobile = useIsMobile();

  const [open, setOpen] = useState(false);

  const logo = isMobile
    ? "/tasfin-logo-text-black-bg-transparent.png"
    : "/tasfin-logo-text-black-bg-transparent-2.png";

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-12 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Image
              src={logo}
              alt="Logo"
              width={1000}
              height={1000}
              className="h-12 w-auto md:h-16 lg:h-24 object-contain"
            />
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
                  <Link href="/contact">Contact</Link>
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

            <CommandDialog open={open} onOpenChange={setOpen}>
              <CommandInput placeholder="Type keyword to search..." />
              <CommandList>
                <CommandEmpty>No results found.</CommandEmpty>
                <CommandGroup heading="Suggestions">
                  <CommandItem>
                    <Calendar />
                    <span>Calendar</span>
                  </CommandItem>
                  <CommandItem>
                    <Smile />
                    <span>Search Emoji</span>
                  </CommandItem>
                  <CommandItem>
                    <Calculator />
                    <span>Calculator</span>
                  </CommandItem>
                </CommandGroup>
                <CommandSeparator />
                <CommandGroup heading="Settings">
                  <CommandItem>
                    <User />
                    <span>Profile</span>
                    <CommandShortcut>⌘P</CommandShortcut>
                  </CommandItem>
                  <CommandItem>
                    <CreditCard />
                    <span>Billing</span>
                    <CommandShortcut>⌘B</CommandShortcut>
                  </CommandItem>
                  <CommandItem>
                    <Settings />
                    <span>Settings</span>
                    <CommandShortcut>⌘S</CommandShortcut>
                  </CommandItem>
                </CommandGroup>
              </CommandList>
            </CommandDialog>
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

            <Link href="#">
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
        {mobileMenuOpen && (
          <>
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetContent>
                <SheetHeader className="p-0">
                  <Link href="#" onClick={() => setMobileMenuOpen(false)}>
                    <Button
                      size="lg"
                      className="text-foreground bg-muted no-hover rounded-t-none px-4 py-8 mb-4 w-full justify-start"
                    >
                      <Avatar className="h-12 w-12 rounded-full grayscale border border-border">
                        <AvatarImage src={"/"} alt={"User"} />
                        <AvatarFallback className="rounded-full">
                          TS
                        </AvatarFallback>
                      </Avatar>
                      <div className="grid flex-1 text-left leading-tight text-xl">
                        <span className="truncate font-medium">
                          {"Anamul hoque"}
                        </span>
                        <span className="text-muted-foreground truncate text-sm">
                          {"anamulhoque@gmail.com"}
                        </span>
                      </div>
                    </Button>
                  </Link>
                  <nav className="px-6 pb-6 flex flex-col gap-4">
                    <Link
                      href="/"
                      className="text-sm font-medium text-foreground hover:text-primary transition-colors"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Home
                    </Link>
                    <Link
                      href="/products"
                      className="text-sm font-medium text-foreground hover:text-primary transition-colors"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Shop
                    </Link>
                    <Separator />
                    <Link
                      href="/about"
                      className="text-sm font-medium text-foreground hover:text-primary transition-colors"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      About
                    </Link>
                    <Link
                      href="/contact"
                      className="text-sm font-medium text-foreground hover:text-primary transition-colors"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Contact
                    </Link>
                  </nav>
                </SheetHeader>
              </SheetContent>
            </Sheet>
          </>
        )}
      </div>
    </header>
  );
}

function ListItem({
  title,
  children,
  href,
  ...props
}: React.ComponentPropsWithoutRef<"li"> & { href: string }) {
  return (
    <li {...props}>
      <NavigationMenuLink asChild>
        <Link href={href}>
          <div className="text-sm leading-none font-medium">{title}</div>
          <p className="text-muted-foreground line-clamp-2 text-sm leading-snug">
            {children}
          </p>
        </Link>
      </NavigationMenuLink>
    </li>
  );
}
