"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Plus, Trash2 } from "lucide-react";
import { DialogProps, KeyValue } from "./helper";
import CreateVariantForm from "./product-edits/create-variant";
import DeleteVariantForm from "./product-edits/delete-variant";
import DiscountForm from "./product-edits/discount";
import GeneralInfoForm from "./product-edits/general";
import { MainImagesForm } from "./product-edits/images";
import VariantInfoForm from "./product-edits/variant";
import VariantImagesForm from "./product-edits/variant-images";

export function ProductEditDialogs({ type, product, onClose }: DialogProps) {
  if (!product) return null;
  const props = { product, onClose };
  switch (type) {
    case "general":
      return <GeneralInfoForm {...props} />;
    case "discount":
      return <DiscountForm {...props} />;
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

export function KeyValueEditor({
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

export function Actions({
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
