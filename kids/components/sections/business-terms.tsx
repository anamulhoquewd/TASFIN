'use client'

import { Card } from '@/components/ui/card'
import {
  Package,
  Shirt,
  Zap,
  Calendar,
  CreditCard,
  Ship,
  RotateCcw,
} from 'lucide-react'

const termsData = [
  {
    icon: Package,
    title: 'MOQ',
    description: 'Minimum Order Quantity varies by product. Check details on product cards.',
  },
  {
    icon: Shirt,
    title: 'Fabric Sourcing',
    description: 'Premium, certified fabrics sourced for comfort, durability, and style.',
  },
  {
    icon: Zap,
    title: 'Sample Policy',
    description: 'Custom samples available. Discuss terms with our sales team.',
  },
  {
    icon: Calendar,
    title: 'Production Time',
    description: 'Typically 2-4 weeks from order confirmation. Rush orders available.',
  },
  {
    icon: CreditCard,
    title: 'Payment Terms',
    description: 'Flexible options: 50% advance, 50% before shipment. Bank transfer preferred.',
  },
  {
    icon: Ship,
    title: 'Shipping',
    description: 'FOB Bangladesh or CIF to your port. We assist with logistics.',
  },
  {
    icon: RotateCcw,
    title: 'Returns & Exchange',
    description: 'Quality guarantee. Defective items exchanged within 14 days.',
  },
]

export default function BusinessTerms() {
  return (
    <section id="terms" className="py-16 md:py-24 bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Business Terms & Policies
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Clear, transparent terms designed to make wholesale partnerships simple and fair.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {termsData.map((term, index) => {
            const Icon = term.icon
            return (
              <Card
                key={index}
                className="p-6 border border-border hover:border-primary/50 transition-colors duration-300"
              >
                <div className="flex flex-col gap-3">
                  <div className="w-10 h-10 rounded-lg bg-linear-to-br flex items-center justify-center">
                    <Icon className="size-5 text-primary" />
                  </div>
                  <h3 className="font-semibold text-foreground text-sm md:text-base">
                    {term.title}
                  </h3>
                  <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">
                    {term.description}
                  </p>
                </div>
              </Card>
            )
          })}
        </div>

        <div className="mt-12 p-6 md:p-8 bg-muted/50 rounded-2xl border border-border">
          <p className="text-muted-foreground text-center">
            Have specific questions about payment methods, customization, or bulk orders?
            <br />
            <strong className="text-foreground">
              Reach out via the inquiry form below or WhatsApp for personalized guidance.
            </strong>
          </p>
        </div>
      </div>
    </section>
  )
}
