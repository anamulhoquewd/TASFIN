import { useState } from "react";

export function useKidsProductForm(initialData?: any) {
  const [title, setTitle] = useState(initialData?.title || "");
  const [slug, setSlug] = useState(initialData?.slug || "");
  const [description, setDescription] = useState(
    initialData?.description || {},
  );
  const [isFeatured, setIsFeatured] = useState(
    initialData?.isFeatured || false,
  );
  const [isActive, setIsActive] = useState(initialData?.isActive || true);

  const [categories, setCategories] = useState<string[]>(
    initialData?.categories || [],
  );
  const [tags, setTags] = useState<string[]>(initialData?.tags || []);
  const [keyFeatures, setKeyFeatures] = useState<string[]>(
    initialData?.keyFeatures || [],
  );

  // Main images
  const [mainImages, setMainImages] = useState<File[]>([]);
  const [deleteMainUrls, setDeleteMainUrls] = useState<string[]>([]);

  // Variants
  const [variants, setVariants] = useState<any[]>(initialData?.variants || []);
  const [variantImages, setVariantImages] = useState<Record<string, File[]>>(
    {},
  );
  const [deleteVariantUrls, setDeleteVariantUrls] = useState<
    Record<string, string[]>
  >({});

  const addVariant = () => {
    setVariants((prev) => [
      ...prev,
      { id: null, size: "", stock: 0, price: 0 },
    ]);
  };

  const removeVariant = (idx: number) => {
    const v = variants[idx];
    if (v.id) {
      // Delete all variant images
      const urls = variantImages[v.id] || [];
      if (urls.length) {
        setDeleteVariantUrls((prev) => ({
          ...prev,
          [v.id]: urls.map((f) => f.name),
        }));
      }
    }
    setVariants((prev) => prev.filter((_, i) => i !== idx));
  };

  const setVariantImageFiles = (variantId: string, files: File[]) => {
    setVariantImages((prev) => ({ ...prev, [variantId]: files }));
  };

  const markVariantImageForDelete = (variantId: string, urls: string[]) => {
    setDeleteVariantUrls((prev) => ({ ...prev, [variantId]: urls }));
  };

  const handleMainImagesChange = (files: File[]) => {
    setMainImages(files);
  };

  const markMainImageForDelete = (urls: string[]) => {
    setDeleteMainUrls((prev) => [...prev, ...urls]);
  };

  const resetForm = () => {
    setTitle("");
    setSlug("");
    setDescription({});
    setIsFeatured(false);
    setIsActive(true);
    setCategories([]);
    setTags([]);
    setMainImages([]);
    setDeleteMainUrls([]);
    setVariants([]);
    setVariantImages({});
    setDeleteVariantUrls({});
  };

  return {
    title,
    setTitle,
    slug,
    setSlug,
    description,
    setDescription,

    isFeatured,
    setIsFeatured,
    isActive,
    setIsActive,
    categories,
    setCategories,
    tags,
    setTags,
    mainImages,
    handleMainImagesChange,
    deleteMainUrls,
    markMainImageForDelete,
    variants,
    setVariants,
    addVariant,
    removeVariant,
    variantImages,
    setVariantImageFiles,
    deleteVariantUrls,
    markVariantImageForDelete,
    resetForm,
    keyFeatures,
    setKeyFeatures,
  };
}
