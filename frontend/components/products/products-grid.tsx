"use client";

import type React from "react";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowUpDown } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { IProduct } from "@/interfaces/products";

interface ProductsGridProps {
  products: IProduct[];
  isLoading: boolean;
  hasMore: boolean;
  observerTarget: React.RefObject<HTMLDivElement>;
  sortConfig: { sortBy: string; sortType: string };
  onSortChange: (
    sortBy: "price" | "name" | "newest",
    order: "asc" | "desc"
  ) => void;
  setIsFilterOpen: (isFilterOpen: boolean) => void;
}

export function ProductsGrid({
  products,
  isLoading,
  hasMore,
  observerTarget,
  sortConfig,
  onSortChange,
  setIsFilterOpen,
}: ProductsGridProps) {
  const [sortBy, setSortBy] = useState(sortConfig.sortBy);
  const [sortType, setSortType] = useState(sortConfig.sortType);

  const handleSortChange = (value: string) => {
    setSortBy(value as "price" | "name" | "newest");
    onSortChange(
      value as "price" | "name" | "newest",
      sortType as "asc" | "desc"
    );
  };

  const handleOrderChange = () => {
    const newOrder = sortType === "asc" ? "desc" : "asc";
    setSortType(newOrder);
    onSortChange(
      sortBy as "price" | "name" | "newest",
      newOrder as "asc" | "desc"
    );
  };

  return (
    <div className="w-full">
      <div className="mb-8 grid grid-cols-2 md:grid-cols-8 lg:grid-cols-2 items-center justify-end gap-2">
        {/* 🔹 Mobile Filter Button */}
        <div className="lg:hidden block col-span-1 md:col-span-2">
          <Button variant="outline" onClick={() => setIsFilterOpen(true)}>
            Filter
          </Button>
        </div>

        <div className="flex items-center gap-2 w-full col-span-1 md:col-span-3 lg:col-span-1 mr-0">
          <span className="text-sm font-medium text-muted-foreground">
            Sort by:
          </span>
          <Select value={sortBy} onValueChange={handleSortChange}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newest">Newest</SelectItem>
              <SelectItem value="price">Price</SelectItem>
              <SelectItem value="name">Name</SelectItem>
            </SelectContent>
          </Select>
          <Button
            variant="outline"
            size="icon"
            onClick={handleOrderChange}
            title={`Sort ${sortType === "asc" ? "descending" : "ascending"}`}
          >
            <ArrowUpDown className="h-4 w-4" />
          </Button>
        </div>

        <span className="text-sm text-muted-foreground col-span-2 md:col-span-3 lg:col-span-1 text-right">
          Showing {products.length} products
        </span>
      </div>

      {products.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {products.map((product) => (
            <Link key={product._id} href={`/products/${product.slug}`}>
              <div className="group cursor-pointer overflow-hidden rounded-lg border border-border bg-card transition-all hover:shadow-lg">
                <div className="relative aspect-square overflow-hidden bg-muted">
                  {product.images && product.images.length > 0 ? (
                    <Image
                      src={product.images[0].url || "/placeholder.svg"}
                      alt={product.title}
                      fill
                      className="object-cover transition-transform group-hover:scale-105"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center">
                      <span className="text-muted-foreground">No image</span>
                    </div>
                  )}
                  {product.isFeatured && (
                    <div className="absolute right-2 top-2 rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground">
                      Featured
                    </div>
                  )}
                </div>

                <div className="p-4">
                  <h3 className="line-clamp-2 font-semibold text-foreground">
                    {product.title}
                  </h3>
                  <p className="mt-1 line-clamp-1 text-sm text-muted-foreground">
                    {product.slug}
                  </p>

                  <div className="mt-4 flex items-center justify-between">
                    <div>
                      {product.variants && product.variants.length > 0 && (
                        <p className="text-lg font-bold text-foreground">
                          ₹{product.variants[0].price}
                        </p>
                      )}
                      <p className="text-xs text-muted-foreground">
                        {product.variants?.length || 0} variants
                      </p>
                    </div>
                    <div
                      className={`text-xs font-semibold ${
                        product.isActive ? "text-green-600" : "text-red-600"
                      }`}
                    >
                      {product.isActive ? "Active" : "Inactive"}
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="flex h-64 items-center justify-center rounded-lg border border-border bg-card">
          <p className="text-muted-foreground">No products found</p>
        </div>
      )}

      <div ref={observerTarget} className="mt-12 flex justify-center">
        {isLoading && (
          <div className="flex items-center gap-2">
            <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent" />
            <span className="text-sm text-muted-foreground">
              Loading more products...
            </span>
          </div>
        )}
        {!hasMore && products.length > 0 && (
          <p className="text-sm text-muted-foreground">
            No more products to load
          </p>
        )}
      </div>
    </div>
  );
}
