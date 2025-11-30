"use client";

import useShare from "@/lib/use-share";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { IOrder } from "@/interfaces/orders";
import { copyToClipboard } from "@/lib/utils";
import { addDays } from "date-fns";
import {
  ArrowLeft,
  Clock,
  Package,
  Truck,
  CheckCircle2,
  Copy,
  Phone,
  Mail,
  Home,
  Calendar,
  MessageCircle,
} from "lucide-react";
import Link from "next/link";

interface OrderStatusProps {
  order: IOrder;
  onBack: () => void;
}

export default function OrderStatus({ order, onBack }: OrderStatusProps) {
  const { handleOrderIssueShareInWA } = useShare();
  const statusSteps = [
    {
      label: "pending",
      icon: Clock,
      description: "Your order is pending — awaiting confirmation or payment.",
    },
    {
      label: "processing",
      icon: Package,
      description: "We're preparing your order.",
    },
    { label: "shipped", icon: Truck, description: "Your order is on the way." },
    {
      label: "delivered",
      icon: CheckCircle2,
      description: "Order delivered successfully.",
    },
  ];

  const getCurrentStepIndex = () => {
    return statusSteps.findIndex((step) => step.label === order.status);
  };
  const estimatedDeliveryDate = addDays(
    new Date(order?.orderDate ?? Date.now()),
    3
  );

  const currentStep = getCurrentStepIndex();

  return (
    <main className="min-h-screen bg-gradient-to-br py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        {/* Back Button */}
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-orange-600 cursor-pointer mb-6 font-medium transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Orders
        </button>

        {/* Order Summary Card */}
        <Card className="p-6 mb-6 border border-border">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
            <div>
              <p className="text-xs text-muted-foreground mb-1 uppercase tracking-wide">
                Order Number
              </p>
              <div className="flex items-center gap-2">
                <p className="text-lg font-mono font-semibold text-foreground">
                  {order._id.substring(0, 12)}...
                </p>
                <button
                  onClick={() => copyToClipboard(order._id)}
                  className="p-1 hover:bg-gray-100 rounded transition-colors"
                  title="Copy order ID"
                >
                  <Copy className="w-4 h-4 text-muted-foreground" />
                </button>
              </div>
            </div>
            <div className="text-right">
              <p className="text-xs text-muted-foreground mb-1 uppercase tracking-wide">
                Total Amount
              </p>
              <p className="text-2xl font-bold text-foreground">
                {order.totalAmount}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-6 border-t border-border">
            <div>
              <p className="text-xs text-muted-foreground mb-1 uppercase tracking-wide">
                Order Date
              </p>
              <p className="text-foreground flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                {new Date(order.orderDate).toDateString()}
              </p>
            </div>
            <div className="text-right">
              <p className="text-xs text-muted-foreground mb-1 uppercase tracking-wide">
                Estimated Delivery
              </p>
              <p className="text-foreground">
                {estimatedDeliveryDate.toDateString()}
              </p>
            </div>
          </div>
        </Card>

        {/* Order Status Timeline */}
        <Card className="bg-white p-6 mb-6 border border-border">
          <h2 className="text-xl font-semibold text-foreground mb-6">
            Order Status
          </h2>

          <div className="space-y-6">
            {statusSteps.map((step, index) => {
              const StepIcon = step.icon;
              const isActive = index === currentStep;
              const isCompleted = index < currentStep;

              return (
                <div key={step.label} className="flex gap-4 capitalize">
                  <div className="flex flex-col items-center">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
                        isActive
                          ? "bg-orange-600 text-white"
                          : isCompleted
                          ? "bg-green-600 text-white"
                          : "bg-gray-200 text-gray-500"
                      }`}
                    >
                      <StepIcon className="w-5 h-5" />
                    </div>
                    {index < statusSteps.length - 1 && (
                      <div
                        className={`w-0.5 h-12 mt-2 transition-colors ${
                          isCompleted ? "bg-green-600" : "bg-gray-200"
                        }`}
                      />
                    )}
                  </div>
                  <div className="pt-1">
                    <p
                      className={`font-semibold text-lg ${
                        isActive
                          ? "text-orange-600"
                          : isCompleted
                          ? "text-green-600"
                          : "text-gray-400"
                      }`}
                    >
                      {step.label}
                    </p>
                    <p
                      className={`text-sm mt-1 ${
                        isActive || isCompleted
                          ? "text-foreground"
                          : "text-muted-foreground"
                      }`}
                    >
                      {step.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </Card>

        {/* Customer Information */}
        <Card className="bg-white p-6 mb-6 border border-border">
          <h2 className="text-xl font-semibold text-foreground mb-6">
            Customer Information
          </h2>

          <div className="space-y-4">
            <div>
              <p className="text-xs text-muted-foreground mb-2 uppercase tracking-wide">
                Name
              </p>
              <p className="text-foreground font-medium">{order.user.name}</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t border-border">
              <div>
                <p className="text-xs text-muted-foreground mb-2 uppercase tracking-wide flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  Phone
                </p>
                <p className="text-foreground font-medium">
                  {order.user.phone}
                </p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-2 uppercase tracking-wide flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  Email
                </p>
                <p className="text-foreground font-medium truncate">
                  {order?.user?.email}
                </p>
              </div>
            </div>
          </div>
        </Card>

        {/* Shipping Address */}
        <Card className="bg-white p-6 mb-6 border border-border">
          <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
            <Home className="w-5 h-5" />
            Shipping Address
          </h2>
          <p className="text-foreground">
            {`${order.address.state}, ${order.address.city}`}
          </p>
        </Card>

        {/* Payment Status */}
        <Card className="bg-white p-6 mb-6 border border-border">
          <h2 className="text-xl font-semibold text-foreground mb-4">
            Payment Status
          </h2>
          <div className="flex items-center gap-3">
            <div
              className={`px-4 py-2 rounded-full text-sm font-medium uppercase ${
                order.paymentStatus === "paid"
                  ? "bg-green-100 text-green-800"
                  : "bg-red-100 text-red-800"
              }`}
            >
              {order.paymentStatus}
            </div>
          </div>
        </Card>

        {/* Footer Message */}
        <Card className="bg-blue-50 border border-blue-200 p-6 mb-6">
          <p className="text-sm text-blue-900">
            Thank you for your order! We appreciate your business. If you have
            any questions about your order, please don&apos;t hesitate to
            contact our support team.
          </p>
        </Card>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
          <Link className="flex-1" href={"/products"}>
            <Button
              onClick={onBack}
              className="no-hover cursor-pointer w-full"
              variant={"outline"}
            >
              Continue Shopping
            </Button>
          </Link>
          <Button
            className="flex-1 gap-2 cursor-pointer"
            onClick={() => handleOrderIssueShareInWA({ orderId: order._id })}
          >
            <MessageCircle className="size-4" />
            Support
          </Button>
        </div>
      </div>
    </main>
  );
}
