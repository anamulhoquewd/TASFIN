"use client";

import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import { useSidebar } from "@/components/ui/sidebar";
import { MenuIcon } from "lucide-react";
import UserMenu from "./use-menu";

export default function Header() {
  const { isMobile, setOpenMobile } = useSidebar();

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between gap-4 border-b bg-background px-4 md:px-6">
      {/* Mobile Menu Button */}
      {isMobile && (
        <Button
          onClick={() => setOpenMobile(true)}
          variant="ghost"
          size="icon"
          className="order-1"
        >
          <MenuIcon className="h-5 w-5" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      )}

      <div className="flex items-center gap-2 order-2 md:order-1">
        <h3 className="font-playfair font-semibold text-foreground">TASFIN</h3>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-4 order-3">
        <ModeToggle />
        <UserMenu />
      </div>
    </header>
  );
}
