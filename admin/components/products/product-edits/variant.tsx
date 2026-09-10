import api from "@/axios/interceptor";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { IProductVariant } from "@/interfaces/products";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import {
  FormProps,
  label,
  reportError,
  toKeyValues,
  VariantInput,
  VariantValues,
  variantZ,
} from "../helper";
import { Actions, KeyValueEditor } from "../product-edit";

export function VariantFields({ form }: { form: any }) {
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

export default function VariantInfoForm({ product, onClose }: FormProps) {
  const [id, setId] = useState("");
  const [loading, setLoading] = useState(false);
  const selected = product.variants.find((variant) => variant._id === id);
  const form = useForm<VariantInput, any, VariantValues>({
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

export function VariantSelect({
  variants,
  value,
  onChange,
}: {
  variants: IProductVariant[];
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium">Select variant</label>

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
    </div>
  );
}
