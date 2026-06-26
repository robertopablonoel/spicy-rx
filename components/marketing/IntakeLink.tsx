"use client";

import { useEffect, useState } from "react";
import { ButtonLink, type ButtonLinkProps } from "@/components/ui/button";
import { RIMO_INTAKE_URL } from "@/lib/constants";
import { withAttribution } from "@/lib/attribution";
import { trackBeginConsultation } from "@/lib/google-ads";

/**
 * The primary "Start consultation / See if you qualify" CTA.
 *
 * Renders the bare Rimo intake URL on first paint, then — after mount,
 * client-side — rewrites the href to include captured attribution params
 * (fbclid / gclid / utm_*). A user can't click before React hydrates, so
 * the enriched href is reliably in place by the time anyone clicks.
 *
 * Use this everywhere a CTA sends the user into the Rimo teleform, so
 * attribution forwarding lives in exactly one place.
 */
export function IntakeLink({
  children,
  onClick,
  ...props
}: Omit<ButtonLinkProps, "href">) {
  const [href, setHref] = useState(RIMO_INTAKE_URL);

  useEffect(() => {
    setHref(withAttribution(RIMO_INTAKE_URL));
  }, []);

  return (
    <ButtonLink
      href={href}
      onClick={(e) => {
        // Upper-funnel "Begin Consultation" conversion (beacon transport, so
        // it survives the navigation to Rimo). No-ops until the Ads label is set.
        trackBeginConsultation();
        onClick?.(e);
      }}
      {...props}
    >
      {children}
    </ButtonLink>
  );
}
