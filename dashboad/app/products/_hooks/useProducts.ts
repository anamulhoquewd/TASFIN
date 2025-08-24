import {
  ProductCreateInput,
  productSchemaZ,
  ProductUpdateInput,
} from "@/lib/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { toast } from "sonner";

function useProducts() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [categoryOpen, setCategoryOpen] = useState(false);
  const [isUpdate, setIsUpdate] = useState<boolean>(true);
  const [variantImagePreviews, setVariantImagePreviews] = useState<{
    [key: number]: string[];
  }>({});
  const [selectedProductId, setSelectedProductId] = useState<string | null>(
    "68aaed1a67e613efcaefdce9"
  );
  const [product, setProduct] = useState<ProductCreateInput | null>(null);

  console.log("Product:", product);

  const defaultValues = isUpdate
    ? {
        id: product?._id, // 👈 include product id for updates
        title: product?.title || "",
        slug: product?.slug || "",
        description: product?.description || { html: "", json: "" },
        fabric: product?.fabric || "",
        valueAddition: product?.valueAddition || "",
        cutFit: product?.cutFit || "",
        collarNeck: product?.collarNeck || "",
        sleeve: product?.sleeve || "",
        length: product?.length || "",
        washCare: product?.washCare || "",
        sideCut: product?.sideCut || "",
        isFeatured: product?.isFeatured ?? false,
        isActive: product?.isActive ?? true,
        categories: product?.categories || [],
        tags: product?.tags || [],
        images: [], // for new uploads (existing images can be handled separately)
        variants: product?.variants || [],
      }
    : {
        // fresh create mode
        id: undefined,
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
        isActive: true,
        categories: [],
        tags: [],
        images: [],
        variants: [],
      };

  const form = useForm({
    defaultValues,
  });

  console.log("Form:", form.getValues());

  // const form = useForm({
  //   resolver: zodResolver(productSchemaZ),
  //   defaultValues: product ?? {
  //     title: "",
  //     slug: "",
  //     description: {
  //       json: "",
  //       html: "",
  //     },
  //     categories: [],
  //     images: [],
  //     variants: [{ size: "", color: "", stock: 0, price: 0, images: [] }],
  //     fabric: "",
  //     valueAddition: "",
  //     cutFit: "",
  //     collarNeck: "",
  //     sleeve: "",
  //     length: "",
  //     washCare: "",
  //     sideCut: "",
  //     isFeatured: false,
  //     isActive: true,
  //     tags: [],
  //   },
  // });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "variants",
  });

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
    setIsSubmitting(true);
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
    } finally {
      setIsSubmitting(false);
    }
  };

  const onUpdate = async (data: ProductUpdateInput) => {
    setIsSubmitting(true);
    try {
      const formData = new FormData();

      // Append simple fields
      formData.append("title", data.title ?? "");
      formData.append("slug", data.slug ?? "");
      formData.append(
        "description",
        typeof data.description === "string"
          ? data.description ?? ""
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
      formData.append("isFeatured", (data.isFeatured ?? false).toString());
      formData.append("isActive", (data.isActive ?? true).toString());

      // Append arrays as JSON strings
      formData.append("categories", JSON.stringify(data.categories ?? []));
      formData.append("tags", JSON.stringify(data.tags ?? []));

      // Append main product images
      if (Array.isArray(data.images)) {
        data.images.forEach((image: File) => {
          formData.append("images", image);
        });
      }

      // Append variants
      data.variants?.forEach((variant, index) => {
        formData.append(`variants[${index}][size]`, variant.size ?? "");
        formData.append(`variants[${index}][color]`, variant.color ?? "");
        formData.append(
          `variants[${index}][stock]`,
          variant.stock?.toString() ?? "0"
        );
        formData.append(
          `variants[${index}][price]`,
          variant.price?.toString() ?? "0"
        );

        // Append variant images
        variant.images?.forEach((image) => {
          if (image instanceof File) {
            formData.append(`variants[${index}][images]`, image);
          }
        });
      });

      // Send update request
      const response = await axios.put(
        `http://localhost:4000/api/v1/products/${selectedProductId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (!response.data.success) {
        console.log("Failed to update product:", response.data.error);
        toast.error(response.data.error.message || "Failed to update product.");
        return;
      }

      toast.success(
        response.data.success.message || "Product updated successfully."
      );

      // Reset form after successful update
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
      console.error("Error updating product:", error);
      if (error.response?.data?.success === false) {
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
      setIsSubmitting(false);
    }
  };

  const getProductById = async (id: string) => {
    try {
      const response = await axios.get(
        `http://localhost:4000/api/v1/products/${id}`
      );

      if (!response.data.success) {
        throw new Error(response.data.error.message || "Something with wrong!");
      }

      if (response.data.success) {
        setProduct(response.data.data);
        return response.data.product;
      }
    } catch (error) {
      console.error("Error fetching product:", error);
    }
    return null;
  };

  useEffect(() => {
    getProductById(selectedProductId ?? "");
  }, [selectedProductId]);

  return {
    form,
    isSubmitting,
    setIsSubmitting,
    getProductById,
    onUpdate,
    onSubmit,
    handleTitleChange,
    categoryOpen,
    setCategoryOpen,
    getCategoryName,
    CATEGORIES,
    append,
    fields,
    remove,
    variantImagePreviews,
    handleVariantImageUpload,
    removeVariantImage,
  };
}

export default useProducts;
