"use client";

import type React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useCartAndWishlist } from "@/lib/cart-context";
import { ArrowRight, BrushCleaning } from "lucide-react";
import useOrder from "@/hooks/orders/use-orders";
import Checkout from "@/components/order/checkout";
import OrderConfirmed from "@/components/order/order-confirmed";
import OrderFailed from "@/components/order/order-faild";
import { FREE_SHIPPING_THRESHOLD, getShippingFee } from "@/lib/utils";
import { useEffect } from "react";

export default function CheckoutPage() {
  const { cartItems, subtotal, originalSubtotal, totalCartItems } =
    useCartAndWishlist();
  const { form, handleSubmit, isProcessing, status, order, setStatus } =
    useOrder();

  const shippingLocation = form.watch("shippingLocation");
  const isDhaka = shippingLocation === "dhaka";
  const shippingFee = getShippingFee(subtotal, shippingLocation);
  const total = subtotal + shippingFee;

  useEffect(() => {
    form.setValue("shippingCost", shippingFee, { shouldValidate: true });
  }, [form, shippingFee]);

  if (status === "success" && order)
    return (
      <OrderConfirmed
        orderId={order?.data._id}
        totalAmount={order.data.totalAmount}
        email={order.data?.user?.email}
      />
    );

  if (status === "faild") return <OrderFailed changeStatus={setStatus} />;

  if (cartItems.length === 0 && status === null) {
    return (
      <div className="container mx-auto px-4 py-32 text-center">
        <div className="w-16 h-16 mx-auto rounded-full bg-muted flex items-center justify-center">
          <BrushCleaning className="h-8 w-8 text-muted-foreground" />
        </div>
        <h1 className="text-2xl font-bold mb-4">Your cart is empty</h1>
        <Button asChild>
          <Link href="/shop">
            Continue Shopping
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </Button>
      </div>
    );
  }

  return (
    <Checkout
      form={form}
      handleSubmit={handleSubmit}
      isProcessing={isProcessing}
      items={cartItems}
      shippingFee={shippingFee}
      subtotal={subtotal}
      originalSubtotal={originalSubtotal}
      total={total}
      totalItems={totalCartItems}
      shippingThreshold={FREE_SHIPPING_THRESHOLD}
      isDhaka={isDhaka}
    />
  );
}
