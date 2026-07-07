"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Minus, Plus, Trash2, ShoppingCart } from "lucide-react";
import { useCartAndWishlist } from "@/lib/cart-context";
import { cn, priceFormatting } from "@/lib/utils";
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

const FREE_SHIPPING_START_FROM = process.env
  .NEXT_PUBLIC_FREE_SHIPPING_START_FROM as string;
const SHIPPING_COST = process.env.NEXT_PUBLIC_SHIPPING_COST as string;

export default function CartPage() {
  const {
    cartItems,
    removeCartItem,
    updateCartQuantity,
    subtotal,
    totalCartItems,
  } = useCartAndWishlist();
  // const [promoCode, setPromoCode] = useState("");

  const shippingFee =
    subtotal > 0
      ? subtotal >= Number(FREE_SHIPPING_START_FROM)
        ? 0
        : Number(SHIPPING_COST)
      : 0;
  const total = subtotal + shippingFee;

  if (cartItems.length === 0) {
    return (
      <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8">
        <EmptyCart>
          {/* Icon */}
          <div className="flex justify-center">
            <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center">
              <ShoppingCart className="w-10 h-10 text-gray-400" />
            </div>
          </div>

          {/* Content */}
          <div className="space-y-4">
            <h2 className="font-cormorant text-2xl sm:text-3xl font-light tracking-tight">
              Your bag is empty
            </h2>
            <p className="text-base text-foreground/70 font- leading-relaxed">
              Continue exploring and find something special to add to your
              collection.{" "}
              <Link
                href={"/shop"}
                className="uppercase font-cormorant underline text-foreground"
              >
                Shop Now
              </Link>
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
              <BreadcrumbPage>Sopping cart</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <h2 className="font-cormorant text-3xl py-4 sm:text-4xl font-light tracking-wide text-foreground">
          Shopping Cart
        </h2>
        <p className="text-sm text-gray-600 mt-2">
          {cartItems.length} item{cartItems.length !== 1 ? "s" : ""} in your
          cart
        </p>
      </header>

      <Separator className="bg-border w-0.5" />

      <div className="pt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          {cartItems.map((item) => (
            <Card
              key={`v_${item.variantId}-p_${item.productId}-${item.size}`}
              className="rounded-none shadow-none border-"
            >
              <CardContent className="p-4">
                <div className="flex gap-6">
                  {/* Product Image */}
                  <div className="max-w-24 aspect-[3/4] shrink-0 overflow-hidden">
                    <Link href={`/shop/${item.slug}`}>
                      <Image
                        width={1200}
                        height={1600}
                        src={item.image.url}
                        alt={item.image.alt || item.title}
                        className="object-cover w-full h-full"
                      />
                    </Link>
                  </div>

                  {/* Product Details */}
                  <div className="flex-1 space-y-2">
                    <div className="flex justify-between gap-4">
                      <div>
                        <h3 className="text-lg">
                          <Link href={`/shop/${item.slug}`}>{item.title}</Link>
                        </h3>
                        <p className="font-cormorant text-base text-muted-foreground">
                          Size: {item.size}
                        </p>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon-lg"
                        className="shrink-0 bg-transparent hover:bg-transparent border border-border hover:border-foreground text-destructive hover:text-destructive rounded-none transition-colors duration-300 cursor-pointer"
                        onClick={() =>
                          removeCartItem(item.productId, item.variantId)
                        }
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>

                    <div className="flex flex-col sm:flex-row sm:items-center items-start justify-between">
                      {/* Quantity Controls */}
                      <div className="flex items-center border border-border">
                        <Button
                          size={"icon-lg"}
                          className={
                            "text-xs tracking-wide bg-transparent text-foreground hover:bg-accent border-r rounded-none cursor-pointer"
                          }
                          onClick={() =>
                            updateCartQuantity(
                              item.productId,
                              item.variantId,
                              item.quantity - 1
                            )
                          }
                          disabled={item.quantity <= 1}
                        >
                          <Minus className="w-4 h-4" />
                        </Button>
                        <span className="w-8 text-center text-sm font-medium">
                          {item.quantity}
                        </span>
                        <Button
                          onClick={() =>
                            updateCartQuantity(
                              item.productId,
                              item.variantId,
                              item.quantity + 1
                            )
                          }
                          disabled={item.quantity >= item.maxStock}
                          size={"icon-lg"}
                          className={
                            "text-xs tracking-wide bg-transparent text-foreground hover:bg-accent border-l rounded-none cursor-pointer"
                          }
                        >
                          <Plus className="w-4 h-4" />
                        </Button>
                      </div>

                      {/* Price */}
                      <p className="text-foreground">
                        {priceFormatting(item.price * item.quantity)}
                      </p>
                    </div>

                    {item.quantity >= item.maxStock && (
                      <p className="text-xs text-destructive">
                        Maximum stock reached
                      </p>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <Card className="border-border sticky top-24 rounded-none">
            <CardContent className="p-6 space-y-4">
              <h2 className="font-cormorant text-2xl">Order Summary</h2>

              <Separator />

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">
                    Subtotal ({totalCartItems} items)
                  </span>
                  <span className="font-medium text-foreground">
                    {priceFormatting(subtotal)}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Shipping Fee</span>
                  <span
                    className={cn(
                      "font-medium text-foreground",
                      shippingFee === 0 && "text-green-400"
                    )}
                  >
                    {shippingFee === 0 ? "FREE" : priceFormatting(shippingFee)}
                  </span>
                </div>
              </div>

              <Separator />

              <div className="flex justify-between">
                <span className="font-semibold text-foreground">Total</span>
                <span className="font-bold text-xl text-foreground">
                  {priceFormatting(total)}
                </span>
              </div>

              {subtotal < Number(FREE_SHIPPING_START_FROM) && (
                <div className="p-3 bg-green-500/10">
                  <p className="text-xs text-green-700">
                    Add{" "}
                    {priceFormatting(
                      Number(FREE_SHIPPING_START_FROM) - subtotal
                    )}{" "}
                    more for free shipping!
                  </p>
                </div>
              )}

              <Separator />

              {/* Promo Code */}
              {/* <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">
                  Promo Code
                </label>
                <div className="flex gap-2">
                  <Input
                    placeholder="Enter code"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    className="flex-1"
                  />
                  <Button variant="outline" onClick={applyPromoCode}>
                    Apply
                  </Button>
                </div>
              </div> */}

              <div className="flex flex-col gap-4 font-cormorant">
                <Link href="/checkout">
                  <Button
                    size={"lg"}
                    className="rounded-none w-full cursor-pointer text-xs tracking-[0.2em] uppercase"
                  >
                    Proceed to Checkout
                  </Button>
                </Link>
                <Link href="/shop">
                  <Button
                    size={"lg"}
                    className="rounded-none w-full h-9 px-4 py-2 md:px-6 md:h-10 bg-transparent border border-foreground text-foreground hover:text-background hover:bg-foreground transition-colors duration-300 cursor-pointer text-xs tracking-[0.2em] uppercase"
                  >
                    Continue Shopping
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
