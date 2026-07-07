import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ArrowDown, ArrowUp, Upload, X } from "lucide-react";
import Image from "next/image";
import { toast } from "sonner";

function UploadImages({ form }: any) {
  return (
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
                <div>
                  <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-border rounded-lg cursor-pointer hover:bg-muted/50">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <Upload className="w-8 h-8 mb-2 text-muted-foreground" />
                      <p className="text-sm text-muted-foreground">
                        Click to upload images
                      </p>
                    </div>
                    <Input
                      type="file"
                      className="hidden"
                      multiple
                      accept="image/*"
                      onChange={(e) => {
                        const newFiles = Array.from(e.target.files || []);
                        const existing = field.value || [];
                        // Duplicate check (name + size + lastModified)
                        const filtered = newFiles.filter(
                          (file) =>
                            !existing.some(
                              (f: File) =>
                                f.name === file.name &&
                                f.size === file.size &&
                                f.lastModified === file.lastModified
                            )
                        );
                        if (filtered.length === 0 && newFiles.length > 0) {
                          toast.warning("Duplicate images ignored", {
                            description:
                              "You tried to upload images that already exist.",
                          });
                        } else if (filtered.length < newFiles.length) {
                          toast.warning("Some duplicates ignored", {
                            description: "Only new images have been added.",
                          });
                        }
                        field.onChange([...existing, ...filtered]);
                      }}
                    />
                  </label>
                  {field.value?.length > 0 && (
                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 mt-4">
                      {field.value.map((file: File, index: number) => (
                        <div key={index} className="relative">
                          <Image
                            src={URL.createObjectURL(file)}
                            alt={`Preview ${index + 1}`}
                            width={500}
                            height={500}
                            className="w-full h-24 object-cover rounded-lg"
                          />
                          <button
                            type="button"
                            onClick={() =>
                              field.onChange(
                                field.value.filter(
                                  (_: any, i: number) => i !== index
                                )
                              )
                            }
                            className="cursor-pointer absolute -top-2 -right-2 bg-destructive text-destructive-foreground rounded-full p-1 "
                          >
                            <X className="w-3 h-3" />
                          </button>
                          <div className="absolute bottom-0 right-0 flex space-x-1 ">
                            <button
                              type="button"
                              disabled={index === 0}
                              onClick={() => {
                                if (index > 0) {
                                  const newArray = [...field.value];
                                  [newArray[index - 1], newArray[index]] = [
                                    newArray[index],
                                    newArray[index - 1],
                                  ];
                                  field.onChange(newArray);
                                }
                              }}
                              className="bg-secondary text-secondary-foreground rounded p-1 disabled:opacity-50 cursor-pointer"
                            >
                              <ArrowUp className="w-3 h-3" />
                            </button>
                            <button
                              type="button"
                              disabled={index === field.value.length - 1}
                              onClick={() => {
                                if (index < field.value.length - 1) {
                                  const newArray = [...field.value];
                                  [newArray[index + 1], newArray[index]] = [
                                    newArray[index],
                                    newArray[index + 1],
                                  ];
                                  field.onChange(newArray);
                                }
                              }}
                              className="bg-secondary text-secondary-foreground rounded p-1 disabled:opacity-50 cursor-pointer"
                            >
                              <ArrowDown className="w-3 h-3" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </CardContent>
    </Card>
  );
}

export default UploadImages;
