"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  CheckCircle2,
  Package,
  Truck,
  Home,
  CircleDashed,
  Copy,
} from "lucide-react";
import useCheckout from "@/hooks/checkout/use-checkout";
import { useEffect, useState } from "react";
import { IOrder } from "@/interfaces/orders";
import { copyToClipboard, formatPrice } from "@/lib/utils";
import LoadingPage from "@/components/loading-page";
import { addDays, format } from "date-fns";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export default function OrderConfirmationPage() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("orderId") as string;
  const [order, setOrder] = useState<IOrder | null>(null);

  const estimatedDeliveryDate = addDays(
    new Date(order?.orderDate ?? Date.now()),
    3
  );

  const getStatusClass = (step: string = "pending") => {
    if (order?.status === "cancelled") {
      return "bg-red-500 text-white opacity-100";
    }

    const steps = ["pending", "processing", "shipped", "delivered"];
    const currentIndex = steps.indexOf(order?.status || "pending");
    const stepIndex = steps.indexOf(step);

    if (stepIndex <= currentIndex) {
      return "bg-primary text-primary-foreground opacity-100";
    }

    return "bg-muted text-muted-foreground opacity-50";
  };

  const { getOrderById, isProcessing } = useCheckout();

  useEffect(() => {
    const fetchProduct = async () => {
      const fetchedProduct = await getOrderById(orderId);
      if (fetchedProduct) {
        setOrder(fetchedProduct);
      }
    };

    if (orderId) {
      fetchProduct();
    }
  }, [orderId]);

  if (isProcessing) {
    return <LoadingPage />;
  }

  if (!order && !isProcessing) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-muted mb-4">
            <CircleDashed className="h-10 w-10 text-foreground" />
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
            Order Not Found
          </h2>
          <p className="text-sm text-muted-foreground mb-4">
            We couldn&apos;t find an order matching the ID:{" "}
            <span className="font-semibold text-foreground">{orderId}</span>.
            Please check the number and try again.
          </p>

          <Card className="border-border bg-muted/30 mb-6">
            <CardContent className="p-4">
              <p className="text-sm text-muted-foreground">
                If the problem persists, you can contact our support team.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 mt-4">
                <Button asChild className="flex-1">
                  <Link href="/products">Continue Shopping</Link>
                </Button>
                <Button asChild variant="outline" className="flex-1">
                  <Link href="/contact">Contact Support</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-2xl mx-auto">
        {/* Success Icon */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-100 mb-4">
            <CheckCircle2 className="h-12 w-12 text-green-600" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
            Order Confirmed!
          </h1>
          <p className="text-muted-foreground">
            Thank you for shopping with TASFIN
          </p>
        </div>

        {/* Order Details */}
        <Card className="border-border mb-6">
          <CardContent className="p-6 space-y-4">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-muted-foreground mb-1">
                  Order Number
                </p>
                <p className="font-mono font-semibold text-foreground flex items-center gap-2">
                  {orderId}
                  <Button
                    variant="ghost"
                    size="icon"
                    className="cursor-pointer"
                    onClick={() => copyToClipboard(orderId)}
                  >
                    <Copy className="h-2 w-2" />
                    <span className="sr-only">Copy order ID</span>
                  </Button>
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm text-muted-foreground mb-1">
                  Total Amount
                </p>
                <p className="font-bold text-xl text-foreground">
                  {formatPrice(order?.totalAmount)}
                </p>
              </div>
            </div>

            <div className="pt-4 border-t border-border">
              <p className="text-sm text-muted-foreground mb-1">
                Estimated Delivery
              </p>
              <p className="font-semibold text-foreground">
                {format(estimatedDeliveryDate, "dd cccc MM, yyyy")}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Order Status Timeline */}
        <Card className="border-border mb-6">
          <CardContent className="p-6">
            <h2 className="font-semibold text-foreground mb-4">Order Status</h2>
            <div className="space-y-4">
              {["pending", "processing", "shipped", "delivered"].map((step) => (
                <div
                  key={step}
                  className={`flex items-start gap-4 ${
                    getStatusClass(step).includes("opacity-50")
                      ? "opacity-50"
                      : "opacity-100"
                  }`}
                >
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${getStatusClass(
                      step
                    )}`}
                  >
                    {step === "pending" && <CircleDashed className="h-5 w-5" />}
                    {step === "processing" && <Package className="h-5 w-5" />}
                    {step === "shipped" && <Truck className="h-5 w-5" />}
                    {step === "delivered" && <Home className="h-5 w-5" />}
                  </div>
                  <div className="flex-1 pt-1">
                    <p className="font-medium text-foreground capitalize">
                      {step}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {step === "pending" &&
                        "Your order is pending — awaiting confirmation or payment."}
                      {step === "processing" && "We're preparing your order."}
                      {step === "shipped" && "Your order is on the way."}
                      {step === "delivered" && "Order delivered successfully."}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Confirmation Message */}
        <Card className="border-border bg-muted/30 mb-6">
          <CardContent className="p-6">
            <p className="text-sm text-muted-foreground leading-relaxed">
              We've sent a confirmation email with your order details. You'll
              receive another email when your order ships. If you have any
              questions, please contact our customer support.
            </p>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
          <Button asChild size="lg" className="flex-1">
            <Link href="/products">Continue Shopping</Link>
          </Button>
          <Button
            asChild
            size="lg"
            variant="outline"
            className="flex-1 bg-transparent"
          >
            <Link href="/contact">Contact Support</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
