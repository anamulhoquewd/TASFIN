import { CheckCircle2, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { copyToClipboard, formatPrice } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";

interface OrderConfirmedProps {
  orderId: string;
  email?: string;
  estimatedDelivery?: string;
  totalAmount: number;
}

export default function OrderConfirmed({
  orderId,
  email,
  estimatedDelivery = "5-7 business days",
  totalAmount,
}: OrderConfirmedProps) {
  return (
    <div className="flex items-center justify-center min-h-screen bg-background p-4">
      <div className="w-full max-w-md">
        {/* Success Icon */}
        <div className="flex justify-center mb-6">
          <div className="relative">
            <div className="absolute inset-0 bg-green-500/20 rounded-full blur-xl animate-pulse" />
            <CheckCircle2
              className="w-20 h-20 text-green-600 relative"
              strokeWidth={1.5}
            />
          </div>
        </div>

        {/* Main Content */}
        <div className="bg-card border border-border rounded-lg p-8 space-y-6 shadow-sm">
          {/* Heading */}
          <div className="text-center space-y-2">
            <h1 className="text-3xl font-bold text-foreground">
              Order Confirmed!
            </h1>
            <p className="text-muted-foreground">
              Thank you for your purchase. Your order is being processed.
            </p>
          </div>

          {/* Order Details */}
          <div className="bg-muted/50 rounded-lg p-4 space-y-3 border border-border">
            <div className="flex justify-between items-start">
              <span className="text-muted-foreground text-sm">
                Order Number
              </span>
              <span className="font-mono text-sm font-semibold text-foreground">
                <code className="px-2 py-1 bg-muted rounded text-xs font-mono truncate max-w-[180px]">
                  {orderId.substring(0, 6)}...
                </code>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6 cursor-pointer"
                        onClick={() => copyToClipboard(orderId)}
                      >
                        <Copy className="h-3 w-3" />
                        <span className="sr-only">Copy order ID</span>
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Copy order ID</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </span>
            </div>
            <div className="border-t border-border pt-3">
              <div className="flex justify-between items-start">
                <span className="text-muted-foreground text-sm">
                  Total Amount
                </span>
                <span className="text-lg font-bold text-foreground">
                  {formatPrice(totalAmount)}
                </span>
              </div>
            </div>
            <div className="border-t border-border pt-3">
              <div className="flex justify-between items-start">
                <span className="text-muted-foreground text-sm">
                  Estimated Delivery
                </span>
                <span className="text-sm font-medium text-foreground">
                  {estimatedDelivery}
                </span>
              </div>
            </div>
          </div>

          {/* User Guidance */}
          <div className="bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900 rounded-lg p-4 space-y-2">
            <p className="text-sm font-semibold text-blue-900 dark:text-blue-100">
              What's next?
            </p>
            <ul className="text-sm text-blue-800 dark:text-blue-200 space-y-1">
              {email && (
                <li>
                  ✓ A confirmation email has been sent to
                  <span className="font-medium">{email}</span>
                </li>
              )}
              <li>✓ You can track your order in your account dashboard</li>
              <li>✓ You'll receive shipping updates via email or phone call</li>
            </ul>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            <Link href="/products" className="block">
              <Button className="w-full cursor-pointer">
                Continue Shopping
              </Button>
            </Link>
          </div>

          {/* Support Info */}
          <div className="text-center pt-4 border-t border-border">
            <p className="text-xs text-muted-foreground">
              Need help?{" "}
              <a
                href="/support"
                className="text-primary hover:underline font-medium"
              >
                Contact our support team
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
