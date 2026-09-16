'use client'

import { useEffect, useState } from 'react'
import axios from 'axios'
import { Product } from '@/lib/validation'
import Navbar from '@/components/navbar'
import HeroSection from '@/components/sections/hero'
import TrustSection from '@/components/sections/trust'
import ProductShowcase from '@/components/sections/product-showcase'
import BusinessTerms from '@/components/sections/business-terms'
import FAQSection from '@/components/sections/faq'
import InquiryForm from '@/components/sections/inquiry-form'
import Footer from '@/components/footer'
import FloatingWhatsApp from '@/components/floating-whatsapp'
import { Toaster } from 'sonner'

export default function Page() {
  const [products, setProducts] = useState<Product[]>([])
  const [productsLoading, setProductsLoading] = useState(true)
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('/api/kids/v1/products')
        setProducts(response.data)
      } catch (error) {
        console.error('[v0] Failed to fetch products:', error)
      } finally {
        setProductsLoading(false)
      }
    }

    fetchProducts()
  }, [])

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <HeroSection />
        <TrustSection />
        <ProductShowcase
          products={products}
          loading={productsLoading}
          onProductSelect={setSelectedProductId}
        />
        <BusinessTerms />
        <FAQSection />
        <InquiryForm products={products} selectedProductId={selectedProductId} />
      </main>
      <Footer />
      <FloatingWhatsApp />
      <Toaster />
    </div>
  )
}
