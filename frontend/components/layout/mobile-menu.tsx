"use client";

import Link from "next/link";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { Handbag, Headset, Home, MessageSquareWarning } from "lucide-react";

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
          <DrawerTitle className="text-xl font-bold text-neutral-900">
            Menu
          </DrawerTitle>
        </DrawerHeader>

        <div className="px-4 pb-8">
          {/* Menu items */}
          <nav className="space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => onClose(false)}
                  className="flex items-center gap-2 p-2 rounded-lg border border-primary/20"
                >
                  <span>
                    <Icon className="text-primary w-4 h-4" />
                  </span>
                  <span className="text-primary text-sm">{item.name}</span>
                </Link>
              );
            })}
          </nav>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
