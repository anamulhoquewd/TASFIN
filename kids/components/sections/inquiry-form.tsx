'use client'

import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import api from "@/axios/interceptor";
import { Product, inquirySchema, type InquiryFormData } from "@/lib/validation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Card } from "@/components/ui/card";
import { Loader2 } from "lucide-react";

interface InquiryFormProps {
  products: Product[];
  selectedProductId: string | null;
}

export default function InquiryForm({
  products,
  selectedProductId,
}: InquiryFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    reset,
  } = useForm({
    resolver: zodResolver(inquirySchema),
    defaultValues: {
      fullName: "",
      shopName: "",
      city: "",
      phone: "",
      email: "",
      interestedProductIds: selectedProductId ? [selectedProductId] : [],
      estimatedQty: "",
      message: "",
    },
  });

  console.log("Errors:", errors);

  const interestedProductIds = watch("interestedProductIds") || [];

  // Update selected product when it changes
  useEffect(() => {
    if (selectedProductId) {
      if (!interestedProductIds.includes(selectedProductId)) {
        setValue(
          "interestedProductIds",
          [...interestedProductIds, selectedProductId],
          {
            shouldValidate: true,
          },
        );
      }
    }
  }, [selectedProductId, setValue, interestedProductIds]);

  const handleProductToggle = (productId: string) => {
    if (interestedProductIds.includes(productId)) {
      setValue(
        "interestedProductIds",
        interestedProductIds.filter((id) => id !== productId),
        { shouldValidate: true },
      );
    } else {
      setValue("interestedProductIds", [...interestedProductIds, productId], {
        shouldValidate: true,
      });
    }
  };

  const onSubmit = async (data: InquiryFormData) => {
    console.log("inquiry: ", data);
    setIsSubmitting(true);
    try {
      const response = await api.post("/kids/inquiry", {
        ...data,
        interestedProductIds: data.interestedProductIds,
      });

      if (response.data.success) {
        toast.success("Thank you! Our team will contact you within 24 hours.");
        reset({
          fullName: "",
          shopName: "",
          city: "",
          phone: "",
          email: "",
          interestedProductIds: [],
          estimatedQty: "",
          message: "",
        });
      }
    } catch (error) {
      console.error("Inquiry submission error:", error);
      toast.error("Failed to submit inquiry. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="inquiry" className="py-16 md:py-24 bg-background">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Ready to Partner With Us?
          </h2>
          <p className="text-lg text-muted-foreground">
            Send us an inquiry and our team will get back to you within 24
            hours.
          </p>
        </div>

        <Card className="p-8 border border-border">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Name and Shop Name */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Full Name <span className="text-destructive">*</span>
                </label>
                <Input
                  {...register("fullName")}
                  placeholder="Your full name"
                  className="rounded-lg"
                />
                {errors.fullName && (
                  <p className="text-sm text-destructive mt-1">
                    {errors.fullName.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Shop / Company Name{" "}
                  <span className="text-destructive">*</span>
                </label>
                <Input
                  {...register("shopName")}
                  placeholder="Your shop or company name"
                  className="rounded-lg"
                />
                {errors.shopName && (
                  <p className="text-sm text-destructive mt-1">
                    {errors.shopName.message}
                  </p>
                )}
              </div>
            </div>

            {/* City and Phone */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  City (Pakistan) <span className="text-destructive">*</span>
                </label>
                <Input
                  {...register("city")}
                  placeholder="Your city in Pakistan"
                  className="rounded-lg"
                />
                {errors.city && (
                  <p className="text-sm text-destructive mt-1">
                    {errors.city.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Phone / WhatsApp <span className="text-destructive">*</span>
                </label>
                <Input
                  {...register("phone")}
                  type="tel"
                  placeholder="+92 XXX XXXXXXX"
                  className="rounded-lg"
                />
                {errors.phone && (
                  <p className="text-sm text-destructive mt-1">
                    {errors.phone.message}
                  </p>
                )}
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Email Address
              </label>
              <Input
                {...register("email")}
                type="email"
                placeholder="your@email.com"
                className="rounded-lg"
              />
              {errors.email && (
                <p className="text-sm text-destructive mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Interested Products */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-3">
                Interested Products <span className="text-destructive">*</span>
              </label>
              <div className="space-y-3 bg-muted/30 p-4 rounded-lg border border-border">
                {products.length === 0 ? (
                  <p className="text-sm text-muted-foreground">
                    No products available. Please contact us directly.
                  </p>
                ) : (
                  products.map((product) => (
                    <div key={product._id} className="flex items-start gap-3">
                      <Checkbox
                        id={`product-${product._id}`}
                        checked={interestedProductIds.includes(product._id)}
                        onCheckedChange={() => handleProductToggle(product._id)}
                        className="mt-1"
                      />
                      <label
                        htmlFor={`product-${product._id}`}
                        className="text-sm text-foreground cursor-pointer flex-1"
                      >
                        <p className="font-medium">{product.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {product.fabric} • MOQ: {product.moq} pcs • $
                          {product.minPrice}-${product.maxPrice}/pc
                        </p>
                      </label>
                    </div>
                  ))
                )}
              </div>
              {errors.interestedProductIds && (
                <p className="text-sm text-destructive mt-2">
                  {errors.interestedProductIds.message}
                </p>
              )}
            </div>

            {/* Estimated Quantity */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Estimated Order Quantity
              </label>
              <Input
                {...register("estimatedQty")}
                placeholder="e.g., 500 pieces"
                className="rounded-lg"
              />
              {errors.estimatedQty && (
                <p className="text-sm text-destructive mt-1">
                  {errors.estimatedQty.message}
                </p>
              )}
            </div>

            {/* Message */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Message
              </label>
              <Textarea
                {...register("message")}
                placeholder="Any additional details or questions?"
                className="rounded-lg min-h-28 resize-none"
              />
              {errors.message && (
                <p className="text-sm text-destructive mt-1">
                  {errors.message.message}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full rounded-full h-12 text-base"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 size-4 animate-spin" />
                  Submitting...
                </>
              ) : (
                "Submit Inquiry"
              )}
            </Button>

            <p className="text-xs text-muted-foreground text-center">
              We respect your privacy. Your information will only be used to
              respond to your inquiry.
            </p>
          </form>
        </Card>
      </div>
    </section>
  );
}
