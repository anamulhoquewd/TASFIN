"use client";

import Link from "next/link";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { Handbag, Headset, Home, MessageSquareWarning } from "lucide-react";
import { navLinks } from "@/lib/utils";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: (isOpen: boolean) => void;
}

export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const menuItems = [
    { name: "Home", href: "/", icon: Home },
    { name: "Shop", href: "/products", icon: Handbag },
    { name: "About", href: "/about", icon: MessageSquareWarning },
    { name: "Support", href: "/support", icon: Headset },
  ];

  return (
    <Drawer open={isOpen} onOpenChange={onClose}>
      <DrawerContent>
        <DrawerHeader className="px-4 py-6">
          <DrawerTitle className="text-xl font-light tracking-[0.2em] uppercase font-cormorant">
            Menu
          </DrawerTitle>
        </DrawerHeader>

        <div className="px-4 pb-8">
          {/* Menu items */}

          <nav className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => onClose(false)}
                className="text-xs tracking-[0.15em] uppercase text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
