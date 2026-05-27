import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * Text input — pharma-grade. Hairline ash border, heavier smoke underline
 * for focus affordance. 1.5px hot border when actually focused.
 */
const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  ({ className, ...props }, ref) => (
    <input
      ref={ref}
      className={cn(
        "w-full bg-transparent font-[family-name:var(--font-body)] text-[17px] text-fg placeholder:text-fog/70",
        "rounded-sm border border-ash border-b-[1.5px] border-b-smoke px-4 py-3.5 outline-none",
        "transition-colors [transition-timing-function:var(--ease-out)] duration-200",
        "focus:border-hot focus:border-b-hot",
        className,
      )}
      {...props}
    />
  ),
);
Input.displayName = "Input";

export { Input };
