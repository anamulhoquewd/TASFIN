import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";

export function ProductNotFound() {
  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center px-4 py-12 md:py-24">
      <div className="font-cormorant max-w-md text-center space-y-6">
        {/* Icon: 404 representation */}
        <div className="flex justify-center">
          <div className="text-6xl text-muted-foreground/40">404</div>
        </div>

        {/* Heading */}
        <div className="space-y-2">
          <h1 className="text-2xl md:text-3xl text-foreground">
            Product Not Found
          </h1>
          <p className="text-muted-foreground leading-relaxed">
            The dress you're looking for has been removed or the link may be
            incorrect. Please explore our collection or create a custom order.
          </p>
        </div>

        {/* Action buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/shop">
            <Button
              size={"lg"}
              className="rounded-none cursor-pointer text-xs tracking-[0.2em] uppercase"
            >
              Continue Shopping
            </Button>
          </Link>
          <Link href="/make-custom">
            <Button
              size={"lg"}
              className="rounded-none h-9 px-4 py-2 md:px-6 md:h-10 bg-transparent border border-foreground text-foreground hover:text-background hover:bg-foreground transition-colors duration-300 cursor-pointer text-xs tracking-[0.2em] uppercase"
            >
              Make a Custom Dress
            </Button>
          </Link>
        </div>

        {/* Decorative line */}
        <Separator className="h-0.5" />

        {/* Help text */}
        <p className="text-sm text-muted-foreground">
          Need assistance? Contact our{" "}
          <Link href={"/support"}>
            <span className="text-primary tracking-wide underline uppercase">
              support
            </span>
          </Link>{" "}
          team
        </p>
      </div>
    </div>
  );
}
