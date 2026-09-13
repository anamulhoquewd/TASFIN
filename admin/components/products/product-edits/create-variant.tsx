import api from "@/axios/interceptor";
import { Card, CardContent } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";
import {
  FormProps,
  ImageInput,
  ImageValues,
  reportError,
  VariantInput,
  VariantValues,
  variantZ,
} from "../helper";
import { Actions, KeyValueEditor } from "../product-edit";
import { VariantFields } from "./variant";

export default function CreateVariantForm({ product, onClose }: FormProps) {
  const [loading, setLoading] = useState(false);
  const form = useForm<
    VariantInput & ImageInput,
    any,
    VariantValues & ImageValues
  >({
    resolver: zodResolver(
      variantZ.extend({ images: z.array(z.instanceof(File)) }),
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
