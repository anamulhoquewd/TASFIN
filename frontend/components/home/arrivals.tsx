"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowRight, ChevronRight } from "lucide-react";
import { formatPrice } from "@/lib/utils";
import Link from "next/link";

interface ArrivalsProduct {
  id: string;
  title: string;
  image: string;
  price: number;
  originalPrice?: number;
}

interface ArrivalsSectionProps {
  products?: ArrivalsProduct[];
}

// Mock data for demonstration
const defaultProducts: ArrivalsProduct[] = [
  {
    id: "1",
    title: "Premium T-Shirt",
    image: "/67dc35b5a0fc5-square.png",
    price: 670,
    originalPrice: 800,
  },
  {
    id: "2",
    title: "Classic Pink Tee",
    image: "/67b459aeb0f13-square.jpg",
    price: 670,
    originalPrice: 800,
  },
  {
    id: "3",
    title: "Designer Shirt",
    image: "/67c4ecd090deb-square.jpg",
    price: 670,
    originalPrice: 800,
  },
  {
    id: "4",
    title: "Casual Wear",
    image: "/67d7f7914409b-square.jpg",
    price: 670,
    originalPrice: 800,
  },
  {
    id: "5",
    title: "Summer Collection",
    image: "/67f4d0045c5d7-square.jpg",
    price: 670,
    originalPrice: 800,
  },
  {
    id: "6",
    title: "Trendy Apparel",
    image: "/6890a595148d8-square.jpg",
    price: 670,
    originalPrice: 800,
  },
  {
    id: "7",
    title: "Modern Style",
    image: "/67b459aeb0f13-square.jpg",
    price: 670,
    originalPrice: 800,
  },
  {
    id: "8",
    title: "View More",
    image: "/67d7f7914409b-square.jpg",
    price: 1000,
  },
];

export function ArrivalsSection({
  products = defaultProducts,
}: ArrivalsSectionProps) {
  return (
    <section className="w-full bg-background py-12 md:py-16 lg:py-20">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        {/* Header Section */}
        <div className="mb-8 md:mb-12 text-center">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-4">
            New Arrivals
          </h2>
          <p className="text-lg mb-6 opacity-90">
            Get 20% off on all new collection items this week
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {products.map((product) => (
            <div
              key={product.id}
              className="group relative overflow-hidden rounded-lg bg-card hover:shadow-lg transition-shadow duration-300"
            >
              {/* Product Image Container */}
              <div className="relative w-full aspect-square overflow-hidden bg-muted">
                <Image
                  src={product.image || "/placeholder.svg"}
                  alt={product.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* Product Details */}
              <div className="p-3 md:p-4">
                <h3 className="text-sm md:text-base font-medium text-foreground truncate mb-2">
                  {product.title}
                </h3>
                <div className="flex items-center gap-1 md:gap-2">
                  <span className="text-base md:text-lg font-bold text-primary">
                    {formatPrice(product.price)}
                  </span>
                  {product.originalPrice && (
                    <span className="text-xs md:text-sm text-muted-foreground line-through">
                      {formatPrice(product.originalPrice)}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="mt-10 md:mt-14 flex justify-center">
          <Button asChild size="lg">
            <Link href="/products?filter=new">
              Shop New Arrivals
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
