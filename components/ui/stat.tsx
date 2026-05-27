import { cn } from "@/lib/utils";

/**
 * Mono-label / display-value pair. Used in the hero stat row and in
 * a smaller form on the testimonials section's rating block.
 *
 * `size="md"` is the hero size (26px value). `size="lg"` is the
 * science-screen StatBlock size (96px value).
 */
export interface StatProps {
  label: string;
  value: string;
  unit?: string;
  size?: "md" | "lg";
  className?: string;
}

export function Stat({
  label,
  value,
  unit,
  size = "md",
  className,
}: StatProps) {
  const valueSize =
    size === "lg"
      ? "text-[clamp(64px,8vw,96px)] leading-none"
      : "text-[26px] leading-none";
  return (
    <div className={cn("min-w-0", className)}>
      {size === "lg" ? (
        <>
          <div className="flex items-baseline gap-2">
            <span
              className={cn(
                "font-[family-name:var(--font-display)] font-bold text-ember tracking-[-0.05em]",
                valueSize,
              )}
            >
              {value}
            </span>
            {unit && (
              <span className="font-[family-name:var(--font-mono)] text-sm uppercase tracking-[0.12em] text-ember">
                {unit}
              </span>
            )}
          </div>
          <div className="mt-3.5 font-[family-name:var(--font-mono)] text-[11px] font-medium uppercase tracking-[0.14em] text-fog">
            {label}
          </div>
        </>
      ) : (
        <>
          <div className="font-[family-name:var(--font-mono)] text-[10px] font-medium uppercase tracking-[0.14em] text-fog">
            {label}
          </div>
          <div
            className={cn(
              "mt-1 font-[family-name:var(--font-display)] font-semibold text-fg tracking-[-0.02em]",
              valueSize,
            )}
          >
            {value}
          </div>
        </>
      )}
    </div>
  );
}
