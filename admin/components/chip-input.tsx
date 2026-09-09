"use client";

import * as React from "react";
import { Hash, Sparkles, X } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

export type ChipInputVariant = "feature" | "tag";

interface ChipInputProps {
  value: string[];
  onChange: (value: string[]) => void;
  placeholder?: string;
  variant?: ChipInputVariant;
  maxItems?: number;
  disabled?: boolean;
  id?: string;
  "aria-invalid"?: boolean;
}

const variantConfig = {
  feature: {
    icon: Sparkles,
    chipClass:
      "border-primary/25 bg-primary/5 text-foreground hover:bg-primary/10",
    containerClass: "min-h-[88px] items-start content-start",
    inputClass: "min-w-[160px]",
  },
  tag: {
    icon: Hash,
    chipClass: "border-transparent bg-secondary text-secondary-foreground",
    containerClass: "min-h-[40px]",
    inputClass: "min-w-[120px]",
  },
} as const;

function normalizeItem(raw: string) {
  return raw.trim().replace(/\s+/g, " ");
}

function isDuplicate(items: string[], candidate: string) {
  const normalized = candidate.toLowerCase();
  return items.some((item) => item.toLowerCase() === normalized);
}

export function ChipInput({
  value,
  onChange,
  placeholder,
  variant = "tag",
  maxItems,
  disabled = false,
  id,
  "aria-invalid": ariaInvalid,
}: ChipInputProps) {
  const [inputValue, setInputValue] = React.useState("");
  const inputRef = React.useRef<HTMLInputElement>(null);
  const config = variantConfig[variant];
  const Icon = config.icon;

  const addItem = (raw: string) => {
    const item = normalizeItem(raw);
    if (!item) return false;

    if (maxItems !== undefined && value.length >= maxItems) {
      toast.warning(`Maximum ${maxItems} items allowed`);
      return false;
    }

    if (isDuplicate(value, item)) {
      toast.message("Already added", {
        description: `"${item}" is already in the list.`,
      });
      setInputValue("");
      return false;
    }

    onChange([...value, item]);
    setInputValue("");
    return true;
  };

  const removeItem = (index: number) => {
    onChange(value.filter((_, i) => i !== index));
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      addItem(inputValue);
      return;
    }

    if (event.key === "Backspace" && !inputValue && value.length > 0) {
      event.preventDefault();
      onChange(value.slice(0, -1));
      return;
    }

    if (event.key === "," && inputValue.trim()) {
      event.preventDefault();
      addItem(inputValue);
    }
  };

  const handlePaste = (event: React.ClipboardEvent<HTMLInputElement>) => {
    const pasted = event.clipboardData.getData("text");
    const hasSeparator = /[,*\n]/.test(pasted);

    if (!hasSeparator) return;

    event.preventDefault();
    const parts = pasted
      .split(/[,*\n]+/)
      .map(normalizeItem)
      .filter(Boolean);

    const next = [...value];
    for (const part of parts) {
      if (maxItems !== undefined && next.length >= maxItems) break;
      if (!isDuplicate(next, part)) next.push(part);
    }

    onChange(next);
    setInputValue("");
  };

  const handleContainerClick = () => {
    inputRef.current?.focus();
  };

  return (
    <div
      role="group"
      aria-labelledby={id ? `${id}-label` : undefined}
      onClick={handleContainerClick}
      className={cn(
        "flex w-full flex-wrap gap-1.5 rounded-md border border-input bg-background px-3 py-2 text-sm shadow-xs transition-[color,box-shadow] focus-within:border-ring focus-within:ring-[3px] focus-within:ring-ring/50",
        config.containerClass,
        ariaInvalid &&
          "border-destructive ring-destructive/20 dark:ring-destructive/40",
        disabled && "cursor-not-allowed opacity-60",
      )}
    >
      {value.map((item, index) => (
        <Badge
          key={`${item}-${index}`}
          variant="outline"
          className={cn(
            "h-7 gap-1 pr-1 pl-2 text-xs font-normal",
            config.chipClass,
          )}
        >
          <Icon className="size-3 shrink-0 opacity-70" aria-hidden="true" />
          <span className="max-w-[220px] truncate">{item}</span>
          {!disabled && (
            <button
              type="button"
              aria-label={`Remove ${item}`}
              onClick={(event) => {
                event.stopPropagation();
                removeItem(index);
              }}
              className="rounded-sm p-0.5 opacity-70 transition-opacity hover:bg-foreground/10 hover:opacity-100"
            >
              <X className="size-3" />
            </button>
          )}
        </Badge>
      ))}

      {!disabled && (maxItems === undefined || value.length < maxItems) && (
        <input
          ref={inputRef}
          id={id}
          type="text"
          value={inputValue}
          disabled={disabled}
          placeholder={value.length === 0 ? placeholder : "Add another..."}
          onChange={(event) => setInputValue(event.target.value)}
          onKeyDown={handleKeyDown}
          onPaste={handlePaste}
          onBlur={() => {
            if (inputValue.trim()) addItem(inputValue);
          }}
          className={cn(
            "flex-1 border-0 bg-transparent px-1 py-1 outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed",
            config.inputClass,
          )}
        />
      )}
    </div>
  );
}
