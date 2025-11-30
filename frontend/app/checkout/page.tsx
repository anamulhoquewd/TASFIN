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

const FREE_SHIPPING_START_FROM = process.env
  .NEXT_PUBLIC_FREE_SHIPPING_START_FROM as string;
const SHIPPING_COST = process.env.NEXT_PUBLIC_SHIPPING_COST as string;

export default function CheckoutPage() {
  const { items, subtotal, totalItems } = useCartAndWishlist();
  const { form, handleSubmit, isProcessing, status, order, setStatus } =
    useOrder();

  const shippingFee =
    subtotal > 0
      ? subtotal >= Number(FREE_SHIPPING_START_FROM)
        ? 0
        : Number(SHIPPING_COST)
      : 0;
  const total = subtotal + shippingFee;

  form.setValue("shippingCost", shippingFee);

  if (status === "success" && order)
    return (
      <OrderConfirmed
        orderId={order?.data._id}
        totalAmount={order.data.totalAmount}
        email={order.data?.user?.email}
      />
    );

  if (status === "faild") return <OrderFailed changeStatus={setStatus} />;

  if (items.length === 0 && status === null) {
    return (
      <div className="container mx-auto px-4 py-32 text-center">
        <div className="w-16 h-16 mx-auto rounded-full bg-muted flex items-center justify-center">
          <BrushCleaning className="h-8 w-8 text-muted-foreground" />
        </div>
        <h1 className="text-2xl font-bold mb-4">Your cart is empty</h1>
        <Button asChild>
          <Link href="/products">
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
      items={items}
      shippingFee={shippingFee}
      subtotal={subtotal}
      total={total}
      totalItems={totalItems}
    />
  );
}
