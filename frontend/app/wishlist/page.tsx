"use client";

import { useCartAndWishlist } from "@/lib/cart-context";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Heart } from "lucide-react";
import { cn, formatPrice } from "@/lib/utils";
import Image from "next/image";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { EmptyCart } from "@/components/cart/empty-cart";
import { useState } from "react";
import { IProductVariant } from "@/interfaces/products";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { IWishlistItem } from "@/interfaces/context";

function Wishlist() {
  const showQuickAdd = true;

  const router = useRouter();
  const { removeFromWishlist, wishlist, addCartItem } = useCartAndWishlist();
  const [imgError, setImgError] = useState(false);

  const [selectedVariants, setSelectedVariants] = useState<
    Record<string, IProductVariant | null>
  >({});

  const handleAddToCart = (item: IWishlistItem) => {
    const selectedVariant = selectedVariants[item.productId];
    if (!selectedVariant) return;

    toast.success("Product has been added", {
      action: {
        label: "Go to cart",
        onClick: () => router.push("/cart"),
      },
    });

    addCartItem({
      productId: item.productId,
      variantId: selectedVariant._id,
      title: item.title,
      image: item.image,
      price: selectedVariant.price,
      maxStock: selectedVariant.stock,
      size: selectedVariant.size,
      quantity: 1,
      slug: item.slug,
    });

    setSelectedVariants((prev) => ({
      ...prev,
      [item.productId]: null,
    }));
  };

  const handleRemoveFromWishlist = (item: IWishlistItem) => {
    toast.success("Item has been removed");

    removeFromWishlist(item.productId);
  };

  if (wishlist.length === 0) {
    return (
      <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8">
        <EmptyCart>
          {/* Icon */}
          <div className="flex justify-center">
            <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center">
              <Heart className="w-10 h-10 text-gray-400" />
            </div>
          </div>

          {/* Content */}
          <div className="space-y-4">
            <h2 className="font-cormorant text-2xl sm:text-3xl font-light tracking-tight">
              This wishlist is empty.
            </h2>
            <p className="text-base text-foreground/70 font- leading-relaxed">
              You don&apos;t have any products in the wishlist yet. You will
              find a lot of interesting products on our{" "}
              <Link
                href={"/shop"}
                className="uppercase font-cormorant underline text-foreground"
              >
                Shop
              </Link>{" "}
              page.
            </p>
          </div>
        </EmptyCart>
      </section>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header with Breadcrumb */}
      <header className="pb-4">
        <Breadcrumb>
          <BreadcrumbList className="font-cormorant">
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="/">Home</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator>/</BreadcrumbSeparator>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="/shop">Shop</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator>/</BreadcrumbSeparator>
            <BreadcrumbItem>
              <BreadcrumbPage>Wishlist</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <h2 className="font-cormorant text-3xl py-4 sm:text-4xl font-light tracking-wide text-foreground">
          Wishlist
        </h2>
        <p className="text-sm text-gray-600 mt-2">
          {wishlist.length} item{wishlist.length !== 1 ? "s" : ""} in your list
        </p>
      </header>

      <Separator className="bg-border w-0.5" />

      {/* Cart Items */}
      <div className="grid pt-8 grid-cols-2 gap-4 md:gap-6 sm:grid-cols-3 xl:grid-cols-4">
        {wishlist.map((item) => {
          const selectedVariant = selectedVariants[item.productId];
          return (
            <div
              key={item.productId}
              className="group relative flex flex-col transition-all duration-300 overflow-hidden"
            >
              <div className="relative aspect-[3/4] overflow-hidden bg-secondary block">
                {item.image.url ? (
                  <Image
                    alt={item.image.alt || item.title}
                    src={imgError ? "/product-placeholder.png" : item.image.url}
                    // width={1200}
                    // height={1600}
                    fill
                    objectFit="cover"
                    className={`absolute inset-0 object-cover transition-all duration-500 group-hover:scale-105`}
                    onError={() => setImgError(true)}
                  />
                ) : (
                  <div className="flex p-4 text-center h-full items-center text-muted-foreground justify-center">
                    Oops! Product image missing right now
                  </div>
                )}
              </div>

              {/* Quick Add Panel */}
              {showQuickAdd && item.variants.length > 0 && (
                <div
                  className={cn(
                    "absolute bottom-0 left-0 right-0 bg-background/95 backdrop-blur-sm transition-all duration-500",
                    "translate-y-full opacity-50 group-hover:translate-y-0 group-hover:opacity-100"
                  )}
                >
                  <div className="p-4">
                    <p className="text-[10px] tracking-[0.15em] uppercase text-muted-foreground mb-3">
                      Select Size
                    </p>
                    <div className="flex gap-2 flex-wrap">
                      {item.variants.map((variant) => (
                        <Button
                          size={"icon-lg"}
                          variant={"outline"}
                          key={variant._id}
                          onClick={() =>
                            setSelectedVariants((prev) => ({
                              ...prev,
                              [item.productId]: variant,
                            }))
                          }
                          className={cn(
                            "text-xs relative overflow-hidden tracking-wide cursor-pointer rounded-none border transition-colors duration-300",
                            selectedVariant === variant && variant.stock !== 0
                              ? "bg-primary hover:bg-primary/95 text-accent hover:text-accent"
                              : "bg-transparent hover:border-foreground border text-foreground"
                          )}
                          disabled={variant.stock === 0}
                        >
                          {variant.size}
                          <div
                            className={cn(
                              "absolute rotate-45 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-0.5 h-16 bg-foreground/20",
                              variant.stock === 0 ? "block" : "hidden"
                            )}
                          ></div>
                        </Button>
                      ))}
                    </div>
                  </div>
                  <div className="flex flex-col gap-2.5">
                    <Button
                      onClick={() => handleAddToCart(item)}
                      disabled={!selectedVariant}
                      size={"lg"}
                      variant={selectedVariant ? "default" : "outline"}
                      className={cn(
                        "w-full text-xs tracking-[0.2em] uppercase transition-colors rounded-none cursor-pointer"
                      )}
                    >
                      {selectedVariant ? "Add to Bag" : "Select a Size"}
                    </Button>
                    <Button
                      onClick={() => handleRemoveFromWishlist(item)}
                      size={"lg"}
                      variant={"outline"}
                      className={cn(
                        "w-full text-xs tracking-[0.2em] uppercase transition-colors rounded-none cursor-pointer bg-transparent border border-foreground"
                      )}
                    >
                      Remove from list
                    </Button>
                  </div>
                </div>
              )}

              {/* Product Info */}
              <div className="flex flex-col gap-2 pt-4">
                <Link href={`/shop/${item.productId}`} className="w-fit">
                  <h3 className="text-sm hover:underline tracking-wide text-foreground font-normal leading-relaxed hover:text-muted-foreground duration-300 transition-colors">
                    {item.title}
                  </h3>
                </Link>

                <div className="flex items-center gap-2">
                  <span className="text-sm tracking-wide text-foreground">
                    {formatPrice(item.variants[0].price)}
                  </span>
                </div>

                {item.variants.length > 0 && (
                  <p className="text-[10px] tracking-wide text-muted-foreground">
                    {item.variants.length} Varinats Available
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Wishlist;
