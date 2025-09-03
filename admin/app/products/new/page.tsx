"use client";

import type React from "react";
import Link from "next/link";
import { ArrowLeft, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CreateProductForm } from "../_components/create-form";
import useProducts from "../_hook/useProducts";
import { useState } from "react";
import { ProductCreateInput } from "@/lib/schemas";

export default function NewProductPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);

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
      setIsSubmitting(true);
      await onSubmit(data);
    } catch (error) {
      console.error("Error creating product:", error);
    } finally {
      setIsSubmitting(false);
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
          <Button variant="outline" asChild>
            <Link href="/products">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Cancel
            </Link>
          </Button>
          <Button
            className="bg-primary hover:bg-primary/90 cursor-pointer"
            onClick={form.handleSubmit(handleSubmit)}
            disabled={isSubmitting}
          >
            <Save className="mr-2 h-4 w-4" />
            {isSubmitting ? "Saving..." : "Save Product"}
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
