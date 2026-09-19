"use client";

import Footer from "@/components/footer";
import FloatingWhatsApp from "@/components/floating-whatsapp";
import Navbar from "@/components/navbar";
import BusinessTerms from "@/components/sections/business-terms";
import FAQSection from "@/components/sections/faq";
import HeroSection from "@/components/sections/hero";
import InquiryForm from "@/components/sections/inquiry-form";
import ProductShowcase from "@/components/sections/product-showcase";
import TrustSection from "@/components/sections/trust";
import { useKidsCatalog } from "@/hooks/useKidsCatalog";
import { useState } from "react";
import { Toaster } from "sonner";

export default function Page() {
  const { products, loading } = useKidsCatalog();
  const [selectedProductId, setSelectedProductId] = useState<string | null>(
    null,
  );

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <HeroSection />
        <TrustSection />
        <ProductShowcase
          products={products}
          loading={loading}
          onProductSelect={setSelectedProductId}
        />
        <BusinessTerms />
        <FAQSection />
        <InquiryForm
          products={products}
          selectedProductId={selectedProductId}
        />
      </main>
      <Footer />
      <FloatingWhatsApp />
      <Toaster />
    </div>
  );
}
