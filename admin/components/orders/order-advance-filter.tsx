import { DateRangePicker } from "@/components/date-range-picker";
import { Button } from "@/components/ui/button";
import {
  Calendar as CalendarComponent,
} from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { Calendar, ShoppingCart, User } from "lucide-react";
import { Dispatch, SetStateAction } from "react";
import { IFilter, ISearch } from "../../hooks/orders/useOrder";

interface OrderAdvaceFilterProps {
  filterBy: IFilter;
  setFilterBy: Dispatch<SetStateAction<IFilter>>;
  search: ISearch;
  setSearch: Dispatch<SetStateAction<ISearch>>;
}

function OrderAdvanceFilter({
  filterBy,
  setFilterBy,
  search,
  setSearch,
}: OrderAdvaceFilterProps) {
  return (
    <div className="mb-6 p-4 border rounded-lg bg-muted/50">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Date Range Filter */}
        <div className="space-y-2">
          <Label className="text-sm font-medium">Date Range</Label>
          <DateRangePicker
            initialDateFrom={filterBy.dateRange?.from}
            initialDateTo={filterBy.dateRange?.to}
            onUpdate={(values) =>
              setFilterBy((prev) => ({
                ...prev,
                dateRange: values.range,
              }))
            }
          />
        </div>

        {/* Single Date Filter */}
        <div className="space-y-2">
          <Label className="text-sm font-medium">Single Date</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="w-full justify-start text-left font-normal cursor-pointer"
              >
                <Calendar className="mr-2 h-4 w-4" />
                {filterBy.singleDate
                  ? format(filterBy.singleDate, "MMM dd, yyyy")
                  : "Select date"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <CalendarComponent
                mode="single"
                selected={filterBy.singleDate}
                onSelect={(date) =>
                  setFilterBy((prev) => ({ ...prev, singleDate: date }))
                }
              />
            </PopoverContent>
          </Popover>
        </div>

        {/* User ID Filter */}
        <div className="space-y-2">
          <Label className="text-sm font-medium">User ID</Label>
          <div className="relative">
            <User className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Enter user ID"
              className="pl-8"
              type="search"
              value={search.userId}
              onChange={(e) =>
                setSearch((prev) => ({
                  ...prev,
                  userId: e.target.value,
                }))
              }
            />
          </div>
        </div>

        {/* Variant ID Filter */}
        <div className="space-y-2">
          <Label className="text-sm font-medium">Variant ID</Label>
          <div className="relative">
            <ShoppingCart className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Enter Variant ID"
              className="pl-8"
              type="search"
              value={search.variantId}
              onChange={(e) =>
                setSearch((prev) => ({
                  ...prev,
                  variantId: e.target.value,
                }))
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderAdvanceFilter;
