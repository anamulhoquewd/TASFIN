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
        <div className="mb-8 md:mb-12 text-center">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-4">
            New Arrivals
          </h2>
          <p className="text-lg mb-6 opacity-90 w-3/4 md:w-1/2 m-auto">
            New Arrivals! Shop the season&apos;s latest styles and freshest
            fashion drops now.
          </p>
        </div>

        {/* Product Grid */}
        {products.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {/* <p className="text-muted-foreground">No products found</p> */}
            <Skeleton className="w-70 h-90 bg-white" />
            <Skeleton className="w-70 h-90 bg-white" />
            <Skeleton className="w-70 h-90 bg-white" />
            <Skeleton className="w-70 h-90 bg-white" />
          </div>
        )}

        {/* View All Button */}
        <div className="mt-10 md:mt-14 flex justify-center">
          <Button asChild size="lg">
            <Link href="/products">
              Shop New Arrivals
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
