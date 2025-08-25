"use client";

import type React from "react";
import Image from "next/image";
import Link from "next/link";
import { Upload, X, ArrowLeft, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import useProduct from "../_hook/useProduct";
import useCategory from "@/app/admin/categories/_hook/useCategory";
import { CreateProductForm } from "../_components/form";
import useProducts from "../_hook/useProducts";

interface ProductDiscunt {
  discountType: "percentage" | "flat";
  discountValue: number;
  discountExp: Date;
}

interface ProductUnit {
  unitType: "kg" | "piece";
  price: number;
  originalPrice?: number;
  costPerItem: number;
  stockQuantity: number;
  averageWeightPerFruit?: string;
}

interface Category {
  _id: string;
  name: string;
  slug: string;
  description?: string;
}

export interface ProductDocument extends Document {
  slug: string;
  name: string;
  title: string;
  origin?: string;
  shortDescription?: string;
  longDescription?: string;
  season?: string;
  media: { alt: string; url: string }[];
  status: "inStock" | "lowStock" | "outOfStock";
  visibility: boolean;
  isPopular: boolean;
  lowStockThreshold: number;
  unit: ProductUnit;
  discount?: ProductDiscunt;
  category: string;
}

export default function NewProductPage() {
  const {
    form,
    onSubmit,
    handleTitleChange,
    categoryOpen,
    setCategoryOpen,
    append,
    fields,
    remove,
    variantImagePreviews,
    handleVariantImageUpload,
    removeVariantImage,
    isSubmitting,
  } = useProducts();

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Add New Product</h1>
          <p className="text-muted-foreground">
            Create a new product for your store.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" asChild>
            <Link href="/products">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Cancel
            </Link>
          </Button>
          <Button
            className="bg-primary hover:bg-primary/90 cursor-pointer"
            onClick={form.handleSubmit(onSubmit)}
            disabled={isSubmitting}
          >
            <Save className="mr-2 h-4 w-4" />
            {isSubmitting ? "Saving..." : "Save Product"}
          </Button>
        </div>
      </div>

      <CreateProductForm
        form={form}
        onSubmit={onSubmit}
        handleTitleChange={handleTitleChange}
        categoryOpen={categoryOpen}
        setCategoryOpen={setCategoryOpen}
        append={append}
        remove={remove}
        fields={fields}
        variantImagePreviews={variantImagePreviews}
        handleVariantImageUpload={handleVariantImageUpload}
        removeVariantImage={removeVariantImage}
      />
    </div>
  );
}
