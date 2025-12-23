import { Check, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { copyToClipboard, priceFormatting } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import { useState } from "react";
import { Card } from "../ui/card";
import SubscribeForm from "../subscribe-fomr";
import useSubscribe from "@/hooks/use-subscribe";
import { SubscribeFormValues } from "@/lib/zod-validation";

interface OrderConfirmedProps {
  orderId: string;
  email?: string;
  totalAmount: number;
}

const ESTIMATED_DELIVERY_TIME = process.env
  .NEXT_PUBLIC_ESTIMATED_DELIVERY_TIME as string;

export default function OrderConfirmed({
  orderId,
  email,
  totalAmount,
}: OrderConfirmedProps) {
  const [isSubscribed, setIsSubscribed] = useState(false);
  const { form, isLoading, handleSubscribe } = useSubscribe();

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-4 sm:p-8">
        <Card className="w-full max-w-lg shadow-lg rounded-none">
          {/* Header with checkmark */}
          <div className="flex justify-center pt-8 pb-4">
            <div className="w-20 h-20 rounded-full bg-green-500 flex items-center justify-center animate-in fade-in slide-in-from-top-4 duration-500">
              <Check className="w-10 h-10 text-white" strokeWidth={3} />
            </div>
          </div>

          {/* Main content */}
          <div className="p-8 space-y-6">
            {/* Confirmation heading */}
            <div className="text-center space-y-2 font-cormorant">
              <h1 className="text-4xl font-bold text-slate-900">
                Order Confirmed!
              </h1>
              <p className="text-slate-600">
                Thank you for your purchase. Your order is being processed.
              </p>
            </div>

            {/* Order details */}
            <div className="bg-slate-50 rounded-lg p-6 space-y-4">
              <div className="flex justify-between items-center pb-4 border-b border-slate-200">
                <span className="text-slate-600 font-cormorant text-lg">
                  Order Number
                </span>
                <span className="font-mono text-sm font-semibold text-foreground">
                  <code className="px-2 py-1 bg-muted rounded text-xs font-mono truncate max-w-[180px]">
                    {orderId.substring(0, 12)}...
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
              <div className="flex justify-between items-center pb-4 border-b border-slate-200">
                <span className="text-slate-600 font-cormorant text-lg">
                  Total Amount
                </span>
                <span className="text-lg font-medium text-foreground">
                  {priceFormatting(totalAmount)}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-600 font-cormorant text-lg">
                  Estimated Delivery
                </span>
                <span className="font-cormorant font-medium text-foreground">
                  {ESTIMATED_DELIVERY_TIME || "3-5 business days"}
                </span>
              </div>
            </div>

            {/* User Guidance */}
            <div className="bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900 rounded-lg p-4 space-y-2">
              <p className="text-sm font-semibold text-blue-900 dark:text-blue-100">
                What&apos;s next?
              </p>
              <ul className="text-sm text-blue-800 dark:text-blue-200 space-y-1">
                {email && (
                  <li>
                    ✓ A confirmation email has been sent to
                    <span className="font-medium">{email}</span>
                  </li>
                )}
                <li>✓ You can track your order in your account dashboard</li>
                <li>
                  ✓ You&apos;ll receive shipping updates via email or phone call
                </li>
              </ul>
            </div>

            {/* Subscription section */}
            {!isSubscribed ? (
              <div className="bg-gradient-to-r font-cormorant from-orange-50 to-amber-50 rounded-lg p-6 space-y-4 border border-orange-200">
                <div className="space-y-2">
                  <h3 className="font-semibold text-2xl text-slate-900">
                    Become a Subscriber
                  </h3>
                  <p className="text-slate-600">
                    Join our subscriber program and get{" "}
                    <span className="font-semibold text-orange-600">
                      exclusive early access to sales, special discounts, and
                      free shipping
                    </span>{" "}
                    on your next order!
                  </p>
                </div>
                <SubscribeForm
                  form={form}
                  handleSubscribe={(value: SubscribeFormValues) => {
                    handleSubscribe(value);
                    setIsSubscribed(true);
                  }}
                  isLoading={isLoading}
                />
              </div>
            ) : (
              <div className="bg-green-50 rounded-lg p-6 border border-green-200 space-y-3">
                <div className="flex items-center gap-3">
                  <Check className="w-6 h-6 text-green-600" />
                  <div>
                    <h3 className="font-semibold text-slate-900">
                      Welcome to Our Subscriber Program!
                    </h3>
                    <p className="text-sm text-slate-600">
                      Enjoy exclusive benefits and special offers on all your
                      future orders.
                    </p>
                  </div>
                </div>
              </div>
            )}

            <div className="flex font-cormorant flex-col sm:flex-row gap-4 justify-center">
              <Link href="/shop">
                <Button
                  size={"lg"}
                  className="rounded-none cursor-pointer text-xs tracking-[0.2em] uppercase"
                >
                  Continue Shopping
                </Button>
              </Link>
              <Link href="/dashboard">
                <Button
                  size={"lg"}
                  className="rounded-none h-9 px-4 py-2 md:px-6 md:h-10 bg-transparent border border-foreground text-foreground hover:text-background hover:bg-foreground transition-colors duration-300 cursor-pointer text-xs tracking-[0.2em] uppercase"
                >
                  Go to Dashboard
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
        </Card>
      </div>
    </>
  );
}
