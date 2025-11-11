"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/mode-toggle";
import { MenuIcon } from "lucide-react";
import { useSidebar } from "@/components/ui/sidebar";
import UserMenu from "./use-menu";
import useSettings from "@/app/admin/settings/_hooks/useSettings";
import { useTheme } from "next-themes";

export default function Header() {
  const { isMobile, setOpenMobile } = useSidebar();
  const { settings } = useSettings();
  const { theme } = useTheme();

  const logo =
    theme === "light"
      ? "/tasfin-logo-text-black-bg-transparent.png"
      : "/tasfin-logo-text-white-bg-transparent.png";

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

      {/* Logo */}
      <div className="flex items-center gap-2 order-2 md:order-1">
        {logo && (
          <Image
            src={logo}
            width={100}
            height={100}
            alt={settings?.siteName || "TASFIN Admin"}
            className="w-14"
          />
        )}{" "}
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
