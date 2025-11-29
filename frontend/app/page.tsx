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
import CTASection from "@/components/home/cta-section";

export default function HomePage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <Hero />

      {/* <ProductShowcase /> */}

      {/* New Arrivals Section */}
      <ArrivalsSection />

      {/* Featured Categories */}
      <CategoriesSection />

      {/* Testimonials */}
      <TestimonialsSection />

      {/* CTA Section */}
      <CTASection />
    </div>
  );
}
