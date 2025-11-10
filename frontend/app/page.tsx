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
import { ProductShowcase } from "@/components/home/showcase";

export default function HomePage() {
  const { categories } = useCategory();

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <Hero />

      <ProductShowcase />

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
