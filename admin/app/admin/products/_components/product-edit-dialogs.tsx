"use client";

import useCategory from "@/app/admin/categories/_hook/useCategory";
import api from "@/axios/interceptor";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
import { Label } from "@/components/ui/label";
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
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { IImage } from "@/interfaces/global";
import { IProduct } from "@/interfaces/products";
import {
  productUpdateZ,
  productVariantUpdateZ,
  productVariantZ,
  TUpdateProduct,
  TUpdateVariant,
  TVariant,
} from "@/lib/schemas";
import { cn, generateSKU } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  AlertTriangle,
  ArrowDown,
  ArrowUp,
  CheckCheck,
  ChevronsUpDown,
  Upload,
  X,
} from "lucide-react";
import Image from "next/image";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Activity } from "../new/components/right-sidebar";

interface EditModalProps {
  type: string;
  product?: IProduct;
  onClose: () => void;
  setProducts: Dispatch<SetStateAction<IProduct[]>>;
}

interface FormProps {
  product: IProduct;
  onClose: () => void;
  setProducts: Dispatch<SetStateAction<IProduct[]>>;
}

export function ProductEditDialogs({
  type,
  product,
  onClose,
  setProducts,
}: EditModalProps) {
  if (!product) return null;

  switch (type) {
    case "general":
      return (
        <GeneralInfoForm
          onClose={onClose}
          product={product}
          setProducts={setProducts}
        />
      );
    case "images":
      return (
        <MainImagesForm
          setProducts={setProducts}
          product={product}
          onClose={onClose}
        />
      );
    case "activity":
      return (
        <ProductEditActivity
          setProducts={setProducts}
          product={product}
          onClose={onClose}
        />
      );
    case "variantInfo":
      return (
        <VariantInfoForm
          setProducts={setProducts}
          product={product}
          onClose={onClose}
        />
      );
    case "createVariant":
      return (
        <CreateVariantForm
          product={product}
          onClose={onClose}
          setProducts={setProducts}
        />
      );
    case "deleteVariant":
      return (
        <DeleteVariantForm
          product={product}
          onClose={onClose}
          setProducts={setProducts}
        />
      );
    default:
      return null;
  }
}

// Activity
function ProductEditActivity({ product, onClose, setProducts }: FormProps) {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<TUpdateProduct>({
    resolver: zodResolver(productUpdateZ),
    defaultValues: {
      status: product.status || true,
      isFeatured: product.isFeatured || false,
      isItNew: product.isItNew || false,
      isCustom: product.isCustom || false,
    },
  });

  const onSubmit = async (data: TUpdateProduct) => {
    setIsLoading(true);

    try {
      const response = await api.patch(
        `/products/${product._id}/activity`,
        data
      );

      if (!response.data.success) {
        console.error(
          "Failed to update activity information:",
          response.data.error
        );
        toast.error(
          response.data.error.message ||
            "Failed to update activity information."
        );
        return;
      }

      setProducts((prev) => {
        const updatedProducts: IProduct[] = prev.map((p: IProduct) =>
          p._id === product._id ? response.data.data.data : p
        );
        return updatedProducts;
      });

      toast.success("Product updated successfully");

      setTimeout(() => {
        onClose();
      }, 1000);
    } catch (error: any) {
      console.error("Error updating activity information:", error);

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
      form.reset({
        status: product.status,
        isFeatured: product.isFeatured,
        isItNew: product.isItNew,
        isCustom: product.isCustom,
      });
    }
  }, [product]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <Activity form={form} />

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

// General Info Form
function GeneralInfoForm({ product, onClose, setProducts }: FormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [categoryOpen, setCategoryOpen] = useState(false);
  const { categories } = useCategory();

  const getCategoryName = (categoryId: string) => {
    return categories.find((cat) => cat._id === categoryId)?.name || categoryId;
  };

  const form = useForm<TUpdateProduct>({
    resolver: zodResolver(productUpdateZ),
    defaultValues: {
      title: product.title || "",
      slug: product.slug || "",
      description: product.description || "",
      keyFeatures: product.keyFeatures || [],
      categories: product.categories || [],
      tags: product.tags || [],

      details: product.details || {},
    },
  });

  const onSubmit = async (data: TUpdateProduct) => {
    setIsLoading(true);

    try {
      const formData = new FormData();
      Object.entries(data).forEach(([key, value]) => {
        if (Array.isArray(value)) {
          formData.append(key, JSON.stringify(value));
        } else {
          formData.append(key, String(value ?? ""));
        }
      });

      const response = await api.patch(
        `/products/${product._id}/general`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (!response.data.success) {
        console.error(
          "Failed to update general information:",
          response.data.error
        );
        toast.error(
          response.data.error.message || "Failed to update general information."
        );
        return;
      }

      setProducts((prev) => {
        const updatedProducts: IProduct[] = prev.map((p: IProduct) =>
          p._id === product._id ? response.data.data.data : p
        );
        return updatedProducts;
      });

      toast.success("Product updated successfully");

      setTimeout(() => {
        onClose();
      }, 1000);
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
      form.reset({
        title: product.title,
        slug: product.slug,
        description: product.description,
        keyFeatures: product.keyFeatures,
        categories: product.categories,
        tags: product.tags,
        details: product.details,
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
              render={({ field }) => {
                const [inputValue, setInputValue] = useState(
                  field.value?.join("* ") || ""
                );

                useEffect(() => {
                  setInputValue(field.value?.join("* ") || "");
                }, [field.value]);

                return (
                  <FormItem>
                    <FormLabel>Key Features</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Enter key features (star-*-separated)"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        onBlur={() => {
                          const teatures = inputValue
                            .split("*")
                            .map((teature: string) => teature.trim())
                            .filter((teature: string) => teature.length > 0);
                          field.onChange(teatures);
                        }}
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
                name="details.fabric"
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
                name="details.valueAddition"
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
                name="details.cutFit"
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
                name="details.collarNeck"
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
                name="details.sleeve"
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
                name="details.length"
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
                name="details.washCare"
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
                name="details.sideCut"
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
                  field.value?.join("* ") || ""
                );

                useEffect(() => {
                  setInputValue(field.value?.join("* ") || "");
                }, [field.value]);

                return (
                  <FormItem>
                    <FormLabel>Tags</FormLabel>
                    <FormControl>
                      <Textarea
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
function MainImagesForm({ product, onClose, setProducts }: FormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [existingImagesToKeep, setExistingImagesToKeep] = useState<any[]>(
    product.images ? [...product.images] : []
  );

  const form = useForm<TUpdateProduct>({
    resolver: zodResolver(productUpdateZ),
    defaultValues: { images: [] },
  });

  const onSubmit = async (data: any) => {
    if (!product) return;

    try {
      setIsLoading(true);

      // create formData
      const formData = new FormData();

      // append new images (files)
      (data.images || []).forEach((file: File) => {
        formData.append("images", file);
      });

      // compute deleted public ids
      const originalPublicIds = product.images.map(
        (image: IImage) => image.publicId
      );
      const keptIds = existingImagesToKeep.map((image: any) => image.publicId);
      const existingImagesToDelete = originalPublicIds.filter(
        (id: string) => !keptIds.includes(id)
      );

      // append delete image public ids
      existingImagesToDelete.forEach((id) => {
        formData.append("deleteImagePublicIds", id);
      });

      // append kept image public ids (to maintain order)
      keptIds.forEach((id: string) => {
        formData.append("keptImagePublicIds", id);
      });

      // ----- API Call -----
      const response = await api.patch(
        `/products/${product._id}/main-images`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (!response.data.success) {
        console.error("Failed Main images updated:", response.data.error);
        toast.error(
          response.data.error.message || "Failed Main images updated."
        );
        return;
      }

      setProducts((prev) => {
        const updatedProducts: IProduct[] = prev.map((p: IProduct) =>
          p._id === product._id ? response.data.data : p
        );
        return updatedProducts;
      });

      toast.success(
        response.data.success.message || "Main images updated successfully."
      );

      form.reset({ images: [] });

      setTimeout(() => {
        onClose();
      }, 1000);
      return { success: true, data: response.data.data };
    } catch (error: any) {
      console.error("Error updating product:", error);
      if (error.response.data.success === false) {
        error.response.data.fields.forEach((field: any) => {
          form.setError(field.name, {
            message: field.message,
          });
        });
      }
      toast.error("Error updating product", {
        description:
          error instanceof Error ? error.message : "Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleMainImageRemove = (imageUrl: string) => {
    setExistingImagesToKeep((prev) =>
      prev.filter((img) => img.url !== imageUrl)
    );
  };

  const handleMainImageRestore = (image: any) => {
    setExistingImagesToKeep((prev) => [...prev, image]);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const formData = form.getValues();
          onSubmit(formData);
        }}
        className="space-y-8"
      >
        <Card>
          <CardHeader>
            <CardTitle>Main Product Images</CardTitle>
          </CardHeader>
          <CardContent>
            {product.images && product.images.length > 0 && (
              <div className="mb-6">
                <div className="flex items-center justify-between mb-3">
                  <FormLabel className="text-sm font-medium">
                    Current Kept Images ({existingImagesToKeep.length})
                  </FormLabel>
                  <div className="text-xs text-muted-foreground">
                    Hover to see options
                  </div>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-4">
                  {existingImagesToKeep.map((image: any, index: number) => {
                    const imageUrl = image.url;

                    return (
                      <div
                        key={imageUrl}
                        className="relative group cursor-pointer"
                      >
                        <Image
                          width={1000}
                          height={1000}
                          src={imageUrl}
                          alt={`Current ${index + 1}`}
                          className="w-full h-24 object-cover rounded-lg"
                        />

                        <button
                          type="button"
                          onClick={() => handleMainImageRemove(imageUrl)}
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
                                const newArray = [...existingImagesToKeep];
                                [newArray[index - 1], newArray[index]] = [
                                  newArray[index],
                                  newArray[index - 1],
                                ];
                                setExistingImagesToKeep(newArray);
                              }
                            }}
                            className="bg-secondary text-secondary-foreground rounded p-1 disabled:opacity-50"
                          >
                            <ArrowUp className="w-3 h-3" />
                          </button>
                          <button
                            type="button"
                            disabled={index === existingImagesToKeep.length - 1}
                            onClick={() => {
                              if (index < existingImagesToKeep.length - 1) {
                                const newArray = [...existingImagesToKeep];
                                [newArray[index + 1], newArray[index]] = [
                                  newArray[index],
                                  newArray[index + 1],
                                ];
                                setExistingImagesToKeep(newArray);
                              }
                            }}
                            className="bg-secondary text-secondary-foreground rounded p-1 disabled:opacity-50"
                          >
                            <ArrowDown className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {existingImagesToKeep.length < product.images.length && (
                  <div className="mt-6">
                    <div className="flex items-center justify-between mb-3">
                      <FormLabel className="text-sm font-medium">
                        Removed Images (
                        {product.images.length - existingImagesToKeep.length})
                      </FormLabel>
                      <div className="text-xs text-muted-foreground">
                        Click to restore
                      </div>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-4">
                      {product.images
                        .filter(
                          (image: any) =>
                            !existingImagesToKeep.some(
                              (img: any) => img.url === image.url
                            )
                        )
                        .map((image: any, index: number) => {
                          const imageUrl = image.url;

                          return (
                            <div
                              key={imageUrl}
                              className="relative group cursor-pointer opacity-50"
                              onClick={() => handleMainImageRestore(image)}
                            >
                              <Image
                                width={1000}
                                height={1000}
                                src={imageUrl}
                                alt={`Removed ${index + 1}`}
                                className="w-full h-24 object-cover rounded-lg"
                              />

                              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                                <span className="text-white flex flex-col items-center justify-center">
                                  <span>Removed</span>
                                  <span className="text-xs">
                                    Click to restore
                                  </span>
                                </span>
                              </div>
                            </div>
                          );
                        })}
                    </div>
                  </div>
                )}

                {existingImagesToKeep.length === 0 && (
                  <div className="text-center py-4 text-sm text-muted-foreground">
                    All current images will be removed. Add new images below or
                    restore some.
                  </div>
                )}
              </div>
            )}

            <FormField
              control={form.control}
              name="images"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Add New Main Product Images</FormLabel>
                  <FormControl>
                    <input
                      id="images-upload"
                      type="file"
                      className="hidden"
                      multiple
                      accept="image/jpeg,image/jpg,image/png,image/webp"
                      onChange={(e) => {
                        const newFiles = Array.from(e.target.files || []);
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
                  </FormControl>

                  <label
                    htmlFor="images-upload"
                    className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-border rounded-lg cursor-pointer hover:bg-muted/50"
                  >
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <Upload className="w-8 h-8 mb-2 text-muted-foreground" />
                      <p className="text-sm text-muted-foreground">
                        Click to upload new images
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        Supports JPEG, PNG, WebP (max 5MB each)
                      </p>
                    </div>
                  </label>

                  {(field.value || []).length > 0 && (
                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 mt-4">
                      {(field.value || []).map((file: File, index: number) => (
                        <div key={index} className="relative group">
                          <Image
                            width={1000}
                            height={1000}
                            src={
                              URL.createObjectURL(file) || "/placeholder.svg"
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

                          <div className="absolute bottom-0 right-0 flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button
                              type="button"
                              disabled={index === 0}
                              onClick={() => {
                                if (index > 0) {
                                  const newArray = [...(field.value || [])];
                                  [newArray[index - 1], newArray[index]] = [
                                    newArray[index],
                                    newArray[index - 1],
                                  ];
                                  field.onChange(newArray);
                                }
                              }}
                              className="bg-secondary text-secondary-foreground rounded p-1 disabled:opacity-50"
                            >
                              <ArrowUp className="w-3 h-3" />
                            </button>
                            <button
                              type="button"
                              disabled={
                                index === (field.value || []).length - 1
                              }
                              onClick={() => {
                                if (index < (field.value || []).length - 1) {
                                  const newArray = [...(field.value || [])];
                                  [newArray[index + 1], newArray[index]] = [
                                    newArray[index],
                                    newArray[index + 1],
                                  ];
                                  field.onChange(newArray);
                                }
                              }}
                              className="bg-secondary text-secondary-foreground rounded p-1 disabled:opacity-50"
                            >
                              <ArrowDown className="w-3 h-3" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="mt-4 p-3 bg-muted/50 rounded-lg">
              <div className="text-sm font-medium mb-1">
                Main Product Images Summary
              </div>
              <div className="text-xs text-muted-foreground space-y-1">
                <div>
                  • Current main images to keep: {existingImagesToKeep.length}
                </div>
                <div>
                  • New main images to upload:{" "}
                  {(form.getValues("images") || []).length}
                </div>
                <div>
                  • Total main images after update:{" "}
                  {existingImagesToKeep.length +
                    (form.getValues("images") || []).length}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end space-x-2 pt-4">
          <Button type="button" variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Updating..." : "Update Images"}
          </Button>
        </div>
      </form>
    </Form>
  );
}

// Variant Info Form
function VariantInfoForm({ product, onClose, setProducts }: FormProps) {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<TUpdateVariant>({
    resolver: zodResolver(productVariantUpdateZ),
    defaultValues: {
      size: "",
      price: 0,
      stock: 0,
      color: "",
      sku: "",
    },
  });

  const [selectedVariantId, setSelectedVariantId] = useState<string | null>(
    null
  );

  const handleVariantSelect = (value: string) => {
    setSelectedVariantId(value);

    // Load variant data into the form
    const variant = product.variants.find((v: any) => v._id === value);
    if (variant) {
      form.setValue("size", variant.size);
      form.setValue("price", variant.price);
      form.setValue("stock", variant.stock);
      form.setValue("color", variant.color);
      form.setValue("sku", variant.sku);
    }
  };

  const onSubmit = async (data: TUpdateVariant) => {
    setIsLoading(true);

    try {
      const response = await api.patch(
        `/products/${product._id}/v/${selectedVariantId}/info`,
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (!response.data.success) {
        console.error(
          "Failed to update variant information:",
          response.data.error
        );
        toast.error(
          response.data.error.message || "Failed to update variant information."
        );
        return;
      }

      setProducts((prev) => {
        const updatedProducts: IProduct[] = prev.map((p: IProduct) =>
          p._id === product._id ? response.data.data : p
        );
        return updatedProducts;
      });

      toast.success("Variant information updated successfully.");

      setTimeout(() => {
        onClose();
      }, 1000);
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
    if (!selectedVariantId) return;

    const size = form.watch("size");
    const color = form.watch("color");

    if (!size || !color) return;

    const sku = generateSKU({
      size,
      color,
    });

    const currentSku = form.getValues("sku");

    if (sku && currentSku !== sku) {
      form.setValue("sku", sku, {
        shouldValidate: true,
        shouldDirty: true,
      });
    }
  }, [selectedVariantId, form.watch("size"), form.watch("color")]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        {/* Variant Selection */}
        <div className="space-y-2">
          <Label>Select Variant to Edit</Label>
          <Select
            value={selectedVariantId ?? ""}
            onValueChange={handleVariantSelect}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select a variant" />
            </SelectTrigger>
            <SelectContent>
              {product.variants?.map((variant: any) => (
                <SelectItem key={variant._id} value={variant._id}>
                  {variant.size}-{variant?.color}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {selectedVariantId && (
          <>
            <Separator />

            <FormField
              control={form.control}
              name={`sku`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>SKU</FormLabel>
                  <FormControl>
                    <Input {...field} disabled className="Auto-generated SKU" />
                  </FormControl>
                </FormItem>
              )}
            />

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
                    <Input placeholder="Red, Blue, Green" {...field} />
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
          <Button type="submit" disabled={isLoading || !selectedVariantId}>
            {isLoading ? "Updating..." : "Update Variant Info"}
          </Button>
        </div>
      </form>
    </Form>
  );
}

// Create Variant Form
function CreateVariantForm({ product, onClose, setProducts }: FormProps) {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<TVariant>({
    resolver: zodResolver(productVariantZ),
    defaultValues: {
      size: "",
      stock: 0,
      price: 0,
      color: "",
      sku: "",
    },
  });

  const onSubmit = async (data: TVariant) => {
    setIsLoading(true);

    try {
      const response = await api.patch(
        `/products/${product._id}/variant`,
        data
      );

      if (!response.data.success) {
        console.error("Failed to add variant:", response.data.error);
        toast.error(response.data.error.message || "Failed to add variant.");
        return;
      }

      form.reset({
        size: "",
        stock: 0,
        price: 0,
        color: "",
        sku: "",
      });

      setProducts((prev) => {
        const updatedProducts: IProduct[] = prev.map((p: IProduct) =>
          p._id === product._id ? response.data.data : p
        );
        return updatedProducts;
      });

      toast.success("Variant added successfully");

      setTimeout(() => {
        onClose();
      }, 1000);
    } catch (error: any) {
      console.error("Error updating product:", error);
      if (error.response.data.success === false) {
        error.response.data.fields.forEach((field: any) => {
          form.setError(field.name, {
            message: field.message,
          });
        });
      }
      toast.error("Error updating product", {
        description:
          error instanceof Error ? error.message : "Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!product) return;

    const size = form.watch("size");
    const color = form.watch("color");

    if (!size || !color) return;

    const sku = generateSKU({
      size,
      color,
    });

    const currentSku = form.getValues("sku");

    if (sku && currentSku !== sku) {
      form.setValue("sku", sku, {
        shouldValidate: true,
        shouldDirty: true,
      });
    }
  }, [form.watch("size"), form.watch("color")]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        {/* SKU */}
        <FormField
          control={form.control}
          name="sku"
          render={({ field }) => (
            <FormItem>
              <FormLabel>SKU</FormLabel>
              <FormControl>
                <Input disabled placeholder="Auto-generated SKU" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Size */}
        <FormField
          control={form.control}
          name="size"
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

        {/* color */}
        <FormField
          control={form.control}
          name="color"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Color</FormLabel>
              <FormControl>
                <Input placeholder="Red, Blue, Green" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Stock */}
        <FormField
          control={form.control}
          name="stock"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Stock</FormLabel>
              <FormControl>
                <Input
                  type="number"
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

        {/* Price */}
        <FormField
          control={form.control}
          name="price"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Price</FormLabel>
              <FormControl>
                <Input
                  type="number"
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

        {/* Footer */}
        <div className="flex justify-end space-x-2 pt-4">
          <Button type="button" variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Adding..." : "Add Variant"}
          </Button>
        </div>
      </form>
    </Form>
  );
}

// Delete Variant Form
export default function DeleteVariantForm({
  product,
  onClose,
  setProducts,
}: FormProps) {
  const [selectedVariant, setSelectedVariant] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);

  const selectedVariantData = product.variants.find(
    (v) => v._id === selectedVariant
  );

  // ---- Actual Delete ----
  const handleDelete = async () => {
    if (!selectedVariant) return;
    setIsLoading(true);

    // Can't delete last variant
    if (product.variants.length <= 1) {
      toast.error("Cannot delete the last variant of the product.");
      setIsLoading(false);
      return;
    }

    try {
      const response = await api.patch(
        `/products/${product._id}/v/${selectedVariant}`
      );

      if (!response.data.success) {
        console.error("Failed to delete variant:", response.data.error);
        toast.error(response.data.error.message || "Failed to delete variant.");
        return;
      }

      setProducts((prev) => {
        const updatedProducts: IProduct[] = prev.map((p: IProduct) =>
          p._id === product._id ? response.data.data : p
        );
        return updatedProducts;
      });

      toast.success("Variant deleted successfully");

      setTimeout(() => {
        onClose();
      }, 1000);
    } catch (error: any) {
      console.error("Error updating product:", error);

      toast.error("Error updating product", {
        description:
          error instanceof Error ? error.message : "Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
      <Alert>
        <AlertTriangle className="h-4 w-4" />
        <AlertDescription>
          This action cannot be undone. Select a variant below to delete.
        </AlertDescription>
      </Alert>

      {/* Variant Select */}
      <div className="space-y-2">
        <Label>Select Variant to Delete</Label>
        <Select value={selectedVariant} onValueChange={setSelectedVariant}>
          <SelectTrigger>
            <SelectValue placeholder="Select a variant to delete" />
          </SelectTrigger>
          <SelectContent>
            {product.variants?.map((variant) => (
              <SelectItem key={variant._id} value={variant._id}>
                {variant.size}-{variant?.color} (${variant.price}) - Stock:{" "}
                {variant.stock}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Variant Preview */}
      {selectedVariantData && selectedVariantData.images && (
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
                <Badge variant="outline">{selectedVariantData?.color}</Badge>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Price:</span>
                <span>${selectedVariantData.price}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Stock:</span>
                <span>{selectedVariantData.stock} units</span>
              </div>
              {selectedVariantData.images?.length > 0 && (
                <div className="flex justify-between">
                  <span className="font-medium">Images:</span>
                  <span>{selectedVariantData.images.length} images</span>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Footer with Confirmation */}
      <div className="flex justify-end space-x-2 pt-4">
        <Button type="button" variant="outline" onClick={onClose}>
          Cancel
        </Button>

        {/* <AlertConfirmation
          isOpne={isAlertOpne}
          setIsOpen={setIsAlertOpne}
          onConfirm={form.handleSubmit(handleSubmit_)}
        /> */}

        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button
              type="button"
              variant="destructive"
              disabled={isLoading || !selectedVariant}
            >
              {isLoading ? "Deleting..." : "Delete Variant"}
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This will permanently delete{" "}
                <strong>{selectedVariantData?.size}</strong> and all its
                associated data. This action cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={handleDelete}
                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              >
                Confirm Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </form>
  );
}
