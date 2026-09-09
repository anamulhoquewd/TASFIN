"use client";

import useCategory from "@/app/admin/categories/_hook/useCategory";
import { ChipInput } from "@/components/chip-input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
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
  Form,
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import {
  ArrowDown,
  ArrowUp,
  CheckCheck,
  ChevronsUpDown,
  Plus,
  Trash2,
  Upload,
  X,
} from "lucide-react";
import Image from "next/image";
import type React from "react";
import { toast } from "sonner";
import type { UseProductsReturn } from "../_hook/useProducts";

type ProductsForm = UseProductsReturn["form"];

interface CreateProductFormProps {
  form: ProductsForm;
  onSubmit: (data: any) => void;
  handleTitleChange: (title: string) => void;
  setCategoryOpen: React.Dispatch<React.SetStateAction<boolean>>;
  categoryOpen: boolean;
  append: (value: any) => void;
  remove: (index: number) => void;
  fields: any[];
  variantImagePreviews: string[][];
  handleVariantImageUpload: (
    index: number,
    e: React.ChangeEvent<HTMLInputElement>,
  ) => void;
  removeVariantImage: (index: number, variantIndex: number) => void;
}

export function CreateProductForm({
  form,
  onSubmit,
  handleTitleChange,
  categoryOpen,
  setCategoryOpen,
  remove,
  append,
  fields,
  variantImagePreviews,
  handleVariantImageUpload,
  removeVariantImage,
}: CreateProductFormProps) {
  const { categories } = useCategory();
  const getCategoryName = (categoryId: string) => {
    return categories.find((cat) => cat._id === categoryId)?.name || categoryId;
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <div className="md:col-span-2 space-y-6">
            {/* Basic Information */}
            <Card>
              <CardHeader>
                <CardTitle>Basic Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Product Title</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter product title"
                            {...field}
                            onChange={(e) => handleTitleChange(e.target.value)}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="slug"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Slug</FormLabel>
                        <FormControl>
                          <Input placeholder="product-slug" {...field} />
                        </FormControl>
                        <FormDescription>
                          URL-friendly version of the title (auto-generated)
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Product Description */}
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Enter product description"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="keyFeatures"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Key Features</FormLabel>
                      <FormControl>
                        <ChipInput
                          variant="feature"
                          value={field.value ?? []}
                          onChange={field.onChange}
                          placeholder="Type a feature and press Enter"
                        />
                      </FormControl>
                      <FormDescription>
                        Highlight what makes this product special — add one
                        feature at a time
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>
            {/* Product Images */}
            <Card>
              <CardHeader>
                <CardTitle>Product Images</CardTitle>
              </CardHeader>
              <CardContent>
                <FormField
                  control={form.control}
                  name="images"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <div>
                          <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-border rounded-lg cursor-pointer hover:bg-muted/50">
                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                              <Upload className="w-8 h-8 mb-2 text-muted-foreground" />
                              <p className="text-sm text-muted-foreground">
                                Click to upload images
                              </p>
                            </div>
                            <Input
                              type="file"
                              className="hidden"
                              multiple
                              accept="image/*"
                              onChange={(e) => {
                                const newFiles = Array.from(
                                  e.target.files || [],
                                );
                                const existing = field.value || [];
                                // Duplicate check (name + size + lastModified)
                                const filtered = newFiles.filter(
                                  (file) =>
                                    !existing.some(
                                      (f: File) =>
                                        f.name === file.name &&
                                        f.size === file.size &&
                                        f.lastModified === file.lastModified,
                                    ),
                                );
                                if (
                                  filtered.length === 0 &&
                                  newFiles.length > 0
                                ) {
                                  toast.warning("Duplicate images ignored", {
                                    description:
                                      "You tried to upload images that already exist.",
                                  });
                                } else if (filtered.length < newFiles.length) {
                                  toast.warning("Some duplicates ignored", {
                                    description:
                                      "Only new images have been added.",
                                  });
                                }
                                field.onChange([...existing, ...filtered]);
                              }}
                            />
                          </label>
                          {field.value?.length > 0 && (
                            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 mt-4">
                              {field.value.map((file: File, index: number) => (
                                <div key={index} className="relative group">
                                  <Image
                                    src={URL.createObjectURL(file)}
                                    alt={`Preview ${index + 1}`}
                                    width={500}
                                    height={500}
                                    className="w-full h-24 object-cover rounded-lg"
                                  />
                                  <button
                                    type="button"
                                    onClick={() =>
                                      field.onChange(
                                        field.value.filter(
                                          (_: any, i: number) => i !== index,
                                        ),
                                      )
                                    }
                                    className="cursor-pointer absolute -top-2 -right-2 bg-destructive text-destructive-foreground rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                                  >
                                    <X className="w-3 h-3" />
                                  </button>
                                  <div className="absolute bottom-0 right-0 flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <button
                                      type="button"
                                      disabled={index === 0}
                                      onClick={() => {
                                        if (index > 0) {
                                          const newArray = [...field.value];
                                          [
                                            newArray[index - 1],
                                            newArray[index],
                                          ] = [
                                            newArray[index],
                                            newArray[index - 1],
                                          ];
                                          field.onChange(newArray);
                                        }
                                      }}
                                      className="bg-secondary text-secondary-foreground rounded p-1 disabled:opacity-50 cursor-pointer"
                                    >
                                      <ArrowUp className="w-3 h-3" />
                                    </button>
                                    <button
                                      type="button"
                                      disabled={
                                        index === field.value.length - 1
                                      }
                                      onClick={() => {
                                        if (index < field.value.length - 1) {
                                          const newArray = [...field.value];
                                          [
                                            newArray[index + 1],
                                            newArray[index],
                                          ] = [
                                            newArray[index],
                                            newArray[index + 1],
                                          ];
                                          field.onChange(newArray);
                                        }
                                      }}
                                      className="bg-secondary text-secondary-foreground rounded p-1 disabled:opacity-50 cursor-pointer"
                                    >
                                      <ArrowDown className="w-3 h-3" />
                                    </button>
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>
            {/* Product Variants */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  Product Variants
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      append({
                        sku: "",
                        attributes: [],
                        stock: 0,
                        price: 0,
                        images: [],
                      })
                    }
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add Variant
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {fields.map((field: any, index: number) => (
                    <div
                      key={field.id}
                      className="p-4 border border-border rounded-lg"
                    >
                      <div className="flex items-center justify-between mb-4">
                        <h4 className="font-medium">Variant {index + 1}</h4>
                        {fields.length > 1 && (
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => remove(index)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        )}
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                        <FormField
                          control={form.control}
                          name={`variants.${index}.sku`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>SKU</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="TSHIRT-BLACK-M"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name={`variants.${index}.stock`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Stock</FormLabel>
                              <FormControl>
                                <Input
                                  type="number"
                                  min="0"
                                  {...field}
                                  onChange={(e) =>
                                    field.onChange(
                                      Number.parseInt(e.target.value) || 0,
                                    )
                                  }
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name={`variants.${index}.price`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Price</FormLabel>
                              <FormControl>
                                <Input
                                  type="number"
                                  min="0"
                                  {...field}
                                  onChange={(e) =>
                                    field.onChange(
                                      Number.parseFloat(e.target.value) || 0,
                                    )
                                  }
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <div className="mb-4 rounded-lg border border-border p-3 space-y-3">
                        <div className="flex items-center justify-between">
                          <FormLabel>Variant attributes</FormLabel>
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              const attributes =
                                form.getValues(
                                  `variants.${index}.attributes`,
                                ) || [];
                              form.setValue(`variants.${index}.attributes`, [
                                ...attributes,
                                { key: "", value: "" },
                              ]);
                            }}
                          >
                            <Plus className="mr-1 h-3 w-3" /> Add attribute
                          </Button>
                        </div>
                        {(form.watch(`variants.${index}.attributes`) || []).map(
                          (_: unknown, attributeIndex: number) => (
                            <div
                              key={attributeIndex}
                              className="grid grid-cols-[1fr_1fr_auto] gap-2"
                            >
                              <FormField
                                control={form.control}
                                name={`variants.${index}.attributes.${attributeIndex}.key`}
                                render={({ field }) => (
                                  <FormItem>
                                    <FormControl>
                                      <Input placeholder="Color" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                              <FormField
                                control={form.control}
                                name={`variants.${index}.attributes.${attributeIndex}.value`}
                                render={({ field }) => (
                                  <FormItem>
                                    <FormControl>
                                      <Input placeholder="Black" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                              <Button
                                type="button"
                                variant="ghost"
                                size="icon"
                                aria-label="Remove attribute"
                                onClick={() => {
                                  const attributes =
                                    form.getValues(
                                      `variants.${index}.attributes`,
                                    ) || [];
                                  form.setValue(
                                    `variants.${index}.attributes`,
                                    attributes.filter(
                                      (_: unknown, i: number) =>
                                        i !== attributeIndex,
                                    ),
                                  );
                                }}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          ),
                        )}
                      </div>

                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <FormLabel>Variant Images</FormLabel>
                          <label className="flex items-center gap-2 px-3 py-2 text-sm border border-border rounded-md cursor-pointer hover:bg-muted/50">
                            <Upload className="w-4 h-4" />
                            Upload Images
                            <input
                              type="file"
                              className="hidden"
                              multiple
                              accept="image/*"
                              onChange={(e) =>
                                handleVariantImageUpload(index, e)
                              }
                            />
                          </label>
                        </div>

                        {variantImagePreviews[index] &&
                          variantImagePreviews[index].length > 0 && (
                            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7 gap-2">
                              {variantImagePreviews[index].map(
                                (preview: string, imageIndex: number) => (
                                  <div
                                    key={imageIndex}
                                    className="relative group"
                                  >
                                    <Image
                                      src={preview || "/placeholder.svg"}
                                      alt={`Variant ${index + 1} Image ${
                                        imageIndex + 1
                                      }`}
                                      width={500}
                                      height={500}
                                      className="w-full h-20 object-cover rounded-md"
                                    />
                                    <button
                                      type="button"
                                      onClick={() =>
                                        removeVariantImage(index, imageIndex)
                                      }
                                      className="cursor-pointer absolute -top-1 -right-1 bg-destructive text-destructive-foreground rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                                    >
                                      <X className="w-3 h-3" />
                                    </button>
                                  </div>
                                ),
                              )}
                            </div>
                          )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            {/* Product Details */}
            <Card>
              <CardHeader>
                <CardTitle>Specifications</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <FormDescription>
                  Add any product-specific key/value pairs, such as Fabric, Fit,
                  or Wash Care.
                </FormDescription>
                {(form.watch("specifications") || []).map(
                  (_: unknown, specificationIndex: number) => (
                    <div
                      key={specificationIndex}
                      className="grid grid-cols-[1fr_1fr_auto] gap-2"
                    >
                      <FormField
                        control={form.control}
                        name={`specifications.${specificationIndex}.key`}
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Input placeholder="Fabric" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name={`specifications.${specificationIndex}.value`}
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Input placeholder="100% Cotton" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        aria-label="Remove specification"
                        onClick={() => {
                          const specifications =
                            form.getValues("specifications") || [];
                          form.setValue(
                            "specifications",
                            specifications.filter(
                              (_: unknown, i: number) =>
                                i !== specificationIndex,
                            ),
                          );
                        }}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ),
                )}
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    form.setValue("specifications", [
                      ...(form.getValues("specifications") || []),
                      { key: "", value: "" },
                    ])
                  }
                >
                  <Plus className="mr-1 h-3 w-3" /> Add specification
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Discount</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <FormField
                  control={form.control}
                  name="discount"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                      <FormControl>
                        <Checkbox
                          checked={Boolean(field.value)}
                          onCheckedChange={(checked) =>
                            field.onChange(
                              checked
                                ? {
                                    discountType: "percentage",
                                    value: 0,
                                  }
                                : undefined,
                            )
                          }
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>Apply a discount</FormLabel>
                        <FormDescription>
                          Set an optional percentage or fixed amount off.
                        </FormDescription>
                      </div>
                    </FormItem>
                  )}
                />

                {form.watch("discount") && (
                  <>
                    <FormField
                      control={form.control}
                      name="discount.discountType"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Discount Type</FormLabel>
                          <FormControl>
                            <Select
                              name={field.name}
                              value={field.value}
                              onValueChange={field.onChange}
                            >
                              <SelectTrigger id="form-rhf-select-language">
                                <SelectValue placeholder="Select" />
                              </SelectTrigger>
                              <SelectContent position="item-aligned">
                                <SelectItem value={"percentage"}>
                                  Percentage (%)
                                </SelectItem>
                                <SelectItem value={"fixed"}>
                                  Fixed amount
                                </SelectItem>
                              </SelectContent>
                            </Select>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="discount.value"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Discount Value</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              min="0"
                              step="0.1"
                              {...field}
                              onChange={(event) =>
                                field.onChange(
                                  Number.parseFloat(event.target.value) || 0,
                                )
                              }
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      {/* Start Date */}
                      <FormField
                        control={form.control}
                        name="discount.startAt"
                        render={({ field }) => {
                          const date = field.value
                            ? new Date(field.value)
                            : undefined;

                          return (
                            <FormItem>
                              <FormLabel>Start Date</FormLabel>

                              <Popover>
                                <PopoverTrigger asChild>
                                  <FormControl>
                                    <Button
                                      variant="outline"
                                      className="w-full justify-start font-normal"
                                    >
                                      {date
                                        ? date.toLocaleDateString()
                                        : "Select start date"}
                                    </Button>
                                  </FormControl>
                                </PopoverTrigger>

                                <PopoverContent
                                  className="w-auto overflow-hidden p-0"
                                  align="start"
                                >
                                  <Calendar
                                    mode="single"
                                    selected={date}
                                    defaultMonth={date}
                                    captionLayout="dropdown"
                                    onSelect={(selectedDate) => {
                                      field.onChange(selectedDate);
                                    }}
                                  />
                                </PopoverContent>
                              </Popover>

                              <FormMessage />
                            </FormItem>
                          );
                        }}
                      />

                      {/* End Date */}
                      <FormField
                        control={form.control}
                        name="discount.endAt"
                        render={({ field }) => {
                          const date = field.value
                            ? new Date(field.value)
                            : undefined;

                          return (
                            <FormItem>
                              <FormLabel>End Date</FormLabel>

                              <Popover>
                                <PopoverTrigger asChild>
                                  <FormControl>
                                    <Button
                                      variant="outline"
                                      className="w-full justify-start font-normal"
                                    >
                                      {date
                                        ? date.toLocaleDateString()
                                        : "Select end date"}
                                    </Button>
                                  </FormControl>
                                </PopoverTrigger>

                                <PopoverContent
                                  className="w-auto overflow-hidden p-0"
                                  align="start"
                                >
                                  <Calendar
                                    mode="single"
                                    selected={date}
                                    defaultMonth={date}
                                    captionLayout="dropdown"
                                    onSelect={(selectedDate) => {
                                      field.onChange(selectedDate);
                                    }}
                                  />
                                </PopoverContent>
                              </Popover>

                              <FormMessage />
                            </FormItem>
                          );
                        }}
                      />
                    </div>
                  </>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Status</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <FormField
                  control={form.control}
                  name="isFeatured"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>Featured Product</FormLabel>
                        <FormDescription>
                          Display this product in featured sections
                        </FormDescription>
                      </div>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="isActive"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>Active Product</FormLabel>
                        <FormDescription>
                          Make this product visible to customers
                        </FormDescription>
                      </div>
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>

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
                      <Popover
                        open={categoryOpen}
                        onOpenChange={setCategoryOpen}
                      >
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
                                              (id: string) => id !== categoryId,
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
                                        const currentCategories =
                                          field.value || [];
                                        const isSelected =
                                          currentCategories.includes(
                                            category._id,
                                          );

                                        if (isSelected) {
                                          field.onChange(
                                            currentCategories.filter(
                                              (id: string) =>
                                                id !== category._id,
                                            ),
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
                                            : "opacity-0",
                                        )}
                                      />
                                      {category.name}
                                    </CommandItem>
                                  ),
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
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tags</FormLabel>
                      <FormControl>
                        <ChipInput
                          variant="tag"
                          value={field.value ?? []}
                          onChange={field.onChange}
                          placeholder="Type a tag and press Enter"
                        />
                      </FormControl>
                      <FormDescription>
                        Help customers discover this product in search and
                        filters
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>
          </div>

          <Button className="sr-only" type="submit">
            Submit
          </Button>
        </div>
      </form>
    </Form>
  );
}
