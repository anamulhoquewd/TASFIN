import { Button } from "@/components/ui/button";
import Image from "next/image";

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
        <div className="grid gap-8 md:grid-cols-2 lg:gap-12">
          {/* Left - Fashion Look */}
          <div className="flex flex-col justify-center">
            <div className="relative h-96 w-full overflow-hidden rounded-lg bg-gradient-to-b from-amber-50 to-amber-100 md:h-[500px] lg:h-[600px]">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-O1lY9E2t6uS8RZWFHuZq5z6VfxtmFU.png"
                alt="Fashion look featuring cream outfit with brown leather accessories"
                width={1000}
                height={1000}
                className="object-cover"
              />
            </div>
            <div className="mt-6">
              <h3 className="text-xl font-semibold text-foreground md:text-2xl">
                Curated Styling
              </h3>
              <p className="mt-2 text-sm text-muted-foreground md:text-base">
                Discover how to pair luxury accessories with timeless pieces for
                the perfect look.
              </p>
            </div>
          </div>

          {/* Right - Product Details */}
          <div className="flex flex-col justify-center space-y-6">
            <div className="space-y-4">
              <div className="inline-block bg-accent px-3 py-1 rounded-full text-sm font-medium text-accent-foreground">
                New Arrival
              </div>
              <h2 className="text-3xl font-bold text-foreground md:text-4xl lg:text-5xl">
                Leather Collection
              </h2>
              <p className="text-base text-muted-foreground md:text-lg leading-relaxed">
                Handcrafted luxury leather goods made from premium materials.
                Each piece is designed to complement your personal style and
                last for years to come.
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
              <Button
                size="lg"
                className="bg-primary text-primary-foreground hover:bg-primary/90"
              >
                Shop Collection
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-border text-foreground hover:bg-muted bg-transparent"
              >
                View Details
              </Button>
            </div>
          </div>
        </div>

        {/* Highlights Section */}
        <div className="mt-16 grid gap-6 md:grid-cols-3 md:mt-20">
          <div className="rounded-lg border border-border bg-card p-6 text-center">
            <div className="text-3xl font-bold text-primary">100%</div>
            <p className="mt-2 text-sm text-muted-foreground">
              Genuine Materials
            </p>
          </div>
          <div className="rounded-lg border border-border bg-card p-6 text-center">
            <div className="text-3xl font-bold text-primary">Lifetime</div>
            <p className="mt-2 text-sm text-muted-foreground">
              Quality Guarantee
            </p>
          </div>
          <div className="rounded-lg border border-border bg-card p-6 text-center">
            <div className="text-3xl font-bold text-primary">Worldwide</div>
            <p className="mt-2 text-sm text-muted-foreground">Free Shipping</p>
          </div>
        </div>
      </div>
    </section>
  );
}
