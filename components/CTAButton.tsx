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

  const primary =
    "inline-flex h-11 items-center justify-center rounded-md bg-foreground px-6 text-sm font-semibold text-background transition-colors hover:bg-foreground/90";
  const secondary =
    "inline-flex h-11 items-center justify-center rounded-md border border-input bg-background px-6 text-sm font-semibold transition-colors hover:bg-accent hover:text-accent-foreground";

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
