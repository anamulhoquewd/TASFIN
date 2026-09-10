"use client";

import useCategory from "@/app/admin/categories/_hook/useCategory";
import api from "@/axios/interceptor";
import { ChipInput } from "@/components/chip-input";
import {
  FileSortableImageGrid,
  UrlSortableImageGrid,
} from "@/components/sortable-image-grid";
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
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import type { IImage, IProduct, IProductVariant } from "@/interfaces/products";
import { zodResolver } from "@hookform/resolvers/zod";
import { AlertTriangle, Plus, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import useProducts from "../../hooks/products/useProducts";

type KeyValue = { key: string; value: string };
type ProductImage = Pick<IImage, "url" | "alt">;
type FormProps = { product: IProduct; onClose: () => void };
type DialogProps = FormProps & { type: string; product?: IProduct };

const keyValuesZ = z.array(
  z.object({
    key: z.string().trim().min(1, "Name is required"),
    value: z.string().trim().min(1, "Value is required"),
  }),
);
const generalZ = z.object({
  title: z.string().trim().min(1, "Title is required"),
  slug: z
    .string()
    .trim()
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Slug must be kebab-case"),
  description: z.string().max(1000).optional(),
  keyFeatures: z.array(z.string()).default([]),
  specifications: keyValuesZ.default([]),
  categories: z.array(z.string()).min(1, "Select at least one category"),
  tags: z.array(z.string()).default([]),
  isFeatured: z.boolean(),
  isActive: z.boolean(),
});
const variantZ = z.object({
  sku: z.string().trim().min(1, "SKU is required"),
  attributes: keyValuesZ.default([]),
  stock: z.coerce.number().int().min(0),
  price: z.coerce.number().min(0),
});
const imagesZ = z.object({ images: z.array(z.instanceof(File)).default([]) });
type GeneralValues = z.infer<typeof generalZ>;
type GeneralInput = z.input<typeof generalZ>;
type VariantValues = z.infer<typeof variantZ>;
type ImageValues = z.infer<typeof imagesZ>;

const toKeyValues = (
  value?: Map<string, string> | Record<string, string>,
): KeyValue[] =>
  value
    ? Object.entries(
        value instanceof Map ? Object.fromEntries(value) : value,
      ).map(([key, item]) => ({ key, value: String(item) }))
    : [];
const label = (variant: IProductVariant) =>
  `${variant.sku} — ৳${variant.price} · Stock: ${variant.stock}`;
const reportError = (error: unknown, fallback: string) => {
  const data = (
    error as {
      response?: { data?: { error?: { message?: string }; message?: string } };
    }
  ).response?.data;
  toast.error(data?.error?.message ?? data?.message ?? fallback);
};

export function ProductEditDialogs({ type, product, onClose }: DialogProps) {
  if (!product) return null;
  const props = { product, onClose };
  switch (type) {
    case "general":
      return <GeneralInfoForm {...props} />;
    case "images":
      return <MainImagesForm {...props} />;
    case "variantInfo":
      return <VariantInfoForm {...props} />;
    case "variantImages":
      return <VariantImagesForm {...props} />;
    case "createVariant":
      return <CreateVariantForm {...props} />;
    case "deleteVariant":
      return <DeleteVariantForm {...props} />;
    default:
      return null;
  }
}

function KeyValueEditor({
  form,
  name,
  title,
}: {
  form: any;
  name: "specifications" | "attributes";
  title: string;
}) {
  const values: KeyValue[] = form.watch(name) ?? [];
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {values.map((_, index) => (
          <div key={index} className="grid grid-cols-[1fr_1fr_auto] gap-2">
            <FormField
              control={form.control}
              name={`${name}.${index}.key`}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="Name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name={`${name}.${index}.value`}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="Value" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={() =>
                form.setValue(
                  name,
                  values.filter((_, itemIndex) => itemIndex !== index),
                )
              }
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        ))}
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() =>
            form.setValue(name, [...values, { key: "", value: "" }])
          }
        >
          <Plus className="mr-1 h-4 w-4" />
          Add {title.slice(0, -1)}
        </Button>
      </CardContent>
    </Card>
  );
}

function GeneralInfoForm({ product, onClose }: FormProps) {
  const [loading, setLoading] = useState(false);
  const { categories, getCategoryName } = useCategory();
  const { getProducts } = useProducts();
  const form = useForm<GeneralInput, any, GeneralValues>({
    resolver: zodResolver(generalZ),
    defaultValues: {
      title: "",
      slug: "",
      categories: [],
      keyFeatures: [],
      specifications: [],
      tags: [],
      isFeatured: false,
      isActive: true,
    },
  });
  useEffect(
    () =>
      form.reset({
        title: product.title,
        slug: product.slug,
        description: product.description ?? "",
        keyFeatures: product.keyFeatures ?? [],
        specifications: toKeyValues(product.specifications),
        categories: product.categories ?? [],
        tags: product.tags ?? [],
        isFeatured: product.isFeatured ?? false,
        isActive: product.isActive,
      }),
    [form, product],
  );
  const submit = async (data: GeneralValues) => {
    setLoading(true);
    try {
      const body = new FormData();
      body.append("title", data.title);
      body.append("slug", data.slug);
      body.append("description", data.description ?? "");
      body.append("keyFeatures", JSON.stringify(data.keyFeatures));
      body.append("specifications", JSON.stringify(data.specifications));
      body.append("categories", JSON.stringify(data.categories));
      body.append("tags", JSON.stringify(data.tags));
      body.append("isFeatured", String(data.isFeatured));
      body.append("isActive", String(data.isActive));
      const response = await api.patch(
        `/products/${product._id}/general`,
        body,
      );
      if (!response.data.success) throw new Error(response.data.error?.message);
      toast.success("Product updated successfully");
      getProducts({
        searchQuery: "",
        page: 1,
        categoryFilter: "",
        isActive: true,
        isFeatured: false,
      });
      onClose();
    } catch (error) {
      reportError(error, "Could not update product");
    } finally {
      setLoading(false);
    }
  };
  const toggle = (name: "isFeatured" | "isActive", text: string) => (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex items-center gap-3 space-y-0">
          <FormControl>
            <Checkbox
              checked={field.value}
              onCheckedChange={(value) => field.onChange(value === true)}
            />
          </FormControl>
          <FormLabel>{text}</FormLabel>
        </FormItem>
      )}
    />
  );
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(submit)} className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Edit product information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        onChange={(event) => {
                          field.onChange(event);
                          form.setValue(
                            "slug",
                            event.target.value
                              .toLowerCase()
                              .replace(/[^a-z0-9\s-]/g, "")
                              .trim()
                              .replace(/\s+/g, "-")
                              .replace(/-+/g, "-"),
                          );
                        }}
                      />
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
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="keyFeatures"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Key features</FormLabel>
                  <FormControl>
                    <ChipInput
                      variant="feature"
                      value={field.value ?? []}
                      onChange={field.onChange}
                      placeholder="Add a feature"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>
        <KeyValueEditor
          form={form}
          name="specifications"
          title="Specifications"
        />
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
                  <FormLabel>Categories</FormLabel>
                  <div className="flex flex-wrap gap-2 rounded-md border p-2">
                    {categories.map(
                      (category: { _id: string; name: string }) => (
                        <Badge
                          key={category._id}
                          variant={
                            field.value.includes(category._id)
                              ? "default"
                              : "outline"
                          }
                          className="cursor-pointer"
                          onClick={() =>
                            field.onChange(
                              field.value.includes(category._id)
                                ? field.value.filter(
                                    (id) => id !== category._id,
                                  )
                                : [...field.value, category._id],
                            )
                          }
                        >
                          {getCategoryName(category._id)}
                        </Badge>
                      ),
                    )}
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="tags"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tags</FormLabel>
                  <FormControl>
                    <ChipInput
                      variant="tag"
                      value={field.value ?? []}
                      onChange={field.onChange}
                      placeholder="Add a tag"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Status</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {toggle("isFeatured", "Featured product")}
            {toggle("isActive", "Active product")}
          </CardContent>
        </Card>
        <Actions onClose={onClose} loading={loading} label="Update product" />
      </form>
    </Form>
  );
}

function ImageEditor({
  product,
  onClose,
  variant,
}: FormProps & { variant?: IProductVariant }) {
  const [loading, setLoading] = useState(false);
  const [kept, setKept] = useState<ProductImage[]>([
    ...(variant?.images ?? product.images),
  ]);
  const form = useForm<ImageValues>({
    resolver: zodResolver(imagesZ),
    defaultValues: { images: [] },
  });
  const submit = async ({ images }: ImageValues) => {
    setLoading(true);
    try {
      const body = new FormData();
      images.forEach((file) => body.append("images", file));
      const originals = variant?.images ?? product.images;
      originals
        .filter((image) => !kept.some((current) => current.url === image.url))
        .forEach((image) => body.append("deleteImageUrl", image.url));
      body.append(
        "reorderedImageUrls",
        JSON.stringify(kept.map((image) => image.url)),
      );
      const path = variant
        ? `/products/${product._id}/v/${variant._id}/images`
        : `/products/${product._id}/main-images`;
      const response = await api.patch(path, body);
      if (!response.data.success) throw new Error(response.data.error?.message);
      toast.success("Images updated successfully");
      onClose();
    } catch (error) {
      reportError(error, "Could not update images");
    } finally {
      setLoading(false);
    }
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(submit)} className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>
              {variant ? `Images for ${variant.sku}` : "Main product images"}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <UrlSortableImageGrid
              images={kept}
              onReorder={setKept}
              onRemove={(url) =>
                setKept((items) => items.filter((image) => image.url !== url))
              }
              helperText="Drag to reorder. Removed images are deleted when saved."
            />
            <FormField
              control={form.control}
              name="images"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Add images</FormLabel>
                  <FormControl>
                    <Input
                      type="file"
                      multiple
                      accept="image/jpeg,image/png,image/webp"
                      onChange={(event) =>
                        field.onChange([
                          ...field.value,
                          ...Array.from(event.target.files ?? []),
                        ])
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {form.watch("images").length > 0 && (
              <FileSortableImageGrid
                files={form.watch("images")}
                onChange={(files) => form.setValue("images", files)}
                helperText="Drag new images to set their order."
              />
            )}
          </CardContent>
        </Card>
        <Actions onClose={onClose} loading={loading} label="Update images" />
      </form>
    </Form>
  );
}
export function MainImagesForm(props: FormProps) {
  return <ImageEditor {...props} />;
}

function VariantFields({ form }: { form: any }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Variant details</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4 md:grid-cols-3">
        <FormField
          control={form.control}
          name="sku"
          render={({ field }) => (
            <FormItem>
              <FormLabel>SKU</FormLabel>
              <FormControl>
                <Input {...field} />
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
              <FormLabel>Stock</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  min="0"
                  {...field}
                  onChange={(event) =>
                    field.onChange(Number(event.target.value))
                  }
                />
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
              <FormLabel>Price</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  min="0"
                  step="0.01"
                  {...field}
                  onChange={(event) =>
                    field.onChange(Number(event.target.value))
                  }
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </CardContent>
    </Card>
  );
}
function VariantInfoForm({ product, onClose }: FormProps) {
  const [id, setId] = useState("");
  const [loading, setLoading] = useState(false);
  const selected = product.variants.find((variant) => variant._id === id);
  const form = useForm<VariantValues>({
    resolver: zodResolver(variantZ),
    defaultValues: { sku: "", attributes: [], stock: 0, price: 0 },
  });
  useEffect(() => {
    if (selected)
      form.reset({
        sku: selected.sku,
        attributes: toKeyValues(selected.attributes),
        stock: selected.stock,
        price: selected.price,
      });
  }, [form, selected]);
  const submit = async (data: VariantValues) => {
    if (!selected) return;
    setLoading(true);
    try {
      const body = new FormData();
      body.append("sku", data.sku);
      body.append("attributes", JSON.stringify(data.attributes));
      body.append("stock", String(data.stock));
      body.append("price", String(data.price));
      const response = await api.patch(
        `/products/${product._id}/v/${id}/info`,
        body,
      );
      if (!response.data.success) throw new Error(response.data.error?.message);
      toast.success("Variant updated successfully");
      onClose();
    } catch (error) {
      reportError(error, "Could not update variant");
    } finally {
      setLoading(false);
    }
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(submit)} className="space-y-4">
        <VariantSelect
          variants={product.variants}
          value={id}
          onChange={setId}
        />
        {selected && (
          <>
            <VariantFields form={form} />
            <KeyValueEditor form={form} name="attributes" title="Attributes" />
          </>
        )}
        <Actions
          onClose={onClose}
          loading={loading}
          label="Update variant"
          disabled={!selected}
        />
      </form>
    </Form>
  );
}
function VariantSelect({
  variants,
  value,
  onChange,
}: {
  variants: IProductVariant[];
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <FormItem>
      <FormLabel>Select variant</FormLabel>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger>
          <SelectValue placeholder="Select a variant" />
        </SelectTrigger>
        <SelectContent>
          {variants.map((variant) => (
            <SelectItem key={variant._id} value={variant._id}>
              {label(variant)}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </FormItem>
  );
}
function VariantImagesForm({ product, onClose }: FormProps) {
  const [id, setId] = useState("");
  const variant = product.variants.find((item) => item._id === id);
  return (
    <div className="space-y-4">
      <VariantSelect variants={product.variants} value={id} onChange={setId} />
      {variant ? (
        <ImageEditor
          key={id}
          product={product}
          variant={variant}
          onClose={onClose}
        />
      ) : (
        <p className="text-sm text-muted-foreground">
          Choose a variant to manage its images.
        </p>
      )}
    </div>
  );
}

function CreateVariantForm({ product, onClose }: FormProps) {
  const [loading, setLoading] = useState(false);
  const form = useForm<VariantValues & ImageValues>({
    resolver: zodResolver(
      variantZ.extend({ images: z.array(z.instanceof(File)).default([]) }),
    ),
    defaultValues: { sku: "", attributes: [], stock: 0, price: 0, images: [] },
  });
  const submit = async (data: VariantValues & ImageValues) => {
    setLoading(true);
    try {
      const body = new FormData();
      body.append("sku", data.sku);
      body.append("attributes", JSON.stringify(data.attributes));
      body.append("stock", String(data.stock));
      body.append("price", String(data.price));
      data.images.forEach((file) => body.append("images", file));
      const response = await api.patch(
        `/products/${product._id}/variant`,
        body,
      );
      if (!response.data.success) throw new Error(response.data.error?.message);
      toast.success("Variant added successfully");
      onClose();
    } catch (error) {
      reportError(error, "Could not add variant");
    } finally {
      setLoading(false);
    }
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(submit)} className="space-y-4">
        <VariantFields form={form} />
        <KeyValueEditor form={form} name="attributes" title="Attributes" />
        <Card>
          <CardContent className="pt-6">
            <FormField
              control={form.control}
              name="images"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Variant images</FormLabel>
                  <FormControl>
                    <Input
                      type="file"
                      multiple
                      accept="image/jpeg,image/png,image/webp"
                      onChange={(event) =>
                        field.onChange(Array.from(event.target.files ?? []))
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>
        <Actions onClose={onClose} loading={loading} label="Add variant" />
      </form>
    </Form>
  );
}
function Actions({
  onClose,
  loading,
  label,
  disabled = false,
}: {
  onClose: () => void;
  loading: boolean;
  label: string;
  disabled?: boolean;
}) {
  return (
    <div className="flex justify-end gap-2">
      <Button type="button" variant="outline" onClick={onClose}>
        Cancel
      </Button>
      <Button type="submit" disabled={loading || disabled}>
        {loading ? "Saving..." : label}
      </Button>
    </div>
  );
}

export default function DeleteVariantForm({ product, onClose }: FormProps) {
  const [id, setId] = useState("");
  const [loading, setLoading] = useState(false);
  const selected = product.variants.find((variant) => variant._id === id);
  const remove = async () => {
    if (!selected) return;
    setLoading(true);
    try {
      const response = await api.patch(`/products/${product._id}/v/${id}`);
      if (!response.data.success) throw new Error(response.data.error?.message);
      toast.success("Variant deleted successfully");
      onClose();
    } catch (error) {
      reportError(error, "Could not delete variant");
    } finally {
      setLoading(false);
    }
  };
  return (
    <form className="space-y-4" onSubmit={(event) => event.preventDefault()}>
      <Alert>
        <AlertTriangle className="h-4 w-4" />
        <AlertDescription>
          This permanently removes the selected SKU and its images.
        </AlertDescription>
      </Alert>
      <VariantSelect variants={product.variants} value={id} onChange={setId} />
      {selected && (
        <Card>
          <CardContent className="space-y-2 pt-6">
            <p>
              <strong>SKU:</strong> {selected.sku}
            </p>
            <p>
              <strong>Attributes:</strong>{" "}
              {toKeyValues(selected.attributes)
                .map(({ key, value }) => `${key}: ${value}`)
                .join(", ") || "None"}
            </p>
            <p>
              <strong>Images:</strong> {selected.images?.length ?? 0}
            </p>
          </CardContent>
        </Card>
      )}
      <div className="flex justify-end gap-2">
        <Button type="button" variant="outline" onClick={onClose}>
          Cancel
        </Button>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button
              type="button"
              variant="destructive"
              disabled={!selected || loading}
            >
              {loading ? "Deleting..." : "Delete variant"}
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Delete this variant?</AlertDialogTitle>
              <AlertDialogDescription>
                {selected
                  ? `SKU ${selected.sku} and all of its images will be permanently removed.`
                  : ""}
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction className="bg-destructive" onClick={remove}>
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </form>
  );
}
