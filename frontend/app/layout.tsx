import type React from "react";
import type { Metadata } from "next";
import { Playfair_Display, Inter, Cormorant_Garamond } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { CartProvider } from "@/lib/cart-context";
import { Suspense } from "react";
import LoadingPage from "@/components/loading-page";
import { Toaster } from "@/components/ui/sonner";
import BottomActions from "@/components/layout/bottom-actions";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-cormorant",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "TASFIN - Fashion for Her",
  description:
    "Discover elegant women's fashion for the modern Bangladeshi woman. Shop 2-piece, 3-piece, tops, salwar, and more.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`font-sans ${inter.variable} ${cormorant.variable}  ${playfair.variable} antialiased`}
      >
        <CartProvider>
          <Suspense fallback={<LoadingPage />}>
            <Header />
            {/* Bottom actions on mobile */}
            <BottomActions />

            {children}
            <Toaster />
            <Footer />
            <Analytics />
          </Suspense>
        </CartProvider>
      </body>
    </html>
  );
}
