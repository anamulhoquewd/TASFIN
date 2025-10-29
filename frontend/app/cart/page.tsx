"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight } from "lucide-react";
import { useCart } from "@/lib/cart-context";
import { useState } from "react";
import { formatPrice } from "@/lib/utils";

export default function CartPage() {
  const { items, removeItem, updateQuantity, subtotal, totalItems } = useCart();
  const [promoCode, setPromoCode] = useState("");

  const shippingFee = subtotal > 0 ? (subtotal >= 3000 ? 0 : 100) : 0;
  const total = subtotal + shippingFee;

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-32">
        <div className="max-w-md mx-auto text-center space-y-6">
          <div className="w-24 h-24 mx-auto rounded-full bg-muted flex items-center justify-center">
            <ShoppingBag className="h-12 w-12 text-muted-foreground" />
          </div>
          <h1 className="text-3xl font-bold text-foreground">
            Your Cart is Empty
          </h1>
          <p className="text-muted-foreground">
            Start shopping to add items to your cart
          </p>
          <Button asChild size="lg">
            <Link href="/products">
              Browse Products
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-8">
        Shopping Cart
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          {items.map((item) => (
            <Card
              key={`v_${item.variantId}-p_${item.productId}-${item.color}-${item.size}`}
              className="border-border"
            >
              <CardContent className="p-4">
                <div className="flex gap-4">
                  {/* Product Image */}
                  <div className="w-24 h-32 shrink-0 rounded-md overflow-hidden border border-border">
                    <img
                      src={item.image.url || "/placeholder.svg"}
                      alt={item.image.alt || item.title}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Product Details */}
                  <div className="flex-1 space-y-2">
                    <div className="flex justify-between gap-4">
                      <div>
                        <h3 className="font-semibold text-foreground">
                          {item.title}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {item.color} / {item.size}
                        </p>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="shrink-0 text-destructive hover:text-destructive"
                        onClick={() =>
                          removeItem(item.productId, item.variantId)
                        }
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>

                    <div className="flex items-center justify-between">
                      {/* Quantity Controls */}
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8 bg-transparent"
                          onClick={() =>
                            updateQuantity(
                              item.productId,
                              item.variantId,
                              item.quantity - 1
                            )
                          }
                          disabled={item.quantity <= 1}
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                        <span className="w-8 text-center text-sm font-medium">
                          {item.quantity}
                        </span>
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8 bg-transparent"
                          onClick={() =>
                            updateQuantity(
                              item.productId,
                              item.variantId,
                              item.quantity + 1
                            )
                          }
                          disabled={item.quantity >= item.maxStock}
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                      </div>

                      {/* Price */}
                      <p className="font-bold text-foreground">
                        {formatPrice(item.price * item.quantity)}
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
          <Card className="border-border sticky top-24">
            <CardContent className="p-6 space-y-4">
              <h2 className="text-xl font-bold text-foreground">
                Order Summary
              </h2>

              <Separator />

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">
                    Subtotal ({totalItems} items)
                  </span>
                  <span className="font-medium text-foreground">
                    {formatPrice(subtotal)}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Shipping Fee</span>
                  <span className="font-medium text-foreground">
                    {shippingFee === 0 ? "FREE" : formatPrice(shippingFee)}
                  </span>
                </div>
              </div>

              <Separator />

              <div className="flex justify-between">
                <span className="font-semibold text-foreground">Total</span>
                <span className="font-bold text-xl text-foreground">
                  {formatPrice(total)}
                </span>
              </div>

              {subtotal < 3000 && (
                <p className="text-xs text-muted-foreground">
                  Add {formatPrice(3000 - subtotal)} more for free shipping!
                </p>
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

              <Button asChild size="lg" className="w-full">
                <Link href="/checkout">
                  Proceed to Checkout
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>

              <Button
                asChild
                variant="outline"
                size="lg"
                className="w-full bg-transparent"
              >
                <Link href="/products">Continue Shopping</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
