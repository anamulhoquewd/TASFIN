"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, Fragment } from "react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  AlarmClockPlus,
  ArrowUpDown,
  Heart,
  MessageCircle,
} from "lucide-react";
import { cn, formatPrice } from "@/lib/utils";
import { IImage, IProduct, IProductVariant } from "@/interfaces/products";
import { Spinner } from "../ui/spinner";
import { toast } from "sonner";
import { useCart } from "@/lib/cart-context";
import { useRouter } from "next/navigation";
import useShare from "./product/use-share";

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

  const handleOrderChange = () => {
    const newOrder = sortType === "asc" ? "desc" : "asc";
    setSortType(newOrder);
    onSortChange(sortBy as "title" | "createdAt", newOrder as "asc" | "desc");
  };

  return (
    <div className="w-full space-y-6">
      {/* Sort & Filter Header */}
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

      {/* Product Grid */}
      {products.length > 0 ? (
        <div className="grid grid-cols-2 gap-4 md:gap-6 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4">
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      ) : (
        <div className="flex h-64 items-center justify-center rounded-lg border border-border bg-card">
          <p className="text-muted-foreground">No products found</p>
        </div>
      )}

      {/* Infinite scroll status */}
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

/* Product Card with auto slide effect */
export function ProductCard({ product }: { product: any }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [hovered, setHovered] = useState(false);
  const router = useRouter();
  const { addItem } = useCart();

  const { handleProductShareInWA } = useShare();

  const variantsHasStock = product.variants.filter(
    (v: IProductVariant) => v.stock > 0
  );

  const inStock = product.isActive && variantsHasStock.length > 0;

  const handleAddToCart = () => {
    toast.success("Product has been added", {
      action: {
        label: "Go to cart",
        onClick: () => router.push("/cart"),
      },
    });
    // When adding a product variant to cart
    addItem({
      productId: product._id,
      variantId: variantsHasStock[0]._id,
      title: product.title,
      image: variantsHasStock[0].images?.[0] || product.images[0],
      price: variantsHasStock[0].price,
      maxStock: variantsHasStock[0].stock,
      size: variantsHasStock[0].size,
      quantity: 1, // optional, defaults to 1
      slug: product.slug,
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
      className="group h-full flex flex-col transition-all duration-300 hover:shadow-lg"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div>
        <div className="relative aspect-[3/4] overflow-hidden bg-muted">
          {/* Product images */}
          <Link href={`/products/${product.slug}`}>
            {product?.images?.map((img: IImage, index: number) => (
              <Fragment key={img.url}>
                {img.url ? (
                  <Image
                    src={img.url}
                    alt={product.title}
                    // width={1200}
                    // height={1600}
                    fill
                    objectFit="cover"
                    className={`absolute inset-0 object-cover transition-all duration-700 group-hover:scale-105 ${
                      index === currentIndex ? "opacity-100" : "opacity-0"
                    }`}
                  />
                ) : (
                  <div className="flex p-4 text-center h-full items-center text-muted-foreground justify-center">
                    Oops! Product image missing right now
                  </div>
                )}
              </Fragment>
            ))}
          </Link>

          {/* New Badge */}
          {product.isFeatured && (
            <span className="absolute font-playfair top-4 left-4 text-[10px] tracking-[0.25em] uppercase p-1 text-foreground font-medium">
              {product.isFeatured.toString()}
            </span>
          )}

          {/* Wishlist Button */}
          <Button
            variant="ghost"
            size="icon-sm"
            className={cn(
              "cursor-pointer absolute top-4 right-4 p-2 transition-all duration-300",
              "opacity-0 group-hover:opacity-100",
              // isLiked ? "opacity-100" :
              "opacity-100"
            )}
            aria-label={`isLiked ? "Remove from wishlist" : "Add to wishlist"`}
          >
            <Heart
              className={cn(
                "w-5 h-5 transition-all duration-300",
                // isLiked
                // ? "fill-accent stroke-accent"
                "fill-transparent stroke-foreground hover:stroke-accent"
              )}
            />
          </Button>

          {/* Quick Add Button */}

          {product.variants.length > 0 && (
            <div
              className={cn(
                "absolute bottom-0 left-0 right-0 bg-background/95 backdrop-blur-sm transition-all duration-500",
                "translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100"
              )}
            >
              <div className="p-4">
                <p className="text-[10px] tracking-[0.15em] uppercase text-muted-foreground mb-3">
                  Select Size
                </p>
                <div className="flex gap-2 flex-wrap">
                  {product.variants.map((variant, index) => (
                    <Button
                      key={variant._id}
                      // onClick={() => setSelectedSize(index)}
                      variant={"outline"}
                      size={"icon-sm"}
                      className={cn(
                        "tracking-wide transition-all duration-200 cursor-pointer"
                        // selectedSize === index
                        // ? "border-foreground bg-foreground text-background"
                        // : "border-muted hover:border-foreground"
                      )}
                    >
                      {variant.size}
                    </Button>
                  ))}
                </div>
              </div>
              {inStock ? (
                <Button
                  className="w-full py-3 bg-primary text-primary-foreground text-xs tracking-[0.2em] uppercase transition-colors hover:bg-foreground cursor-pointer"
                  onClick={handleAddToCart}
                >
                  Quick Add
                </Button>
              ) : (
                <div className="flex flex-col gap-1.5 w-full mx-auto mb-4">
                  <Button size="sm" disabled className="cursor-not-allowed">
                    Out of stock
                  </Button>
                  <Button
                    onClick={() =>
                      handleProductShareInWA({
                        url: `/products/${product.slug}`,
                      })
                    }
                    variant="outline"
                    className="border-green-200 text-green-700 hover:text-green-700 hover:bg-green-50 cursor-pointer"
                  >
                    Notify Me <MessageCircle className="size-4" />
                  </Button>
                </div>
              )}
            </div>
          )}

          {/* Quick Add Button - shown only when no sizes */}
        </div>

        {/* footer */}
        <div className="p-4 flex flex-col">
          <Link href={`/products/${product.slug}`}>
            {/* Name */}
            <h3 className="line-clamp-2 text-sm tracking-wide text-foreground leading-relaxed">
              {product.title}
            </h3>
          </Link>

          {/* Price */}
          <div className="flex items-center gap-2">
            {product.variants && product.variants.length > 0 && (
              <>
                <span className="text-sm tracking-wide text-foreground">
                  {formatPrice(product.variants[0].price)}
                </span>
                {/* {originalPrice && (
                  <span className="text-sm tracking-wide text-muted-foreground line-through">
                    ${originalPrice.toFixed(2)}
                  </span>
                )} */}
              </>
            )}
            <p className="text-xs text-muted-foreground">
              {product.variants?.length || 0} variant(s)
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
