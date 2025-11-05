"use client";

import { Card, CardContent } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Link from "next/link";

const FREE_SHIPPING_START_FROM = process.env
  .NEXT_PUBLIC_FREE_SHIPPING_START_FROM as string;
export default function FAQPage() {
  const faqs = [
    {
      question: "How do I place an order?",
      answer:
        "Browse our products, select your desired items with size preferences, add them to your cart, and proceed to checkout. Fill in your shipping information and choose your preferred payment method to complete your order.",
    },
    {
      question: "What payment methods do you accept?",
      answer:
        "We accept Cash on Delivery (COD), Bkash, and Bank Transfer. Choose your preferred payment method during checkout.",
    },
    {
      question: "How long does shipping take?",
      answer:
        "We typically dispatch orders within 2-3 business days. Delivery usually takes 3-5 business days depending on your location. You'll receive tracking information once your order ships.",
    },
    {
      question: "Do you offer free shipping?",
      answer: `Yes! We offer free shipping on all orders above BDT ${Number(
        FREE_SHIPPING_START_FROM
      )}. For orders below this amount, a standard shipping fee of ৳100 applies.`,
    },
    {
      question: "What is your return policy?",
      answer:
        "We accept returns within 7 days of delivery for unused items in original condition with tags attached. Please contact our customer support to initiate a return. Note that customers are responsible for return shipping costs unless the item is defective.",
    },
    {
      question: "How do I know which size to order?",
      answer:
        "Each product page includes size information. We recommend checking the measurements carefully. If you're between sizes, we suggest ordering the larger size for a more comfortable fit. Contact us if you need sizing assistance.",
    },
    {
      question: "Can I exchange an item?",
      answer:
        "Yes, we accept exchanges within 7 days of delivery. The item must be unused and in original condition. Contact our customer support team to arrange an exchange.",
    },
    {
      question: "How can I track my order?",
      answer:
        "Once your order ships, you'll receive a confirmation email with tracking information. You can use this to track your package's delivery status.",
    },
    {
      question: "What if I receive a damaged or incorrect item?",
      answer:
        "We're sorry if this happens! Please contact us immediately with photos of the item and your order number. We'll arrange a replacement or refund as quickly as possible.",
    },
    {
      question: "Do you restock sold-out items?",
      answer:
        "We try to restock popular items when possible. You can contact us to inquire about specific products, or check back regularly as we update our inventory frequently.",
    },
    // {
    //   question: "How do I care for my TASFIN garments?",
    //   answer:
    //     "Care instructions are included with each item. Generally, we recommend gentle machine wash or hand wash in cold water, and air drying to maintain the quality and longevity of your garments.",
    // },
    {
      question: "Can I cancel or modify my order?",
      answer:
        "You can cancel or modify your order within 24 hours of placing it by contacting our customer support. Once the order has been dispatched, we cannot make changes.",
    },
  ];

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-lg text-muted-foreground">
            Find answers to common questions about shopping with TASFIN
          </p>
        </div>

        <Card className="border-border">
          <CardContent className="p-6 md:p-8">
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="cursor-pointer text-left font-semibold text-foreground hover:text-primary">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground leading-relaxed">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </CardContent>
        </Card>

        <Card className="border-border bg-muted/30 mt-8">
          <CardContent className="p-6 text-center">
            <h3 className="font-semibold text-foreground mb-2">
              Still have questions?
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
              Can't find the answer you're looking for? Our customer support
              team is here to help.
            </p>
            <Link
              href="/support"
              className="text-sm font-medium text-primary hover:underline"
            >
              Support Support →
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
