import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="mb-8">
          <h1 className="text-7xl font-bold text-primary mb-4">404</h1>
          <h2 className="text-3xl font-bold text-foreground mb-2">
            Page Not Found
          </h2>
          <p className="text-muted-foreground text-lg">
            Sorry, the page you&apos;re looking for doesn&apos;t exist or has
            been moved.
          </p>
        </div>
        {/* Navigation buttons */}
        <Link href="/">
          <Button variant="default" className="cursor-pointer">
            Back to Dashboard
          </Button>
        </Link>
      </div>
    </div>
  );
}
