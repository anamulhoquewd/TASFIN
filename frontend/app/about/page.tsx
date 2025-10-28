import { Card, CardContent } from "@/components/ui/card";
import { Heart, Users, Award, Sparkles } from "lucide-react";
import Image from "next/image";

export default function AboutPage() {
  const values = [
    {
      icon: Heart,
      title: "Quality First",
      description:
        "We source only the finest fabrics and materials to ensure every piece meets our high standards.",
    },
    {
      icon: Users,
      title: "Customer Focused",
      description:
        "Your satisfaction is our priority. We're here to make your shopping experience delightful.",
    },
    {
      icon: Award,
      title: "Authentic Designs",
      description:
        "Each piece is carefully designed to blend traditional elegance with modern style.",
    },
    {
      icon: Sparkles,
      title: "Affordable Luxury",
      description:
        "Premium fashion shouldn't break the bank. We offer elegant pieces at accessible prices.",
    },
  ];

  return (
    <div className="container mx-auto px-4 py-16">
      {/* Hero Section */}
      <div className="max-w-3xl mx-auto text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
          About TASFIN
        </h1>
        <p className="text-lg text-muted-foreground leading-relaxed">
          Fashion for Her - Empowering Bangladeshi women with elegant,
          comfortable, and stylish clothing that celebrates their unique beauty
          and confidence.
        </p>
      </div>

      {/* Story Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
        <div className="space-y-6">
          <h2 className="text-3xl font-bold text-foreground">Our Story</h2>
          <div className="space-y-4 text-muted-foreground leading-relaxed">
            <p>
              TASFIN was born from a simple vision: to create beautiful,
              high-quality women's fashion that resonates with the modern
              Bangladeshi woman. We understand that fashion is more than just
              clothing—it's a form of self-expression, confidence, and identity.
            </p>
            <p>
              Since our inception, we've been committed to offering a curated
              collection of 2-piece sets, 3-piece suits, elegant tops,
              traditional salwar kameez, comfortable night dresses, and casual
              t-shirts. Each piece is thoughtfully designed to blend traditional
              aesthetics with contemporary style.
            </p>
            <p>
              Our team works tirelessly to ensure that every garment meets our
              strict quality standards while remaining affordable. We believe
              that every woman deserves to feel beautiful and confident in what
              she wears, regardless of the occasion.
            </p>
          </div>
        </div>

        <div className="relative">
          <div className="rounded-lg overflow-hidden border border-border">
            <Image
              alt="TASFIN"
              src={"/tasfin-logo-text-black-bg-white.png"}
              width={1000}
              height={1000}
            />
          </div>
        </div>
      </div>

      {/* Values Section */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold text-foreground text-center mb-12">
          Our Values
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((value, index) => (
            <Card key={index} className="border-border">
              <CardContent className="p-6 text-center space-y-4">
                <div className="w-14 h-14 mx-auto rounded-full bg-primary/10 flex items-center justify-center">
                  <value.icon className="h-7 w-7 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground">{value.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {value.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Mission Section */}
      <Card className="border-border bg-gradient-to-br from-secondary/20 to-accent/10">
        <CardContent className="p-8 md:p-12 text-center">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            Our Mission
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            To empower every Bangladeshi woman with fashion that makes her feel
            confident, beautiful, and comfortable. We're not just selling
            clothes—we're creating experiences and building a community of women
            who celebrate their individuality through style.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
