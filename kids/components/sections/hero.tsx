"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function HeroSection() {
  const handleCtaClick = () => {
    const element = document.querySelector("#inquiry");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="home"
      className="relative min-h-[90vh] flex items-center bg-linear-to-b from-accent/10 via-background to-background overflow-hidden py-12 md:py-0"
    >
      {/* Decorative elements */}
      <div className="absolute inset-0 z-10">
        <div className="absolute top-20 right-10 w-72 h-72 bg-blue-200/20 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-10 w-72 h-72 bg-pink-200/20 rounded-full blur-3xl" />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 md:flex-row-reverse gap-8 md:gap-12 items-center">
          {/* Hero Image Placeholder */}
          <div className="md:order-2 flex items-center justify-center overflow-hidden rounded-3xl md:rounded-none border border-border md:border-l">
            <Image
              src={"./ship.avif"}
              width={1000}
              height={1000}
              className="object-cover w-full h-auto"
              alt="Ship"
            />
          </div>

          {/* Content */}
          <div className="flex flex-col gap-6 md:order-1">
            <div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground mb-4">
                Premium Kids Fashion
                <span className="block text-transparent bg-clip-text bg-linear-to-r from-pink-400 via-purple-400 to-blue-400">
                  Wholesale Export
                </span>
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground">
                Quality fabric, trusted partnership, and dedicated support for
                wholesale shop owners across Pakistan.
              </p>
            </div>

            <p className="text-base text-muted-foreground/90 leading-relaxed">
              Part of <strong>TASFIN</strong>, a leading women&apos;s fashion
              export house with years of expertise in international wholesale
              partnerships. We bring the same dedication to kids&apos; clothing.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button
                onClick={handleCtaClick}
                size="lg"
                className="rounded-full px-8 h-12 text-base"
              >
                Get Wholesale Pricing
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="rounded-full px-8 h-12 text-base"
                onClick={() => {
                  const element = document.querySelector("#products");
                  if (element) {
                    element.scrollIntoView({ behavior: "smooth" });
                  }
                }}
              >
                Browse Products
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
