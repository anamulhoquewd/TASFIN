import Link from "next/link";
import { Button } from "../ui/button";
import React, { ReactNode } from "react";

export function EmptyCart({ children }: { children: ReactNode }) {
  return (
    <div className="max-w-md mx-auto text-center space-y-8 py-12">
      {children}

      {/* Actions */}
      <div className="font-cormorant flex flex-col sm:flex-row gap-4 justify-center">
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
