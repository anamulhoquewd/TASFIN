'use client'

import { Card } from '@/components/ui/card'
import {
  Award,
  Truck,
  Users,
  CheckCircle2,
} from 'lucide-react'

const trustStats = [
  {
    icon: Award,
    title: 'Years of Experience',
    description: 'Trusted export partner with a proven track record in wholesale fashion',
  },
  {
    icon: CheckCircle2,
    title: 'Quality Certified',
    description: 'Premium fabric sourcing with quality assurance at every step',
  },
  {
    icon: Truck,
    title: 'On-time Delivery',
    description: 'Reliable logistics partners ensuring your orders arrive on schedule',
  },
  {
    icon: Users,
    title: 'Dedicated Support',
    description: 'Personal account managers for seamless wholesale partnerships',
  },
]

export default function TrustSection() {
  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Why Partner With TASFIN Kids?
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            We combine quality, reliability, and personalized service to make wholesale sourcing simple.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {trustStats.map((stat, index) => {
            const Icon = stat.icon
            return (
              <Card
                key={index}
                className="p-6 border border-border hover:shadow-lg transition-shadow duration-300"
              >
                <div className="flex flex-col gap-4">
                  <div className="w-12 h-12 rounded-lg bg-linear-to-br from-pink-200/50 to-blue-200/50 flex items-center justify-center">
                    <Icon className="size-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">
                      {stat.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {stat.description}
                    </p>
                  </div>
                </div>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
