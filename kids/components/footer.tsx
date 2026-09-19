"use client";

import { Globe, Mail, MessageCircle } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { label: "Home", href: "#home" },
    { label: "Products", href: "#products" },
    { label: "Business Terms", href: "#terms" },
    { label: "FAQ", href: "#faq" },
  ];

  const socialLinks = [
    { icon: MessageCircle, href: "#", label: "Instagram" },
    { icon: MessageCircle, href: "#", label: "Facebook" },
    { icon: Globe, href: "https://tasfin.vercel.app", label: "TASFIN" },
  ];

  return (
    <footer className="bg-foreground text-background border-t border-border/20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 py-12 md:py-16">
          {/* Brand */}
          <div className="flex flex-col gap-4">
            <div>
              <h2 className="text-xl font-bold">
                TASFIN<span className="ml-1 opacity-80">| Kids</span>
              </h2>
              <p className="text-sm opacity-80 mt-1">
                Premium kids fashion wholesale export
              </p>
            </div>
            <p className="text-xs opacity-70">
              A sub-brand of{" "}
              <Link
                className="text-blue-700 underline font-semibold"
                href={"https://tasfin.vercel.app/"}
              >
                TASFIN
              </Link>{" "}
              Fashion • Bangladesh 🇧🇩
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm opacity-80 hover:opacity-100 transition-opacity"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2 opacity-80">
                <Mail className="size-4" />
                <span>nasrullahtasfin@gmail.com</span>
              </li>
              <li className="flex items-center gap-2 opacity-80">
                <MessageCircle className="size-4" />
                <span>+92 322 2926690 </span>
              </li>
              <li className="flex items-center gap-2 opacity-80">
                <MessageCircle className="size-4" />
                <span>+880 1975 024262 🇧🇩</span>
              </li>
              <li className="opacity-80">
                <span>
                  House: 41, Road: 10/2, Block: F, South Banasree, Dhaka
                  Bangladesh
                </span>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h3 className="font-semibold mb-4">Follow Us</h3>
            <div className="flex gap-4">
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <Link
                  key={label}
                  target="_blank"
                  href={href}
                  aria-label={label}
                  className="p-2 rounded-lg bg-background/10 hover:bg-background/20 transition-colors"
                  title={label}
                >
                  <Icon className="size-4" />
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-background/10 py-6 flex flex-col md:flex-row items-center justify-between gap-4 text-sm opacity-70">
          <p>&copy; {currentYear} TASFIN | Kids Inc.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:opacity-100 transition-opacity">
              Privacy Policy
            </a>
            <a href="#" className="hover:opacity-100 transition-opacity">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
