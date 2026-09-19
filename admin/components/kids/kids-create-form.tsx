"use client";

import { ChipInput } from "@/components/chip-input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ImagePlus, X } from "lucide-react";
import Image from "next/image";
import { toast } from "sonner";

export function KidsCreateForm({ form, onSubmit }: { form: any; onSubmit: (data: any) => void }) {
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="space-y-6 lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Basic Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-5">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Product name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter kids product name" {...field} />
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
                        <Textarea placeholder="Describe this product" {...field} />
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
                <CardTitle>Product Images</CardTitle>
              </CardHeader>
              <CardContent>
                <FormField
                  control={form.control}
                  name="images"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <label className="flex min-h-32 cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-border px-4 py-6 text-center hover:bg-muted/50">
                          <ImagePlus className="mb-2 h-8 w-8 text-muted-foreground" />
                          <span className="text-sm font-medium">Upload product images</span>
                          <span className="mt-1 text-xs text-muted-foreground">JPEG, PNG or WebP, up to 5MB each</span>
                          <Input
                            type="file"
                            accept="image/jpeg,image/png,image/webp"
                            multiple
                            className="hidden"
                            onChange={(event) => {
                              const files = Array.from(event.target.files ?? []);
                              const validFiles = files.filter((file) => {
                                if (file.size > 5 * 1024 * 1024) {
                                  toast.error(`${file.name} is larger than 5MB`);
                                  return false;
                                }
                                return true;
                              });
                              field.onChange([...(field.value ?? []), ...validFiles]);
                              event.target.value = "";
                            }}
                          />
                        </label>
                      </FormControl>
                      <FormDescription>{field.value?.length ?? 0} image(s) selected</FormDescription>
                      <FormMessage />
                      {!!field.value?.length && (
                        <div className="grid grid-cols-2 gap-3 pt-2 sm:grid-cols-4">
                          {field.value.map((file: File, index: number) => (
                            <div key={`${file.name}-${file.lastModified}-${index}`} className="group relative overflow-hidden rounded-md border">
                              <Image
                                src={URL.createObjectURL(file)}
                                alt={file.name}
                                width={240}
                                height={240}
                                className="aspect-square w-full object-cover"
                              />
                              <button
                                type="button"
                                aria-label={`Remove ${file.name}`}
                                className="absolute right-1 top-1 rounded-full bg-destructive p-1 text-destructive-foreground opacity-0 transition-opacity group-hover:opacity-100"
                                onClick={() => field.onChange(field.value.filter((_: File, itemIndex: number) => itemIndex !== index))}
                              >
                                <X className="h-3 w-3" />
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Inventory and Pricing</CardTitle>
              </CardHeader>
              <CardContent className="space-y-5">
                <FormField
                  control={form.control}
                  name="moq"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Minimum order quantity</FormLabel>
                      <FormControl><Input type="number" min="0" {...field} onChange={(event) => field.onChange(event.target.valueAsNumber || 0)} /></FormControl>
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
                        <FormControl><Input type="number" min="0" step="0.01" {...field} onChange={(event) => field.onChange(event.target.valueAsNumber || 0)} /></FormControl>
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
                        <FormControl><Input type="number" min="0" step="0.01" {...field} onChange={(event) => field.onChange(event.target.valueAsNumber || 0)} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader><CardTitle>Options</CardTitle></CardHeader>
              <CardContent className="space-y-5">
                <FormField
                  control={form.control}
                  name="sizes"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Sizes</FormLabel>
                      <FormControl><ChipInput value={field.value ?? []} onChange={field.onChange} placeholder="Add a size" /></FormControl>
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
                      <FormControl><ChipInput value={field.value ?? []} onChange={field.onChange} placeholder="Add a color" /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="isActive"
                  render={({ field }) => (
                    <FormItem className="flex items-center gap-3 space-y-0">
                      <FormControl><Checkbox checked={field.value} onCheckedChange={(value) => field.onChange(value === true)} /></FormControl>
                      <FormLabel>Publish product as active</FormLabel>
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>
          </div>
        </div>
      </form>
    </Form>
  );
}
