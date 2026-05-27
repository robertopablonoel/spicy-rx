import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * Section eyebrow — mono uppercase with the canonical ● bullet.
 *
 * One per section. Color is ember by default but the capsaicin-gradient
 * `PullQuote` band uses a near-void color override via `style`.
 */
export interface EyebrowProps extends React.HTMLAttributes<HTMLDivElement> {
  showDot?: boolean;
  as?: "div" | "p" | "span";
}

export function Eyebrow({
  className,
  showDot = true,
  as: Component = "p",
  children,
  ...props
}: EyebrowProps) {
  return (
    <Component
      className={cn(
        "inline-flex items-center gap-2 font-[family-name:var(--font-mono)] text-[11px] font-medium uppercase tracking-[0.14em] text-ember",
        className,
      )}
      {...props}
    >
      {showDot && (
        <span
          aria-hidden
          className="inline-block size-[5px] rounded-full bg-current"
        />
      )}
      {children}
    </Component>
  );
}
