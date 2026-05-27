"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * "Select option" button used in the consult flow. Click anywhere on the
 * row to select. Selected state warms the background and rings the radio.
 */
export interface RadioOptionProps {
  label: string;
  selected: boolean;
  onSelect: () => void;
  className?: string;
}

export function RadioOption({
  label,
  selected,
  onSelect,
  className,
}: RadioOptionProps) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={cn(
        "flex w-full items-center gap-3 px-4 py-4 text-left text-base",
        "rounded-sm border font-[family-name:var(--font-body)] cursor-pointer",
        "transition-all duration-200 [transition-timing-function:var(--ease-out)]",
        selected
          ? "bg-hot/[0.06] border-hot text-fg"
          : "border-ash text-mist hover:border-smoke",
        className,
      )}
    >
      <span
        aria-hidden
        className={cn(
          "relative inline-flex size-4 shrink-0 items-center justify-center rounded-full border-[1.5px]",
          selected ? "border-hot" : "border-smoke",
        )}
      >
        {selected && (
          <span className="absolute inset-[3px] rounded-full bg-hot" />
        )}
      </span>
      {label}
    </button>
  );
}
