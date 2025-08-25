import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Upload, X } from "lucide-react";
import { toast } from "sonner";
import { useState } from "react";

type VariantImagesFieldProps = {
  form: any;
  variantIndex: number;
  variantImagePreviews: Record<number, string[]>;
  setVariantImagePreviews: React.Dispatch<
    React.SetStateAction<Record<number, string[]>>
  >;
};

export function VariantImagesField({
  form,
  variantIndex,
  variantImagePreviews,
  setVariantImagePreviews,
}: VariantImagesFieldProps) {
  const handleUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    if (files.length === 0) return;

    // ✅ validate type
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

    // ✅ merge old + new
    const currentImages =
      form.getValues(`variants.${variantIndex}.images`) || [];
    const newImages = [...currentImages, ...files];

    // ✅ set value to form
    form.setValue(`variants.${variantIndex}.images`, newImages);

    // ✅ previews
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

  const removeImage = (imageIndex: number) => {
    const currentImages =
      form.getValues(`variants.${variantIndex}.images`) || [];
    const updated = currentImages.filter(
      (_: any, i: number) => i !== imageIndex
    );
    form.setValue(`variants.${variantIndex}.images`, updated);

    setVariantImagePreviews((prev) => ({
      ...prev,
      [variantIndex]: (prev[variantIndex] || []).filter(
        (_, i) => i !== imageIndex
      ),
    }));
  };

  return (
    <FormField
      control={form.control}
      name={`variants.${variantIndex}.images`}
      render={() => (
        <FormItem>
          <div className="flex items-center justify-between">
            <FormLabel>Variant Images</FormLabel>
            <FormControl>
              <label className="flex items-center gap-2 px-3 py-2 text-sm border border-border rounded-md cursor-pointer hover:bg-muted/50">
                <Upload className="w-4 h-4" />
                Upload Images
                <input
                  type="file"
                  className="hidden"
                  multiple
                  accept="image/*"
                  onChange={handleUpload}
                />
              </label>
            </FormControl>
          </div>
          <FormMessage />

          {/* ✅ Preview grid */}
          {variantImagePreviews[variantIndex]?.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7 gap-2 mt-2">
              {variantImagePreviews[variantIndex].map((preview, idx) => (
                <div key={idx} className="relative group">
                  <img
                    src={preview}
                    alt={`Variant ${variantIndex + 1} Image ${idx + 1}`}
                    className="w-full h-20 object-cover rounded-md"
                  />
                  <button
                    type="button"
                    onClick={() => removeImage(idx)}
                    className="cursor-pointer absolute -top-1 -right-1 bg-destructive text-destructive-foreground rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </FormItem>
      )}
    />
  );
}
