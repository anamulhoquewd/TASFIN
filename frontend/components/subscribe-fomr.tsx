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
        className={"flex flex-col gap-2"}
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormControl>
                <Input
                  type="email"
                  className="rounded-none tracking-[0.05em] placeholder:tracking-[0.05em]"
                  placeholder="Enter your email"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          disabled={isLoading}
          className="w-full px-4 py-2.5 text-xs tracking-[0.15em] uppercase transition-colors cursor-pointer rounded-none duration-300 bg-primary text-primary-foreground hover:bg-primary/90"
        >
          {isLoading ? "Subscribing..." : "Subscribe"}
        </Button>
      </form>
    </Form>
  );
};

export default SubscribeForm;
