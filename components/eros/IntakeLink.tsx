"use client";

import { useEffect, useState } from "react";
import { ButtonLink, type ButtonLinkProps } from "@/components/ui/button";
import { EROS_INTAKE_URL } from "@/lib/constants";
import { withAttribution } from "@/lib/attribution";

/**
 * Eros's "See if it's right for you / Start your visit" CTA.
 *
 * Identical mechanics to the Hot Sauce / Passion IntakeLink (bare URL on first
 * paint, attribution-enriched href after hydration) — it just points at the
 * Eros intake channel (EROS_INTAKE_URL) instead. Plain withAttribution only:
 * NO A/B arms, NO utm_term. Attribution forwarding for the Eros line lives in
 * exactly this one place.
 */
export function IntakeLink({
  children,
  ...props
}: Omit<ButtonLinkProps, "href">) {
  const [href, setHref] = useState(EROS_INTAKE_URL);

  useEffect(() => {
    setHref(withAttribution(EROS_INTAKE_URL));
  }, []);

  return (
    <ButtonLink href={href} {...props}>
      {children}
    </ButtonLink>
  );
}
