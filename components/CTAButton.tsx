import { headers } from "next/headers";
import { RIMO_PORTAL_URL, STATE_HEADER } from "@/lib/constants";
import { isBlocked } from "@/lib/state-restrictions";
import { StateRestrictionNotice } from "@/components/StateRestrictionNotice";

interface CTAButtonProps {
  /**
   * Where on the page this CTA is rendered. Used as a PostHog property
   * via the `data-cta-location` attribute so we can attribute conversions
   * back to placement without separate event wiring.
   */
  location: string;
  label?: string;
  variant?: "primary" | "secondary";
}

/**
 * State-aware Get Started CTA.
 *
 * Reads the visitor's state from the middleware-attached header. If the
 * state is in BLOCKED_STATES, renders <StateRestrictionNotice> instead of
 * the link to the Rimo portal. Visitors with no state (e.g., local dev,
 * non-Vercel hosting) see the CTA — we err toward showing rather than
 * hiding when the geo lookup is unavailable.
 */
export async function CTAButton({
  location,
  label = "Get Started",
  variant = "primary",
}: CTAButtonProps) {
  const h = await headers();
  const state = h.get(STATE_HEADER);

  if (isBlocked(state)) {
    return <StateRestrictionNotice state={state ?? ""} />;
  }

  // Pill-shaped buttons mirror the Spicy Cubes Shopify theme (50px radius).
  // Primary uses the burgundy brand color; hover shifts to coral accent.
  const primary =
    "inline-flex h-12 items-center justify-center rounded-full bg-primary px-8 text-sm font-bold uppercase tracking-wider text-primary-foreground transition-colors hover:bg-accent";
  const secondary =
    "inline-flex h-12 items-center justify-center rounded-full border-2 border-primary bg-background px-8 text-sm font-bold uppercase tracking-wider text-primary transition-colors hover:bg-primary hover:text-primary-foreground";

  return (
    <a
      href={RIMO_PORTAL_URL}
      data-cta-location={location}
      className={variant === "primary" ? primary : secondary}
    >
      {label}
    </a>
  );
}
