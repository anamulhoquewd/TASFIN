import Link from "next/link";
import { Facebook, Instagram, Mail, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function Footer() {
  return (
    <footer className="border-t border-border bg-muted/30">
      <div className="container mx-auto px-4 pt-8 pb-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4 col-span-2 md:col-span-1">
            <h3 className="font-playfair text-2xl font-bold text-foreground">
              TASFIN
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Fashion for Her. Elegant women's clothing for the modern
              Bangladeshi woman.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="font-semibold text-foreground">Quick Links</h4>
            <nav className="flex flex-col gap-2">
              <Link
                href="/products"
                className="text-sm w-fit text-muted-foreground hover:text-primary transition-colors"
              >
                Shop All
              </Link>
              <Link
                href="/track-order"
                className="text-sm w-fit text-muted-foreground hover:text-primary transition-colors"
              >
                Order tracking
              </Link>
              <Link
                href="/about"
                className="text-sm w-fit text-muted-foreground hover:text-primary transition-colors"
              >
                About Us
              </Link>
              <Link
                href="/contact"
                className="text-sm w-fit text-muted-foreground hover:text-primary transition-colors"
              >
                Contact
              </Link>
              <Link
                href="/faq"
                className="text-sm w-fit text-muted-foreground hover:text-primary transition-colors"
              >
                FAQ
              </Link>
            </nav>
          </div>

          {/* Legal */}
          <div className="space-y-4">
            <h4 className="font-semibold text-foreground">Legal</h4>
            <nav className="flex flex-col gap-2">
              <Link
                href="/terms"
                className="text-sm w-fit text-muted-foreground hover:text-primary transition-colors"
              >
                Terms & Conditions
              </Link>
              <Link
                href="/privacy"
                className="text-sm w-fit text-muted-foreground hover:text-primary transition-colors"
              >
                Privacy Policy
              </Link>
            </nav>
          </div>

          {/* Newsletter */}
          <div className="space-y-4 col-span-2 md:col-span-1">
            <h4 className="font-semibold text-foreground">Stay Updated</h4>
            <p className="text-sm text-muted-foreground">
              Subscribe to get special offers and updates.
            </p>
            <div className="flex gap-2">
              <Input type="email" placeholder="Your email" className="flex-1" />
              <Button
                size="icon"
                className="shrink-0 cursor-pointer bg-primary/80 hover:bg-primary/90"
              >
                <Mail className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex gap-3 pt-2">
              <Link
                href={"https://www.facebook.com/tasfinshop"}
                target="_blank"
              >
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-9 w-9 cursor-pointer bg-primary/80 hover:bg-primary/90"
                >
                  <Facebook className="h-4 w-4 text-white" />
                </Button>
              </Link>
              <Link
                href={"https://www.instagram.com/tasfinshop/"}
                target="_blank"
              >
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-9 w-9 cursor-pointer bg-primary/80 hover:bg-primary/90"
                >
                  <Instagram className="h-4 w-4 text-white" />
                </Button>
              </Link>

              <Button
                variant="ghost"
                size="icon"
                className="h-9 w-9 cursor-pointer bg-primary/80 hover:bg-primary/90"
              >
                <Share2 className="h-4 w-4 text-white" />
              </Button>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-4 border-t border-border text-center text-sm text-muted-foreground">
          <p>Copyright &copy; {new Date().getFullYear()} TASFIN Inc.</p>
        </div>
      </div>
    </footer>
  );
}
