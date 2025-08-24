"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
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
import { categorySchema, type CategoryFormValues } from "@/lib/schemas";
import useCategories from "../_hooks/useCategories";

export function CategoryForm() {
  const { onSubmit, isLoading, form } = useCategories();

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category Name</FormLabel>
              <FormControl>
                <Input placeholder="e.g., Electronics" {...field} />
              </FormControl>
              <FormDescription>
                This is the display name for your category.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="slug"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category Slug</FormLabel>
              <FormControl>
                <Input placeholder="e.g., electronics" {...field} />
              </FormControl>
              <FormDescription>
                Unique identifier for the category (lowercase, alphanumeric,
                hyphen-separated).
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Creating..." : "Create Category"}
        </Button>
      </form>
    </Form>
  );
}
