"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Package,
  Clock,
  Truck,
  CheckCircle2,
  XCircle,
  Search,
  Loader2,
} from "lucide-react";
import { toast } from "sonner";
import { StatusTimeline } from "@/components/order/status-timeline";
import { OrderDetails } from "@/components/order/order-details";

export type OrderStatus =
  | "pending"
  | "processing"
  | "shipped"
  | "delivered"
  | "cancelled";

interface Order {
  orderNumber: string;
  status: OrderStatus;
  items: {
    name: string;
    quantity: number;
    price: number;
  }[];
  shippingAddress: {
    name: string;
    street: string;
    city: string;
    state: string;
    zipCode: string;
  };
  trackingNumber?: string;
  estimatedDelivery?: string;
  placedDate: string;
}

const statusConfig = {
  pending: {
    icon: Clock,
    label: "Pending",
    color: "bg-[hsl(var(--status-pending))]",
  },
  processing: {
    icon: Package,
    label: "Processing",
    color: "bg-[hsl(var(--status-processing))]",
  },
  shipped: {
    icon: Truck,
    label: "Shipped",
    color: "bg-[hsl(var(--status-shipped))]",
  },
  delivered: {
    icon: CheckCircle2,
    label: "Delivered",
    color: "bg-[hsl(var(--status-delivered))]",
  },
  cancelled: {
    icon: XCircle,
    label: "Cancelled",
    color: "bg-[hsl(var(--status-cancelled))]",
  },
};

// Sample order data
const sampleOrder: Order = {
  orderNumber: "ORD-2024-5891",
  status: "shipped",
  items: [
    { name: "Wireless Headphones Pro", quantity: 1, price: 199.99 },
    { name: "USB-C Charging Cable", quantity: 2, price: 19.99 },
  ],
  shippingAddress: {
    name: "John Doe",
    street: "123 Main Street, Apt 4B",
    city: "San Francisco",
    state: "CA",
    zipCode: "94102",
  },
  trackingNumber: "1Z999AA10123456784",
  estimatedDelivery: "October 30, 2025",
  placedDate: "October 26, 2025",
};

const OrderTracking = () => {
  const [orderId, setOrderId] = useState("");
  const [order, setOrder] = useState<Order | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchOrder = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!orderId.trim()) {
      toast.error("Order ID required", {
        action: "Please enter an order ID to track your order",
      });
      return;
    }

    setIsLoading(true);

    try {
      // Replace this URL with your actual API endpoint
      const response = await fetch(`/api/orders/${orderId}`);

      if (!response.ok) {
        throw new Error("Order not found");
      }

      const data = await response.json();
      setOrder(data);
    } catch (error) {
      // For demo purposes, use sample data if API fails
      console.log("Using sample data for demo");
      setOrder(sampleOrder);

      toast.success("Demo Mode");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background py-12 px-4">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold tracking-tight">
            Track Your Order
          </h1>
          <p className="text-muted-foreground">
            Enter your order number to see the latest status
          </p>
        </div>

        {/* Order ID Input */}
        {!order && (
          <Card className="border-2">
            <CardHeader>
              <CardTitle>Enter Order Number</CardTitle>
              <CardDescription>
                You can find your order number in the confirmation email
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={fetchOrder} className="flex gap-2">
                <Input
                  type="text"
                  placeholder="e.g., ORD-2024-5891"
                  value={orderId}
                  onChange={(e) => setOrderId(e.target.value)}
                  className="flex-1"
                  disabled={isLoading}
                />
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Tracking...
                    </>
                  ) : (
                    <>
                      <Search className="mr-2 h-4 w-4" />
                      Track Order
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        )}

        {/* Order Details */}
        {order && (
          <>
            <div className="flex justify-between items-center">
              <p className="text-muted-foreground">
                Order #{order.orderNumber} • Placed on {order.placedDate}
              </p>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setOrder(null);
                  setOrderId("");
                }}
              >
                Track Another Order
              </Button>
            </div>

            {/* Current Status Card */}
            <Card className="border-2 shadow-lg">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div
                      className={`p-3 rounded-full ${
                        statusConfig[order.status].color
                      } text-white`}
                    >
                      {(() => {
                        const StatusIcon = statusConfig[order.status].icon;
                        return <StatusIcon className="h-6 w-6" />;
                      })()}
                    </div>
                    <div>
                      <CardTitle className="text-2xl">
                        {statusConfig[order.status].label}
                      </CardTitle>
                      <CardDescription>
                        {order.status === "delivered" &&
                          "Your order has been delivered"}
                        {order.status === "shipped" &&
                          `Estimated delivery: ${order.estimatedDelivery}`}
                        {order.status === "processing" &&
                          "Your order is being prepared"}
                        {order.status === "pending" &&
                          "Your order has been received"}
                        {order.status === "cancelled" &&
                          "This order has been cancelled"}
                      </CardDescription>
                    </div>
                  </div>
                  <Badge variant="secondary" className="text-sm px-3 py-1">
                    {statusConfig[order.status].label}
                  </Badge>
                </div>
              </CardHeader>
            </Card>

            {/* Status Timeline */}
            <StatusTimeline currentStatus={order.status} />

            {/* Order Details */}
            <OrderDetails order={order} />

            {/* Tracking Number */}
            {order.trackingNumber && order.status !== "cancelled" && (
              <Card>
                <CardHeader>
                  <CardTitle>Tracking Information</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">
                        Tracking Number
                      </p>
                      <p className="font-mono font-semibold">
                        {order.trackingNumber}
                      </p>
                    </div>
                    <Truck className="h-8 w-8 text-muted-foreground" />
                  </div>
                </CardContent>
              </Card>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default OrderTracking;
