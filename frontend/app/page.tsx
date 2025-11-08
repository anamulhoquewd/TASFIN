"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import useCategory from "@/hooks/categories/useCategory";
import { Hero } from "@/components/home/hero";
import { ArrivalsSection } from "@/components/home/arrivals";
import { CategoriesSection } from "@/components/home/categories";
import { TestimonialsSection } from "@/components/home/testimonials";

export default function HomePage() {
  const { categories } = useCategory();

  // Sample images for the slideshow
  const slides = [
    {
      url: "https://www.aarong.com/_next/image?url=https%3A%2F%2Fmcprod.aarong.com%2Fmedia%2Fcollateral%2Faarong%2Fbrands_slider_banner%2F1-D-Herstory-Brand-Slider-1920x820-19-07-2025-SM.png&w=1920&q=75",
      alt: "Elegance Meets Style",
      // title: "Elegance Meets Style",
      description:
        "Discover the finest collection of women&apos;s fashion designed for the modern Bangladeshi woman",
    },
    {
      url: "https://twelvebd.com/cdn/shop/files/slider-1150x2250.jpg",
      alt: "Multiple Varieties",
      title: "Multiple Varieties",
      description:
        "Discover the finest collection of women&apos;s fashion designed for the modern Bangladeshi woman",
    },
  ];

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <Hero slides={slides} />

      {/* New Arrivals Section */}
      <ArrivalsSection />

      {/* Featured Categories */}
      <CategoriesSection categories={categories} />

      {/* Testimonials */}
      <TestimonialsSection />

      {/* CTA Section */}
      <section className="py-12 md:py-16 lg:py-20">
        <div className="container mx-auto px-4">
          <Card className="border-border bg-gradient-to-br from-secondary/20 to-accent/10">
            <CardContent className="p-8 md:p-12 text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Ready to Elevate Your Style?
              </h2>
              <p className="text-muted-foreground mb-8 max-w-2xl mx-auto text-pretty">
                Browse our complete collection and find the perfect outfit for
                every occasion
              </p>
              <Button asChild size="lg">
                <Link href="/products">
                  Start Shopping
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
