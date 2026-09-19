"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { productImageUrl } from "@/lib/utils";
import { Product } from "@/lib/validation";
import { ShoppingBag } from "lucide-react";
import Image from "next/image";

interface ProductShowcaseProps {
  products: Product[];
  loading: boolean;
  onProductSelect: (productId: string) => void;
}

export default function ProductShowcase({
  products,
  loading,
  onProductSelect,
}: ProductShowcaseProps) {
  const handleInquire = (productId: string) => {
    onProductSelect(productId);
    const element = document.querySelector("#inquiry");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="products" className="py-16 md:py-24 bg-muted/30">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Our Product Collection
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Curated selection of premium kids&apos; clothing, sourced with care
            and crafted for quality.
          </p>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((index) => (
              <Card key={index} className="overflow-hidden">
                <Skeleton className="w-full h-48" />
                <div className="p-6 space-y-3">
                  <Skeleton className="h-6 w-3/4" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-2/3" />
                  <div className="pt-4">
                    <Skeleton className="h-10 w-full" />
                  </div>
                </div>
              </Card>
            ))}
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-12">
            <ShoppingBag className="size-12 text-muted-foreground/40 mx-auto mb-4" />
            <p className="text-muted-foreground text-lg">
              No products available at the moment. Please check back later.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <Card
                key={product._id}
                className="w-full max-w-97.5 overflow-hidden rounded-2xl border-2 border-zinc-800 bg-zinc-950 text-white shadow-none"
              >
                {/* Product Image */}
                <div className="relative h-48 bg-linear-to-br from-blue-100/50 via-pink-100/30 to-yellow-100/30 flex items-center justify-center overflow-hidden">
                  {productImageUrl(product) ? (
                    <Image
                      src={productImageUrl(product)}
                      alt={product.images[0]?.alt || product.name}
                      fill
                      className="object-cover"
                      sizes="(max-width: 640px) 100vw, 390px"
                    />
                  ) : (
                    <svg
                      className="w-24 h-24 text-muted-foreground/40"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                  )}
                </div>

                {/* Product Info */}
                <div className="p-6 flex flex-col gap-4 flex-1">
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">
                      {product.name}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-3">
                      {product.fabric}
                    </p>

                    <div className="grid grid-cols-2 gap-3 text-xs mb-4">
                      <div className="bg-muted p-2 rounded">
                        <p className="text-muted-foreground font-medium">MOQ</p>
                        <p className="text-foreground font-semibold">
                          {product.moq} pcs
                        </p>
                      </div>
                      <div className="bg-muted p-2 rounded">
                        <p className="text-muted-foreground font-medium">
                          Price Range
                        </p>
                        <p className="text-foreground font-semibold">
                          ${product.minPrice} - ${product.maxPrice}
                        </p>
                      </div>
                    </div>

                    {product.sizes && product.sizes.length > 0 && (
                      <div>
                        <p className="text-xs font-medium text-muted-foreground mb-1">
                          Sizes Available
                        </p>
                        <div className="flex flex-wrap gap-1">
                          {product.sizes.map((size) => (
                            <span
                              key={size}
                              className="px-2 py-1 bg-muted rounded text-xs text-foreground"
                            >
                              {size}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                    {product.colors && product.colors.length > 0 && (
                      <div>
                        <p className="text-xs font-medium text-muted-foreground mb-1">
                          Colors Available
                        </p>
                        <div className="flex flex-wrap gap-1">
                          {product.colors.map((color) => (
                            <span
                              key={color}
                              className="px-2 py-1 bg-muted rounded text-xs text-foreground"
                            >
                              {color}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  <Button
                    onClick={() => handleInquire(product._id)}
                    className="w-full rounded-full bg-zinc-100 text-black hover:bg-white"
                  >
                    Inquire About This
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
