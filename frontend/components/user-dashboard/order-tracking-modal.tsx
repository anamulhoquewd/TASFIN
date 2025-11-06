"use client"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Truck, Package, CheckCircle } from "lucide-react"
import { IOrder } from "@/interfaces/orders"

interface OrderTrackingModalProps {
  order: IOrder | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function OrderTrackingModal({ order, open, onOpenChange }: OrderTrackingModalProps) {
  if (!order) return null

  const trackingSteps = [
    { title: "Order Placed", date: order.createdAt, status: "completed", icon: Package },
    {
      title: "Processing",
      date: order.orderDate,
      status: order.status !== "pending" ? "completed" : "pending",
      icon: Package,
    },
    {
      title: "Shipped",
      date: order._id ? order.orderDate : null,
      status: ["shipped", "delivered"].includes(order.status) ? "completed" : "pending",
      icon: Truck,
    },
    {
      title: "Delivered",
      date: order.status === "delivered" ? order.orderDate : null,
      status: order.status === "delivered" ? "completed" : "pending",
      icon: CheckCircle,
    },
  ]

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Order Tracking - {order._id}</DialogTitle>
        </DialogHeader>
        <div className="space-y-6">
          <div>
            <Badge className="mb-4">{order.status.charAt(0).toUpperCase() + order.status.slice(1)}</Badge>
            {order._id && (
              <p className="text-sm text-muted-foreground">
                Tracking Number: <span className="font-semibold">{order._id}</span>
              </p>
            )}
          </div>

          <div className="space-y-4">
            {trackingSteps.map((step, index) => {
              const Icon = step.icon
              return (
                <div key={index} className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div
                      className={`rounded-full p-2 ${
                        step.status === "completed" ? "bg-green-100 text-green-600" : "bg-gray-100 text-gray-400"
                      }`}
                    >
                      <Icon className="h-4 w-4" />
                    </div>
                    {index < trackingSteps.length - 1 && (
                      <div className={`w-0.5 h-12 ${step.status === "completed" ? "bg-green-200" : "bg-gray-200"}`} />
                    )}
                  </div>
                  <div className="pt-2">
                    <p className="font-medium">{step.title}</p>
                    {step.date && (
                      <p className="text-sm text-muted-foreground">{new Date(step.date).toLocaleDateString()}</p>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
