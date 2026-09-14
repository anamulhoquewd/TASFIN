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
import { useState } from "react";
import useUsers from "@/hooks/users/use-users";
import { IAddress } from "@/interfaces/orders";

export default function CheckoutPage() {
  const { cartItems, subtotal, originalSubtotal, totalCartItems } =
    useCartAndWishlist();
  const { form, handleSubmit, isProcessing, status, order, setStatus } =
    useOrder();
  const { getProfile } = useUsers();
  const [savedAddresses, setSavedAddresses] = useState<IAddress[]>([]);

  const shippingLocation = form.watch("shippingLocation");
  const isDhaka = shippingLocation === "dhaka";
  const shippingFee = getShippingFee(subtotal, shippingLocation);
  const total = subtotal + shippingFee;

  useEffect(() => {
    form.setValue("shippingCost", shippingFee, { shouldValidate: true });
  }, [form, shippingFee]);

  useEffect(() => {
    getProfile().then((response) => {
      const profile = response?.data;
      if (!profile) return;

      form.setValue("name", profile.name ?? "");
      form.setValue("phone", profile.phone ?? "");
      form.setValue("email", profile.email ?? "");
      setSavedAddresses(profile.addresses ?? []);
    });
  }, [form, getProfile]);

  if (status === "success" && order)
    return (
      <OrderConfirmed
        orderNumber={order?.data.orderNumber}
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
      savedAddresses={savedAddresses}
      onSelectAddress={(address) => {
        form.setValue(
          "address",
          {
            street: address.street,
            city: address.city,
            state: address.state ?? "",
            zipCode: address.zipCode ?? "",
            country: address.country,
          },
          { shouldValidate: true },
        );
      }}
    />
  );
}
