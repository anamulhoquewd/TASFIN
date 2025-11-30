import Link from "next/link";
import { ShoppingBag } from "lucide-react";
import { Button } from "../ui/button";

export function EmptyCart() {
  return (
    <div className="font-cormorant max-w-md mx-auto text-center space-y-8 py-12">
      {/* Icon */}
      <div className="flex justify-center">
        <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center">
          <ShoppingBag className="w-10 h-10 text-gray-400" />
        </div>
      </div>

      {/* Content */}
      <div className="space-y-4">
        <h2 className="text-2xl sm:text-3xl font-light tracking-tight">
          Your bag is empty
        </h2>
        <p className="text-base text-foreground/70 font-light leading-relaxed">
          Continue exploring and find something special to add to your
          collection.
        </p>
      </div>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Link href="/shop">
          <Button
            size={"lg"}
            className="rounded-none cursor-pointer text-xs tracking-[0.2em] uppercase"
          >
            Shop Collection
          </Button>
        </Link>
        <Link href="/make-custom">
          <Button
            size={"lg"}
            className="rounded-none h-9 px-4 py-2 md:px-6 md:h-10 bg-transparent border border-foreground text-foreground hover:text-background hover:bg-foreground transition-colors duration-300 cursor-pointer text-xs tracking-[0.2em] uppercase"
          >
            Make Custom
          </Button>
        </Link>
      </div>
    </div>
  );
}
