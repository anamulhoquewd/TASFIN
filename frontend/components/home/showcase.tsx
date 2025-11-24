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
    <div className="grid md:grid-cols-2">
      {/* Left - Fashion Look */}
      <div
        className={`relative aspect-[3/4] overflow-hidden rounded-lg bg-gradient-to-b md:h-[500px] lg:h-[600px] flex items-center justify-center`}
      >
        <Image
          src="/showcase/showcase.png"
          alt="showcase"
          fill
          className="object-cover"
        />
      </div>

      {/* Right - Product Details */}
      <div className={`flex flex-col justify-start space-y-6`}>
        <div className="space-y-4">
          <div className="inline-block bg-accent px-3 py-1 rounded-full text-sm font-medium text-accent-foreground">
            Best Seller
          </div>
          <h2 className="text-3xl font-bold text-foreground md:text-4xl leading-10 md:leading-14 font-playfair">
            Monochrome Muse: <span className="text-primary">White Cotton</span>{" "}
            Set with Intricate{" "}
            <span className="text-primary">Black Embroidery</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Discover the perfect blend of comfort and style with our White
            Cotton Set, featuring exquisite black embroidery that adds a touch
            of elegance to your everyday look.
          </p>
        </div>

        {/* Product Features */}
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <div className="mt-1 h-2 w-2 rounded-full bg-primary flex-shrink-0" />
            <span className="text-sm md:text-base text-foreground">
              Premium breathable cotton blend for all-day comfort.
            </span>
          </div>
          <div className="flex items-center gap-3">
            <div className="mt-1 h-2 w-2 rounded-full bg-primary flex-shrink-0" />
            <span className="text-sm md:text-base text-foreground">
              Minimalist white base with high-contrast black thread embroidery.
            </span>
          </div>
          <div className="flex items-center gap-3">
            <div className="mt-1 h-2 w-2 rounded-full bg-primary flex-shrink-0" />
            <span className="text-sm md:text-base text-foreground">
              Relaxed silhouette with a classic round neckline.
            </span>
          </div>
          <div className="flex items-center gap-3">
            <div className="mt-1 h-2 w-2 rounded-full bg-primary flex-shrink-0" />
            <span className="text-sm md:text-base text-foreground">
              Includes 1 Embroidered Kameez and 1 Matching Trouser.{" "}
            </span>
          </div>
          <div className="flex items-center gap-3">
            <div className="mt-1 h-2 w-2 rounded-full bg-primary flex-shrink-0" />
            <span className="text-sm md:text-base text-foreground">
              Pairs perfectly with silver oxidized jewelry or simple black
              sandals.
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
