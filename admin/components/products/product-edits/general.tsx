import useCategory from "@/app/admin/categories/_hook/useCategory";
import api from "@/axios/interceptor";
import { ChipInput } from "@/components/chip-input";
import { Badge } from "@/components/ui/badge";
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
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Actions, KeyValueEditor } from "../product-edit";
import {
  FormProps,
  GeneralInput,
  GeneralValues,
  generalZ,
  reportError,
  toKeyValues,
} from "./../helper";

export default function GeneralInfoForm({ product, onClose }: FormProps) {
  const [loading, setLoading] = useState(false);
  const { categories, getCategoryName } = useCategory();
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
