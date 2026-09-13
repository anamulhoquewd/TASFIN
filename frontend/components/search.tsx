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
import { ScrollArea } from "./ui/scroll-area";
import Image from "next/image";
import { formatPrice } from "@/lib/utils";

interface SearchProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

export default function Searching({ open, setOpen }: SearchProps) {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState<IProduct[]>([]);

  useEffect(() => {
    if (!searchTerm.trim()) {
      setResults([]);
      return;
    }

    const delayDebounce = setTimeout(async () => {
      try {
        const { data } = await api.get(`/products?search=${searchTerm}`);

        setResults(data?.data || []);
      } catch (error) {
        console.error("Search error:", error);
        setResults([]);
      }
    }, 500);

    return () => clearTimeout(delayDebounce);
  }, [searchTerm]);

  console.log("Search results:", results);

  return (
    <Dialog
      open={open}
      onOpenChange={(open) => {
        setOpen(open);
        setResults([]);
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
                {results.length > 0 ? (
                  results.map((product: IProduct) => (
                    <div
                      key={product._id}
                      className="cursor-pointer transition-colors duration-300 bg-primary/5 hover:bg-primary/10 p-2 rounded flex gap-4 justify-between items-center"
                      onClick={() => {
                        setOpen(false);
                        router.push(`/shop/${product.slug}`);
                        setSearchTerm("");
                      }}
                    >
                      <div className="flex items-center gap-4">
                        <Image
                          src={product.images[0].url}
                          alt={product.images[0].alt || product.title}
                          width={30}
                          height={30}
                          className="rounded"
                        />
                        <h2>{product.title}</h2>
                      </div>
                      <p className="font-semibold">
                        {formatPrice(product.variants[0].price)}
                      </p>
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
