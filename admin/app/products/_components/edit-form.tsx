"use client";

import type React from "react";

import { useState, useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Upload,
  X,
  Plus,
  Trash2,
  ChevronsUpDown,
  CheckCheck,
} from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { RichTextEditor } from "@/components/rich-text-editor";
import { productUpdateZ, type ProductUpdateInput } from "@/lib/schemas";
import type { IProduct } from "@/interfaces/products";
import useCategory from "@/app/categories/_hook/useCategory";

interface EditProductFormProps {
  form: any;
  product: IProduct;
  onSubmit: (data: ProductUpdateInput) => Promise<void>;
  isLoading: boolean;
  handleTitleChange: (title: string) => void;
  setCategoryOpen: React.Dispatch<React.SetStateAction<boolean>>;
  categoryOpen: boolean;
  prepend: (value: any) => void;
  remove: (index: number) => void;
  fields: any[];
  variantImagePreviews: string[][];
  handleVariantImageUpload: (
    index: number,
    e: React.ChangeEvent<HTMLInputElement>
  ) => void;
  removeVariantImage: (index: number, variantIndex: number) => void;
}

export function EditProductForm({
  product,
  form,
  onSubmit,
  handleTitleChange,
  categoryOpen,
  setCategoryOpen,
  remove,
  prepend,
  fields,
  variantImagePreviews,
  handleVariantImageUpload,
  removeVariantImage,
}: EditProductFormProps) {
  const { categories } = useCategory();
  const getCategoryName = (categoryId: string) => {
    return categories.find((cat) => cat._id === categoryId)?.name || categoryId;
  };

  console.log("Product Form Values: ", form.getValues());
  console.log("Product: ", product);

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
                        <RichTextEditor
                          value={{
                            html:
                              typeof field.value?.html === "string"
                                ? field.value.html
                                : "",
                            json: field.value?.json ?? null,
                          }}
                          onChange={(val) => {
                            field.onChange({
                              html: val.html,
                              json: val.json,
                            });
                          }}
                          placeholder="Write a detailed product description..."
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Current Product Images</CardTitle>
              </CardHeader>
              <CardContent>
                {product.images && product.images.length > 0 && (
                  <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-4">
                    {product.images.map((image: any, index: number) => (
                      <div key={index} className="relative group">
                        <img
                          src={typeof image === "string" ? image : image.url}
                          alt={`Current ${index + 1}`}
                          className="w-full h-24 object-cover rounded-lg"
                        />
                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                          <span className="text-white text-xs">Current</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                <FormField
                  control={form.control}
                  name="images"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Add New Images</FormLabel>
                      <FormControl>
                        <div>
                          <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-border rounded-lg cursor-pointer hover:bg-muted/50">
                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                              <Upload className="w-8 h-8 mb-2 text-muted-foreground" />
                              <p className="text-sm text-muted-foreground">
                                Click to upload new images
                              </p>
                            </div>
                            <input
                              type="file"
                              className="hidden"
                              multiple
                              accept="image/*"
                              onChange={(e) => {
                                const newFiles = Array.from(
                                  e.target.files || []
                                );
                                const existing = field.value || [];
                                const filtered = newFiles.filter(
                                  (file) =>
                                    !existing.some(
                                      (f: File) =>
                                        f.name === file.name &&
                                        f.size === file.size &&
                                        f.lastModified === file.lastModified
                                    )
                                );
                                field.onChange([...existing, ...filtered]);
                              }}
                            />
                          </label>

                          {(field.value || []).length > 0 && (
                            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 mt-4">
                              {(field.value || []).map(
                                (file: File, index: number) => (
                                  <div key={index} className="relative group">
                                    <img
                                      src={
                                        URL.createObjectURL(file) ||
                                        "/placeholder.svg"
                                      }
                                      alt={`New ${index + 1}`}
                                      className="w-full h-24 object-cover rounded-lg"
                                    />
                                    <button
                                      type="button"
                                      onClick={() =>
                                        field.onChange(
                                          (field.value || []).filter(
                                            (_: any, i: number) => i !== index
                                          )
                                        )
                                      }
                                      className="cursor-pointer absolute -top-2 -right-2 bg-destructive text-destructive-foreground rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                                    >
                                      <X className="w-3 h-3" />
                                    </button>
                                  </div>
                                )
                              )}
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
                      prepend({
                        size: "",
                        color: "",
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

                      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                        <FormField
                          control={form.control}
                          name={`variants.${index}.size`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Size</FormLabel>
                              <FormControl>
                                <Input placeholder="S, M, L, XL" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name={`variants.${index}.color`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Color</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="Red, Blue, etc."
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
                                      Number.parseInt(e.target.value) || 0
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
                                  step="0.01"
                                  {...field}
                                  onChange={(e) =>
                                    field.onChange(
                                      Number.parseFloat(e.target.value) || 0
                                    )
                                  }
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
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
                                    <img
                                      src={preview || "/placeholder.svg"}
                                      alt={`Variant ${index + 1} Image ${
                                        imageIndex + 1
                                      }`}
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
                                )
                              )}
                            </div>
                          )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Product Details - Same as create form */}
            <Card>
              <CardHeader>
                <CardTitle>Product Details</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="fabric"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Fabric</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Cotton, Polyester, etc."
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="valueAddition"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Value Addition</FormLabel>
                        <FormControl>
                          <Input placeholder="Special features" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="cutFit"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Cut & Fit</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Slim, Regular, Loose"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="collarNeck"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Collar/Neck</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Round neck, V-neck, etc."
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="sleeve"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Sleeve</FormLabel>
                        <FormControl>
                          <Input placeholder="Short, Long, 3/4" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="length"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Length</FormLabel>
                        <FormControl>
                          <Input placeholder="Short, Medium, Long" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="washCare"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Wash Care</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Machine wash, Hand wash"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="sideCut"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Side Cut</FormLabel>
                        <FormControl>
                          <Input placeholder="Side cut details" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
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
                                        const currentCategories =
                                          field.value || [];
                                        const isSelected =
                                          currentCategories.includes(
                                            category._id
                                          );

                                        if (isSelected) {
                                          field.onChange(
                                            currentCategories.filter(
                                              (id: string) =>
                                                id !== category._id
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
                      field.value?.join(", ") || ""
                    );

                    useEffect(() => {
                      setInputValue(field.value?.join(", ") || "");
                    }, [field.value]);

                    return (
                      <FormItem>
                        <FormLabel>Tags</FormLabel>
                        <FormControl>
                          <Input
                            type="text"
                            placeholder="Enter tags (comma-separated)"
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            onBlur={() => {
                              const tags = inputValue
                                .split(",")
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

            <Button className="sr-only" type="submit">
              Update Product
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
}
