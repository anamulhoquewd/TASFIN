"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/mode-toggle";
import { MenuIcon } from "lucide-react";
import { useSidebar } from "@/components/ui/sidebar";
import UserMenu from "./use-menu";
import useSettings from "@/app/admin/settings/_hooks/useSettings";

export default function Header() {
  const { isMobile, setOpenMobile } = useSidebar();
  const { settings } = useSettings();
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
        <a
          href="/admin"
          className="flex items-center gap-2 font-semibold md:flex"
        >
          <Image
            src={settings?.logo?.url || "/shuddhoghor-logo.png"}
            width={40}
            height={40}
            alt={settings?.siteName || "TASFIN Admin"}
            className="rounded"
          />
          <span className="hidden md:inline-block">
            {settings?.siteName || "TASFIN Admin"}
          </span>
        </a>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-4 order-3">
        <ModeToggle />
        <UserMenu />
      </div>
    </header>
  );
}
