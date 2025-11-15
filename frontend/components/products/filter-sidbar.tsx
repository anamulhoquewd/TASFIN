import useCategory from "@/hooks/categories/useCategory";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { Button } from "../ui/button";
import { ScrollArea } from "../ui/scroll-area";
import { X } from "lucide-react";
import { Checkbox } from "../ui/checkbox";
import { Label } from "../ui/label";
import { Slider } from "../ui/slider";
import { ICategory } from "@/interfaces/categories";

interface ProductsFilterSidebarProps {
  onFilterChange: (filters: {
    categories: string[];
    priceRange: { minPrice: number; maxPrice: number };
  }) => void;
  initialFilters?: {
    categories: string[];
    priceRange: { minPrice: number; maxPrice: number };
  };
  categories: ICategory[];
}

export function ProductsFilterSidebar({
  onFilterChange,
  initialFilters,
  categories,
}: ProductsFilterSidebarProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    initialFilters?.categories || []
  );
  const [priceRange, setPriceRange] = useState<[number, number]>([
    initialFilters?.priceRange.minPrice || 0,
    initialFilters?.priceRange.maxPrice || 10000,
  ]);

  // Sync local state with URL changes and notify parent
  useEffect(() => {
    const updatedCategories = searchParams.get("categories")?.split(",") || [];
    const updatedMin = Number(searchParams.get("minPrice")) || 0;
    const updatedMax = Number(searchParams.get("maxPrice")) || 10000;

    setSelectedCategories(updatedCategories);
    setPriceRange([updatedMin, updatedMax]);

    onFilterChange({
      categories: updatedCategories,
      priceRange: { minPrice: updatedMin, maxPrice: updatedMax },
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  const updateURLParams = useCallback(
    (newCategories: string[], newPriceRange: [number, number]) => {
      const params = new URLSearchParams();

      if (newCategories.length > 0) {
        params.set("categories", newCategories.join(","));
      }
      if (newPriceRange[0] > 0) {
        params.set("minPrice", String(newPriceRange[0]));
      }
      if (newPriceRange[1] < 10000) {
        params.set("maxPrice", String(newPriceRange[1]));
      }

      const query = params.toString();
      router.push(`?${query}`, { scroll: false });
    },
    [router]
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

  useEffect(() => {
    const timer = setTimeout(() => {
      updateURLParams(selectedCategories, priceRange);
    }, 1000);

    return () => clearTimeout(timer);
  }, [priceRange, selectedCategories, updateURLParams]);

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
          <Button variant="ghost" size="sm" onClick={handleResetFilters}>
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
            className="w-full cursor-pointer"
          />
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">{priceRange[0]}</span>
            <span className="text-muted-foreground">{priceRange[1]}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
