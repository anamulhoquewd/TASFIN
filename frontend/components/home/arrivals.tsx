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
    <section className="py-12 md:py-16 lg:py-20 bg-secondary/50">
      <div className="container mx-auto px-4">
        <div className="flex items-end justify-between mb-12 gap-4 font-cormorant">
          <div>
            <p className="text-xs tracking-[0.3em] uppercase text-muted-foreground mb-3">
              Just In
            </p>
            <h2 className="text-3xl sm:text-4xl font-light tracking-wide text-foreground">
              New Arrivals
            </h2>
          </div>
          <Link
            href="/shop?category=new-arrivals"
            className="text-xs tracking-[0.15em] uppercase text-foreground hover:text-muted-foreground transition-colors underline underline-offset-4"
          >
            View All
          </Link>
        </div>

        {products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-12">
            {products.slice(0, 6).map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-muted-foreground">
              No new arrivals at the moment. Check back soon!
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
