import { FormProps } from "../helper";

import api from "@/axios/interceptor";
import {
  FileSortableImageGrid,
  UrlSortableImageGrid,
} from "@/components/sortable-image-grid";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import type { IProductVariant } from "@/interfaces/products";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import {
  ImageInput,
  imagesZ,
  ImageValues,
  ProductImage,
  reportError,
} from "./../helper";
import { Actions } from "../product-edit";

export default function ImageEditor({
  product,
  onClose,
  variant,
}: FormProps & { variant?: IProductVariant }) {
  const [loading, setLoading] = useState(false);
  const [kept, setKept] = useState<ProductImage[]>([
    ...(variant?.images ?? product.images ?? []),
  ]);
  const form = useForm<ImageInput, any, ImageValues>({
    resolver: zodResolver(imagesZ),
    defaultValues: { images: [] },
  });
  const submit = async ({ images }: ImageValues) => {
    setLoading(true);
    try {
      const body = new FormData();
      images.forEach((file, index) => {
        body.append("images", file);
        body.append(`images[${index}][position]`, String(index));
        body.append(
          `images[${index}][alt]`,
          variant ? `${product.title}-${variant.sku}` : product.title,
        );
      });
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
                          ...(field.value ?? []),
                          ...Array.from(event.target.files ?? []),
                        ])
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {(form.watch("images") ?? []).length > 0 && (
              <FileSortableImageGrid
                files={form.watch("images") ?? []}
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
