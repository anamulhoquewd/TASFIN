import { Wallet } from "lucide-react";
import Link from "next/link";
import React from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Separator } from "../ui/separator";
import { priceFormatting } from "@/lib/utils";
import { Button } from "../ui/button";
import { UseFormReturn } from "react-hook-form";
import { CheckoutFormValues } from "@/lib/zod-validation";
import Image from "next/image";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "../ui/breadcrumb";
import { Badge } from "../ui/badge";
import { ICartItem } from "@/interfaces/context";

interface CheckoutProps {
  form: UseFormReturn<CheckoutFormValues>;
  handleSubmit: (data: any) => void;
  items: ICartItem[];
  isProcessing: boolean;
  totalItems: number;
  subtotal: number;
  total: number;
  shippingFee: number;
}

function Checkout({
  form,
  handleSubmit,
  items,
  isProcessing,
  totalItems,
  subtotal,
  total,
  shippingFee,
}: CheckoutProps) {
  return (
    <div className="container mx-auto px-4 py-8">
      <header className="pb-">
        <Breadcrumb>
          <BreadcrumbList className="font-cormorant">
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="/">Home</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator>/</BreadcrumbSeparator>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="/shop">Shop</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator>/</BreadcrumbSeparator>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="/cart">Cart</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator>/</BreadcrumbSeparator>
            <BreadcrumbItem>
              <BreadcrumbPage>Checkout</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <h2 className="font-cormorant text-3xl py-4 sm:text-4xl font-light tracking-wide text-foreground">
          Checkout
        </h2>
      </header>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Checkout Form */}
            <div className="space-y-6">
              {/* Contact Information */}
              <Card className="rounded-none">
                <CardHeader>
                  <CardTitle className="text-2xl font-cormorant">
                    Contact
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Full Name *</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter your full name"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-start">
                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Phone Number *</FormLabel>
                          <FormControl>
                            <Input placeholder="01XXXXXXXXX" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter your email" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Shipping Address */}
              <Card className="rounded-none">
                <CardHeader>
                  <CardTitle className="text-2xl font-cormorant">
                    Shipping Address
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <FormField
                    control={form.control}
                    name="address.street"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Street Address *</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="House/Flat, Road, Area"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="address.city"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>City *</FormLabel>
                          <FormControl>
                            <Input placeholder="Dhaka" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="address.state"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>State</FormLabel>
                          <FormControl>
                            <Input placeholder="Gulshan" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Payment Method */}
              <Card className="rounded-none">
                <CardHeader>
                  <CardTitle className="text-2xl font-cormorant">
                    Payment Method
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <FormField
                    control={form.control}
                    name="paymentMethod"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            value={field.value}
                            className="space-y-3"
                          >
                            <div className="flex items-center space-x-3 border rounded-lg p-4 hover:bg-muted/50 transition-colors">
                              <RadioGroupItem value="cod" id="cod" />
                              <label
                                htmlFor="cod"
                                className="flex items-center gap-3 cursor-pointer flex-1"
                              >
                                <Wallet className="h-5 w-5 text-muted-foreground" />
                                <div>
                                  <p className="font-medium">
                                    Cash on Delivery
                                  </p>
                                  <p className="text-sm text-muted-foreground">
                                    Pay when you receive your order
                                  </p>
                                </div>
                              </label>
                            </div>
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>
            </div>

            {/* Order Summary */}
            <div>
              <Card className="sticky top-24 rounded-none">
                <CardHeader>
                  <CardTitle className="text-2xl font-cormorant">
                    Order Summary
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3 max-h-64 overflow-y-auto">
                    {items.map((item: ICartItem) => (
                      <div
                        key={`${item.productId}-${item.variantId}`}
                        className="flex gap-4"
                      >
                        <div className="max-w-16 relative aspect-[3/4] rounded-md border">
                          <Image
                            width={1200}
                            height={1600}
                            src={item.image.url}
                            alt={item.image.alt || item.title}
                            className="w-full h-full object-cover"
                          />
                          <Badge className="absolute right-0 top-0 rounded-full">
                            {item.quantity}
                          </Badge>
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium">{item.title}</p>
                          <p className="text-xs text-muted-foreground">
                            Size: {item.size}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            Qty: {item.quantity}
                          </p>
                        </div>
                        <p className="text-sm font-semibold">
                          {priceFormatting(item.price * item.quantity)}
                        </p>
                      </div>
                    ))}
                  </div>

                  <Separator />

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">
                        Subtotal ({totalItems} items)
                      </span>
                      <span className="font-medium">
                        {priceFormatting(subtotal)}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">
                        Shipping Fee
                      </span>
                      <span className="font-medium">
                        {shippingFee === 0
                          ? "FREE"
                          : priceFormatting(shippingFee)}
                      </span>
                    </div>
                  </div>

                  <Separator />

                  <div className="flex justify-between">
                    <span className="font-semibold">Total</span>
                    <span className="font-bold text-xl">
                      {priceFormatting(total)}
                    </span>
                  </div>

                  <Button
                    type="submit"
                    size="lg"
                    className="w-full font-cormorant uppercase rounded-none cursor-pointer"
                    disabled={isProcessing}
                  >
                    {isProcessing ? "Processing..." : "Place an order"}
                  </Button>
                  <Link href={"/cart"}>
                    <Button
                      type="button"
                      size="lg"
                      variant={"link"}
                      className="w-full font-cormorant uppercase rounded-none cursor-pointer"
                      disabled={isProcessing}
                    >
                      Edit Cart
                    </Button>
                  </Link>

                  <p className="text-xs text-center text-muted-foreground">
                    By placing your order, you agree to our{" "}
                    <Link
                      href="/terms"
                      className="underline hover:text-foreground"
                    >
                      Terms & Conditions
                    </Link>
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
}

export default Checkout;
