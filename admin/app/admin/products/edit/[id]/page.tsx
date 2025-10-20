"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import type { IImage, IProduct } from "@/interfaces/products";
import { productUpdateZ, type ProductUpdateInput } from "@/lib/schemas";
import useProducts from "../../_hook/useProducts";
import { EditProductForm } from "../../_components/edit-form";
import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

// EditProductPage.tsx
export default function EditProductPage() {
  const params = useParams();
  const [product, setProduct] = useState<IProduct | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [existingImagesToKeep, setExistingImagesToKeep] = useState<
    { alt: string; url: string }[]
  >([]);
  const [deleteImageUrls, setDeleteImageUrls] = useState<string[]>([]);
  const [variantImagePreviews, setVariantImagePreviews] = useState<
    Record<string, string[]>
  >({});
  const [categoryOpen, setCategoryOpen] = useState(false);

  const { getProductById, updateProduct } = useProducts();

  const form = useForm<ProductUpdateInput>({
    resolver: zodResolver(productUpdateZ),
    defaultValues: { images: [], variants: [] },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "variants",
  });

  // Fetch Product
  useEffect(() => {
    (async () => {
      try {
        setIsLoading(true);
        const res = await getProductById(params.id as string);
        setProduct(res.data);

        // Reset form values
        form.reset({
          title: res.data.title || "",
          slug: res.data.slug || "",
          description: res.data.description || { html: "", json: null },
          categories: res.data.categories || [],
          images: [],
          variants:
            res.data.variants?.map((v: any) => ({
              _id: v._id,
              size: v.size,
              color: v.color,
              stock: v.stock,
              price: v.price,
              images: [], // file uploads
              existingImages: v.images?.map((img: IImage) => img.url) || [],
              deleteImageUrls: [],
            })) || [],
          fabric: res.data.fabric || "",
          valueAddition: res.data.valueAddition || "",
          cutFit: res.data.cutFit || "",
          collarNeck: res.data.collarNeck || "",
          sleeve: res.data.sleeve || "",
          length: res.data.length || "",
          washCare: res.data.washCare || "",
          sideCut: res.data.sideCut || "",
          isFeatured: res.data.isFeatured || false,
          isActive: res.data.isActive ?? true,
          tags: res.data.tags || [],
        });

        setExistingImagesToKeep(
          res.data.images?.map((img: IImage) => ({
            alt: img.alt,
            url: img.url,
          })) || []
        );
        setDeleteImageUrls([]);
      } finally {
        setIsLoading(false);
      }
    })();
  }, [params.id]);

  // Variant Image Upload
  const handleVariantImageUpload = (
    variantIndex: number,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;

    // Filter duplicates
    const currentFiles: File[] =
      form.getValues(`variants.${variantIndex}.images`) || [];
    const newFiles = files.filter(
      (f) =>
        !currentFiles.some((cf) => cf.name === f.name && cf.size === f.size)
    );
    if (!newFiles.length) return;

    form.setValue(`variants.${variantIndex}.images`, [
      ...currentFiles,
      ...newFiles,
    ]);

    // Previews
    const variantId =
      form.getValues(`variants.${variantIndex}._id`) || `new-${variantIndex}`;
    newFiles.forEach((file) => {
      const reader = new FileReader();
      reader.onload = (ev) => {
        setVariantImagePreviews((prev) => ({
          ...prev,
          [variantId]: [
            ...(prev[variantId] || []),
            ev.target?.result as string,
          ],
        }));
      };
      reader.readAsDataURL(file);
    });
  };

  const removeVariantImage = (variantIndex: number, imageIndex: number) => {
    const variant = form.getValues(`variants.${variantIndex}`);
    const variantId = variant._id || `new-${variantIndex}`;

    // Remove from files
    const currentFiles = variant.images || [];
    form.setValue(
      `variants.${variantIndex}.images`,
      currentFiles.filter((_, i) => i !== imageIndex)
    );

    // Remove from previews
    setVariantImagePreviews((prev) => ({
      ...prev,
      [variantId]: (prev[variantId] || []).filter((_, i) => i !== imageIndex),
    }));
  };

  // Main Product Images Management
  const handleMainImageRemove = (url: string) => {
    setExistingImagesToKeep((prev) => prev.filter((img) => img.url !== url));
    setDeleteImageUrls((prev) => {
      if (!prev.includes(url)) {
        return [...prev, url];
      }
      return prev;
    });
  };

  const handleMainImageRestore = (url: string) => {
    setExistingImagesToKeep((prev) => [...prev, { alt: "", url }]);
    setDeleteImageUrls((prev) => prev.filter((deleteUrl) => deleteUrl !== url));
  };

  // Variant Image Management Functions
  const handleVariantImageRemove = (variantIndex: number, imageUrl: string) => {
    const variant = form.getValues(`variants.${variantIndex}`);
    const currentDeleteUrls = variant.deleteImageUrls || [];

    // Add URL to deleteImageUrls if not already present
    if (!currentDeleteUrls.includes(imageUrl)) {
      form.setValue(`variants.${variantIndex}.deleteImageUrls`, [
        ...currentDeleteUrls,
        imageUrl,
      ]);
    }
  };

  const handleVariantImageRestore = (
    variantIndex: number,
    imageUrl: string
  ) => {
    const variant = form.getValues(`variants.${variantIndex}`);
    const currentDeleteUrls = variant.deleteImageUrls || [];

    // Remove URL from deleteImageUrls
    form.setValue(
      `variants.${variantIndex}.deleteImageUrls`,
      currentDeleteUrls.filter((url) => url !== imageUrl)
    );
  };

  const isVariantImageRemoved = (variantIndex: number, imageUrl: string) => {
    const variant = form.getValues(`variants.${variantIndex}`);
    const deleteUrls = variant.deleteImageUrls || [];
    return deleteUrls.includes(imageUrl);
  };

  // Submit
  const handleSubmitForm = async (data: ProductUpdateInput) => {
    if (!product) return;

    try {
      setIsLoading(true);

      // Handle Main Product Images Deletion
      const mainProductDeleteImageUrls = deleteImageUrls;

      // Process Variant Images - each variant has its own deleteImageUrls
      const processedVariants =
        data.variants?.map((variant: any) => ({
          ...variant,
          // Each variant manages its own image deletions independently
          deleteImageUrls: variant.deleteImageUrls || [],
        })) || [];

      const payload = {
        ...data,
        variants: processedVariants,
        // Main product images deletion URLs (separate from variant images)
        deleteImageUrls: mainProductDeleteImageUrls,
      };

      // Call backend
      await updateProduct(product._id, payload);
      console.log("Payload ready for backend:", payload);
      console.log("Main product images to delete:", mainProductDeleteImageUrls);
      console.log(
        "Variant images deletions:",
        processedVariants.map((v) => ({
          variantId: v._id,
          deleteUrls: v.deleteImageUrls,
        }))
      );
    } finally {
      setIsLoading(false);
    }
  };

  if (!product) return <div>Loading...</div>;

  return (
    <EditProductForm
      form={form}
      product={product}
      fields={fields}
      prepend={append}
      remove={remove}
      handleVariantImageUpload={handleVariantImageUpload}
      removeVariantImage={removeVariantImage}
      existingImagesToKeep={existingImagesToKeep}
      setExistingImagesToKeep={setExistingImagesToKeep}
      variantImagePreviews={variantImagePreviews}
      onSubmit={handleSubmitForm}
      isLoading={isLoading}
      handleTitleChange={(title) =>
        form.setValue("slug", title.toLowerCase().replace(/\s+/g, "-"))
      }
      setCategoryOpen={setCategoryOpen}
      categoryOpen={categoryOpen}
      handleVariantImageRemove={handleVariantImageRemove}
      handleVariantImageRestore={handleVariantImageRestore}
      isVariantImageRemoved={isVariantImageRemoved}
      handleMainImageRemove={handleMainImageRemove}
      handleMainImageRestore={handleMainImageRestore}
    />
  );
}
