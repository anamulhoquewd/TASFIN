"use client";

import * as React from "react";
import Image from "next/image";
import {
  DndContext,
  DragOverlay,
  KeyboardSensor,
  PointerSensor,
  TouchSensor,
  closestCenter,
  type DragEndEvent,
  type DragStartEvent,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  rectSortingStrategy,
  sortableKeyboardCoordinates,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { fileKey, reorderByIds } from "@/lib/image-utils";

export interface SortableImageItem {
  id: string;
  src: string;
  alt: string;
  dimmed?: boolean;
}

interface SortableImageGridProps {
  items: SortableImageItem[];
  onReorder: (orderedIds: string[]) => void;
  onRemove?: (id: string) => void;
  sortable?: boolean;
  helperText?: string;
  renderOverlay?: (item: SortableImageItem, index: number) => React.ReactNode;
  onItemClick?: (item: SortableImageItem, index: number) => void;
  className?: string;
}

interface SortableImageTileProps {
  item: SortableImageItem;
  index: number;
  sortable: boolean;
  onRemove?: (id: string) => void;
  renderOverlay?: (item: SortableImageItem, index: number) => React.ReactNode;
  onItemClick?: (item: SortableImageItem, index: number) => void;
  isOverlay?: boolean;
}

function SortableImageTile({
  item,
  index,
  sortable,
  onRemove,
  renderOverlay,
  onItemClick,
  isOverlay = false,
}: SortableImageTileProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
    isOver,
  } = useSortable({
    id: item.id,
    disabled: !sortable || item.dimmed,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const position = index + 1;
  const isCover = position === 1;

  return (
    <div
      ref={isOverlay ? undefined : setNodeRef}
      style={isOverlay ? undefined : style}
      className={cn(
        "group relative touch-manipulation",
        isDragging && !isOverlay && "z-10 opacity-40",
        isOverlay && "scale-[1.02] shadow-lg ring-2 ring-primary/40",
        item.dimmed && "opacity-50",
        isOver && !isOverlay && !isDragging && "ring-2 ring-primary/60",
      )}
    >
      {isOver && !isOverlay && !isDragging && (
        <div className="pointer-events-none absolute -top-1 left-2 right-2 z-20 h-1 rounded-full bg-primary shadow-[0_0_0_3px_rgba(255,255,255,0.4)]" />
      )}
      <div
        className={cn(
          "relative overflow-hidden rounded-lg border bg-muted/20 transition-all duration-200",
          isCover && !item.dimmed && "ring-1 ring-primary/30",
          isDragging && !isOverlay && "border-dashed border-primary/40",
          isOver && !isOverlay && !isDragging && "border-primary/70 shadow-sm",
        )}
        onClick={onItemClick ? () => onItemClick(item, index) : undefined}
      >
        <Image
          src={item.src || "/placeholder.svg"}
          alt={item.alt}
          width={500}
          height={500}
          unoptimized={
            item.src.startsWith("blob:") || item.src.startsWith("data:")
          }
          className={cn(
            "h-24 w-full object-cover",
            onItemClick && "cursor-pointer",
          )}
        />

        {renderOverlay?.(item, index)}

        <div className="pointer-events-none absolute inset-x-0 top-0 flex items-start justify-between gap-1 bg-gradient-to-b from-black/45 to-transparent p-1.5">
          <div className="flex min-w-0 items-center gap-1">
            {sortable && !item.dimmed && (
              <button
                type="button"
                aria-label={`Drag image ${position}`}
                className={cn(
                  "pointer-events-auto flex shrink-0 cursor-grab items-center justify-center rounded bg-black/35 p-0.5 text-white/90 active:cursor-grabbing",
                  isOverlay && "cursor-grabbing",
                )}
                {...attributes}
                {...listeners}
                onClick={(event) => event.stopPropagation()}
              >
                <GripVertical className="size-3.5" />
              </button>
            )}
            <div className="min-w-0">
              <span className="text-[11px] font-medium tabular-nums text-white/90">
                {position}
              </span>
              {isCover && !item.dimmed && (
                <span className="ml-1 text-[10px] text-white/75">Cover</span>
              )}
            </div>
          </div>

          {onRemove && !item.dimmed && (
            <button
              type="button"
              aria-label={`Remove image ${position}`}
              onClick={(event) => {
                event.stopPropagation();
                onRemove(item.id);
              }}
              className="pointer-events-auto rounded-full bg-destructive p-1 text-destructive-foreground opacity-100 transition-opacity sm:opacity-0 sm:group-hover:opacity-100"
            >
              <X className="size-3" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

function StaticImageTile({
  item,
  index,
  onRemove,
  renderOverlay,
  onItemClick,
}: Omit<SortableImageTileProps, "sortable" | "isOverlay">) {
  const position = index + 1;
  const isCover = position === 1;

  return (
    <div className={cn("group relative", item.dimmed && "opacity-50")}>
      <div
        className={cn(
          "relative overflow-hidden rounded-lg border bg-muted/20",
          isCover && !item.dimmed && "ring-1 ring-primary/30",
        )}
        onClick={onItemClick ? () => onItemClick(item, index) : undefined}
      >
        <Image
          src={item.src || "/placeholder.svg"}
          alt={item.alt}
          width={500}
          height={500}
          unoptimized={
            item.src.startsWith("blob:") || item.src.startsWith("data:")
          }
          className={cn(
            "h-24 w-full object-cover",
            onItemClick && "cursor-pointer",
          )}
        />
        {renderOverlay?.(item, index)}
        <div className="pointer-events-none absolute inset-x-0 top-0 bg-gradient-to-b from-black/45 to-transparent p-1.5">
          <span className="text-[11px] font-medium tabular-nums text-white/90">
            {position}
          </span>
          {isCover && !item.dimmed && (
            <span className="ml-1 text-[10px] text-white/75">Cover</span>
          )}
        </div>
      </div>
      {onRemove && !item.dimmed && (
        <button
          type="button"
          aria-label={`Remove image ${position}`}
          onClick={() => onRemove(item.id)}
          className="absolute -top-2 -right-2 rounded-full bg-destructive p-1 text-destructive-foreground opacity-100 sm:opacity-0 sm:group-hover:opacity-100"
        >
          <X className="size-3 h-3 w-3" />
        </button>
      )}
    </div>
  );
}

export function SortableImageGrid({
  items,
  onReorder,
  onRemove,
  sortable = true,
  helperText = "Drag images to reorder. The first image is the cover.",
  renderOverlay,
  onItemClick,
  className,
}: SortableImageGridProps) {
  const [activeId, setActiveId] = React.useState<string | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 6 },
    }),
    useSensor(TouchSensor, {
      activationConstraint: { delay: 180, tolerance: 6 },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  const activeItem = items.find((item) => item.id === activeId);
  const activeIndex = activeItem
    ? items.findIndex((item) => item.id === activeId)
    : -1;

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(String(event.active.id));
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveId(null);

    if (!over || active.id === over.id) return;

    const oldIndex = items.findIndex((item) => item.id === active.id);
    const newIndex = items.findIndex((item) => item.id === over.id);
    if (oldIndex === -1 || newIndex === -1) return;

    onReorder(arrayMove(items, oldIndex, newIndex).map((item) => item.id));
  };

  if (items.length === 0) return null;

  if (!sortable) {
    return (
      <div className={cn("space-y-2", className)}>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4 lg:grid-cols-6">
          {items.map((item, index) => (
            <StaticImageTile
              key={item.id}
              item={item}
              index={index}
              onRemove={onRemove}
              renderOverlay={renderOverlay}
              onItemClick={onItemClick}
            />
          ))}
        </div>
        {helperText && (
          <p className="text-xs text-muted-foreground">{helperText}</p>
        )}
      </div>
    );
  }

  return (
    <div className={cn("space-y-2", className)}>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={items.map((item) => item.id)}
          strategy={rectSortingStrategy}
        >
          <div className="grid grid-cols-2 gap-3 md:grid-cols-4 lg:grid-cols-6">
            {items.map((item, index) => (
              <SortableImageTile
                key={item.id}
                item={item}
                index={index}
                sortable={sortable}
                onRemove={onRemove}
                renderOverlay={renderOverlay}
                onItemClick={onItemClick}
              />
            ))}
          </div>
        </SortableContext>

        <DragOverlay adjustScale={false}>
          {activeItem && activeIndex >= 0 ? (
            <SortableImageTile
              item={activeItem}
              index={activeIndex}
              sortable={sortable}
              isOverlay
            />
          ) : null}
        </DragOverlay>
      </DndContext>

      {helperText && (
        <p className="text-xs text-muted-foreground">{helperText}</p>
      )}
    </div>
  );
}

interface FileSortableImageGridProps {
  files: File[];
  onChange: (files: File[]) => void;
  helperText?: string;
  className?: string;
}

export function FileSortableImageGrid({
  files,
  onChange,
  helperText = "Drag to reorder. Position 1 is the cover image.",
  className,
}: FileSortableImageGridProps) {
  const items = React.useMemo(
    () =>
      files.map((file, index) => ({
        id: fileKey(file),
        src: URL.createObjectURL(file),
        alt: `Image ${index + 1}`,
      })),
    [files],
  );

  React.useEffect(() => {
    return () => {
      items.forEach((item) => URL.revokeObjectURL(item.src));
    };
  }, [items]);

  return (
    <SortableImageGrid
      className={className}
      helperText={helperText}
      items={items}
      onReorder={(orderedIds) =>
        onChange(reorderByIds(files, fileKey, orderedIds))
      }
      onRemove={(id) => onChange(files.filter((file) => fileKey(file) !== id))}
    />
  );
}

interface UrlSortableImageGridProps {
  images: Array<{ url: string; alt?: string }>;
  onReorder: (images: Array<{ url: string; alt?: string }>) => void;
  onRemove?: (url: string) => void;
  helperText?: string;
  className?: string;
}

export function UrlSortableImageGrid({
  images,
  onReorder,
  onRemove,
  helperText = "Drag to reorder. Position 1 is the cover image.",
  className,
}: UrlSortableImageGridProps) {
  return (
    <SortableImageGrid
      className={className}
      helperText={helperText}
      items={images.map((image, index) => ({
        id: image.url,
        src: image.url,
        alt: image.alt || `Image ${index + 1}`,
      }))}
      onReorder={(orderedIds) => {
        const lookup = new Map(images.map((image) => [image.url, image]));
        onReorder(
          orderedIds
            .map((id) => lookup.get(id))
            .filter((image): image is (typeof images)[number] => !!image),
        );
      }}
      onRemove={onRemove}
    />
  );
}
