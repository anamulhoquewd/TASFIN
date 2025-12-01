"use client";

import Link from "next/link";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { navLinks } from "@/lib/utils";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: (isOpen: boolean) => void;
}

export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
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
