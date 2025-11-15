import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export function ProductShowcase() {
  return (
    <section className="w-full bg-background py-12 md:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl lg:text-5xl">
            Premium Collection
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Elevate your style with our curated selection
          </p>
        </div>

        {/* Product Grid */}
        <ProductGrid />
      </div>
    </section>
  );
}

function ProductGrid() {
  return (
    <div className="grid gap-8 md:grid-cols-2 lg:gap-12">
      {/* Left - Fashion Look */}
      <div
        className={`relative aspect-[1/1] overflow-hidden rounded-lg bg-gradient-to-b md:h-[500px] lg:h-[600px]`}
      >
        <Image
          src="/tasfin-logo-text-black-bg-transparent.png"
          alt="showcase"
          fill
          className="object-cover"
        />
      </div>

      {/* Right - Product Details */}
      <div className={`flex flex-col justify-center space-y-6`}>
        <div className="space-y-4">
          <div className="inline-block bg-accent px-3 py-1 rounded-full text-sm font-medium text-accent-foreground">
            New Arrival
          </div>
          <h2 className="text-3xl font-bold text-foreground md:text-4xl lg:text-5xl">
            Ethnic Elegance Meets Modern Edge: The New Leather Collection is
            Here!
          </h2>
          <p className="text-base text-muted-foreground md:text-lg leading-relaxed">
            Defy the ordinary this festive season. Pair the timeless grace of
            our traditional wear with the bold, sophisticated feel of our New
            Arrival Leather Collection accessories. From chic clutches to
            statement belts, give your ethnic look an unexpected twist. Shop the
            fusion now!
          </p>
        </div>

        {/* Product Features */}
        <div className="space-y-3">
          <div className="flex items-start gap-3">
            <div className="mt-1 h-2 w-2 rounded-full bg-primary flex-shrink-0" />
            <span className="text-sm md:text-base text-foreground">
              Premium suede and leather construction
            </span>
          </div>
          <div className="flex items-start gap-3">
            <div className="mt-1 h-2 w-2 rounded-full bg-primary flex-shrink-0" />
            <span className="text-sm md:text-base text-foreground">
              Gold-plated hardware details
            </span>
          </div>
          <div className="flex items-start gap-3">
            <div className="mt-1 h-2 w-2 rounded-full bg-primary flex-shrink-0" />
            <span className="text-sm md:text-base text-foreground">
              Versatile design for any occasion
            </span>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col gap-3 pt-4 sm:flex-row">
          <Link href={"/products"}>
            <Button size="lg" className="cursor-pointer">
              Shop Collection
            </Button>
          </Link>
          {/* <Button
                size="lg"
                variant="outline"
                className="border-border text-foreground hover:bg-muted bg-transparent"
              >
                View Details
              </Button> */}
        </div>
      </div>
    </div>
  );
}
