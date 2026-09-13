import api from "@/axios/interceptor";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
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
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Actions } from "../product-edit";
import {
  DiscountInput,
  DiscountValues,
  discountZ,
  FormProps,
  reportError,
} from "./../helper";

export default function DiscountForm({ product, onClose }: FormProps) {
  const [loading, setLoading] = useState(false);
  const form = useForm<DiscountInput, any, DiscountValues>({
    resolver: zodResolver(discountZ),
    defaultValues: {
      discount: {
        discountType: "percentage",
        endAt: undefined,
        startAt: undefined,
        value: 0,
      },
    },
  });
  useEffect(
    () =>
      form.reset({
        discount: {
          discountType: product.discount?.discountType,
          endAt: product.discount?.endAt,
          startAt: product.discount?.startAt,
          value: product.discount?.value,
        },
      }),
    [form, product],
  );
  const submit = async (data: DiscountValues) => {
    setLoading(true);
    console.log("Data: ", data);
    try {
      const response = await api.patch(
        `/products/${product._id}/discount`,
        data,
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
              name="discount.discountType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Discount Type</FormLabel>
                  <FormControl>
                    <Select
                      name={field.name}
                      value={field.value}
                      onValueChange={field.onChange}
                    >
                      <SelectTrigger id="form-rhf-select-language">
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                      <SelectContent position="item-aligned">
                        <SelectItem value={"percentage"}>
                          Percentage (%)
                        </SelectItem>
                        <SelectItem value={"fixed"}>Fixed amount</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="discount.value"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Discount Value</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      min="0"
                      step="0.1"
                      {...field}
                      onChange={(event) =>
                        field.onChange(
                          Number.parseFloat(event.target.value) || 0,
                        )
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {/* Start Date */}
              <FormField
                control={form.control}
                name="discount.startAt"
                render={({ field }) => {
                  const date = field.value ? new Date(field.value) : undefined;

                  return (
                    <FormItem>
                      <FormLabel>Start Date</FormLabel>

                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant="outline"
                              className="w-full justify-start font-normal"
                            >
                              {date
                                ? date.toLocaleDateString()
                                : "Select start date"}
                            </Button>
                          </FormControl>
                        </PopoverTrigger>

                        <PopoverContent
                          className="w-auto overflow-hidden p-0"
                          align="start"
                        >
                          <Calendar
                            mode="single"
                            selected={date}
                            defaultMonth={date}
                            captionLayout="dropdown"
                            onSelect={(selectedDate) => {
                              field.onChange(selectedDate);
                            }}
                          />
                        </PopoverContent>
                      </Popover>

                      <FormMessage />
                    </FormItem>
                  );
                }}
              />

              {/* End Date */}
              <FormField
                control={form.control}
                name="discount.endAt"
                render={({ field }) => {
                  const date = field.value ? new Date(field.value) : undefined;

                  return (
                    <FormItem>
                      <FormLabel>End Date</FormLabel>

                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant="outline"
                              className="w-full justify-start font-normal"
                            >
                              {date
                                ? date.toLocaleDateString()
                                : "Select end date"}
                            </Button>
                          </FormControl>
                        </PopoverTrigger>

                        <PopoverContent
                          className="w-auto overflow-hidden p-0"
                          align="start"
                        >
                          <Calendar
                            mode="single"
                            selected={date}
                            defaultMonth={date}
                            captionLayout="dropdown"
                            onSelect={(selectedDate) => {
                              field.onChange(selectedDate);
                            }}
                          />
                        </PopoverContent>
                      </Popover>

                      <FormMessage />
                    </FormItem>
                  );
                }}
              />
            </div>
          </CardContent>
        </Card>

        <Actions onClose={onClose} loading={loading} label="Update discount" />
      </form>
    </Form>
  );
}
