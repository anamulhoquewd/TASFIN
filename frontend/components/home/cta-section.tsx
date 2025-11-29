import Link from "next/link";
import React from "react";

function CTASection() {
  return (
    <section className="py-12 md:py-16 lg:py-20 container mx-auto px-4">
      <div className="border-border border rounded-none font-cormorant p-8 md:p-12 text-center">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-light tracking-wide text-foreground">
            Be You. Be Tasfin
          </h2>
          <p className="pt-4 text-muted-foreground mb-8 max-w-2xl mx-auto text-pretty">
            Discover outfits that celebrate your true style — effortless,
            elegant, and uniquely you.
          </p>
        </div>
        <Link
          href="/shop"
          className="text-xs tracking-[0.15em] uppercase text-foreground hover:text-muted-foreground transition-colors underline underline-offset-4"
        >
          Start Shopping{" "}
        </Link>
      </div>
    </section>
  );
}

export default CTASection;
