import { AlertCircle, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface OrderFailedProps {
  reason?: string;
  orderNumber?: string;
  email?: string;
  changeStatus: (v: "success" | "faild" | null) => void;
}

export default function OrderFailed({
  reason = "order",
  orderNumber,
  email,
  changeStatus,
}: OrderFailedProps) {
  return (
    <div className="flex items-center justify-center min-h-screen bg-background p-4">
      <div className="w-full max-w-md">
        {/* Error Icon */}
        <div className="flex justify-center mb-6">
          <div className="relative">
            <div className="absolute inset-0 bg-red-500/20 rounded-full blur-xl" />
            <AlertCircle
              className="w-20 h-20 text-destructive relative"
              strokeWidth={1.5}
            />
          </div>
        </div>

        {/* Main Content */}
        <div className="bg-card border border-border rounded-lg p-8 space-y-6 shadow-sm">
          {/* Heading */}
          <div className="text-center space-y-2">
            <h1 className="text-3xl font-bold text-foreground">
              Order Could Not Be Processed
            </h1>
            <p className="text-muted-foreground">
              We encountered an issue while processing your order.
            </p>
          </div>

          {/* Error Details */}
          <div className="bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900 rounded-lg p-4">
            <div className="flex gap-3">
              <div className="flex-shrink-0 pt-0.5">
                <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400" />
              </div>
              <div className="flex-1">
                <p className="font-semibold capitalize text-red-900 dark:text-red-100 text-sm mb-1">
                  {reason} faild
                </p>
                <p className="text-xs text-red-800 dark:text-red-200">
                  {reason === "payment" &&
                    "Your card was declined. Please check your payment details and try again."}
                  {reason === "Inventory" &&
                    "Unfortunately, one or more items in your order are out of stock."}
                  {reason === "session" &&
                    "Your session has expired. Please try checking out again."}
                  {reason === "order" &&
                    "Order failed to complete. Please try again or contact support if the issue continues."}
                </p>
              </div>
            </div>
          </div>

          {/* Order Summary (if orderNumber exists) */}
          {orderNumber && (
            <div className="bg-muted/50 rounded-lg p-4 border border-border">
              <p className="text-xs text-muted-foreground uppercase tracking-wide font-semibold mb-2">
                Attempted Order
              </p>
              <p className="text-sm font-mono text-foreground">
                #{orderNumber}
              </p>
            </div>
          )}

          {/* Troubleshooting Guide */}
          <div className="space-y-3">
            <h3 className="font-semibold text-foreground text-sm">
              Here's what you can do:
            </h3>
            <ul className="space-y-2">
              {[
                "Verify your card details are correct and have not expired",
                "Check that you have sufficient funds in your account",
                "Ensure your billing address matches your card information",
                "Try using a different payment method",
              ].map((item, idx) => (
                <li
                  key={idx}
                  className="flex gap-3 text-sm text-muted-foreground"
                >
                  <span className="text-primary font-bold">{idx + 1}</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3 pt-2">
            <Button
              onClick={() => changeStatus(null)}
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground flex items-center justify-center gap-2"
            >
              Try Again
              <ChevronRight className="w-4 h-4" />
            </Button>
            <Link href="/cart" className="block">
              <Button variant="outline" className="w-full bg-transparent">
                Return to Cart
              </Button>
            </Link>
          </div>

          {/* Support Section */}
          <div className="bg-muted/50 rounded-lg p-4 border border-border">
            <p className="text-sm font-semibold text-foreground mb-2">
              Still having issues?
            </p>
            <p className="text-xs text-muted-foreground mb-3">
              Our support team is here to help you complete your purchase.
            </p>
            <Link href="/support" className="inline-flex items-center gap-2">
              <Button variant="ghost" size="sm" className="h-8 text-xs">
                Contact Support
                <ChevronRight className="w-3 h-3" />
              </Button>
            </Link>
          </div>

          {/* Email Confirmation */}
          {email && (
            <div className="text-center pt-2 border-t border-border">
              <p className="text-xs text-muted-foreground">
                A summary has been sent to{" "}
                <span className="font-medium">{email}</span>
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
