"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { IProduct } from "@/interfaces/products";
import { useEffect, useState } from "react";
import { useProducts } from "@/hooks/products/use-products";
import { ProductCard } from "../products/products-grid";
import { Skeleton } from "../ui/skeleton";

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
        <section className="px-8 py-16">
          <div className="font-cormorant max-w-7xl mx-auto">
            <h2 className="text-center text-3xl md:text-4xl font-light tracking-wide text-foreground mb-4">
              New Arrivals
            </h2>
            <p className="text-center text-sm tracking-wide text-muted-foreground mb-12">
              Timeless elegance in every stitch
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-12">
              {products.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          </div>

          {/* View All Button */}
          <div className="mt-10 md:mt-14 flex justify-center">
            <Link href="/products">
              <Button
                size="sm"
                className="group cursor-pointer transition-colors duration-300"
              >
                Shop New Arrivals{" "}
                <span className="group-hover:translate-x-1 transition-transform duration-300">
                  →
                </span>
              </Button>
            </Link>
          </div>
        </section>
      </div>
    </section>
  );
}
