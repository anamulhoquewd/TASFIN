'use client'

import { Button } from '@/components/ui/button'

export default function HeroSection() {
  const handleCtaClick = () => {
    const element = document.querySelector('#inquiry')
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section id="home" className="relative min-h-screen flex items-center bg-linear-to-b from-accent/10 via-background to-background overflow-hidden py-12 md:py-0">
      {/* Decorative elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-20 right-10 w-72 h-72 bg-blue-200/20 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-10 w-72 h-72 bg-pink-200/20 rounded-full blur-3xl" />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
          {/* Content */}
          <div className="flex flex-col gap-6">
            <div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground mb-4">
                Premium Kids Fashion
                <span className="block text-transparent bg-clip-text bg-linear-to-r from-pink-400 via-purple-400 to-blue-400">
                  Wholesale Export
                </span>
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground">
                Quality fabric, trusted partnership, and dedicated support for wholesale shop owners across Pakistan.
              </p>
            </div>

            <p className="text-base text-muted-foreground/90 leading-relaxed">
              Part of <strong>TASFIN</strong>, a leading women&apos;s fashion export house with years of expertise in international wholesale partnerships. We bring the same dedication to kids&apos; clothing.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button
                onClick={handleCtaClick}
                size="lg"
                className="rounded-full px-8 h-12 text-base"
              >
                Get Wholesale Pricing
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="rounded-full px-8 h-12 text-base"
                onClick={() => {
                  const element = document.querySelector('#products')
                  if (element) {
                    element.scrollIntoView({ behavior: 'smooth' })
                  }
                }}
              >
                Browse Products
              </Button>
            </div>
          </div>

          {/* Hero Image Placeholder */}
          <div className="relative h-96 md:h-full md:min-h-screen md:absolute md:right-0 md:top-0 md:w-1/2 flex items-center justify-center">
            <div className="w-full h-96 md:h-full bg-linear-to-br from-blue-100/50 via-pink-100/30 to-yellow-100/30 rounded-3xl md:rounded-none border border-border md:border-l flex items-center justify-center">
              <svg
                className="w-32 h-32 md:w-48 md:h-48 text-muted-foreground/40"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
