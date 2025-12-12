"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, Fragment, useMemo } from "react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowUpDown, Heart } from "lucide-react";
import { cn, debounce, formatPrice } from "@/lib/utils";
import { IProduct, IProductVariant } from "@/interfaces/products";
import { IImage } from "@/interfaces/global";
import { Spinner } from "../ui/spinner";
import { toast } from "sonner";
import { useCartAndWishlist } from "@/lib/cart-context";
import { useRouter } from "next/navigation";
import { ProductCard } from "./product-card";

interface ProductsGridProps {
  products: IProduct[];
  isLoading: boolean;
  hasMore: boolean;
  observerTarget: React.RefObject<HTMLDivElement>;
  sortConfig: { sortBy: string; sortType: string };
  onSortChange: (sortBy: "title" | "createdAt", order: "asc" | "desc") => void;
  setIsFilterOpen: (isFilterOpen: boolean) => void;
}

export function ProductsGrids({
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
    setSortBy(value as "title" | "createdAt");
    onSortChange(value as "title" | "createdAt", sortType as "asc" | "desc");
  };

  if (!isLoading && products.length === 0) {
    return (
      <div className="flex h-64 items-center justify-center">
        <p className="text-muted-foreground">No products found</p>
      </div>
    );
  }

  return (
    <div className="w-full space-y-6">
      {/* Sort & Filter Header */}
      <div className="font-cormorant grid grid-cols-1 gap-6 sm:grid-cols-3 lg:grid-cols-2 items-stretch">
        {/* Mobile Filter Button */}
        <div className="lg:hidden block col-span-1 md:col-span2">
          <Button
            variant="outline"
            className="rounded-none cursor-pointer uppercase"
            onClick={() => setIsFilterOpen(true)}
          >
            Filter
          </Button>
        </div>

        <div className="flex items-center gap-2 w-full col-span-1 lg:col-span-1">
          <Select value={sortBy} onValueChange={handleSortChange}>
            <SelectTrigger className="w-40 rounded-none cursor-pointer">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="rounded-none">
              <SelectItem
                className="rounded-none font-cormorant cursor-pointer"
                value="createdAt"
              >
                Newest
              </SelectItem>
              <SelectItem
                className="font-cormorant rounded-none cursor-pointer"
                value="title"
              >
                Name
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        <span className="text-sm text-muted-foreground col-span-2 md:col-span-1 text-right">
          Showing {products.length} products
        </span>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-2 gap-4 md:gap-6 sm:grid-cols-3 xl:grid-cols-4">
        {products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>

      {/* Infinite scroll status */}
      <div
        ref={observerTarget}
        className="font-cormorant mt-12 flex justify-center"
      >
        {isLoading && (
          <div className="flex items-center gap-2">
            <Spinner className="text-primary" />{" "}
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
