"use client";

import type React from "react";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ZoomIn, ZoomOut, X } from "lucide-react";

interface ProductImageZoomModalProps {
  isOpen: boolean;
  onClose: () => void;
  imageUrl: string;
  imageAlt: string;
}

export function ProductImageZoomModal({
  isOpen,
  onClose,
  imageUrl,
  imageAlt,
}: ProductImageZoomModalProps) {
  const [zoom, setZoom] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      setZoom(1);
      setPosition({ x: 0, y: 0 });
    }
  }, [isOpen]);

  const handleZoomIn = () => {
    setZoom((prev) => Math.min(prev + 0.5, 3));
  };

  const handleZoomOut = () => {
    setZoom((prev) => Math.max(prev - 0.5, 1));
  };

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    const delta = e.deltaY > 0 ? -0.1 : 0.1;
    setZoom((prev) => Math.max(1, Math.min(prev + delta, 3)));
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (zoom > 1) {
      setIsDragging(true);
      setDragStart({ x: e.clientX - position.x, y: e.clientY - position.y });
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging && zoom > 1) {
      setPosition({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y,
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleTouchStart = useRef<number | null>(null);
  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.touches.length === 2) {
      const touch1 = e.touches[0];
      const touch2 = e.touches[1];
      const distance = Math.hypot(
        touch2.clientX - touch1.clientX,
        touch2.clientY - touch1.clientY
      );

      if (handleTouchStart.current === null) {
        handleTouchStart.current = distance;
      } else {
        const delta = (distance - handleTouchStart.current) * 0.01;
        setZoom((prev) => Math.max(1, Math.min(prev + delta, 3)));
        handleTouchStart.current = distance;
      }
    }
  };

  const handleTouchEnd = () => {
    handleTouchStart.current = null;
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl w-full max-h-[90vh] p-0 bg-black border-0">
        <div
          className="relative w-full h-[80vh] bg-black flex items-center justify-center overflow-hidden cursor-grab active:cursor-grabbing"
          ref={imageRef}
          onWheel={handleWheel}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div
            className="relative w-full h-full flex items-center justify-center"
            style={{
              transform: `translate(${position.x}px, ${position.y}px) scale(${zoom})`,
              transition: isDragging ? "none" : "transform 0.2s ease-out",
            }}
          >
            {imageUrl ? (
              <Image
                src={imageUrl || "/placeholder.svg"}
                alt={imageAlt}
                fill
                className="object-contain"
                priority
              />
            ) : (
              <div className="flex h-full items-center justify-center">
                <span className="text-muted-foreground">No image</span>
              </div>
            )}
          </div>

          <div className="absolute bottom-4 left-4 flex gap-2 z-10">
            <Button
              size="icon"
              variant="secondary"
              onClick={handleZoomOut}
              disabled={zoom <= 1}
              className="bg-white/90 hover:bg-white"
            >
              <ZoomOut className="w-4 h-4" />
            </Button>
            <div className="flex items-center gap-2 bg-white/90 px-3 rounded-md">
              <span className="text-sm font-medium">
                {Math.round(zoom * 100)}%
              </span>
            </div>
            <Button
              size="icon"
              variant="secondary"
              onClick={handleZoomIn}
              disabled={zoom >= 3}
              className="bg-white/90 hover:bg-white"
            >
              <ZoomIn className="w-4 h-4" />
            </Button>
          </div>

          <Button
            size="icon"
            variant="ghost"
            onClick={onClose}
            className="absolute top-4 right-4 z-10 bg-white/90 hover:bg-white text-black"
          >
            <X className="w-4 h-4" />
          </Button>

          {zoom === 1 && (
            <div className="absolute top-4 left-4 text-white/70 text-sm">
              Scroll to zoom • Drag to pan
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
