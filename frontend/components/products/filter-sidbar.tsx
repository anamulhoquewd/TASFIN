import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { Button } from "../ui/button";
import { ScrollArea } from "../ui/scroll-area";
import { X } from "lucide-react";
import { Checkbox } from "../ui/checkbox";
import { Label } from "../ui/label";
import { Slider } from "../ui/slider";
import { Input } from "../ui/input";
import { ICategory } from "@/interfaces/categories";
import { formatPrice } from "@/lib/utils";

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
  isDrawer?: boolean;
}

export function ProductsFilterSidebar({
  onFilterChange,
  initialFilters,
  categories,
  isDrawer = false,
}: ProductsFilterSidebarProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    initialFilters?.categories || [],
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
    [router],
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

  const handlePriceInput = (index: 0 | 1, value: string) => {
    const parsedValue = Number(value);
    if (Number.isNaN(parsedValue)) return;

    setPriceRange((current) => {
      const nextRange = [...current] as [number, number];
      const nextValue = Math.min(10000, Math.max(0, parsedValue));

      if (index === 0) {
        nextRange[0] = Math.min(nextValue, current[1]);
      } else {
        nextRange[1] = Math.max(nextValue, current[0]);
      }

      return nextRange;
    });
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
    <div
      className={`font-cormorant h-fit w-full bg-card p-6 ${
        isDrawer
          ? "overflow-y-auto"
          : "sticky top-14 border border-border lg:w-64"
      }`}
    >
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-foreground uppercase">
          Filters
        </h2>
        {(selectedCategories.length > 0 ||
          priceRange[0] !== 0 ||
          priceRange[1] !== 10000) && (
          <Button
            variant="ghost"
            className="rounded-none cursor-pointer uppercase"
            size="sm"
            onClick={handleResetFilters}
          >
            Clear <X className="h-4 w-4" />
          </Button>
        )}
      </div>

      {/* Categories */}
      <div className="mb-8">
        <h3 className="mb-4 font-medium text-sm text-foreground uppercase">
          Categories
        </h3>
        <div className="space-y-3">
          <ScrollArea className="h-48 pr-3">
            {categories && categories.length > 0 ? (
              <div className="space-y-2 py-1">
                {categories.map((category) => (
                  <div
                    key={category._id}
                    className="flex items-center space-x-2"
                  >
                    <Checkbox
                      className="rounded-none"
                      id={category._id}
                      checked={selectedCategories.includes(category._id)}
                      onCheckedChange={(checked) =>
                        handleCategoryChange(category._id, checked as boolean)
                      }
                    />
                    <Label
                      htmlFor={category._id}
                      className="cursor-pointer text-base font-normal text-muted-foreground"
                    >
                      {category.name}
                    </Label>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-base text-muted-foreground">
                No categories available
              </p>
            )}
          </ScrollArea>
        </div>
      </div>

      {/* Price Range */}
      <div className="mb-8">
        <h3 className="mb-4 font-medium text-foreground uppercase text-sm">
          Price Range
        </h3>
        <div className="space-y-5">
          <Slider
            value={priceRange}
            onValueChange={handlePriceChange}
            min={0}
            max={10000}
            step={100}
            className="w-full cursor-pointer"
          />
          <div className="grid grid-cols-2 gap-3">
            {([0, 1] as const).map((index) => (
              <label key={index} className="space-y-1.5">
                <span className="text-[10px] uppercase tracking-[0.15em] text-muted-foreground">
                  {index === 0 ? "From" : "To"}
                </span>
                <div className="relative">
                  <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-sm text-muted-foreground">
                    $
                  </span>
                  <Input
                    type="number"
                    min={0}
                    max={10000}
                    step={100}
                    value={priceRange[index]}
                    onChange={(event) =>
                      handlePriceInput(index, event.target.value)
                    }
                    className="rounded-none pl-7 pr-2"
                    aria-label={`${index === 0 ? "Minimum" : "Maximum"} price`}
                  />
                </div>
              </label>
            ))}
          </div>
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>{formatPrice(priceRange[0])}</span>
            <span>{formatPrice(priceRange[1])}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
