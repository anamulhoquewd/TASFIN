"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { IProduct, IProductVariant } from "@/interfaces/products";
import { useProducts } from "@/hooks/products/use-products";
import Link from "next/link";
import { ChevronLeft, Heart, Minus, Plus, Share2, X } from "lucide-react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Image from "next/image";
import { ProductNotFound } from "@/components/products/product/product-not-found";
import { cn, debounce, priceFormatting } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { toast } from "sonner";
import { useCartAndWishlist } from "@/lib/cart-context";
import { ProductSkeleton } from "@/components/products/product/product-skeleton";
import useShare from "@/lib/use-share-in-wa";

const FREE_SHIPPING_START_FROM = process.env
  .NEXT_PUBLIC_FREE_SHIPPING_START_FROM as string;

export default function ProductPage() {
  const params = useParams();
  const slug = params.slug as string;
  const { getProductBySlug } = useProducts();
  const [selectedImage, setSelectedImage] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [product, setProduct] = useState<IProduct | null>(null);
  const [selectedVariant, setSelectedVariant] =
    useState<IProductVariant | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const { copied, handleShare } = useShare();

  const {
    addCartItem,
    addToWishlist,
    isInWishlist,
    removeFromWishlist,
    wishlist,
  } = useCartAndWishlist();
  const router = useRouter();

  const details = [
    { label: "Fabric", value: product?.fabric },
    { label: "Sleeve", value: product?.sleeve },
    { label: "Collar/Neck", value: product?.collarNeck },
    { label: "Cut/Fit", value: product?.cutFit },
    { label: "Side Cut", value: product?.sideCut },
    { label: "Length", value: product?.length },
    { label: "Wash Care", value: product?.washCare },
  ].filter((detail) => detail.value);

  const handleAddToCart = () => {
    if (!product) return;
    if (selectedVariant) {
      toast.success("Added ✓", {
        action: {
          label: "View Cart",
          onClick: () => router.push("/cart"),
        },
      });

      // When adding a product variant to cart
      addCartItem({
        productId: product?._id,
        variantId: selectedVariant._id,
        title: product?.title,
        image: selectedVariant.images?.[0] || product?.images[0],
        price: selectedVariant.price,
        maxStock: selectedVariant.stock,
        size: selectedVariant.size,
        quantity: quantity,
        slug: product?.slug,
      });
    }
  };

  const debouncedAddToCart = useMemo(
    () => debounce(handleAddToCart, 500),
    [product, selectedVariant, quantity]
  );

  const debouncedWishlist = useMemo(() => {
    return debounce(() => {
      if (!product) return;

      if (isInWishlist(product._id)) {
        // Remove
        removeFromWishlist(product._id);
        toast.success("Removed ✕", {
          action: {
            label: "View wishlist",
            onClick: () => router.push("/wishlist"),
          },
        });
      } else {
        // Add
        addToWishlist({
          productId: product._id,
          title: product.title,
          image: product.images[0],
          slug: product.slug,
          variants: [...product.variants],
        });
        toast.success("Added ✓", {
          action: {
            label: "View wishlist",
            onClick: () => router.push("/wishlist"),
          },
        });
      }
    }, 1000);
  }, [product, wishlist]); // <-- add wishlist dependency so it always sees latest

  useEffect(() => {
    const fetchProduct = async () => {
      setIsLoading(true);
      const fetchedProduct = await getProductBySlug(slug);
      if (fetchedProduct) {
        setProduct(fetchedProduct);
        if (fetchedProduct.variants.length > 0) {
          setSelectedVariant(fetchedProduct.variants[0]);
        }
      }
      setIsLoading(false);
    };

    if (slug) {
      fetchProduct();
    }
  }, [slug]);

  const variantsHasStock =
    product?.variants.filter((v: IProductVariant) => v.stock > 0) || [];

  const hasStock = product?.isActive && variantsHasStock.length > 0;

  if (isLoading) {
    return <ProductSkeleton />;
  }

  if (!product) {
    return <ProductNotFound />;
  }

  return (
    <main className="container mx-auto px-4 pt-4 pb-16 min-h-screen space-y-2">
      {isLightboxOpen && (
        <div
          className="fixed inset-0 z-[100] bg-background/75 min-h-screen backdrop-blur-md flex items-center justify-center"
          onClick={() => setIsLightboxOpen(false)}
        >
          <Button
            variant={"ghost"}
            size={"icon-sm"}
            onClick={() => setIsLightboxOpen(false)}
            className="absolute top-6 right-6 rounded-none cursor-pointer"
          >
            <X className="w-6 h-6" />
          </Button>

          {/* Lightbox navigation */}
          <Button
            onClick={(e) => {
              e.stopPropagation();
              setSelectedImage((prev) =>
                prev > 0 ? prev - 1 : product.images.length - 1
              );
            }}
            variant={"ghost"}
            size={"icon-lg"}
            className="absolute rounded-none cursor-pointer left-6 top-1/2 -translate-y-1/2"
          >
            <ChevronLeft className="w-6 h-6" />
          </Button>
          <Button
            onClick={(e) => {
              e.stopPropagation();
              setSelectedImage((prev) =>
                prev < product.images.length - 1 ? prev + 1 : 0
              );
            }}
            variant={"ghost"}
            size={"icon-lg"}
            className="absolute rounded-none cursor-pointer right-6 top-1/2 -translate-y-1/2"
          >
            <ChevronLeft className="w-6 h-6 rotate-180" />
          </Button>

          <div
            className="relative w-[85vw] h-[85vh] cursor-zoom-out"
            onClick={() => setIsLightboxOpen(false)}
          >
            <Image
              src={product.images[selectedImage].url || "/placeholder.svg"}
              alt={product.title}
              fill
              className="object-contain"
              priority
            />
          </div>

          {/* Lightbox thumbnails */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
            {product.images.map((image, index) => (
              <button
                key={index}
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedImage(index);
                }}
                className={cn(
                  "relative w-12 h-16 overflow-hidden transition-all duration-200",
                  selectedImage === index
                    ? "ring-1 ring-foreground"
                    : "ring-1 ring-transparent opacity-60 hover:opacity-100"
                )}
              >
                <Image
                  src={image.url || "/placeholder.svg"}
                  alt={`${product.title} view ${index + 1}`}
                  fill
                  className="object-cover"
                />
              </button>
            ))}
          </div>
        </div>
      )}
      {/* Breadcrumb */}
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
            <BreadcrumbPage>{product.title}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      {/* Main Content */}
      <main className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
        {/* Image Gallery */}
        <div className="flex flex-col-reverse md:flex-row gap-4 lg:sticky lg:top-20 lg:self-start">
          {/* Thumbnails */}
          <div className="flex md:flex-col gap-3 overflow-x-auto md:overflow-visible pb-2 md:pb-0">
            {product.images.map((image, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(index)}
                className={cn(
                  "relative cursor-pointer w-16 h-20 md:w-20 md:h-24 flex-shrink-0 overflow-hidden transition-all duration-300",
                  selectedImage === index
                    ? "ring-1 ring-foreground"
                    : "ring-1 ring-transparent hover:ring-border"
                )}
              >
                <Image
                  src={image?.url || "/placeholder.svg"}
                  alt={`${product.title} view ${index + 1}`}
                  fill
                  className="object-cover"
                />
              </button>
            ))}
          </div>

          {/* Main Image */}
          <div
            className="relative flex-1 aspect-[3/4] bg-secondary overflow-hidden cursor-zoom-in group"
            onClick={() => setIsLightboxOpen(true)}
          >
            <Image
              src={product.images[selectedImage]?.url || "/placeholder.svg"}
              alt={product.images[selectedImage]?.alt || product.title}
              fill
              className={cn("object-cover")}
            />

            {/* Navigation Arrows */}
            <Button
              onClick={(e) => {
                e.stopPropagation();
                setSelectedImage((prev) =>
                  prev > 0 ? prev - 1 : product.images.length - 1
                );
              }}
              variant={"secondary"}
              size={"icon-lg"}
              className="absolute rounded-none cursor-pointer left-6 top-1/2 -translate-y-1/2"
            >
              <ChevronLeft className="w-6 h-6" />
            </Button>
            <Button
              onClick={(e) => {
                e.stopPropagation();
                setSelectedImage((prev) =>
                  prev < product.images.length - 1 ? prev + 1 : 0
                );
              }}
              variant={"secondary"}
              size={"icon-lg"}
              className="absolute rounded-none cursor-pointer right-6 top-1/2 -translate-y-1/2"
            >
              <ChevronLeft className="w-6 h-6 rotate-180" />
            </Button>

            {/* Badge */}
            <span className="absolute font-cormorant top-4 left-4 text-[10px] tracking-[0.25em] uppercase p-1 text-foreground font-medium">
              {product.isFeatured ? "New" : "Sale"}
            </span>
          </div>
        </div>

        {/* Product Info */}
        <div className="flex flex-col gap-8">
          {/* Title & Price */}
          <div className="flex flex-col gap-4">
            <div className="flex items-start justify-between">
              <div>
                <h1 className="text-2xl md:text-3xl font-light tracking-wide text-foreground">
                  {product.title}
                </h1>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant={"outline"}
                  className="cursor-pointer rounded-none"
                  onClick={debouncedWishlist}
                >
                  <Heart
                    className={cn(
                      "w-5 h-5 transition-all duration-300",
                      isInWishlist(product._id)
                        ? "fill-foreground stroke-foreground"
                        : "fill-transparent stroke-foreground hover:stroke-foreground"
                    )}
                  />
                </Button>
                <Button
                  variant={"outline"}
                  className="flex-1 gap-2 cursor-pointer rounded-none"
                  onClick={() => handleShare({ url: `/shop/${product.slug}` })}
                >
                  <Share2 className="size-4" />
                  {copied && "Copied!"}
                </Button>
              </div>
            </div>
            <div className="flex items-baseline gap-3">
              <span className="text-xl tracking-wide text-foreground">
                {priceFormatting(
                  selectedVariant?.price || product.variants[0].price
                )}
              </span>
              {/* {product.originalPrice && (
                  <span className="text-base tracking-wide text-muted-foreground line-through">
                    ${product.originalPrice.toFixed(2)}
                  </span>
                )} */}
            </div>
          </div>

          {/* Description */}
          <p className="tracking-[0.02em] leading-relaxed text-muted-foreground">
            {product?.description}
          </p>

          {/* Color Selection */}
          {/* <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <span className="text-xs tracking-[0.15em] uppercase text-foreground">
                Color
              </span>
              <span className="text-xs tracking-wide text-muted-foreground">
                {product.variants[selectedColor].name}
              </span>
            </div>
            <div className="flex gap-3">
              {product.colors.map((color, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedColor(index)}
                  className={cn(
                    "relative w-8 h-8 rounded-full transition-all duration-200",
                    selectedColor === index
                      ? "ring-1 ring-foreground ring-offset-2 ring-offset-background"
                      : "ring-1 ring-border hover:ring-muted-foreground"
                  )}
                  style={{ backgroundColor: color.hex }}
                  title={color.name}
                />
              ))}
            </div>
          </div> */}

          {/* Size Selection */}
          <div className="flex flex-col gap-3 font-cormorant">
            <div className="flex items-center justify-between">
              <span className="text-xs tracking-[0.15em] uppercase text-foreground">
                Size
              </span>
              <Button
                variant={"link"}
                className="text-sm cursor-pointer tracking-wide text-muted-foreground underline underline-offset-4 hover:text-foreground transition-colors"
              >
                Size Guide
              </Button>
            </div>
            <div className="flex gap-2 flex-wrap">
              {product.variants.map((variant) => (
                <Button
                  variant={
                    selectedVariant === variant && variant.stock !== 0
                      ? "default"
                      : "secondary"
                  }
                  size={"icon-lg"}
                  key={variant._id}
                  onClick={() => setSelectedVariant(variant)}
                  className={
                    "text-xs relative overflow-hidden tracking-wide border rounded-none cursor-pointer"
                  }
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

          {/* Quantity */}
          <div className="flex flex-col gap-3">
            <span className="text-xs tracking-[0.15em] uppercase text-foreground font-cormorant">
              Quantity
            </span>
            <div className="flex items-center gap-4">
              <div className="flex items-center border border-border">
                <Button
                  size={"icon-lg"}
                  className={
                    "text-xs tracking-wide bg-transparent text-foreground hover:bg-accent border-r rounded-none cursor-pointer"
                  }
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  disabled={selectedVariant === null || quantity <= 1}
                >
                  <Minus className="w-4 h-4" />
                </Button>
                <span className="w-12 text-center text-sm">{quantity}</span>
                <Button
                  onClick={() => setQuantity((q) => q + 1)}
                  disabled={
                    selectedVariant === null ||
                    (selectedVariant && quantity >= selectedVariant.stock)
                  }
                  size={"icon-lg"}
                  className={
                    "text-xs tracking-wide bg-transparent text-foreground hover:bg-accent border-l rounded-none cursor-pointer"
                  }
                >
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
              {selectedVariant && quantity >= selectedVariant.stock && (
                <p className="text-xs text-destructive">
                  Maximum stock reached
                </p>
              )}
            </div>
          </div>

          {/* Add to Bag */}
          <div className="flex flex-col gap-3">
            <Button
              size={"lg"}
              className={
                "w-full py-4 text-xs tracking-[0.2em] uppercase rounded-none cursor-pointer"
              }
              onClick={debouncedAddToCart}
              disabled={
                selectedVariant === null ||
                !hasStock ||
                selectedVariant.stock === 0
              }
            >
              {selectedVariant === null || selectedVariant.stock === 0
                ? "Select a size"
                : hasStock
                ? "Add to Bag"
                : "Out of stock"}
            </Button>

            <div className="p-3 bg-green-500/10 rounded-md text-xs text-center">
              <p className="text-xs text-green-700">
                Free shipping on orders over
                {priceFormatting(Number(FREE_SHIPPING_START_FROM) - 1)}
              </p>
            </div>
          </div>

          {/* Accordion Sections */}
          <div className="flex flex-col border-t border-border">
            <Accordion
              type="single"
              collapsible
              className="w-full"
              defaultValue="item-1"
            >
              <AccordionItem value="item-1">
                <AccordionTrigger className="cursor-pointer">
                  Product Specifications
                </AccordionTrigger>
                <AccordionContent className="flex flex-col gap-4 text-balance">
                  <div className="grid grid-cols-2 gap-4">
                    {details.map((detail, index) => (
                      <div key={index}>
                        <p className="text-sm text-muted-foreground">
                          {detail.label}
                        </p>
                        <p className="font-medium">{detail.value}</p>
                      </div>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>

              {product.keyFeatures && product.keyFeatures.length > 0 && (
                <AccordionItem value="item-2">
                  <AccordionTrigger className="cursor-pointer">
                    Key Benefits
                  </AccordionTrigger>
                  <AccordionContent className="flex flex-col gap-4 text-balance">
                    {/* Key benefits */}
                    <div>
                      <ul className="space-y-2">
                        {product.keyFeatures.map((feature) => (
                          <li key={feature} className="flex items-start gap-2">
                            <div className="mt-1 h-2 w-2 rounded-full bg-primary flex-shrink-0" />
                            <span className="text-sm">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              )}

              <AccordionItem value="item-3">
                <AccordionTrigger className="cursor-pointer">
                  Shipping Details
                </AccordionTrigger>
                <AccordionContent className="flex flex-col gap-4 text-balance">
                  <p>
                    We deliver within Dhaka in 2-3 business days, and 3-5
                    business days outside Dhaka.
                  </p>

                  <p>
                    Your order is shipped through trusted courier partners. You
                    can check all order details anytime from your dashboard.
                  </p>

                  <p>We support Cash on Delivery (COD) and online payments.</p>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-4">
                <AccordionTrigger className="cursor-pointer">
                  Return Policy
                </AccordionTrigger>
                <AccordionContent className="flex flex-col gap-4 text-balance">
                  <p>
                    We stand behind our products with a comprehensive 30-day
                    return policy. If you&apos;re not completely satisfied,
                    simply return the item in its original condition.
                  </p>
                  <p>
                    Our hassle-free return process includes free return shipping
                    and full refunds processed within 48 hours of receiving the
                    returned item.
                  </p>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </main>
    </main>
  );
}
