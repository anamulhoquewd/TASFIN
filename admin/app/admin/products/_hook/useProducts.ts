import api from "@/axios/interceptor";
import { ProductCreateInput, productSchemaZ } from "@/lib/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { toast } from "sonner";

function useProducts() {
  const [categoryOpen, setCategoryOpen] = useState(false);
  const [variantImagePreviews, setVariantImagePreviews] = useState<{
    [key: number]: string[];
  }>({});

  const form = useForm({
    resolver: zodResolver(productSchemaZ),
    defaultValues: {
      title: "",
      slug: "",
      description: "",
      keyFeatures: [],
      categories: [],
      images: [],
      variants: [{ sku: "", attributes: [], stock: 0, price: 0, images: [] }],
      specifications: [],
      isFeatured: false,
      isActive: true,
      tags: [],
    },
  });

  const { fields, append, prepend, remove } = useFieldArray({
    control: form.control,
    name: "variants",
  });

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
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const files = Array.from(event.target.files || []);
    if (files.length === 0) return;

    // Validate file types
    const validTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
    const invalidFiles = files.filter(
      (file) => !validTypes.includes(file.type),
    );

    if (invalidFiles.length > 0) {
      toast.error("Invalid file type", {
        description: "Please upload only JPEG, PNG, or WebP images.",
      });
      return;
    }

    // Get current variant images
    const currentVariant = form.getValues(`variants.${variantIndex}`);
    const currentImages: File[] = currentVariant.images || [];

    // Filter duplicates (check by name + size)
    const newFiles = files.filter(
      (file) =>
        !currentImages.some(
          (img: File) => img.name === file.name && img.size === file.size,
        ),
    );

    if (newFiles.length === 0) {
      toast.warning("Duplicate images ignored", {
        description: "You tried to upload images that already exist.",
      });
      return;
    }

    // Add new images to variant
    form.setValue(`variants.${variantIndex}.images`, [
      ...currentImages,
      ...newFiles,
    ]);

    // Create previews for variant images
    newFiles.forEach((file) => {
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
        (_, i) => i !== imageIndex,
      ),
    }));
  };

  const getProducts = async ({
    searchQuery,
    page = 1,
    categoryFilter,
    isActive,
    isFeatured,
  }: {
    searchQuery: string;
    page: number;
    categoryFilter: string;
    isActive: boolean | undefined;
    isFeatured: boolean | undefined;
  }) => {
    try {
      const response = await api.get(`/products`, {
        params: {
          search: searchQuery,
          page,
          ...(isActive !== undefined && { isActive }),
          ...(isFeatured !== undefined && { isFeatured }),
          ...(categoryFilter !== "all" && {
            category: categoryFilter,
          }),
        },
      });

      if (!response.data.success) {
        throw new Error(response.data.error.message || "Something with wrong!");
      }

      return response.data;
    } catch (error: any) {
      console.log(error);
    }
  };

  // Helper: key-value editor থেকে আসা object কে backend-expected
  // [{ key, value }] array shape এ convert করে। যদি already array হয়, as-is রাখে.
  const objectToKeyValueArray = (
    obj?: Record<string, string> | Array<{ key: string; value: string }>,
  ) => {
    if (!obj) return [];
    if (Array.isArray(obj)) return obj;
    return Object.entries(obj).map(([key, value]) => ({
      key,
      value: String(value ?? ""),
    }));
  };

  // SUBMIT HANDLER
  const onSubmit = async (data: ProductCreateInput) => {
    try {
      const formData = new FormData();

      // Append simple fields
      formData.append("title", data.title);
      formData.append("slug", data.slug);
      formData.append("description", data.description ?? "");
      formData.append("keyFeatures", JSON.stringify(data.keyFeatures ?? []));

      // FIX: specifications কে array shape এ convert করে পাঠানো হচ্ছে
      formData.append(
        "specifications",
        JSON.stringify(objectToKeyValueArray(data.specifications)),
      );

      formData.append("isFeatured", data.isFeatured.toString());
      formData.append("isActive", data.isActive.toString());

      // Append arrays as JSON strings
      formData.append("categories", JSON.stringify(data.categories));
      formData.append("tags", JSON.stringify(data.tags ?? []));

      // Append main product images
      // FIX: file field key "image" থেকে "images" করা হলো, যাতে
      // metadata key `images[position][position]` এর সাথে মিলে
      data.images.forEach((image, position) => {
        formData.append("images", image);
        formData.append(`images[${position}][position]`, String(position));
      });

      // Append variants
      data.variants.forEach((variant, index) => {
        formData.append(`variants[${index}][sku]`, variant.sku);

        // FIX: attributes কেও array shape এ convert করে পাঠানো হচ্ছে
        formData.append(
          `variants[${index}][attributes]`,
          JSON.stringify(objectToKeyValueArray(variant.attributes)),
        );

        formData.append(`variants[${index}][stock]`, variant.stock.toString());
        formData.append(`variants[${index}][price]`, variant.price.toString());

        // Variant images optional — না থাকলে কিছুই append হবে না,
        // তাই backend এ কোনো field-ই যাবে না এই variant এর জন্য
        // FIX: file field key "image" থেকে "images" করা হলো
        variant.images?.forEach((image, position) => {
          formData.append(`variants[${index}][images]`, image);
          formData.append(
            `variants[${index}][images][${position}][position]`,
            String(position),
          );
        });
      });

      // Log the FormData entries for debugging
      for (const [key, value] of formData.entries()) {
        console.log(`${key}:`, value);
      }

      // Send to backend
      const response = await api.post("/products/register", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (!response.data.success) {
        console.log("Failed to create product:", response.data.error);
        toast.error(response.data.error.message || "Failed to create product.");
        return; // FIX: fail হলে নিচের success flow (reset, toast.success) চলবে না
      }

      toast.success(
        response.data.success.message || "Product created successfully.",
      );

      // Reset form after successful submission
      form.reset({
        title: "",
        slug: "",
        description: "",
        keyFeatures: [],
        specifications: [],
        isFeatured: false,
        isActive: false,
        categories: [],
        tags: [],
        images: [],
        variants: [],
      });

      getProducts({
        searchQuery: "",
        page: 1,
        categoryFilter: "",
        isActive: true,
        isFeatured: false,
      });
    } catch (error: any) {
      console.error("Error creating product:", error);
      // FIX: optional chaining, নাহলে network error এ error.response undefined হলে crash করবে
      if (error.response?.data?.success === false) {
        error.response.data.fields?.forEach((field: any) => {
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

  const onDelete = async (productId: string) => {
    try {
      const result = await api.delete(`/products/${productId}`, {});

      console.log("Delete product result:", result);

      if (!result.data.success) {
        toast.error("Failed to delete product");
      }

      toast.success("Product deleted successfully");

      getProducts({
        searchQuery: "",
        page: 1,
        categoryFilter: "",
        isActive: true,
        isFeatured: false,
      });
    } catch (error) {
      toast.error("Failed to delete product");
      console.log("Error: ", error);
      return false;
    }
  };

  const getProductById = async (id: string) => {
    try {
      const response = await api.get(`/products/${id}`);

      if (!response.data.success) {
        throw new Error(response.data.error.message || "Something with wrong!");
      }

      if (response.data.success) {
        return response.data;
      }
    } catch (error) {
      console.error("Error fetching product:", error);
    }
    return null;
  };

  async function updateProduct(productId: string, updateData: any) {
    const formData = new FormData();

    console.log("Update data:", updateData);

    // ----- Basic fields -----
    if (updateData.name) {
      formData.append("name", updateData.name);
    }
    if (updateData.description !== undefined) {
      formData.append("description", updateData.description || "");
    }
    if (updateData.price !== undefined) {
      formData.append("price", String(updateData.price));
    }

    // ----- Main Images -----
    // নতুন images
    updateData?.newImages?.forEach((file: File) => {
      if (file) formData.append("images", file);
    });

    // যেসব পুরোনো image delete হবে
    if (
      Array.isArray(updateData.deleteImageUrls) &&
      updateData.deleteImageUrls.length > 0
    ) {
      formData.append(
        "deleteImageUrls",
        JSON.stringify(updateData.deleteImageUrls),
      );
    }

    // ----- Variants -----
    updateData?.variants?.forEach((variant: any, index: number) => {
      if (variant.id) {
        formData.append(`variants[${index}][id]`, variant.id);
      }

      formData.append(`variants[${index}][size]`, variant.size || "");
      formData.append(`variants[${index}][stock]`, String(variant.stock ?? 0));
      formData.append(`variants[${index}][price]`, String(variant.price ?? 0));

      // নতুন variant images
      variant?.newImages?.forEach((image: File) => {
        if (image) formData.append(`variants[${index}][images]`, image);
      });

      // ডিলিট করার জন্য variant image urls
      if (
        Array.isArray(variant.deleteImageUrls) &&
        variant.deleteImageUrls.length > 0
      ) {
        formData.append(
          `variants[${index}][deleteImageUrls]`,
          JSON.stringify(variant.deleteImageUrls),
        );
      }
    });

    // ----- Categories -----
    updateData?.categories?.forEach((catId: string) => {
      if (catId) formData.append("categories", catId);
    });

    try {
      // ----- API Call -----
      const response = await api.put("/products/" + productId, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (!response.data.success) {
        console.log("Failed to create product:", response.data.error);
        toast.error(response.data.error.message || "Failed to create product.");
      }

      toast.success(
        response.data.success.message || "Product updated successfully.",
      );

      // Reset form after successful submission
      form.reset({
        title: "",
        slug: "",
        description: "",
        keyFeatures: [],
        specifications: [],
        isFeatured: false,
        isActive: false,
        categories: [],
        tags: [],
        images: [],
        variants: [],
      });

      getProducts({
        searchQuery: "",
        page: 1,
        categoryFilter: "",
        isActive: true,
        isFeatured: false,
      });

      return { success: true, data: response.data.data };
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
  }

  return {
    form,
    getProductById,
    onSubmit,
    updateProduct, // Export the new function
    handleTitleChange,
    categoryOpen,
    setCategoryOpen,
    append,
    prepend,
    fields,
    remove,
    variantImagePreviews,
    handleVariantImageUpload,
    removeVariantImage,
    onDelete,
    getProducts,
  };
}

export type UseProductsReturn = ReturnType<typeof useProducts>;

export default useProducts;
