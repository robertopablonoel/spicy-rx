"use client";

import { useEffect, useState } from "react";
import { ButtonLink, type ButtonLinkProps } from "@/components/ui/button";
import { PASSION_INTAKE_URL } from "@/lib/constants";
import { withAttribution } from "@/lib/attribution";
import { trackBeginConsultation } from "@/lib/google-ads";

/**
 * Passion's "Start your visit / See if it's right for you" CTA.
 *
 * Identical mechanics to the Hot Sauce IntakeLink (bare URL on first paint,
 * attribution-enriched href after hydration) — it just points at the Passion
 * intake channel (PASSION_INTAKE_URL) instead. Attribution forwarding for the
 * female line lives in exactly this one place.
 */
export function IntakeLink({
  children,
  onClick,
  ...props
}: Omit<ButtonLinkProps, "href">) {
  const [href, setHref] = useState(PASSION_INTAKE_URL);

  useEffect(() => {
    setHref(withAttribution(PASSION_INTAKE_URL));
  }, []);

  return (
    <ButtonLink
      href={href}
      onClick={(e) => {
        trackBeginConsultation();
        onClick?.(e);
      }}
      {...props}
    >
      {children}
    </ButtonLink>
  );
}
