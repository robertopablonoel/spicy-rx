import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Shadcn-style className composer. Used by every primitive in components/ui/
 * and by marketing components that need conditional classes.
 *
 *   cn("p-2", isActive && "bg-hot text-void", className)
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
