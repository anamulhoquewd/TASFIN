"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowUpDown, Ban, CirclePlus } from "lucide-react";
import { formatPrice } from "@/lib/utils";
import { IImage, IProduct } from "@/interfaces/products";
import { Spinner } from "../ui/spinner";
import { toast } from "sonner";
import { useCart } from "@/lib/cart-context";
import { useRouter } from "next/navigation";

interface ProductsGridProps {
  products: IProduct[];
  isLoading: boolean;
  hasMore: boolean;
  observerTarget: React.RefObject<HTMLDivElement>;
  sortConfig: { sortBy: string; sortType: string };
  onSortChange: (sortBy: "title" | "createdAt", order: "asc" | "desc") => void;
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
    setSortBy(value as "title" | "createdAt");
    onSortChange(value as "title" | "createdAt", sortType as "asc" | "desc");
  };

  const handleOrderChange = () => {
    const newOrder = sortType === "asc" ? "desc" : "asc";
    setSortType(newOrder);
    onSortChange(sortBy as "title" | "createdAt", newOrder as "asc" | "desc");
  };

  return (
    <div className="w-full space-y-6">
      {/* 🔹 Sort & Filter Header */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-3 lg:grid-cols-2 items-stretch">
        {/* Mobile Filter Button */}
        <div className="lg:hidden block col-span-1 md:col-span2">
          <Button variant="outline" onClick={() => setIsFilterOpen(true)}>
            Filter
          </Button>
        </div>

        <div className="flex items-center gap-2 w-full col-span-1 lg:col-span-1">
          <Select value={sortBy} onValueChange={handleSortChange}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="createdAt">Newest</SelectItem>
              <SelectItem value="title">Name</SelectItem>
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

        <span className="text-sm text-muted-foreground col-span-2 md:col-span-1 text-right">
          Showing {products.length} products
        </span>
      </div>

      {/* 🔹 Product Grid */}
      {products.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      ) : (
        <div className="flex h-64 items-center justify-center rounded-lg border border-border bg-card">
          <p className="text-muted-foreground">No products found</p>
        </div>
      )}

      {/* 🔹 Infinite scroll status */}
      <div ref={observerTarget} className="mt-12 flex justify-center">
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

/* 🔹 Product Card with auto slide effect */
function ProductCard({ product }: { product: any }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [hovered, setHovered] = useState(false);
  const router = useRouter();

  const { addItem } = useCart();

  const handleAddToCart = () => {
    toast.success("Event has been created", {
      action: {
        label: "Go to cart",
        onClick: () => router.push("/cart"),
      },
    });
    // When adding a product variant to cart
    addItem({
      productId: product._id,
      variantId: product.variants[0]._id,
      title: product.title,
      image: product.variants[0].images?.[0] || product.images[0],
      price: product.variants[0].price,
      maxStock: product.variants[0].stock,
      size: product.variants[0].size,
      color: product.variants[0].color,
      quantity: 1, // optional, defaults to 1
    });
  };

  useEffect(() => {
    if (!hovered || !product.images || product.images.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % product.images.length);
    }, 1500);

    return () => clearInterval(interval);
  }, [hovered, product.images]);

  useEffect(() => {
    if (!hovered) setCurrentIndex(0);
  }, [hovered]);

  return (
    <div
      className="group h-full flex flex-col overflow-hidden rounded-lg border border-border bg-card transition-all hover:shadow-lg"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <Link href={`/products/${product.slug}`}>
        <div className="relative aspect-square overflow-hidden bg-muted">
          {product.images && product.images.length > 0 ? (
            <>
              {product.images.map((img: IImage, index: number) => (
                <Image
                  key={index}
                  src={img.url || "/placeholder.svg"}
                  alt={product.title}
                  fill
                  className={`absolute inset-0 object-cover transition-all duration-700 group-hover:scale-105 ${
                    index === currentIndex ? "opacity-100" : "opacity-0"
                  }`}
                />
              ))}
            </>
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
      </Link>

      <div className="p-4 flex flex-col">
        <Link href={`/products/${product.slug}`}>
          <h3 className="line-clamp-2 font-semibold text-foreground">
            {product.title}
          </h3>
        </Link>
        <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">
          {product.description}
        </p>

        <div className="mt-4 flex items-center justify-between">
          <div>
            {product.variants && product.variants.length > 0 && (
              <p className="text-lg font-bold text-foreground">
                {formatPrice(product.variants[0].price)}
              </p>
            )}
            <p className="text-xs text-muted-foreground">
              {product.variants?.length || 0} variants
            </p>
          </div>
          {/* Add to Cart Button */}
          <Button
            size="icon"
            className="cursor-pointer"
            onClick={handleAddToCart}
            disabled={!product.isActive}
          >
            {product.isActive ? <CirclePlus /> : <Ban />}
          </Button>
        </div>
      </div>
    </div>
  );
}
