"use client";

import type React from "react";
import Link from "next/link";
import { ArrowLeft, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CreateProductForm } from "../_components/create-form";
import useProducts from "../_hook/useProducts";
import { useState } from "react";
import { ProductCreateInput } from "@/lib/schemas";
import { useRouter } from "next/navigation";

export default function NewProductPage() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const {
    form,
    onSubmit,
    handleTitleChange,
    categoryOpen,
    setCategoryOpen,
    prepend,
    fields,
    remove,
    variantImagePreviews,
    handleVariantImageUpload,
    removeVariantImage,
  } = useProducts();

  const handleSubmit = async (data: ProductCreateInput) => {
    try {
      setIsLoading(true);
      await onSubmit(data);
    } catch (error) {
      console.error("Error creating product:", error);
    } finally {
      setIsLoading(false);
    }
  };

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
          <Button
            variant="outline"
            onClick={() => router.push("/products")}
            className="cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Products
          </Button>
          <Button
            className="bg-primary hover:bg-primary/90 cursor-pointer"
            onClick={form.handleSubmit(handleSubmit)}
            disabled={isLoading}
          >
            <Save className="mr-2 h-4 w-4" />
            {isLoading ? "Saving..." : "Save Product"}
          </Button>
        </div>
      </div>

      <CreateProductForm
        form={form}
        onSubmit={handleSubmit}
        handleTitleChange={handleTitleChange}
        categoryOpen={categoryOpen}
        setCategoryOpen={setCategoryOpen}
        prepend={prepend}
        remove={remove}
        fields={fields}
        variantImagePreviews={fields.map(
          (_, index) => variantImagePreviews[index] || []
        )}
        handleVariantImageUpload={handleVariantImageUpload}
        removeVariantImage={removeVariantImage}
      />
    </div>
  );
}
