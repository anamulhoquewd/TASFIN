import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";

export default function PrivacyPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-8">
          Privacy Policy
        </h1>

        <Card className="border-border">
          <CardContent className="p-8 space-y-8">
            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-foreground">
                1. Information We Collect
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                We collect information that you provide directly to us,
                including your name, email address, phone number, shipping
                address, and payment information when you make a purchase. We
                also collect information about your browsing behavior on our
                website through cookies and similar technologies.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-foreground">
                2. How We Use Your Information
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                We use the information we collect to process your orders,
                communicate with you about your purchases, send you marketing
                communications (with your consent), improve our website and
                services, prevent fraud and enhance security, and comply with
                legal obligations.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-foreground">
                3. Information Sharing
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                We do not sell or rent your personal information to third
                parties. We may share your information with service providers
                who assist us in operating our website and conducting our
                business (such as payment processors and shipping companies),
                and when required by law or to protect our rights.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-foreground">
                4. Data Security
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                We implement appropriate technical and organizational measures
                to protect your personal information against unauthorized
                access, alteration, disclosure, or destruction. However, no
                method of transmission over the internet is 100% secure, and we
                cannot guarantee absolute security.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-foreground">5. Cookies</h2>
              <p className="text-muted-foreground leading-relaxed">
                We use cookies and similar tracking technologies to track
                activity on our website and store certain information. You can
                instruct your browser to refuse all cookies or to indicate when
                a cookie is being sent. However, if you do not accept cookies,
                you may not be able to use some portions of our website.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-foreground">
                6. Your Rights
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                You have the right to access, correct, or delete your personal
                information. You can also object to or restrict certain
                processing of your data. To exercise these rights, please
                contact us at tasfinshop@gmail.com. You may also unsubscribe
                from marketing communications at any time.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-foreground">
                7. Children's Privacy
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                Our website is not intended for children under the age of 13. We
                do not knowingly collect personal information from children
                under 13. If you are a parent or guardian and believe your child
                has provided us with personal information, please contact us.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-foreground">
                8. Changes to Privacy Policy
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                We may update our Privacy Policy from time to time. We will
                notify you of any changes by posting the new Privacy Policy on
                this page and updating the "Last updated" date. You are advised
                to review this Privacy Policy periodically for any changes.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-foreground">
                9. Contact Us
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                If you have any questions about this Privacy Policy or our data
                practices, please contact us at tasfinshop@gmail.com or through
                our{" "}
                <Link
                  href="/support"
                  className="text-sm font-medium text-primary hover:underline"
                >
                  Support →
                </Link>{" "}
                page.
              </p>
            </section>

            <p className="text-sm text-muted-foreground pt-4 border-t border-border">
              Last updated:{" "}
              {new Date().toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
