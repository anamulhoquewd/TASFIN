import { useFieldArray } from "react-hook-form";
import axios from "axios";
import { PlusCircle, Trash2, Upload } from "lucide-react";

import { Button } from "@/components/ui/button";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { type ProductFormValues } from "@/lib/schemas";
import useCategories from "@/app/dashboard/categories/_hooks/useCategories";
import useProducts from "../_hooks/useProducts";
import useUploads from "../_hooks/useUploads";
import { useRef, useState } from "react";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import { cn } from "@/lib/utils";

export function ProductForm() {
  // State for image upload - now holds a FileList
  const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null);
  const [slug, setSlug] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { data: categories } = useCategories();

  const {
    form,
    imageFields,
    keywordFields,
    colorFields,
    appendImage,
    removeImage,
    appendColor,
    removeColor,
    appendKeyword,
    removeKeyword,
    setFilterByCategory,
    data,
  } = useProducts();

  // Use the new file upload hook
  const { uploadFiles, isLoading, data: urls } = useUploads();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedFiles(event.target.files); // Set the entire FileList
  };

  const handleUpload = async () => {
    if (!selectedFiles || selectedFiles.length === 0) {
      console.log({
        title: "No files selected",
        description: "Please choose one or more image files to upload.",
        variant: "destructive",
      });
      return;
    }

    const filesArray = Array.from(selectedFiles); // Convert FileList to array for the hook
    const result = await uploadFiles(filesArray, slug);

    if (result?.success && result.urls && result.urls.length > 0) {
      result.urls.map((url: string, index: number) => {
        // Use the original file name for alt text if available, otherwise a generic one
        const altText =
          filesArray[index]?.name.split(".")[0] ||
          `Uploaded image ${index + 1}`;
        appendImage({ url: url, alt: altText });
      });
      console.log({
        title: "Upload Successful",
        description: `${result.urls.length} image(s) uploaded and added to product images.`,
      });
      setSelectedFiles(null); // Clear selected files
      if (fileInputRef.current) {
        fileInputRef.current.value = ""; // Clear file input visually
      }
    }
  };

  const onSubmit = async (values: ProductFormValues) => {
    try {
      const formData = new FormData();
      formData.append("title", values.title);
      formData.append("slug", values.slug);
      formData.append("description", values.description || "");
      formData.append("categories", values.categories);

      // ✅ multiple image handle
      for (let i = 0; i < (values.images as FileList).length; i++) {
        formData.append("images", (values.images as FileList)[i]);
      }

      const res = await axios.post("/api/products", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert("✅ Product created successfully!");
      console.log(res.data);
      form.reset();
    } catch (error: any) {
      console.error(error);
      alert(error?.response?.data?.message || "Failed to create product");
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {/* Basic Product Details */}
        <div className="grid gap-4 md:grid-cols-2 items-start">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="cursor-pointer">Product Name</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., Wireless Headphones" {...field} />
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
                <FormLabel className="cursor-pointer">Product Slug</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., wireless-headphones" {...field} />
                </FormControl>
                <FormDescription>
                  Unique identifier (lowercase, alphanumeric, hyphen-separated).
                </FormDescription>
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
              <FormLabel className="cursor-pointer">Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Detailed description of the product..."
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid gap-4 md:grid-cols-2 items-start">
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="cursor-pointer">Price</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="0.00"
                    {...field}
                    value={String(field.value || "")}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="cursor-pointer">Category</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {categories !== null &&
                      categories.map((category) => (
                        <SelectItem key={category._id} value={category._id}>
                          {category.name}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Separator />

        {/* Image Upload Section */}
        <div>
          <h3 className="mb-4 text-lg font-medium">Upload New Image(s)</h3>
          <div className="flex flex-col sm:flex-row gap-4 items-end">
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label className="cursor-pointer" htmlFor="picture">
                Image File(s)
              </Label>
              <Input
                id="picture"
                type="file"
                multiple
                onChange={handleFileChange}
                ref={fileInputRef}
              />

              {selectedFiles && selectedFiles.length > 0 && (
                <p className="text-sm text-muted-foreground mt-1">
                  Selected:{" "}
                  {Array.from(selectedFiles)
                    .map((f) => f.name)
                    .join(", ")}
                </p>
              )}
            </div>
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label className="cursor-pointer" htmlFor="slug">
                Image slug
              </Label>
              <Input
                id="slug"
                multiple
                onChange={(e) => setSlug(e.target.value)}
                placeholder="t-shirts"
              />
            </div>
            <Button
              className="cursor-pointer"
              onClick={handleUpload}
              type="button"
              disabled={
                !selectedFiles ||
                selectedFiles.length === 0 ||
                isLoading ||
                !slug
              }
            >
              {isLoading ? (
                <>
                  <span className="animate-spin mr-2">🌀</span> Uploading...
                </>
              ) : (
                <>
                  <Upload className="mr-2 h-4 w-4" /> Upload Image(s)
                </>
              )}
            </Button>
          </div>
        </div>

        <Separator />

        {/* Existing Images Section */}
        <div>
          <h3 className="mb-4 text-lg font-medium">
            Product Images (Manage Existing)
          </h3>
          {imageFields.length === 0 && (
            <p className="text-sm text-muted-foreground">
              No images added yet. Upload one above or add manually.
            </p>
          )}
          {imageFields.map((item, index) => (
            <div
              key={item.id}
              className="mb-4 grid gap-4 md:grid-cols-[auto_1fr_1fr_auto] items-end"
            >
              {/* Image Preview */}
              <div className="flex items-center justify-center h-16 w-16 rounded-md overflow-hidden border bg-muted">
                {item.url ? (
                  <Image
                    src={item.url || "/placeholder.svg"}
                    alt={item.alt || "Product image"}
                    width={64}
                    height={64}
                    className="object-cover"
                  />
                ) : (
                  <span className="text-xs text-muted-foreground text-center p-1">
                    No Image
                  </span>
                )}
              </div>
              <FormField
                control={form.control}
                name={`images.${index}.url`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel
                      className={cn(
                        "cursor-pointer",
                        index === 0 ? "block" : "sr-only"
                      )}
                    >
                      Image URL
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="https://example.com/image.jpg"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name={`images.${index}.alt`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel
                      className={cn(
                        "cursor-pointer",
                        index === 0 ? "block" : "sr-only"
                      )}
                    >
                      Alt Text
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="Description of image" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                type="button"
                variant="destructive"
                size="icon"
                onClick={() => removeImage(index)}
                className={
                  imageFields.length === 1
                    ? "opacity-50 cursor-not-allowed"
                    : "cursor-pointer"
                }
                disabled={imageFields.length === 1}
              >
                <Trash2 className="h-4 w-4" />
                <span className="sr-only">Remove image</span>
              </Button>
            </div>
          ))}
          <Button
            className="cursor-pointer"
            type="button"
            variant="outline"
            onClick={() => appendImage({ alt: "", url: "" })}
          >
            <PlusCircle className="mr-2 h-4 w-4" /> Add Image Manually
          </Button>
        </div>

        <Separator />

        {/* Keys Section */}
        <div>
          <h3 className="mb-4 text-lg font-medium">
            Product Keywords/Tags (Optional)
          </h3>
          {keywordFields.map((item, index) => (
            <div key={item.id} className="mb-4 flex gap-2 items-end">
              <FormField
                control={form.control}
                name={`keywords.${index}.value`}
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel
                      className={cn(
                        "cursor-pointer",
                        index === 0 ? "block" : "sr-only"
                      )}
                    >
                      Keyword
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., bluetooth" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                className="cursor-pointer"
                type="button"
                variant="destructive"
                size="icon"
                onClick={() => removeKeyword(index)}
              >
                <Trash2 className="h-4 w-4" />
                <span className="sr-only">Remove keyword</span>
              </Button>
            </div>
          ))}
          <Button
            className="cursor-pointer"
            type="button"
            variant="outline"
            onClick={() => appendKeyword({ value: "" })}
          >
            <PlusCircle className="mr-2 h-4 w-4" /> Add Keyword
          </Button>
        </div>

        <Separator />

        {/* Colors and Sizes Section */}
        <div>
          <h3 className="mb-4 text-lg font-medium">Product Colors & Sizes</h3>
          {colorFields.map((colorItem, colorIndex) => (
            <div key={colorItem.id} className="mb-8 rounded-md border p-4">
              <div className="flex items-center justify-between mb-4">
                <h4 className="font-semibold">Color #{colorIndex + 1}</h4>
                <Button
                  type="button"
                  variant="destructive"
                  size="sm"
                  onClick={() => removeColor(colorIndex)}
                  className={cn(
                    colorFields.length === 1
                      ? "opacity-50 cursor-not-allowed"
                      : "cursor-pointer"
                  )}
                  disabled={colorFields.length === 1}
                >
                  <Trash2 className="mr-2 h-4 w-4" /> Remove Color
                </Button>
              </div>

              <div className="grid gap-4 md:grid-cols-2 mb-4 items-start">
                <FormField
                  control={form.control}
                  name={`colors.${colorIndex}.name`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="cursor-pointer">
                        Color Name
                      </FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., Black" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name={`colors.${colorIndex}.inStock`}
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel className="cursor-pointer">
                          In Stock
                        </FormLabel>
                        <FormDescription>
                          Is this color currently in stock?
                        </FormDescription>
                      </div>
                    </FormItem>
                  )}
                />
              </div>

              <h5 className="mb-3 text-md font-medium">
                Sizes for{" "}
                {form.watch(`colors.${colorIndex}.name`) ||
                  `Color #${colorIndex + 1}`}
              </h5>
              <div className="ml-4 border-l pl-4">
                <SizesFieldArray
                  colorIndex={colorIndex}
                  control={form.control}
                />
              </div>
            </div>
          ))}
          <Button
            className="cursor-pointer"
            type="button"
            variant="outline"
            onClick={() =>
              appendColor({
                name: "",
                inStock: true,
                sizes: [{ name: "S", inStock: true, quantity: 0 }],
              })
            }
          >
            <PlusCircle className="mr-2 h-4 w-4" /> Add Color
          </Button>
        </div>

        <Button className="cursor-pointer" type="submit" disabled={isLoading}>
          {isLoading ? "Creating..." : "Create Product"}
        </Button>
      </form>
    </Form>
  );
}

// Helper component for nested sizes array
function SizesFieldArray({
  colorIndex,
  control,
}: {
  colorIndex: number;
  control: any;
}) {
  const {
    fields: sizeFields,
    append: appendSize,
    remove: removeSize,
  } = useFieldArray({
    control,
    name: `colors.${colorIndex}.sizes`,
  });

  return (
    <div className="space-y-4">
      {sizeFields.map((sizeItem, sizeIndex) => (
        <div
          key={sizeItem.id}
          className="grid gap-4 md:grid-cols-[1fr_auto_auto_auto] items-start"
        >
          <FormField
            control={control}
            name={`colors.${colorIndex}.sizes.${sizeIndex}.name`}
            render={({ field }) => (
              <FormItem>
                <FormLabel
                  className={cn(
                    "cursor-pointer",
                    sizeIndex === 0 ? "block" : "sr-only"
                  )}
                >
                  Size Name
                </FormLabel>
                <FormControl>
                  <Input placeholder="e.g., M, XL" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name={`colors.${colorIndex}.sizes.${sizeIndex}.quantity`}
            render={({ field }) => (
              <FormItem>
                <FormLabel
                  className={cn(
                    "cursor-pointer",
                    sizeIndex === 0 ? "block" : "sr-only"
                  )}
                >
                  Quantity
                </FormLabel>
                <FormControl>
                  <Input type="number" placeholder="0" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name={`colors.${colorIndex}.sizes.${sizeIndex}.inStock`}
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-2 space-y-0 rounded-md border p-2 shadow">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel className="cursor-pointer">In Stock</FormLabel>
                  <FormDescription className="sr-only">
                    Is this size in stock?
                  </FormDescription>
                </div>
              </FormItem>
            )}
          />
          <Button
            type="button"
            variant="destructive"
            size="icon"
            onClick={() => removeSize(sizeIndex)}
            className={
              sizeFields.length === 1
                ? "opacity-50 cursor-not-allowed"
                : "cursor-pointer"
            }
            disabled={sizeFields.length === 1}
          >
            <Trash2 className="h-4 w-4" />
            <span className="sr-only">Remove size</span>
          </Button>
        </div>
      ))}
      <Button
        className="cursor-pointer"
        type="button"
        variant="secondary"
        onClick={() => appendSize({ name: "", inStock: true, quantity: 0 })}
      >
        <PlusCircle className="mr-2 h-4 w-4" /> Add Size
      </Button>
    </div>
  );
}
