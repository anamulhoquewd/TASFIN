export function ProductSkeleton() {
  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-8 md:py-12">
      {/* Breadcrumb skeleton */}
      <div className="mb-8 flex gap-2">
        <div className="h-4 w-12 bg-muted rounded animate-pulse" />
        <div className="h-4 w-12 bg-muted rounded animate-pulse" />
        <div className="h-4 w-16 bg-muted rounded animate-pulse" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
        {/* Left: Image gallery skeleton */}
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Thumbnail images */}
          <div className="flex gap-3 lg:flex-col order-2 lg:order-1">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="w-20 h-20 bg-muted rounded-sm animate-pulse"
              />
            ))}
          </div>

          {/* Main image */}
          <div className="aspect-[3/4] bg-muted rounded-sm animate-pulse order-1 lg:order-2" />
        </div>

        {/* Right: Product details skeleton */}
        <div className="flex flex-col gap-8">
          {/* Product title */}
          <div className="space-y-4">
            <div className="h-8 w-32 bg-muted rounded animate-pulse" />
            <div className="h-6 w-24 bg-muted rounded animate-pulse" />
          </div>

          {/* Size section */}
          <div className="space-y-3">
            <div className="h-4 w-12 bg-muted rounded animate-pulse" />
            <div className="flex gap-2">
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className="h-10 w-10 bg-muted rounded-sm animate-pulse"
                />
              ))}
            </div>
          </div>

          {/* Quantity section */}
          <div className="space-y-3">
            <div className="h-4 w-20 bg-muted rounded animate-pulse" />
            <div className="h-10 w-32 bg-muted rounded-sm animate-pulse" />
          </div>

          {/* Add to bag button */}
          <div className="h-12 w-full bg-muted rounded-sm animate-pulse" />

          {/* Shipping info */}
          <div className="h-12 w-full bg-muted/50 rounded-sm animate-pulse" />

          {/* Accordion sections */}
          <div className="space-y-3">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="h-12 w-full bg-muted rounded-sm animate-pulse"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
