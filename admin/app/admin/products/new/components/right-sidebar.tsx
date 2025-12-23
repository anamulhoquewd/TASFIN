import useCategory from "@/app/admin/categories/_hook/useCategory";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { CheckCheck, ChevronsUpDown, X } from "lucide-react";
import { useEffect, useState } from "react";

function RightSidebar({
  form,
  categoryOpen,
  changeCategoryOpen,
}: {
  form: any;
  categoryOpen: boolean;
  changeCategoryOpen: (value: boolean) => void;
}) {
  const { categories } = useCategory();
  const getCategoryName = (categoryId: string) => {
    return categories.find((cat) => cat._id === categoryId)?.name || categoryId;
  };

  return (
    <div className="space-y-6">
      <Activity form={form} />

      <Card>
        <CardHeader>
          <CardTitle>Organization</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <FormField
            control={form.control}
            name="categories"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="w-fit cursor-pointer">
                  Categories
                </FormLabel>
                <Popover open={categoryOpen} onOpenChange={changeCategoryOpen}>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        role="combobox"
                        aria-expanded={categoryOpen}
                        className="w-full cursor-pointer justify-between h-auto min-h-[40px] px-3 py-2 bg-transparent"
                      >
                        <div className="flex flex-wrap gap-1">
                          {field.value && field.value.length > 0 ? (
                            field.value.map((categoryId: string) => (
                              <Badge
                                key={categoryId}
                                variant="secondary"
                                className="text-xs"
                              >
                                {getCategoryName(categoryId)}
                                <button
                                  type="button"
                                  className="cursor-pointer ml-1 hover:bg-secondary-foreground/20 rounded-full"
                                  onClick={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    const newCategories =
                                      field.value?.filter(
                                        (id: string) => id !== categoryId
                                      ) || [];
                                    field.onChange(newCategories);
                                  }}
                                >
                                  <X className="h-3 w-3" />
                                </button>
                              </Badge>
                            ))
                          ) : (
                            <span className="text-muted-foreground">
                              Select categories...
                            </span>
                          )}
                        </div>
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-full p-0" align="start">
                    <Command>
                      <CommandInput placeholder="Search categories..." />
                      <CommandList>
                        <CommandEmpty>No categories found.</CommandEmpty>
                        <CommandGroup>
                          {categories.map(
                            (category: { _id: string; name: string }) => (
                              <CommandItem
                                key={category._id}
                                value={category.name}
                                onSelect={() => {
                                  const currentCategories = field.value || [];
                                  const isSelected = currentCategories.includes(
                                    category._id
                                  );

                                  if (isSelected) {
                                    field.onChange(
                                      currentCategories.filter(
                                        (id: string) => id !== category._id
                                      )
                                    );
                                  } else {
                                    field.onChange([
                                      ...currentCategories,
                                      category._id,
                                    ]);
                                  }
                                }}
                              >
                                <CheckCheck
                                  className={cn(
                                    "mr-2 h-4 w-4",
                                    field.value?.includes(category._id)
                                      ? "opacity-100"
                                      : "opacity-0"
                                  )}
                                />
                                {category.name}
                              </CommandItem>
                            )
                          )}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
                <FormDescription>
                  Select one or more categories for your product
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="tags"
            render={({ field }) => {
              const [inputValue, setInputValue] = useState(
                field.value?.join("*") || ""
              );

              useEffect(() => {
                setInputValue(field.value?.join("*") || "");
              }, [field.value]);

              return (
                <FormItem>
                  <FormLabel className="cursor-pointer">Tags</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="Enter tags (star-*-separated)"
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      onBlur={() => {
                        const tags = inputValue
                          .split("*")
                          .map((tag: string) => tag.trim())
                          .filter((tag: string) => tag.length > 0);
                        field.onChange(tags);
                      }}
                    />
                  </FormControl>
                  <FormDescription>
                    Add tags to help customers find your product
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
        </CardContent>
      </Card>
    </div>
  );
}

export const Activity = ({ form }: { form: any }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Status</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <FormField
          control={form.control}
          name="isCustom"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  className="cursor-pointer"
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel className="cursor-pointer">Customizable</FormLabel>
                <FormDescription>
                  This dress will be customizable
                </FormDescription>
              </div>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="isFeatured"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  className="cursor-pointer"
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel className="cursor-pointer">
                  Featured Product
                </FormLabel>
                <FormDescription>
                  Display this product in featured sections
                </FormDescription>
              </div>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="status"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  className="cursor-pointer"
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel className="cursor-pointer">Active Product</FormLabel>
                <FormDescription>
                  Make this product visible to customers
                </FormDescription>
              </div>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="isItNew"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  className="cursor-pointer"
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel className="cursor-pointer">New product</FormLabel>
                <FormDescription>
                  Show &apos;new&apos; badge to customers
                </FormDescription>
              </div>
            </FormItem>
          )}
        />
      </CardContent>
    </Card>
  );
};

export default RightSidebar;
