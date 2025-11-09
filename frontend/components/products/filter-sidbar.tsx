"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { X } from "lucide-react";
import useCategory from "@/hooks/categories/useCategory";
import { ScrollArea } from "../ui/scroll-area";

interface ProductsFilterSidebarProps {
  onFilterChange: (filters: {
    categories: string[];
    priceRange: { minPrice: number; maxPrice: number };
  }) => void;
  initialFilters?: {
    categories: string[];
    priceRange: { minPrice: number; maxPrice: number };
  };
  onClose?: (close: boolean) => void;
}

export function ProductsFilterSidebar({
  onFilterChange,
  initialFilters,
  onClose,
}: ProductsFilterSidebarProps) {
  const { categories } = useCategory();
  const router = useRouter();
  const searchParams = useSearchParams();

  // 🔹 Get initial query params
  const queryCategories = searchParams.get("categories")
    ? searchParams.get("categories")!.split(",")
    : [];
  const minPriceQuery = searchParams.get("minPrice");
  const maxPriceQuery = searchParams.get("maxPrice");

  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    initialFilters?.categories || queryCategories || []
  );

  const [priceRange, setPriceRange] = useState<[number, number]>(
    initialFilters?.priceRange
      ? [initialFilters.priceRange.minPrice, initialFilters.priceRange.maxPrice]
      : [Number(minPriceQuery) || 0, Number(maxPriceQuery) || 10000]
  );

  // 🔹 Update UI + Filters when URL query changes
  useEffect(() => {
    const updatedCategories = searchParams.get("categories")
      ? searchParams.get("categories")!.split(",")
      : [];

    const updatedMin = Number(searchParams.get("minPrice")) || 0;
    const updatedMax = Number(searchParams.get("maxPrice")) || 10000;

    // ✅ Update local UI state
    setSelectedCategories(updatedCategories);
    setPriceRange([updatedMin, updatedMax]);

    // ✅ Notify parent to fetch products
    onFilterChange({
      categories: updatedCategories,
      priceRange: {
        minPrice: updatedMin,
        maxPrice: updatedMax,
      },
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  // 🔹 Update URL query params
  const updateURLParams = (filters: {
    categories: string[];
    priceRange: [number, number];
  }) => {
    const params = new URLSearchParams();

    if (filters.categories.length > 0) {
      params.set("categories", filters.categories.join(","));
    }
    if (filters.priceRange[0] > 0) {
      params.set("minPrice", String(filters.priceRange[0]));
    }
    if (filters.priceRange[1] < 10000) {
      params.set("maxPrice", String(filters.priceRange[1]));
    }

    const query = params.toString();
    router.push(`?${query}`, { scroll: false });
  };

  // 🔹 Category Change
  const handleCategoryChange = (categoryId: string, checked: boolean) => {
    const newCategories = checked
      ? [...selectedCategories, categoryId]
      : selectedCategories.filter((id) => id !== categoryId);

    setSelectedCategories(newCategories);

    // ✅ Update URL instantly
    updateURLParams({
      categories: newCategories,
      priceRange,
    });
  };

  // 🔹 Price Change (Slider)
  const handlePriceChange = (value: number[]) => {
    setPriceRange([value[0], value[1]]);
  };

  // 🔹 Apply Filters Button (optional if not instant)
  const handleApplyFilters = () => {
    onClose && onClose(false);
    updateURLParams({
      categories: selectedCategories,
      priceRange,
    });
  };

  // 🔹 Reset Filters
  const handleResetFilters = () => {
    setSelectedCategories([]);
    setPriceRange([0, 10000]);
    router.push("?", { scroll: false });

    onFilterChange({
      categories: [],
      priceRange: { minPrice: 0, maxPrice: 10000 },
    });
  };

  return (
    <div className="sticky top-14 h-fit w-full rounded-lg border border-border bg-card p-6 lg:w-64">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-foreground">Filters</h2>
        {(selectedCategories.length > 0 ||
          priceRange[0] !== 0 ||
          priceRange[1] !== 10000) && (
          <Button
            className="cursor-pointer"
            variant="ghost"
            size="sm"
            onClick={handleResetFilters}
          >
            Clear <X className="h-4 w-4" />
          </Button>
        )}
      </div>

      {/* Categories */}
      <div className="mb-8">
        <h3 className="mb-4 font-medium text-foreground">Categories</h3>
        <div className="space-y-3">
          <ScrollArea className="h-40">
            {categories && categories.length > 0 ? (
              categories.map((category) => (
                <div key={category._id} className="flex items-center space-x-2">
                  <Checkbox
                    id={category._id}
                    checked={selectedCategories.includes(category._id)}
                    onCheckedChange={(checked) =>
                      handleCategoryChange(category._id, checked as boolean)
                    }
                  />
                  <Label
                    htmlFor={category._id}
                    className="cursor-pointer text-sm font-normal text-muted-foreground"
                  >
                    {category.name}
                  </Label>
                </div>
              ))
            ) : (
              <p className="text-sm text-muted-foreground">
                No categories available
              </p>
            )}
          </ScrollArea>
        </div>
      </div>

      {/* Price Range */}
      <div className="mb-8">
        <h3 className="mb-4 font-medium text-foreground">Price Range</h3>
        <div className="space-y-4">
          <Slider
            value={priceRange}
            onValueChange={handlePriceChange}
            min={0}
            max={10000}
            step={100}
            className="w-full"
          />
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">{priceRange[0]}</span>
            <span className="text-muted-foreground">{priceRange[1]}</span>
          </div>
        </div>
      </div>

      {/* Apply Button */}
      <Button
        disabled={
          !selectedCategories.length &&
          priceRange[0] === 0 &&
          priceRange[1] === 10000
        }
        onClick={handleApplyFilters}
        className="w-full"
      >
        Apply Filters
      </Button>
    </div>
  );
}
