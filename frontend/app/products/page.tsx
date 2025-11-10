"use client";

import { ProductsFilterSidebar } from "@/components/products/filter-sidbar";
import { ProductsGrid } from "@/components/products/products-grid";
import { useProducts } from "@/hooks/products/use-products";
import { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";

export default function ProductsPage() {
  const [filters, setFilters] = useState<{
    categories: string[];
    priceRange: { minPrice: number; maxPrice: number };
  }>({
    categories: [],
    priceRange: { minPrice: 0, maxPrice: 10000 },
  });

  const {
    infinityProducts: products,
    isLoading,
    hasMore,
    observerTarget,
    sortConfig,
    handleSort,
    handleFilterChange,
  } = useProducts({
    categories: filters.categories,
    priceRange: filters.priceRange,
  });
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const handleFilterChange_ = (newFilters: typeof filters) => {
    setFilters(newFilters);
    handleFilterChange(newFilters);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 pt-4 pb-12 flex flex-col gap-8 lg:flex-row">
        {/* 🔹 Sidebar for Desktop */}
        <div className="hidden lg:block">
          <ProductsFilterSidebar
            onFilterChange={handleFilterChange_}
            initialFilters={filters}
          />
        </div>

        {/* 🔹 Products Grid */}
        <div className="flex-1">
          <ProductsGrid
            products={products}
            isLoading={isLoading}
            hasMore={hasMore}
            observerTarget={observerTarget as React.RefObject<HTMLDivElement>}
            sortConfig={sortConfig}
            onSortChange={handleSort}
            setIsFilterOpen={setIsFilterOpen}
          />
        </div>

        {/* Drawer (Mobile Filter) */}

        <Dialog open={isFilterOpen} onOpenChange={setIsFilterOpen}>
          {/* <DialogTrigger>Open</DialogTrigger> */}
          <DialogContent className="p-0 border-0 m-0">
            <ProductsFilterSidebar
              onFilterChange={(data: any) => {
                handleFilterChange_(data);
              }}
              onClose={setIsFilterOpen}
              initialFilters={filters}
            />
          </DialogContent>
        </Dialog>

        {/* <Drawer
          direction="left"
          open={isFilterOpen}
          onOpenChange={setIsFilterOpen}
        >
          <DrawerContent className="p-6 w-4/5 sm:w-2/3 md:w-1/2 touch-none">
            <ProductsFilterSidebar
              onFilterChange={(data: any) => {
                handleFilterChange_(data);
              }}
              initialFilters={filters}
            />
          </DrawerContent>
        </Drawer> */}
      </div>
    </div>
  );
}
