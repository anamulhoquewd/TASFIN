"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Copy, Download, RotateCcw, Truck } from "lucide-react";
import { IOrder } from "@/interfaces/orders";
import { copyToClipboard, formatPrice } from "@/lib/utils";

export default function MyOrderCard({ order }: { order: IOrder }) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "processing":
        return "bg-blue-100 text-blue-800";
      case "shipped":
        return "bg-purple-100 text-purple-800";
      case "delivered":
        return "bg-green-100 text-green-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg">
              <code className="px-2 py-1 bg-muted rounded text-xs font-mono truncate max-w-[180px]">
                {order._id.substring(0, 16)}...
              </code>

              <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6 cursor-pointer"
                onClick={() => copyToClipboard(order._id)}
              >
                <Copy className="h-3 w-3" />
                <span className="sr-only">Copy User ID</span>
              </Button>
            </CardTitle>
            <p className="text-sm text-muted-foreground">
              {new Date(order.createdAt).toLocaleDateString()}
            </p>
          </div>
          <Badge className={getStatusColor(order.status) + " capitalize"}>
            {order.status}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Items</p>
              <p className="font-semibold">{order.products.length} item(s)</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Total Amount</p>
              <p className="font-semibold">{formatPrice(order.totalAmount)}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Shipping Address</p>
              <p className="font-semibold text-sm text-wrap">
                {`${order.address.street}, ${
                  order.address?.state ?? order.address.state + ","
                } ${order.address.city}`}{" "}
              </p>
            </div>
          </div>

          <div className="border-t pt-4">
            <h4 className="font-semibold mb-2">Items:</h4>
            <div className="space-y-2">
              {order.products.map((item, index) => (
                <div
                  key={index}
                  className="flex justify-between text-sm border-b pb-2"
                >
                  <span>
                    {item.title.substring(0, 26)}: x {item.quantity}
                  </span>
                  <span>{formatPrice(item.price * item.quantity)}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-wrap gap-2 pt-4">
            <Button
              size="sm"
              variant="outline"
              // onClick={() => handleTrackOrder(order)}
              className="gap-2"
            >
              <Truck className="h-4 w-4" />
              Track Order
            </Button>
            <Button
              size="sm"
              variant="outline"
              // onClick={() => handleDownloadInvoice(order._id)}
              className="gap-2"
            >
              <Download className="h-4 w-4" />
              Download Invoice
            </Button>
            <Button
              size="sm"
              variant="outline"
              // onClick={() => handleReorder(order)}
              className="gap-2"
            >
              <RotateCcw className="h-4 w-4" />
              Reorder
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
