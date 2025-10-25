"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import useCategory from "@/hooks/categories/useCategory";
import { X } from "lucide-react";
import { useState } from "react";

interface ProductsFilterSidebarProps {
  onFilterChange: (filters: {
    categories: string[];
    priceRange: { minPrice: number; maxPrice: number };
  }) => void;
  initialFilters?: {
    categories: string[];
    priceRange: { minPrice: number; maxPrice: number };
  };
}

export function ProductsFilterSidebar({
  onFilterChange,
  initialFilters,
}: ProductsFilterSidebarProps) {
  const { categories } = useCategory();
  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    initialFilters?.categories || []
  );
  const [priceRange, setPriceRange] = useState<[number, number]>(
    initialFilters?.priceRange
      ? [initialFilters.priceRange.minPrice, initialFilters.priceRange.maxPrice]
      : [0, 10000]
  );

  const handleCategoryChange = (categoryId: string, checked: boolean) => {
    const newCategories = checked
      ? [...selectedCategories, categoryId]
      : selectedCategories.filter((id) => id !== categoryId);
    setSelectedCategories(newCategories);
  };

  const handlePriceChange = (value: number[]) => {
    setPriceRange([value[0], value[1]]);
  };

  const handleApplyFilters = () => {
    onFilterChange({
      categories: selectedCategories,
      priceRange: { minPrice: priceRange[0], maxPrice: priceRange[1] },
    });
  };

  const handleResetFilters = () => {
    setSelectedCategories([]);
    setPriceRange([0, 10000]);
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
          <Button variant="ghost" size="sm" onClick={handleResetFilters}>
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>

      {/* Categories Filter */}
      <div className="mb-8">
        <h3 className="mb-4 font-medium text-foreground">Categories</h3>
        <div className="space-y-3">
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
        </div>
      </div>

      {/* Price Range Filter */}
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

      {/* Apply Filters Button */}
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
