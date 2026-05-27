import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

/**
 * Pill chip — mono, uppercase, the dropper-bottle's geometric echo.
 * Used for tags ("Rx ONLY"), trust signals ("LegitScript verified"),
 * and the design system's "● badge" pattern.
 *
 * `solid` flips colors so the pill becomes a filled chip on lighter
 * surfaces — used rarely, mostly on the capsaicin gradient band.
 */
const pillVariants = cva(
  "inline-flex items-center gap-1.5 px-2.5 py-1 font-[family-name:var(--font-mono)] text-[11px] font-medium uppercase tracking-[0.14em] rounded-pill border",
  {
    variants: {
      tone: {
        ember:
          "text-ember border-ember/40",
        hot:
          "text-hot border-hot/40",
        vitals:
          "text-vitals border-vitals/30",
        fog:
          "text-fog border-ash",
        plasma:
          "text-plasma border-plasma/40",
      },
      solid: {
        true: "",
        false: "",
      },
    },
    compoundVariants: [
      { tone: "ember", solid: true, className: "bg-ember text-void border-ember" },
      { tone: "hot", solid: true, className: "bg-hot text-void border-hot" },
      { tone: "vitals", solid: true, className: "bg-vitals text-void border-vitals" },
      { tone: "fog", solid: true, className: "bg-fog text-void border-fog" },
      { tone: "plasma", solid: true, className: "bg-plasma text-void border-plasma" },
    ],
    defaultVariants: {
      tone: "ember",
      solid: false,
    },
  },
);

export interface PillProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof pillVariants> {
  showDot?: boolean;
}

export function Pill({
  className,
  tone,
  solid,
  showDot = true,
  children,
  ...props
}: PillProps) {
  return (
    <span className={cn(pillVariants({ tone, solid }), className)} {...props}>
      {showDot && (
        <span
          aria-hidden
          className="inline-block size-[5px] rounded-full bg-current"
        />
      )}
      {children}
    </span>
  );
}
