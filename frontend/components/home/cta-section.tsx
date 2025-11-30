import Link from "next/link";
import React from "react";
import { Button } from "../ui/button";

function CTASection() {
  return (
    <section className="py-12 md:py-16 lg:py-20 container mx-auto px-4">
      <div className="border-border border rounded-none font-cormorant p-8 md:p-12 text-center">
        <div className="text-center mb-12">
          <p className="text-xs tracking-[0.3em] uppercase text-muted-foreground mb-3">
            Be You. Be Tasfin.
          </p>

          <h2 className="text-3xl sm:text-4xl font-light tracking-wide text-foreground">
            Designed for You. Tailored by Us.
          </h2>
          <p className="pt-4 text-muted-foreground mb-8 max-w-2xl mx-auto text-pretty">
            Explore ready collections or create something uniquely yours.
          </p>
        </div>
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
    </section>
  );
}

export default CTASection;
