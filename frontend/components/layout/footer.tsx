"use client";

import Link from "next/link";
import { Facebook, Instagram, Share2, Twitter } from "lucide-react";
import { Button } from "@/components/ui/button";
import SubscribeForm from "../subscribe-fomr";
import useSubscribe from "@/hooks/use-subscribe";

export function Footer() {
  const { form, isLoading, handleSubscribe } = useSubscribe();

  const quickLinks = [
    { href: "/shop", label: "Shop All" },
    { href: "/shop?category=new-arrivals", label: "New Arrivals" },
    { href: "/about", label: "About Us" },
    { href: "/support", label: "Support" },
    { href: "/order-tracking", label: "Order Tracking" },
    { href: "/faq", label: "FAQ" },
  ];

  const legalLinks = [
    { href: "/privacy", label: "Privacy Policy" },
    { href: "/terms", label: "Terms of Service" },
    { href: "/shipping", label: "Shipping Info" },
    { href: "/returns", label: "Returns" },
  ];

  const socialLinks = [
    {
      href: "https://www.facebook.com/tasfinshop",
      icon: <Facebook className="h-4 w-4" />,
    },
    {
      href: "https://www.instagram.com/tasfinshop/",
      icon: <Instagram className="h-4 w-4" />,
    },
  ];

  return (
    <footer className="border-t border-border bg-muted/30 font-cormorant">
      <div className="container mx-auto px-4 pt-8 pb-16 md:pb-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {/* Logo & Description */}
          <div className="col-span-2 lg:col-span-1">
            <h2 className="text-2xl tracking-[0.3em] uppercase font-light mb-4">
              Tasfin
            </h2>
            <p className="text-sm text-muted-foreground leading-relaxed tracking-[0.05em] mb-6">
              Timeless elegance meets modern sophistication. Discover curated
              collections designed for the contemporary woman.
            </p>
            {/* Social Icons */}
            <div className="flex gap-4">
              {socialLinks.map((link) => (
                <Link key={link.href} href={link.href} target="_blank">
                  <Button
                    size="icon"
                    className="bg-transparent hover:bg-transparent cursor-pointer text-foreground/70 hover:text-foreground transition-colors duration-300"
                  >
                    {link.icon}
                  </Button>
                </Link>
              ))}
              <Button
                size="icon"
                className="bg-transparent hover:bg-transparent cursor-pointer text-foreground/70 hover:text-foreground transition-colors duration-300"
              >
                <Share2 className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xs font-medium tracking-[0.2em] uppercase mb-4">
              Quick Links
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-foreground/70 hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Information */}
          <div>
            <h3 className="text-xs font-medium tracking-[0.2em] uppercase mb-4">
              Information
            </h3>
            <ul className="space-y-3">
              {legalLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-foreground/70 hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div className="col-span-2 lg:col-span-1">
            <h3 className="text-xs tracking-[0.2em] uppercase mb-4">
              Newsletter
            </h3>
            <p className="text-sm text-foreground/70 mb-4">
              Subscribe for exclusive offers and new arrivals.
            </p>
            <SubscribeForm
              form={form}
              handleSubscribe={handleSubscribe}
              isLoading={isLoading}
            />
          </div>
        </div>

        <div className="mt-8 pt-4 border-t border-border text-center text-sm text-muted-foreground">
          <p>Copyright &copy; {new Date().getFullYear()} TASFIN Inc.</p>
        </div>
      </div>
    </footer>
  );
}
