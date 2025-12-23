"use client";

import AlertConfirmation from "@/components/alert";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { productZ } from "@/lib/schemas";
import { ArrowLeft, Save } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { z } from "zod";
import useProducts from "../_hook/useProducts";
import BasicInfo from "./components/basic-info";
import CreateVariants from "./components/create-variants";
import ProductDetails from "./components/product-details";
import RightSidebar from "./components/right-sidebar";
import UploadImages from "./components/upload-images";

export default function NewProductPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [isAlertOpne, setIsAlertOpne] = useState(false);
  const router = useRouter();

  const {
    form,
    handleSubmit,
    handleTitleChange,
    categoryOpen,
    setCategoryOpen,
    append,
    fields,
    remove,
    variantImagePreviews,
    handleVariantImageUpload,
    removeVariantImage,
  } = useProducts();

  const handleSubmit_ = async (data: z.input<typeof productZ>) => {
    try {
      setIsLoading(true);
      // Parse input to output type (applies defaults)
      const parsedData = productZ.parse(data);
      await handleSubmit(parsedData);
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
            onClick={() => router.push("/admin/products")}
            className="cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Products
          </Button>
          <Button
            className="bg-primary hover:bg-primary/90 cursor-pointer"
            onClick={() => setIsAlertOpne(true)}
            disabled={isLoading}
          >
            <Save className="mr-2 h-4 w-4" />
            {isLoading ? "Saving..." : "Save Product"}
          </Button>
        </div>
      </div>

      <Form {...form}>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setIsAlertOpne(true);
          }}
          className="space-y-8"
        >
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            <div className="md:col-span-2 space-y-6">
              {/* Basic Information */}
              <BasicInfo form={form} handleTitleChange={handleTitleChange} />

              {/* Product Images */}
              <UploadImages form={form} />

              {/* Product Variants */}
              <CreateVariants
                form={form}
                fields={fields}
                remove={remove}
                handleVariantImageUpload={handleVariantImageUpload}
                removeVariantImage={removeVariantImage}
                append={append}
                variantImagePreviews={variantImagePreviews}
              />

              {/* Product Details */}
              <ProductDetails form={form} />
            </div>

            {/* Sidebar */}
            <RightSidebar
              form={form}
              categoryOpen={categoryOpen}
              changeCategoryOpen={setCategoryOpen}
            />

            <Button className="sr-only" type="submit">
              Submit
            </Button>
          </div>
        </form>
      </Form>

      <AlertConfirmation
        isOpne={isAlertOpne}
        setIsOpen={setIsAlertOpne}
        onConfirm={form.handleSubmit(handleSubmit_)}
      />
    </div>
  );
}
