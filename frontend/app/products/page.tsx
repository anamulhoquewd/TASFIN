"use client";

import { ProductsFilterSidebar } from "@/components/products/filter-sidbar";
import { ProductsGrid } from "@/components/products/products-grid";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useProducts } from "@/hooks/products/use-products";
import { useSearchParams } from "next/navigation";
import { useState } from "react";

export default function ProductsPage() {
  const searchParams = useSearchParams();

  // Initialize filters from URL query params
  const initialCategories = searchParams.get("categories")?.split(",") || [];
  const initialMinPrice = Number(searchParams.get("minPrice")) || 0;
  const initialMaxPrice = Number(searchParams.get("maxPrice")) || 10000;

  const [filters, setFilters] = useState<{
    categories: string[];
    priceRange: { minPrice: number; maxPrice: number };
  }>({
    categories: initialCategories,
    priceRange: { minPrice: initialMinPrice, maxPrice: initialMaxPrice },
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
        {/* Sidebar for Desktop */}
        <div className="hidden lg:block">
          <ProductsFilterSidebar
            onFilterChange={handleFilterChange_}
            initialFilters={filters}
          />
        </div>

        {/* Products Grid */}
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
          <DialogContent className="p-0 border-0 m-0">
            <ProductsFilterSidebar
              onFilterChange={handleFilterChange_}
              onClose={setIsFilterOpen}
              initialFilters={filters}
            />
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
