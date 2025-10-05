"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Star } from "lucide-react";
import useCategory from "@/hooks/category/useCategory";
import Image from "next/image";

export default function HomePage() {
  const { categories } = useCategory();
  console.log(categories);

  const testimonials = [
    {
      name: "Ayesha Rahman",
      rating: 5,
      text: "Absolutely love the quality and designs! The fabrics are so comfortable and the fit is perfect.",
    },
    {
      name: "Nadia Khan",
      rating: 5,
      text: "TASFIN has become my go-to for all occasions. Beautiful collection and excellent customer service.",
    },
    {
      name: "Farah Ahmed",
      rating: 5,
      text: "The attention to detail is amazing. Every piece feels premium and looks stunning!",
    },
  ];

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative min-h-[600px] md:min-h-[700px] flex items-center justify-center bg-gradient-to-br from-secondary/20 to-accent/10">
        <div className="absolute inset-0 bg-[url('/tasfin-logo-text-black-bg-white-2.png')] bg-cover bg-center opacity-20" />
        <div className="container mx-auto px-4 relative z-10 text-center">
          <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6 text-balance">
            Elegance Meets Style
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto text-pretty">
            Discover the finest collection of women's fashion designed for the
            modern Bangladeshi woman
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="text-base">
              <Link href="/products">
                Shop Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="text-base bg-transparent"
            >
              <Link href="/about">Explore Collection</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-4">
              Shop by Category
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Explore our curated collection of elegant women's fashion
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
            {categories.map((category) => (
              <Link
                key={category._id}
                href={
                  category.slug ? `/category/${category.slug}` : "/products"
                }
              >
                <Card className="group overflow-hidden border-border hover:shadow-lg transition-all duration-300">
                  <CardContent className="p-0">
                    <div className="aspect-square relative overflow-hidden">
                      <Image
                        src={category.image?.url || "/placeholder.svg"}
                        alt={category.image?.alt || category.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        layout="fill"
                      />
                    </div>
                    <div className="p-4 text-center">
                      <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                        {category.name}
                      </h3>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Special Offer Banner */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4">
            New Arrivals Just Dropped!
          </h2>
          <p className="text-lg mb-6 opacity-90">
            Get 20% off on all new collection items this week
          </p>
          <Button asChild size="lg" variant="secondary">
            <Link href="/products?filter=new">
              Shop New Arrivals
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-4">
              What Our Customers Say
            </h2>
            <p className="text-muted-foreground">
              Join thousands of happy customers
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="border-border">
                <CardContent className="p-6">
                  <div className="flex gap-1 mb-4">
                    {Array.from({ length: testimonial.rating }).map((_, i) => (
                      <Star
                        key={i}
                        className="h-5 w-5 fill-primary text-primary"
                      />
                    ))}
                  </div>
                  <p className="text-muted-foreground mb-4 leading-relaxed">
                    "{testimonial.text}"
                  </p>
                  <p className="font-semibold text-foreground">
                    {testimonial.name}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <Card className="border-border bg-gradient-to-br from-secondary/20 to-accent/10">
            <CardContent className="p-8 md:p-12 text-center">
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-4">
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
