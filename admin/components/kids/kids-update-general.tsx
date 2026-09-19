import api from "@/axios/interceptor";
import { ChipInput } from "@/components/chip-input";
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
import {
  KidsFormProps,
  KidsGeneralInput,
  KidsGeneralValues,
  kidsGeneralZ,
  reportError,
} from "../products/helper";
import { Actions } from "./kids-product-edit";

export default function KidsGeneralInfoForm({
  product,
  onClose,
}: KidsFormProps) {
  const [loading, setLoading] = useState(false);
  const form = useForm<KidsGeneralInput, any, KidsGeneralValues>({
    resolver: zodResolver(kidsGeneralZ),
    defaultValues: {
      name: "",
      fabric: "",
      description: "",
      sizes: [],
      colors: [],
      moq: 0,
      maxPrice: 0,
      minPrice: 0,
      isActive: true,
    },
  });
  useEffect(
    () =>
      form.reset({
        name: product.name,
        fabric: product.fabric ?? "",
        description: product.description ?? "",
        colors: product.colors ?? [],
        sizes: product.sizes ?? [],
        isActive: product.isActive,
        moq: product.moq,
        maxPrice: product.maxPrice,
        minPrice: product.minPrice,
      }),
    [form, product],
  );
  const submit = async (data: KidsGeneralValues) => {
    setLoading(true);
    try {
      const payload = {
        name: data.name,
        fabric: data.fabric,
        description: data.description ?? "",
        colors: data.colors ?? [],
        sizes: data.sizes ?? [],
        isActive: Boolean(data.isActive),
        moq: Number(data.moq ?? 0),
        minPrice: Number(data.minPrice ?? 0),
        maxPrice: Number(data.maxPrice ?? 0),
      };

      const response = await api.patch(`/kids/${product._id}`, payload);
      if (!response.data.success) throw new Error(response.data.error?.message);
      toast.success("Product updated successfully");

      onClose();
    } catch (error) {
      reportError(error, "Could not update product");
    } finally {
      setLoading(false);
    }
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(submit)} className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Edit product information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

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
              name="fabric"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Fabric</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g. Cotton" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Inventory and pricing</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <FormField
              control={form.control}
              name="moq"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Minimum order quantity</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      min="0"
                      {...field}
                      onChange={(event) =>
                        field.onChange(event.target.valueAsNumber || 0)
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid grid-cols-2 gap-3">
              <FormField
                control={form.control}
                name="minPrice"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Minimum price</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        min="0"
                        step="0.01"
                        {...field}
                        onChange={(event) =>
                          field.onChange(event.target.valueAsNumber || 0)
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="maxPrice"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Maximum price</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        min="0"
                        step="0.01"
                        {...field}
                        onChange={(event) =>
                          field.onChange(event.target.valueAsNumber || 0)
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Options</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <FormField
              control={form.control}
              name="sizes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Sizes</FormLabel>
                  <FormControl>
                    <ChipInput
                      value={field.value ?? []}
                      onChange={field.onChange}
                      placeholder="Add a size"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="colors"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Colors</FormLabel>
                  <FormControl>
                    <ChipInput
                      value={field.value ?? []}
                      onChange={field.onChange}
                      placeholder="Add a color"
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
            <FormField
              control={form.control}
              name="isActive"
              render={({ field }) => (
                <FormItem className="flex items-center gap-3 space-y-0">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={(value) =>
                        field.onChange(value === true)
                      }
                    />
                  </FormControl>
                  <FormLabel>Active product</FormLabel>
                </FormItem>
              )}
            />
          </CardContent>
        </Card>
        <Actions onClose={onClose} loading={loading} label="Update product" />
      </form>
    </Form>
  );
}
