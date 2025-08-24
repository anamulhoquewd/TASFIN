"use client";

import type React from "react";

import { useEffect, useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
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
import { z } from "zod";
import axios from "axios";
import {
  CheckCheck,
  ChevronsUpDown,
  Plus,
  Trash2,
  Upload,
  X,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { ProductCreateInput, productSchemaZ } from "@/lib/schemas";
import { RichTextEditor } from "@/components/rich-text-editor";

const CATEGORIES = [
  { id: "507f1f77bcf86cd799439011", name: "T-Shirts" },
  { id: "507f1f77bcf86cd799439012", name: "Shirts" },
  { id: "507f1f77bcf86cd799439013", name: "Jeans" },
  { id: "507f1f77bcf86cd799439014", name: "Trousers" },
  { id: "507f1f77bcf86cd799439015", name: "Dresses" },
  { id: "507f1f77bcf86cd799439016", name: "Skirts" },
  { id: "507f1f77bcf86cd799439017", name: "Jackets" },
  { id: "507f1f77bcf86cd799439018", name: "Sweaters" },
  { id: "507f1f77bcf86cd799439019", name: "Shorts" },
  { id: "507f1f77bcf86cd79943901a", name: "Accessories" },
];

export function CreateProductForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [categoryOpen, setCategoryOpen] = useState(false);
  const [variantImagePreviews, setVariantImagePreviews] = useState<{
    [key: number]: string[];
  }>({});

  const form = useForm({
    resolver: zodResolver(productSchemaZ),
    defaultValues: {
      title: "",
      slug: "",
      description: {
        json: "",
        html: "",
      },
      categories: [],
      images: [],
      variants: [{ size: "", color: "", stock: 0, price: 0, images: [] }],
      fabric: "",
      valueAddition: "",
      cutFit: "",
      collarNeck: "",
      sleeve: "",
      length: "",
      washCare: "",
      sideCut: "",
      isFeatured: false,
      isActive: true,
      tags: [],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "variants",
  });

  const getCategoryName = (categoryId: string) => {
    return CATEGORIES.find((cat) => cat.id === categoryId)?.name || categoryId;
  };

  // Generate slug from title
  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .trim();
  };

  // Handle title change and auto-generate slug
  const handleTitleChange = (value: string) => {
    form.setValue("title", value);
    if (value) {
      form.setValue("slug", generateSlug(value));
    }
  };

  // Handle variant image upload
  const handleVariantImageUpload = (
    variantIndex: number,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = Array.from(event.target.files || []);
    if (files.length === 0) return;

    // Validate file types
    const validTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
    const invalidFiles = files.filter(
      (file) => !validTypes.includes(file.type)
    );

    if (invalidFiles.length > 0) {
      toast.error("Invalid file type", {
        description: "Please upload only JPEG, PNG, or WebP images.",
      });
      return;
    }

    // Get current variant images
    const currentVariant = form.getValues(`variants.${variantIndex}`);
    const currentImages = currentVariant.images || [];

    // Add new images to variant
    form.setValue(`variants.${variantIndex}.images`, [
      ...currentImages,
      ...files,
    ]);

    // Create previews for variant images
    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        setVariantImagePreviews((prev) => ({
          ...prev,
          [variantIndex]: [
            ...(prev[variantIndex] || []),
            e.target?.result as string,
          ],
        }));
      };
      reader.readAsDataURL(file);
    });
  };

  const removeVariantImage = (variantIndex: number, imageIndex: number) => {
    const currentImages =
      form.getValues(`variants.${variantIndex}.images`) || [];
    const updatedImages = currentImages.filter((_, i) => i !== imageIndex);
    form.setValue(`variants.${variantIndex}.images`, updatedImages);

    setVariantImagePreviews((prev) => ({
      ...prev,
      [variantIndex]: (prev[variantIndex] || []).filter(
        (_, i) => i !== imageIndex
      ),
    }));
  };

  // SUBMIT HANDLER
  const onSubmit = async (data: ProductCreateInput) => {
    try {
      const formData = new FormData();

      // Append simple fields
      formData.append("title", data.title);
      formData.append("slug", data.slug);
      formData.append(
        "description",
        typeof data.description === "string"
          ? data.description
          : JSON.stringify(data.description ?? {})
      );
      formData.append("fabric", data.fabric ?? "");
      formData.append("valueAddition", data.valueAddition ?? "");
      formData.append("cutFit", data.cutFit ?? "");
      formData.append("collarNeck", data.collarNeck ?? "");
      formData.append("sleeve", data.sleeve ?? "");
      formData.append("length", data.length ?? "");
      formData.append("washCare", data.washCare ?? "");
      formData.append("sideCut", data.sideCut ?? "");
      formData.append("isFeatured", data.isFeatured.toString());
      formData.append("isActive", data.isActive.toString());

      // Append arrays as JSON strings
      formData.append("categories", JSON.stringify(data.categories));
      formData.append("tags", JSON.stringify(data.tags));

      // Append main product images
      data.images.forEach((image) => {
        formData.append("images", image);
      });

      // Append variants
      data.variants.forEach((variant, index) => {
        formData.append(`variants[${index}][size]`, variant.size);
        formData.append(`variants[${index}][color]`, variant.color);
        formData.append(`variants[${index}][stock]`, variant.stock.toString());
        formData.append(`variants[${index}][price]`, variant.price.toString());

        // Append variant images
        variant.images?.forEach((image) => {
          formData.append(`variants[${index}][images]`, image);
        });
      });

      // Send to backend
      const response = await axios.post(
        "http://localhost:4000/api/v1/products/register",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (!response.data.success) {
        console.log("Failed to create product:", response.data.error);
        toast.error(response.data.error.message || "Failed to create product.");
      }

      toast.success(
        response.data.success.message || "Product created successfully."
      );

      // Reset form after successful submission
      form.reset({
        title: "",
        slug: "",
        description: { html: "", json: "" },
        fabric: "",
        valueAddition: "",
        cutFit: "",
        collarNeck: "",
        sleeve: "",
        length: "",
        washCare: "",
        sideCut: "",
        isFeatured: false,
        isActive: false,
        categories: [],
        tags: [],
        images: [],
        variants: [],
      });
    } catch (error: any) {
      console.error("Error creating product:", error);
      if (error.response.data.success === false) {
        error.response.data.fields.forEach((field: any) => {
          form.setError(field.name, {
            message: field.message,
          });
        });
      }
      toast.error("Error creating product", {
        description:
          error instanceof Error ? error.message : "Please try again.",
      });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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
              name="description.json"
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
                      // onChange={field.onChange}
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

            <FormField
              control={form.control}
              name="categories"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Categories</FormLabel>
                  <Popover open={categoryOpen} onOpenChange={setCategoryOpen}>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          role="combobox"
                          aria-expanded={categoryOpen}
                          className="w-full justify-between h-auto min-h-[40px] px-3 py-2 bg-transparent"
                        >
                          <div className="flex flex-wrap gap-1">
                            {field.value && field.value.length > 0 ? (
                              field.value.map((categoryId) => (
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
                                          (id) => id !== categoryId
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
                            {CATEGORIES.map((category) => (
                              <CommandItem
                                key={category.id}
                                value={category.name}
                                onSelect={() => {
                                  const currentCategories = field.value || [];
                                  const isSelected = currentCategories.includes(
                                    category.id
                                  );

                                  if (isSelected) {
                                    field.onChange(
                                      currentCategories.filter(
                                        (id) => id !== category.id
                                      )
                                    );
                                  } else {
                                    field.onChange([
                                      ...currentCategories,
                                      category.id,
                                    ]);
                                  }
                                }}
                              >
                                <CheckCheck
                                  className={cn(
                                    "mr-2 h-4 w-4",
                                    field.value?.includes(category.id)
                                      ? "opacity-100"
                                      : "opacity-0"
                                  )}
                                />
                                {category.name}
                              </CommandItem>
                            ))}
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
                            const files = Array.from(e.target.files || []);
                            field.onChange(files);
                          }}
                        />
                      </label>

                      {field.value?.length > 0 && (
                        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 mt-4">
                          {field.value.map((file: File, index: number) => (
                            <div key={index} className="relative group">
                              <img
                                src={URL.createObjectURL(file)}
                                alt={`Preview ${index + 1}`}
                                className="w-full h-24 object-cover rounded-lg"
                              />
                              <button
                                type="button"
                                onClick={() =>
                                  field.onChange(
                                    field.value.filter(
                                      (_: any, i: number) => i !== index
                                    )
                                  )
                                }
                                className="cursor-pointer absolute -top-2 -right-2 bg-destructive text-destructive-foreground rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                              >
                                <X className="w-3 h-3" />
                              </button>
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
              {fields.map((field, index) => (
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
                            <Input placeholder="Red, Blue, etc." {...field} />
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
                          onChange={(e) => handleVariantImageUpload(index, e)}
                        />
                      </label>
                    </div>

                    {variantImagePreviews[index] &&
                      variantImagePreviews[index].length > 0 && (
                        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7 gap-2">
                          {variantImagePreviews[index].map(
                            (preview, imageIndex) => (
                              <div key={imageIndex} className="relative group">
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

        {/* Product Details */}
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
                      <Input placeholder="Cotton, Polyester, etc." {...field} />
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
                      <Input placeholder="Slim, Regular, Loose" {...field} />
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
                      <Input placeholder="Machine wash, Hand wash" {...field} />
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

        {/* Settings & Tags */}
        <Card>
          <CardHeader>
            <CardTitle>Settings & Tags</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex flex-col sm:flex-row gap-6">
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
            </div>

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
                            .map((tag) => tag.trim())
                            .filter((tag) => tag.length > 0);
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

        {/* Submit Button */}
        <div className="flex justify-end">
          <Button
            type="submit"
            size="lg"
            disabled={isSubmitting}
            className="min-w-[150px]"
          >
            {isSubmitting ? "Creating..." : "Create Product"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
