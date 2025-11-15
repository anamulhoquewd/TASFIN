"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { SubscribeFormValues } from "@/lib/zod-validation";
import { cn } from "@/lib/utils";

const SubscribeForm = ({
  className,
  form,
  isLoading,
  handleSubscribe,
}: {
  className?: string;
  form: any;
  isLoading: boolean;
  handleSubscribe: (values: SubscribeFormValues) => void;
}) => {
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubscribe)}
        className={cn("flex flex-col sm:flex-row gap-2", className)}
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormControl>
                <Input type="email" placeholder="Enter your email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isLoading} className="cursor-pointer">
          {isLoading ? "Subscribing..." : "Subscribe"}
        </Button>
      </form>
    </Form>
  );
};

export default SubscribeForm;
