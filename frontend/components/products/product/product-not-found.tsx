import Link from "next/link";
import { Search, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function ProductNotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 py-12 text-center">
      {/* Icon Circle */}
      <div className="mb-12 text-center">
        <div className="inline-block">
          <div className="w-24 h-24 mx-auto rounded-full bg-gradient-to-br from-destructive/20 to-destructive/5 flex items-center justify-center">
            <span className="text-5xl">✨</span>
          </div>
        </div>
      </div>

      {/* Text Content */}
      <h1 className="mb-3 text-3xl font-bold tracking-tight text-foreground md:text-4xl">
        Product not found
      </h1>
      <p className="mb-8 max-w-[500px] text-muted-foreground md:text-lg">
        The product you're looking for doesn't exist or has been removed. Try
        searching for something else or explore our new collection.
      </p>

      {/* Search Bar */}
      <div className="mb-10 w-full max-w-md">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search for products..."
            className="pl-10 h-11 bg-background"
          />
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col gap-3 sm:flex-row">
        <Button asChild size="lg">
          <Link href="/products">Back to Shop</Link>
        </Button>
        <Button
          asChild
          variant="outline"
          size="lg"
          className="transition-colors duration-500"
        >
          <Link href="/">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Go Home
          </Link>
        </Button>
      </div>

      {/* Helpful Links (Optional enhancement) */}
      <div className="mt-12 text-sm text-muted-foreground">
        <p>
          Need help?{" "}
          <Link href="/contact" className="text-orange-600 hover:underline">
            Contact Support
          </Link>
        </p>
      </div>
    </div>
  );
}
