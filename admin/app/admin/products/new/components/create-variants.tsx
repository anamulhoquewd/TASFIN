import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { TVariant } from "@/lib/schemas";
import { generateSKU } from "@/lib/utils";
import { Plus, Trash2 } from "lucide-react";
import { useEffect } from "react";
import { useWatch } from "react-hook-form";

interface ICreateVariants {
  form: any;
  handleVariantImageUpload: any;
  append: any;
  remove: any;
  removeVariantImage: any;
  variantImagePreviews: any;
  fields: any;
}

function CreateVariants({ form, append, remove, fields }: ICreateVariants) {
  const variants: TVariant[] = useWatch({
    control: form.control,
    name: "variants",
  });

  useEffect(() => {
    if (!variants || variants.length === 0) return;

    variants.forEach((variant, index) => {
      if (!variant?.size || !variant?.color) return;

      const sku = generateSKU({
        size: variant.size,
        color: variant.color,
      });

      const currentSku = form.getValues(`variants.${index}.sku`);

      if (sku && currentSku !== sku) {
        form.setValue(`variants.${index}.sku`, sku, {
          shouldValidate: true,
          shouldDirty: true,
        });
      }
    });
  }, [variants]);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          Product Variants
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() =>
              append({
                size: "",
                stock: 0,
                price: 0,
                images: [],
              })
            }
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Variant
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {fields.map((field: any, index: number) => (
            <div key={field.id} className="p-4 border border-border rounded-lg">
              <div className="flex items-center justify-between mb-4">
                <h4 className="font-medium">Variant {index + 1}</h4>
                {fields.length > 1 && (
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => remove(index)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <FormField
                  control={form.control}
                  name={`variants.${index}.size`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Size</FormLabel>
                      <FormControl>
                        <Input placeholder="S, M, L, XL" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name={`variants.${index}.color`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Color</FormLabel>
                      <FormControl>
                        <Input placeholder="Whait, Black, Blue" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name={`variants.${index}.sku`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>SKU</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          disabled
                          className="Auto-generated SKU"
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name={`variants.${index}.stock`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Stock</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          min="0"
                          {...field}
                          placeholder="100"
                          onChange={(e) =>
                            field.onChange(Number.parseInt(e.target.value))
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name={`variants.${index}.price`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Price</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          min="0"
                          {...field}
                          placeholder="100"
                          onChange={(e) =>
                            field.onChange(Number.parseFloat(e.target.value))
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <FormLabel>Variant Images</FormLabel>
                  <label className="flex items-center gap-2 px-3 py-2 text-sm border border-border rounded-md cursor-pointer hover:bg-muted/50">
                    <Upload className="w-4 h-4" />
                    Upload Images
                    <input
                      type="file"
                      className="hidden"
                      multiple
                      accept="image/*"
                      onChange={(e) => handleVariantImageUpload(index, e)}
                    />
                  </label>
                </div>

                {variantImagePreviews[index] &&
                  variantImagePreviews[index].length > 0 && (
                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7 gap-2">
                      {variantImagePreviews[index].map(
                        (preview: string, imageIndex: number) => (
                          <div key={imageIndex} className="relative group">
                            <Image
                              src={preview || "/placeholder.svg"}
                              alt={`Variant ${index + 1} Image ${
                                imageIndex + 1
                              }`}
                              width={500}
                              height={500}
                              className="w-full h-20 object-cover rounded-md"
                            />
                            <button
                              type="button"
                              onClick={() =>
                                removeVariantImage(index, imageIndex)
                              }
                              className="cursor-pointer absolute -top-1 -right-1 bg-destructive text-destructive-foreground rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                              <X className="w-3 h-3" />
                            </button>
                          </div>
                        )
                      )}
                    </div>
                  )}
              </div> */}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

export default CreateVariants;
