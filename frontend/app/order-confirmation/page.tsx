"use client"

import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle2, Package, Truck, Home } from "lucide-react"

export default function OrderConfirmationPage() {
  const searchParams = useSearchParams()
  const orderId = searchParams.get("orderId")
  const total = searchParams.get("total")

  const estimatedDelivery = new Date()
  estimatedDelivery.setDate(estimatedDelivery.getDate() + 5)

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-2xl mx-auto">
        {/* Success Icon */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-100 mb-4">
            <CheckCircle2 className="h-12 w-12 text-green-600" />
          </div>
          <h1 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-2">Order Confirmed!</h1>
          <p className="text-muted-foreground">Thank you for shopping with TASFIN</p>
        </div>

        {/* Order Details */}
        <Card className="border-border mb-6">
          <CardContent className="p-6 space-y-4">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Order Number</p>
                <p className="font-mono font-semibold text-foreground">{orderId}</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-muted-foreground mb-1">Total Amount</p>
                <p className="font-bold text-xl text-foreground">৳{Number(total).toLocaleString()}</p>
              </div>
            </div>

            <div className="pt-4 border-t border-border">
              <p className="text-sm text-muted-foreground mb-1">Estimated Delivery</p>
              <p className="font-semibold text-foreground">
                {estimatedDelivery.toLocaleDateString("en-US", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Order Status Timeline */}
        <Card className="border-border mb-6">
          <CardContent className="p-6">
            <h2 className="font-semibold text-foreground mb-4">Order Status</h2>
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center shrink-0">
                  <CheckCircle2 className="h-5 w-5 text-primary-foreground" />
                </div>
                <div className="flex-1 pt-1">
                  <p className="font-medium text-foreground">Order Placed</p>
                  <p className="text-sm text-muted-foreground">Your order has been received</p>
                </div>
              </div>

              <div className="flex items-start gap-4 opacity-50">
                <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center shrink-0">
                  <Package className="h-5 w-5 text-muted-foreground" />
                </div>
                <div className="flex-1 pt-1">
                  <p className="font-medium text-foreground">Processing</p>
                  <p className="text-sm text-muted-foreground">We're preparing your order</p>
                </div>
              </div>

              <div className="flex items-start gap-4 opacity-50">
                <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center shrink-0">
                  <Truck className="h-5 w-5 text-muted-foreground" />
                </div>
                <div className="flex-1 pt-1">
                  <p className="font-medium text-foreground">Shipped</p>
                  <p className="text-sm text-muted-foreground">Your order is on the way</p>
                </div>
              </div>

              <div className="flex items-start gap-4 opacity-50">
                <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center shrink-0">
                  <Home className="h-5 w-5 text-muted-foreground" />
                </div>
                <div className="flex-1 pt-1">
                  <p className="font-medium text-foreground">Delivered</p>
                  <p className="text-sm text-muted-foreground">Order delivered successfully</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Confirmation Message */}
        <Card className="border-border bg-muted/30 mb-6">
          <CardContent className="p-6">
            <p className="text-sm text-muted-foreground leading-relaxed">
              We've sent a confirmation email with your order details. You'll receive another email when your order
              ships. If you have any questions, please contact our customer support.
            </p>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
          <Button asChild size="lg" className="flex-1">
            <Link href="/products">Continue Shopping</Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="flex-1 bg-transparent">
            <Link href="/contact">Contact Support</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
