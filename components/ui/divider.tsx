import { cn } from "@/lib/utils";

/**
 * Vertical 1px ash divider — used inside the hero stat row to separate
 * each label/value pair. Hidden on mobile per the kit's responsive rules.
 */
export function Divider({ className }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={cn("h-8 w-px shrink-0 bg-ash", className)}
    />
  );
}
