"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { formatPrice } from "@/lib/utils";
import Link from "next/link";
import { IProduct } from "@/interfaces/products";
import { useEffect, useState } from "react";
import { useProducts } from "@/hooks/products/use-products";

export function ArrivalsSection() {
  const [products, setProducts] = useState<IProduct[]>([]);

  const { fetchProducts } = useProducts();

  useEffect(() => {
    const fetch = async () => {
      const response = await fetchProducts({});
      setProducts(response.data);
    };

    fetch();
  }, []);

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
              key={product._id}
              className="group relative overflow-hidden rounded-lg bg-card hover:shadow-lg transition-shadow duration-300"
            >
              {/* Product Image Container */}
              <div className="relative w-full aspect-square overflow-hidden bg-muted">
                {product.images[0].url ? (
                  <Image
                    src={product.images[0].url || ""}
                    alt={product.images[0].alt || product.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center">
                    <span className="text-muted-foreground">No image</span>
                  </div>
                )}
              </div>

              {/* Product Details */}
              <div className="p-3 md:p-4">
                <h3 className="text-sm md:text-base font-medium text-foreground truncate mb-2">
                  {product.title}
                </h3>
                <div className="flex items-center gap-1 md:gap-2">
                  <span className="text-base md:text-lg font-bold text-primary">
                    {formatPrice(product.variants[0].price)}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="mt-10 md:mt-14 flex justify-center">
          <Button asChild size="lg">
            <Link href="/products?sortType=desc">
              Shop New Arrivals
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
