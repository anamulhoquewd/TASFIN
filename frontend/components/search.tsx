"use client";

import { useState, useEffect } from "react";
import api from "@/axios/interceptor";
import { IProduct } from "@/interfaces/products";
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "./ui/input";
import { Card, CardContent } from "./ui/card";
import { Skeleton } from "./ui/skeleton";
import { ScrollArea } from "./ui/scroll-area";

interface SearchProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

export default function Searching({ open, setOpen }: SearchProps) {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<IProduct[]>([]);

  useEffect(() => {
    if (!searchTerm.trim()) {
      setResults([]);
      return;
    }

    const delayDebounce = setTimeout(async () => {
      try {
        setLoading(true);

        const { data } = await api.get(`/products?search=${searchTerm}`);

        setResults(data?.data || []);
      } catch (error) {
        console.error("Search error:", error);
        setResults([]);
      } finally {
        setLoading(false);
      }
    }, 500);

    return () => clearTimeout(delayDebounce);
  }, [searchTerm]);

  return (
    <Dialog
      open={open}
      onOpenChange={(open) => {
        setOpen(open);
        setSearchTerm("");
      }}
    >
      <DialogContent className="sm:max-w-lg w-full">
        <DialogHeader>
          <DialogTitle>Search Products</DialogTitle>
        </DialogHeader>

        <div className="mt-4">
          <Input
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="mb-4"
            autoFocus
          />

          <Card
            className={results.length > 0 ? "h-92 overflow-hidden" : "max-h-92"}
          >
            <ScrollArea className="h-full">
              <CardContent className="space-y-2">
                {loading ? (
                  <>
                    <Skeleton className="h-6 w-full bg-accent" />
                    <Skeleton className="h-6 w-full bg-accent" />
                    <Skeleton className="h-6 w-full bg-accent" />
                  </>
                ) : results.length > 0 ? (
                  results.map((product) => (
                    <div
                      key={product._id}
                      className="cursor-pointer transition-colors duration-300 bg-primary/5 hover:bg-primary/10 p-2 rounded"
                      onClick={() => {
                        setOpen(false);
                        router.push(`/products/${product.slug}`);
                        setSearchTerm("");
                      }}
                    >
                      {product.title}
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-muted-foreground text-center">
                    No results found.
                  </p>
                )}
              </CardContent>
            </ScrollArea>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
}
