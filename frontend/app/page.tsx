"use client";

import { ArrivalsSection } from "@/components/home/arrivals";
import { CategoriesSection } from "@/components/home/categories";
import { Hero } from "@/components/home/hero";
import { ProductShowcase } from "@/components/home/showcase";
import { TestimonialsSection } from "@/components/home/testimonials";

export default function HomePage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <Hero />

      <ProductShowcase />

      {/* New Arrivals Section */}
      <ArrivalsSection />

      {/* Featured Categories */}
      <CategoriesSection />

      {/* Testimonials */}
      <TestimonialsSection />

      {/* CTA Section */}
      {/* <CTASection /> */}
    </div>
  );
}
