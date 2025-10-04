import { Card, CardContent } from "@/components/ui/card"

export default function TermsPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-4xl mx-auto">
        <h1 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-8">Terms & Conditions</h1>

        <Card className="border-border">
          <CardContent className="p-8 space-y-8">
            <section className="space-y-4">
              <h2 className="font-serif text-2xl font-bold text-foreground">1. Introduction</h2>
              <p className="text-muted-foreground leading-relaxed">
                Welcome to TASFIN. By accessing and using our website, you accept and agree to be bound by the terms and
                provisions of this agreement. If you do not agree to these terms, please do not use our services.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="font-serif text-2xl font-bold text-foreground">2. Use of Website</h2>
              <p className="text-muted-foreground leading-relaxed">
                You agree to use our website only for lawful purposes and in a way that does not infringe the rights of,
                restrict, or inhibit anyone else's use and enjoyment of the website. Prohibited behavior includes
                harassing or causing distress or inconvenience to any other user, transmitting obscene or offensive
                content, or disrupting the normal flow of dialogue within our website.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="font-serif text-2xl font-bold text-foreground">3. Product Information</h2>
              <p className="text-muted-foreground leading-relaxed">
                We strive to provide accurate product descriptions and images. However, we do not warrant that product
                descriptions, colors, or other content available on the website are accurate, complete, reliable,
                current, or error-free. Colors may vary slightly due to screen settings and photography lighting.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="font-serif text-2xl font-bold text-foreground">4. Orders and Payment</h2>
              <p className="text-muted-foreground leading-relaxed">
                All orders are subject to acceptance and availability. We reserve the right to refuse or cancel any
                order for any reason. Payment must be made in full before dispatch of goods. We accept various payment
                methods including Cash on Delivery, Bkash, and Bank Transfer.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="font-serif text-2xl font-bold text-foreground">5. Shipping and Delivery</h2>
              <p className="text-muted-foreground leading-relaxed">
                We aim to dispatch orders within 2-3 business days. Delivery times may vary depending on your location.
                Free shipping is available for orders above ৳3000. We are not responsible for delays caused by courier
                services or circumstances beyond our control.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="font-serif text-2xl font-bold text-foreground">6. Returns and Exchanges</h2>
              <p className="text-muted-foreground leading-relaxed">
                We accept returns and exchanges within 7 days of delivery for unused items in original condition with
                tags attached. Customers are responsible for return shipping costs unless the item is defective or
                incorrect. Refunds will be processed within 7-10 business days after receiving the returned item.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="font-serif text-2xl font-bold text-foreground">7. Intellectual Property</h2>
              <p className="text-muted-foreground leading-relaxed">
                All content on this website, including text, graphics, logos, images, and software, is the property of
                TASFIN and is protected by copyright and intellectual property laws. You may not reproduce, distribute,
                or create derivative works without our express written permission.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="font-serif text-2xl font-bold text-foreground">8. Limitation of Liability</h2>
              <p className="text-muted-foreground leading-relaxed">
                TASFIN shall not be liable for any indirect, incidental, special, or consequential damages arising out
                of or in connection with the use of our website or products. Our total liability shall not exceed the
                amount paid by you for the product in question.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="font-serif text-2xl font-bold text-foreground">9. Changes to Terms</h2>
              <p className="text-muted-foreground leading-relaxed">
                We reserve the right to modify these terms and conditions at any time. Changes will be effective
                immediately upon posting to the website. Your continued use of the website following any changes
                indicates your acceptance of the new terms.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="font-serif text-2xl font-bold text-foreground">10. Contact Information</h2>
              <p className="text-muted-foreground leading-relaxed">
                If you have any questions about these Terms & Conditions, please contact us at support@tasfin.com or
                through our contact page.
              </p>
            </section>

            <p className="text-sm text-muted-foreground pt-4 border-t border-border">
              Last updated: {new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
