"use client";

import React, { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import {
  X,
  Upload,
  Trash2,
  AlertTriangle,
  Plus,
  ImageIcon,
  ChevronsUpDown,
  CheckCheck,
} from "lucide-react";
import { toast } from "sonner";
import { IImage, IProduct } from "@/interfaces/products";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import z from "zod";
import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  ProductUpdateInput,
  productUpdateZ,
  ProductVariantUpdateInput,
  productVariantUpdateZ,
} from "@/lib/schemas";
import { RichTextEditor } from "@/components/rich-text-editor";
import { Checkbox } from "@/components/ui/checkbox";
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
import { cn } from "@/lib/utils";
import useCategory from "@/app/categories/_hook/useCategory";
import api from "@/axios/interceptor";

interface EditModalProps {
  type: string;
  product?: IProduct;
  onClose: () => void;
}

export function ProductEditDialogs({ type, product, onClose }: EditModalProps) {
  if (!product) return null;

  console.log("Product: ", product);

  switch (type) {
    case "general":
      return <GeneralInfoForm onClose={onClose} product={product} />;
    case "images":
      return <MainImagesForm product={product} onUpdate={onUpdate} />;
    case "variantInfo":
      return <VariantInfoForm product={product} onClose={onClose} />;
    case "variantImages":
      return <VariantImagesForm product={product} onUpdate={onUpdate} />;
    case "createVariant":
      return <CreateVariantForm product={product} onUpdate={onUpdate} />;
    case "deleteVariant":
      return (
        <DeleteVariantForm
          product={product}
          onClose={onClose}
          onUpdate={onUpdate}
        />
      );
    default:
      return null;
  }
}

// General Info Form
function GeneralInfoForm({
  product,
  onClose,
}: {
  product: IProduct;
  onClose: () => void;
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [categoryOpen, setCategoryOpen] = useState(false);
  const { categories } = useCategory();

  const getCategoryName = (categoryId: string) => {
    return categories.find((cat) => cat._id === categoryId)?.name || categoryId;
  };

  const form = useForm<ProductUpdateInput>({
    resolver: zodResolver(productUpdateZ),
    defaultValues: {
      title: "",
      slug: "",
      description: { html: "", json: null }, // ✅ proper object
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
      categories: [],
      tags: [],
    },
  });

  const onSubmit = async (data: ProductUpdateInput) => {
    setIsLoading(true);
    try {
      const formData = new FormData();
      Object.entries(data).forEach(([key, value]) => {
        if (key === "description") {
          formData.append("description", JSON.stringify(value));
        } else if (Array.isArray(value)) {
          formData.append(key, JSON.stringify(value));
        } else {
          formData.append(key, String(value ?? ""));
        }
      });

      const response = await api.patch(
        `/products/${product._id}/general`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      if (response.data.success) {
        toast.success("Product updated successfully");
        console.log("Data: ", response.data);
      } else {
        toast.error("Failed to update product");
        return false;
      }

      // ✅ reset with object, not stringify
      form.reset({
        title: product.title || "",
        slug: product.slug || "",
        description: product.description || { html: "", json: null },
        fabric: product.fabric || "",
        valueAddition: product.valueAddition || "",
        cutFit: product.cutFit || "",
        collarNeck: product.collarNeck || "",
        sleeve: product.sleeve || "",
        length: product.length || "",
        washCare: product.washCare || "",
        sideCut: product.sideCut || "",
        isFeatured: product.isFeatured || false,
        isActive: product.isActive || true,
        categories: product.categories || [],
        tags: product.tags || [],
      });

      setTimeout(() => {
        onClose();
      }, 1500);
    } catch (error: any) {
      console.error("Error updating general information:", error);

      if (error.response?.data?.success === false) {
        error.response.data.fields.forEach((field: any) => {
          form.setError(field.name, {
            message: field.message,
          });
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (product) {
      // description যদি string হয়, parse করুন
      let descriptionData = product.description;
      if (typeof product.description === "string") {
        try {
          descriptionData = JSON.parse(product.description);
        } catch (e) {
          descriptionData = { html: product.description, json: null };
        }
      }

      form.reset({
        title: product.title || "",
        slug: product.slug || "",
        fabric: product.fabric || "",
        valueAddition: product.valueAddition || "",
        cutFit: product.cutFit || "",
        collarNeck: product.collarNeck || "",
        sleeve: product.sleeve || "",
        length: product.length || "",
        washCare: product.washCare || "",
        sideCut: product.sideCut || "",
        isFeatured: product.isFeatured || false,
        isActive: product.isActive || true,
        categories: product.categories || [],
        tags: product.tags || [],
        description: {
          html: descriptionData?.html || "",
          json: descriptionData?.json || null,
        },
      });
    }
  }, [product]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        {/* Main Content */}
        <Card>
          <CardHeader>
            <CardTitle>Edit Basic Information</CardTitle>
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
                      <Input placeholder="Enter product title" {...field} />
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
                      URL-friendly version of the title
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
              render={({ field }) => {
                return (
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
                );
              }}
            />
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
                  <Popover open={categoryOpen} onOpenChange={setCategoryOpen}>
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
                                    const isSelected =
                                      currentCategories.includes(category._id);

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

        <div className="flex justify-end space-x-2 pt-4">
          <Button
            className="cursor-pointer"
            type="button"
            variant="outline"
            onClick={onClose}
          >
            Cancel
          </Button>
          <Button className="cursor-pointer" type="submit" disabled={isLoading}>
            {isLoading ? "Updating..." : "Update General Info"}
          </Button>
        </div>
      </form>
    </Form>
  );
}

// Main Images Form
function MainImagesForm({
  product,
  onClose,
  onUpdate,
}: {
  product: IProduct;
  onClose: () => void;
  onUpdate: () => void;
}) {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [deleteImages, setDeleteImages] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      setSelectedFiles([...selectedFiles, ...files]);
    }
  };

  const removeSelectedFile = (index: number) => {
    setSelectedFiles(selectedFiles.filter((_, i) => i !== index));
  };

  const toggleDeleteImage = (imageUrl: string) => {
    if (deleteImages.includes(imageUrl)) {
      setDeleteImages(deleteImages.filter((url) => url !== imageUrl));
    } else {
      setDeleteImages([...deleteImages, imageUrl]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setUploadProgress(0);

    const formData = new FormData();
    selectedFiles.forEach((file) => formData.append("images", file));
    deleteImages.forEach((url) => formData.append("deleteImageUrl", url));

    try {
      const response = await fetch(`/api/products/${product._id}/images`, {
        method: "PUT",
        body: formData,
      });

      if (response.ok) {
        toast.success("Main images updated successfully");
        onUpdate();
        onClose();
      } else {
        const error = await response.json();
        toast.error(error.message || "Failed to update images");
      }
    } catch (error) {
      toast.error("Failed to update images");
    } finally {
      setIsLoading(false);
      setUploadProgress(0);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Current Images */}
      <div className="space-y-2">
        <Label>Current Images</Label>
        <div className="grid grid-cols-3 gap-4">
          {product.images?.map((image, index) => (
            <Card
              key={index}
              className={`relative ${
                deleteImages.includes(image) ? "opacity-50" : ""
              }`}
            >
              <CardContent className="p-2">
                <img
                  src={image}
                  alt={`Product ${index + 1}`}
                  className="w-full h-20 object-cover rounded"
                />
                <Button
                  type="button"
                  variant={
                    deleteImages.includes(image) ? "default" : "destructive"
                  }
                  size="sm"
                  className="absolute top-1 right-1"
                  onClick={() => toggleDeleteImage(image)}
                >
                  {deleteImages.includes(image) ? (
                    <Plus className="h-3 w-3 rotate-45" />
                  ) : (
                    <X className="h-3 w-3" />
                  )}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <Separator />

      {/* Upload New Images */}
      <div className="space-y-2">
        <Label htmlFor="images">Upload New Images</Label>
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
          <Upload className="mx-auto h-12 w-12 text-gray-400" />
          <div className="mt-4">
            <Input
              id="images"
              type="file"
              multiple
              accept="image/*"
              onChange={handleFileSelect}
              className="hidden"
            />
            <Button
              type="button"
              variant="outline"
              onClick={() => document.getElementById("images")?.click()}
            >
              Select Images
            </Button>
          </div>
        </div>
      </div>

      {/* Selected Files Preview */}
      {selectedFiles.length > 0 && (
        <div className="space-y-2">
          <Label>Selected Files</Label>
          <div className="space-y-2">
            {selectedFiles.map((file, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-2 bg-gray-50 rounded"
              >
                <span className="text-sm">{file.name}</span>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => removeSelectedFile(index)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        </div>
      )}

      {isLoading && (
        <div className="space-y-2">
          <Label>Upload Progress</Label>
          <Progress value={uploadProgress} />
        </div>
      )}

      <div className="flex justify-end space-x-2 pt-4">
        <Button type="button" variant="outline" onClick={onClose}>
          Cancel
        </Button>
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Updating..." : "Update Images"}
        </Button>
      </div>
    </form>
  );
}

// Variant Info Form
function VariantInfoForm0({
  product,
  onClose,
}: {
  product: IProduct;
  onClose: () => void;
}) {
  const [selectedVariant, setSelectedVariant] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<ProductVariantUpdateInput>({
    resolver: zodResolver(productVariantUpdateZ),
    defaultValues: {
      size: "",
      color: "",
      price: 0,
      stock: 0,
    },
  });

  const onSubmit = async (data: ProductUpdateInput) => {
    setIsLoading(true);
    try {
      const response = await api.patch(
        `/products/${product._id}/v/${selectedVariant}/general`,
        data,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      if (response.data.success) {
        toast.success("Variant updated successfully");
        console.log("Data: ", response.data);
      } else {
        toast.error("Failed to update varinat");
        return false;
      }

      // ✅ reset with object, not stringify
      form.reset({
        size: "",
        color: "",
        price: 0,
        stock: 0,
      });

      setTimeout(() => {
        onClose();
      }, 1500);
    } catch (error: any) {
      console.error("Error updating general information:", error);

      if (error.response?.data?.success === false) {
        error.response.data.fields.forEach((field: any) => {
          form.setError(field.name, {
            message: field.message,
          });
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleVariantSelect = (variantId: string) => {
    const variant = product.variants.find((v) => v._id === variantId);
    if (variant) {
      setSelectedVariant(variantId);
      form.reset({
        size: variant.size,
        color: variant.color,
        price: variant.price,
        stock: variant.stock,
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label>Select Variant to Edit</Label>
        <Select value={selectedVariant} onValueChange={handleVariantSelect}>
          <SelectTrigger>
            <SelectValue placeholder="Select a variant" />
          </SelectTrigger>
          <SelectContent>
            {product.variants?.map((variant) => (
              <SelectItem key={variant._id} value={variant._id}>
                {variant.size} - {variant.color} (${variant.price})
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {selectedVariant && (
        <>
          <Separator />
          <Card>
            <CardHeader>
              <CardTitle>Product Details</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="size"
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
                  name="color"
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
                  name="price"
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
                  name="stock"
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
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Product Details</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="size"
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
                  name="color"
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
                  name="price"
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
                  name="stock"
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
              </div>
            </CardContent>
          </Card>
        </>
      )}

      <div className="flex justify-end space-x-2 pt-4">
        <Button type="button" variant="outline" onClick={onClose}>
          Cancel
        </Button>
        <Button type="submit" disabled={isLoading || !selectedVariant}>
          {isLoading ? "Updating..." : "Update Variant Info"}
        </Button>
      </div>
    </form>
  );
}

interface VariantFormValues {
  size: string;
  color: string;
  price: number;
  stock: number;
}

interface VariantFormProps {
  product: any;
  onClose: () => void;
}

export default function VariantInfoForm({
  product,
  onClose,
}: VariantFormProps) {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<ProductVariantUpdateInput>({
    resolver: zodResolver(productVariantUpdateZ),
    defaultValues: {
      size: "",
      color: "",
      price: 0,
      stock: 0,
    },
  });

  const [selectedVariant, setSelectedVariant] = React.useState<string | null>(
    null
  );

  const handleVariantSelect = (value: string) => {
    setSelectedVariant(value);

    // Load variant data into the form
    const variant = product.variants.find((v: any) => v._id === value);
    if (variant) {
      form.setValue("size", variant.size);
      form.setValue("color", variant.color);
      form.setValue("price", variant.price);
      form.setValue("stock", variant.stock);
    }
  };

  const onSubmit = async (data: ProductUpdateInput) => {
    setIsLoading(true);
    try {
      console.log("Data: ", data);
      const response = await api.patch(
        `/products/${product._id}/v/${selectedVariant}/info`,
        data,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      if (response.data.success) {
        toast.success("Product updated successfully");
        console.log("Data: ", response.data);
      } else {
        toast.error("Failed to update product");
        return false;
      }

      // ✅ reset with object, not stringify
      form.reset({
        size: "",
        color: "",
        price: 0,
        stock: 0,
      });

      setTimeout(() => {
        onClose();
      }, 1500);
    } catch (error: any) {
      console.error("Error updating general information:", error);

      if (error.response?.data?.success === false) {
        error.response.data.fields.forEach((field: any) => {
          form.setError(field.name, {
            message: field.message,
          });
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        {/* Variant Selection */}
        <div className="space-y-2">
          <Label>Select Variant to Edit</Label>
          <Select
            value={selectedVariant ?? ""}
            onValueChange={handleVariantSelect}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select a variant" />
            </SelectTrigger>
            <SelectContent>
              {product.variants?.map((variant: any) => (
                <SelectItem key={variant._id} value={variant._id}>
                  {variant.size} - {variant.color} (${variant.price})
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {selectedVariant && (
          <>
            <Separator />

            {/* Variant Details */}
            <FormField
              control={form.control}
              name={`size`}
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
              name={`color`}
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
              name={`stock`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Stock</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      min="0"
                      {...field}
                      onChange={(e) =>
                        field.onChange(Number.parseInt(e.target.value) || 0)
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name={`price`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Price</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      min="0"
                      {...field}
                      onChange={(e) =>
                        field.onChange(Number.parseFloat(e.target.value) || 0)
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </>
        )}

        {/* Action Buttons */}
        <div className="flex justify-end space-x-2 pt-4">
          <Button type="button" variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" disabled={isLoading || !selectedVariant}>
            {isLoading ? "Updating..." : "Update Variant Info"}
          </Button>
        </div>
      </form>
    </Form>
  );
}

// Variant Images Form
function VariantImagesForm({
  product,
  onClose,
  onUpdate,
}: {
  product: IProduct;
  onClose: () => void;
  onUpdate: () => void;
}) {
  const [selectedVariant, setSelectedVariant] = useState<string>("");
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [deleteImages, setDeleteImages] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const selectedVariantData = product.variants.find(
    (v) => v._id === selectedVariant
  );

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      setSelectedFiles([...selectedFiles, ...files]);
    }
  };

  const removeSelectedFile = (index: number) => {
    setSelectedFiles(selectedFiles.filter((_, i) => i !== index));
  };

  const toggleDeleteImage = (imageUrl: string) => {
    if (deleteImages.includes(imageUrl)) {
      setDeleteImages(deleteImages.filter((url) => url !== imageUrl));
    } else {
      setDeleteImages([...deleteImages, imageUrl]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedVariant) return;

    setIsLoading(true);

    const formData = new FormData();
    selectedFiles.forEach((file) => formData.append("images", file));
    deleteImages.forEach((url) => formData.append("deleteImageUrl", url));

    try {
      const response = await fetch(
        `/api/products/${product._id}/variants/${selectedVariant}/images`,
        {
          method: "PUT",
          body: formData,
        }
      );

      if (response.ok) {
        toast.success("Variant images updated successfully");
        onUpdate();
        onClose();
      } else {
        const error = await response.json();
        toast.error(error.message || "Failed to update variant images");
      }
    } catch (error) {
      toast.error("Failed to update variant images");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label>Select Variant</Label>
        <Select value={selectedVariant} onValueChange={setSelectedVariant}>
          <SelectTrigger>
            <SelectValue placeholder="Select a variant" />
          </SelectTrigger>
          <SelectContent>
            {product.variants?.map((variant) => (
              <SelectItem key={variant._id} value={variant._id}>
                {variant.size} - {variant.color}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {selectedVariantData && (
        <>
          <Separator />

          {/* Current Variant Images */}
          {selectedVariantData.images &&
            selectedVariantData.images.length > 0 && (
              <div className="space-y-2">
                <Label>Current Variant Images</Label>
                <div className="grid grid-cols-3 gap-4">
                  {selectedVariantData.images.map((image, index) => (
                    <Card
                      key={index}
                      className={`relative ${
                        deleteImages.includes(image) ? "opacity-50" : ""
                      }`}
                    >
                      <CardContent className="p-2">
                        <img
                          src={image}
                          alt={`Variant ${index + 1}`}
                          className="w-full h-20 object-cover rounded"
                        />
                        <Button
                          type="button"
                          variant={
                            deleteImages.includes(image)
                              ? "default"
                              : "destructive"
                          }
                          size="sm"
                          className="absolute top-1 right-1"
                          onClick={() => toggleDeleteImage(image)}
                        >
                          {deleteImages.includes(image) ? (
                            <Plus className="h-3 w-3 rotate-45" />
                          ) : (
                            <X className="h-3 w-3" />
                          )}
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}

          {/* Upload New Images */}
          <div className="space-y-2">
            <Label htmlFor="variant-images">Upload New Images</Label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
              <ImageIcon className="mx-auto h-12 w-12 text-gray-400" />
              <div className="mt-4">
                <Input
                  id="variant-images"
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleFileSelect}
                  className="hidden"
                />
                <Button
                  type="button"
                  variant="outline"
                  onClick={() =>
                    document.getElementById("variant-images")?.click()
                  }
                >
                  Select Images
                </Button>
              </div>
            </div>
          </div>

          {/* Selected Files Preview */}
          {selectedFiles.length > 0 && (
            <div className="space-y-2">
              <Label>Selected Files</Label>
              <div className="space-y-2">
                {selectedFiles.map((file, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-2 bg-gray-50 rounded"
                  >
                    <span className="text-sm">{file.name}</span>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => removeSelectedFile(index)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </>
      )}

      <div className="flex justify-end space-x-2 pt-4">
        <Button type="button" variant="outline" onClick={onClose}>
          Cancel
        </Button>
        <Button type="submit" disabled={isLoading || !selectedVariant}>
          {isLoading ? "Updating..." : "Update Variant Images"}
        </Button>
      </div>
    </form>
  );
}

// Create Variant Form
function CreateVariantForm({
  product,
  onClose,
  onUpdate,
}: {
  product: IProduct;
  onClose: () => void;
  onUpdate: () => void;
}) {
  const [formData, setFormData] = useState({
    size: "",
    color: "",
    price: 0,
    stock: 0,
  });
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      setSelectedFiles([...selectedFiles, ...files]);
    }
  };

  const removeSelectedFile = (index: number) => {
    setSelectedFiles(selectedFiles.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const formPayload = new FormData();
    formPayload.append("size", formData.size);
    formPayload.append("color", formData.color);
    formPayload.append("price", formData.price.toString());
    formPayload.append("stock", formData.stock.toString());

    selectedFiles.forEach((file) => formPayload.append("images", file));

    try {
      const response = await fetch(`/api/products/${product._id}/variants`, {
        method: "POST",
        body: formPayload,
      });

      if (response.ok) {
        toast.success("New variant created successfully");
        onUpdate();
        onClose();
      } else {
        const error = await response.json();
        toast.error(error.message || "Failed to create variant");
      }
    } catch (error) {
      toast.error("Failed to create variant");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="size">Size</Label>
          <Input
            id="size"
            value={formData.size}
            onChange={(e) => setFormData({ ...formData, size: e.target.value })}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="color">Color</Label>
          <Input
            id="color"
            value={formData.color}
            onChange={(e) =>
              setFormData({ ...formData, color: e.target.value })
            }
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="price">Price</Label>
          <Input
            id="price"
            type="number"
            value={formData.price}
            onChange={(e) =>
              setFormData({ ...formData, price: parseFloat(e.target.value) })
            }
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="stock">Stock</Label>
          <Input
            id="stock"
            type="number"
            value={formData.stock}
            onChange={(e) =>
              setFormData({ ...formData, stock: parseInt(e.target.value) })
            }
            required
          />
        </div>
      </div>

      <Separator />

      {/* Upload Images */}
      <div className="space-y-2">
        <Label htmlFor="variant-images">Upload Variant Images (Optional)</Label>
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
          <Upload className="mx-auto h-12 w-12 text-gray-400" />
          <div className="mt-4">
            <Input
              id="variant-images"
              type="file"
              multiple
              accept="image/*"
              onChange={handleFileSelect}
              className="hidden"
            />
            <Button
              type="button"
              variant="outline"
              onClick={() => document.getElementById("variant-images")?.click()}
            >
              Select Images
            </Button>
          </div>
        </div>
      </div>

      {/* Selected Files Preview */}
      {selectedFiles.length > 0 && (
        <div className="space-y-2">
          <Label>Selected Files</Label>
          <div className="space-y-2">
            {selectedFiles.map((file, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-2 bg-gray-50 rounded"
              >
                <span className="text-sm">{file.name}</span>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => removeSelectedFile(index)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="flex justify-end space-x-2 pt-4">
        <Button type="button" variant="outline" onClick={onClose}>
          Cancel
        </Button>
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Creating..." : "Create Variant"}
        </Button>
      </div>
    </form>
  );
}

// Delete Variant Form
function DeleteVariantForm({
  product,
  onClose,
  onUpdate,
}: {
  product: IProduct;
  onClose: () => void;
  onUpdate: () => void;
}) {
  const [selectedVariant, setSelectedVariant] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);

  const selectedVariantData = product.variants.find(
    (v) => v._id === selectedVariant
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedVariant) return;

    setIsLoading(true);

    try {
      const response = await fetch(
        `/api/products/${product._id}/variants/${selectedVariant}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        toast.success("Variant deleted successfully");
        onUpdate();
        onClose();
      } else {
        const error = await response.json();
        toast.error(error.message || "Failed to delete variant");
      }
    } catch (error) {
      toast.error("Failed to delete variant");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Alert>
        <AlertTriangle className="h-4 w-4" />
        <AlertDescription>
          This action cannot be undone. This will permanently delete the
          selected variant and all its associated data.
        </AlertDescription>
      </Alert>

      <div className="space-y-2">
        <Label>Select Variant to Delete</Label>
        <Select value={selectedVariant} onValueChange={setSelectedVariant}>
          <SelectTrigger>
            <SelectValue placeholder="Select a variant to delete" />
          </SelectTrigger>
          <SelectContent>
            {product.variants?.map((variant) => (
              <SelectItem key={variant._id} value={variant._id}>
                {variant.size} - {variant.color} (${variant.price}) - Stock:{" "}
                {variant.stock}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {selectedVariantData && (
        <Card className="border-red-200">
          <CardHeader>
            <CardTitle className="text-red-600 text-lg">
              Variant to be deleted:
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="font-medium">Size:</span>
                <Badge variant="outline">{selectedVariantData.size}</Badge>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Color:</span>
                <Badge variant="outline">{selectedVariantData.color}</Badge>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Price:</span>
                <span>${selectedVariantData.price}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Stock:</span>
                <span>{selectedVariantData.stock} units</span>
              </div>
              {selectedVariantData.images &&
                selectedVariantData.images.length > 0 && (
                  <div className="flex justify-between">
                    <span className="font-medium">Images:</span>
                    <span>{selectedVariantData.images.length} images</span>
                  </div>
                )}
            </div>
          </CardContent>
        </Card>
      )}

      <div className="flex justify-end space-x-2 pt-4">
        <Button type="button" variant="outline" onClick={onClose}>
          Cancel
        </Button>
        <Button
          type="submit"
          variant="destructive"
          disabled={isLoading || !selectedVariant}
        >
          {isLoading ? "Deleting..." : "Delete Variant"}
        </Button>
      </div>
    </form>
  );
}
