import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { Button } from "../ui/button";
import { ScrollArea } from "../ui/scroll-area";
import { X } from "lucide-react";
import { Checkbox } from "../ui/checkbox";
import { Label } from "../ui/label";
import { ICategory } from "@/interfaces/categories";
import { Input } from "../ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

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

  const [selectedPriceRange, setSelectedPriceRange] = useState("");

  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    initialFilters?.categories || []
  );
  const [priceRange, setPriceRange] = useState<[number, number]>([
    initialFilters?.priceRange?.minPrice ?? 0,
    initialFilters?.priceRange?.maxPrice ?? 10000,
  ]);

  // initialize selectedPriceRange from initialFilters if provided
  useEffect(() => {
    if (initialFilters && initialFilters.priceRange) {
      const { minPrice = 0, maxPrice = 10000 } = initialFilters.priceRange;
      if (minPrice === 0 && maxPrice === 10000) {
        setSelectedPriceRange("");
      } else {
        setSelectedPriceRange(`${minPrice}-${maxPrice}`);
      }
    }
    // only run once on mount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

  // value is a string like "" or "1000-2500"
  const handlePriceChange = (value: string) => {
    setSelectedPriceRange(value);

    if (!value) {
      setPriceRange([0, 10000]);
      return;
    }

    const parts = value.split("-").map((p) => Number(p));
    if (
      parts.length === 2 &&
      !Number.isNaN(parts[0]) &&
      !Number.isNaN(parts[1])
    ) {
      setPriceRange([parts[0], parts[1]] as [number, number]);
    } else {
      // fallback to defaults
      setPriceRange([0, 10000]);
    }
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

  const priceRangePairs = [
    { label: "All Prices", value: "" },
    { label: "Under 1000", value: "0-1000" },
    { label: "1000 - 2500", value: "1000-2500" },
    { label: "2500 - $5000", value: "2500-5000" },
    { label: "Over 5000", value: "5000-20000" },
  ];

  return (
    <div className="font-cormorant sticky top-14 h-fit w-full border border-border p-6 lg:w-64">
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

      <ScrollArea className="h-96 md:h-[28rem] pr-6">
        {/* Categories */}
        <h3 className="mb-4 font-medium text-sm text-foreground uppercase">
          Categories
        </h3>
        <div className="space-y-3">
          <ScrollArea className="h-52">
            {categories && categories.length > 0 ? (
              categories.map((category) => (
                <div key={category._id} className="flex items-center space-x-2">
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
              ))
            ) : (
              <p className="text-base text-muted-foreground">
                No categories available
              </p>
            )}
          </ScrollArea>
        </div>

        {/* Price Range */}
        <h3 className="mb-4 font-medium text-sm text-foreground uppercase">
          Price Range
        </h3>
        <ScrollArea className="h-52">
          <RadioGroup
            value={selectedPriceRange}
            onValueChange={(val) => handlePriceChange(val)}
          >
            {priceRangePairs.map((range) => {
              const id = `price-${range.value || "all"}`;
              return (
                <div key={id} className="flex items-center space-x-2">
                  <RadioGroupItem value={range.value} id={id} />
                  <Label
                    htmlFor={id}
                    className="cursor-pointer text-base font-normal text-muted-foreground"
                  >
                    {range.label}
                  </Label>
                </div>
              );
            })}
          </RadioGroup>
        </ScrollArea>
      </ScrollArea>
    </div>
  );
}
