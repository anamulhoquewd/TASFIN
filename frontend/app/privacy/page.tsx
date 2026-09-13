import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";

const policySections = [
  {
    id: 1,
    title: "1. Customer Account Creation Process",
    description: `At Tasfin, you don’t need to create or log in to an account separately. 
    When you place your first order, we automatically create a customer profile in our system 
    using your name, phone number, and email address.`,
  },
  {
    id: 2,
    title: "2. Use of Cookies",
    description: `After your order, we securely store your phone number in a cookie 
    that remains valid for one year. 
    This cookie allows you to access your order dashboard without logging in. 
    If the cookie expires or is deleted, you will need to place a new order to generate a new one.`,
  },
  {
    id: 3,
    title: "3. Dashboard Access Conditions",
    description: `If your cookie contains a valid 11-digit phone number, 
    you can directly access your dashboard. 
    If no valid cookie is found or it has expired, 
    you’ll be redirected to this Privacy Policy page to understand 
    how our customer account system works.`,
  },
  {
    id: 4,
    title: "4. Data Security",
    description: `We securely store your personal information and never share it with third parties. 
    Your information is used solely to process your orders and improve our services.`,
  },
  {
    id: 5,
    title: "5. Your Rights",
    description: `You may contact us anytime to update or request deletion of your personal information. 
    Contact email: tasfinshop@gmail.com`,
  },
  {
    id: 6,
    title: "6. Updates and Changes",
    description: `We may update this Privacy Policy from time to time. 
    Any changes will be posted on this page.`,
  },
  {
    id: 7,
    title: "7. Contact Us",
    description: (
      <>
        If you have any questions or requests, please reach out through our{" "}
        <Link
          href="/support"
          className="text-primary font-medium hover:underline"
        >
          Support →
        </Link>{" "}
        page or email us at{" "}
        <span className="font-semibold">tasfinshop@gmail.com</span>.
      </>
    ),
  },
];

export default function PrivacyPage() {
  const date = new Date("2025-11-07");

  const formatted = date.toLocaleDateString("en-US", {
    weekday: "short", // Fri
    day: "numeric", // 7
    month: "short", // Jul
    year: "numeric", // 2025
  });

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-8">
          Privacy Policy
        </h1>

        <Card className="border-border">
          <CardContent className="p-8 space-y-8">
            {policySections.map((section) => (
              <section key={section.id} className="space-y-4">
                <h2 className="text-2xl font-bold text-foreground">
                  {section.title}
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  {section.description}
                </p>
              </section>
            ))}

            <p className="text-sm text-muted-foreground pt-4 border-t border-border">
              Last update: {formatted}
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
