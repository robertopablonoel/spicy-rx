import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

/**
 * Primary CTA. Hard corners. No hover hue shift (per design system —
 * "Never change color hue on hover"). Primary gets the heat shadow on
 * hover; ghost gets an ember text color; secondary gets a brightening
 * border. Press scales to 0.98 over 120ms.
 */
const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 font-[family-name:var(--font-body)] font-semibold transition-all [transition-timing-function:var(--ease-out)] disabled:opacity-40 disabled:pointer-events-none active:scale-[0.98] active:duration-[120ms]",
  {
    variants: {
      variant: {
        primary:
          "bg-hot text-void border border-hot hover:[box-shadow:0_0_0_1px_rgba(255,59,31,0.4),0_0_32px_rgba(255,59,31,0.45)] hover:brightness-[1.04]",
        secondary:
          "bg-transparent text-fg border border-smoke hover:border-mist",
        ghost:
          "bg-transparent text-fg border border-transparent hover:text-ember",
      },
      size: {
        sm: "h-9 px-3.5 text-xs",
        md: "h-11 px-5 text-sm",
        lg: "h-12 px-7 text-[15px]",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => (
    <button
      ref={ref}
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    />
  ),
);
Button.displayName = "Button";

/**
 * Anchor variant — same look as `Button` but renders as `<a>`. Used for the
 * many CTAs that link to the Rimo portal rather than triggering a handler.
 */
export interface ButtonLinkProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement>,
    VariantProps<typeof buttonVariants> {}

const ButtonLink = React.forwardRef<HTMLAnchorElement, ButtonLinkProps>(
  ({ className, variant, size, children, ...props }, ref) => (
    <a
      ref={ref}
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    >
      {children}
    </a>
  ),
);
ButtonLink.displayName = "ButtonLink";

export { Button, ButtonLink, buttonVariants };
