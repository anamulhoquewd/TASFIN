"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqData = [
  {
    question: "What is the minimum order quantity (MOQ)?",
    answer:
      "MOQ varies by product, typically ranging from 50-200 pieces per style. Check the specific product details on our showcase, or contact us for custom arrangements.",
  },
  {
    question: "Do you provide samples before bulk orders?",
    answer:
      "Yes, we provide custom samples. Sample costs and shipping are negotiable based on order volume. Contact our team to arrange samples.",
  },
  {
    question: "What are the typical production and delivery times?",
    answer:
      "Standard production time is 2-4 weeks from order confirmation. Delivery depends on your location in Pakistan and shipping method (standard or express). Rush orders are available with surcharges.",
  },
  {
    question: "What payment methods do you accept?",
    answer:
      "We primarily accept bank transfers. Standard terms are 50% advance and 50% before shipment. Discuss alternative arrangements during the inquiry process.",
  },
  {
    question: "Can I customize designs or colors?",
    answer:
      "Yes, customization is available for bulk orders. Discuss your requirements during the inquiry—custom color palettes, fabric modifications, and design tweaks are possible.",
  },
  {
    question: "What is your return or exchange policy?",
    answer:
      "We guarantee quality. Defective items can be exchanged within 14 days of delivery, provided they are unused and in original packaging. Standard wear and tear is not covered.",
  },
];

export default function FAQSection() {
  return (
    <section id="faq" className="py-16 md:py-24 bg-muted/30">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-muted-foreground">
            Find answers to common questions about our wholesale process.
          </p>
        </div>

        <Accordion className="space-y-4">
          {faqData.map((item, index) => (
            <AccordionItem
              key={index}
              value={`item-${index}`}
              className="border border-border rounded-lg px-4 md:px-6 data-[state=open]:bg-muted/50 transition-colors duration-300"
            >
              <AccordionTrigger className="text-left font-semibold text-foreground hover:text-primary transition-colors py-4">
                {item.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground pb-4 pt-0">
                {item.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        <div className="mt-12 text-center">
          <p className="text-muted-foreground mb-4">
            Didn&apos;t find your answer?
          </p>
          <button
            onClick={() => {
              const element = document.querySelector("#inquiry");
              if (element) {
                element.scrollIntoView({ behavior: "smooth" });
              }
            }}
            className="text-primary font-semibold hover:underline transition-all"
          >
            Send us a message below →
          </button>
        </div>
      </div>
    </section>
  );
}
