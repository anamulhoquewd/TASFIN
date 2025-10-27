"use client";

import { ProductsFilterSidebar } from "@/components/products/filter-sidbar";
import { ProductsGrid } from "@/components/products/products-grid";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { useProducts } from "@/hooks/products/use-products";
import { useState } from "react";

export default function ProductsPage() {
  const [filters, setFilters] = useState<{
    categories: string[];
    priceRange: { minPrice: number; maxPrice: number };
  }>({
    categories: [],
    priceRange: { minPrice: 0, maxPrice: 10000 },
  });

  const {
    products,
    isLoading,
    hasMore,
    observerTarget,
    sortConfig,
    handleSort,
    handleFilterChange,
  } = useProducts({
    initialLimit: 1,
    sortBy: "createdAt",
    sortType: "desc",
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

        {/* 🔹 Drawer (Mobile Filter) */}
        <Drawer
          direction="left"
          open={isFilterOpen}
          onOpenChange={setIsFilterOpen}
        >
          <DrawerContent className="p-6 w-4/5 sm:w-2/3 md:w-1/2">
            <DrawerHeader className="flex items-center justify-between">
              <DrawerTitle onClick={() => setIsFilterOpen(false)}>
                Close
              </DrawerTitle>
            </DrawerHeader>
            <ProductsFilterSidebar
              onFilterChange={(data: any) => {
                handleFilterChange_(data);
                setIsFilterOpen(false);
              }}
              initialFilters={filters}
            />
          </DrawerContent>
        </Drawer>
      </div>
    </div>
  );
}
