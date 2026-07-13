"use client";

import { useEffect, useRef, useState } from "react";
import { ButtonLink, type ButtonLinkProps } from "@/components/ui/button";
import { RIMO_INTAKE_URL } from "@/lib/constants";
import { persistFormArm, withAttribution } from "@/lib/attribution";
import { getOrAssignFormArm } from "@/lib/form-ab";
import {
  intakeUrlForArm,
  withArmTerm,
  type FormArm,
} from "@/lib/form-ab-shared";

/**
 * The primary "Start consultation / See if you qualify" CTA.
 *
 * Renders the bare Rimo intake URL on first paint, then — after mount,
 * client-side — sticky-assigns the visitor's A/B form arm (which decides
 * WHICH Rimo intake the href points at; see lib/form-ab.ts) and rewrites
 * the href to include captured attribution params (fbclid / gclid / utm_*)
 * plus the arm's utm_term when free. A user can't click before React
 * hydrates, so the enriched href is reliably in place by the time anyone
 * clicks — and the assignment must be resolved at mount, not on click,
 * because middle-click / cmd-click / copy-link navigate straight off the
 * href without firing onClick.
 *
 * onClick re-asserts the arm cookie synchronously at the redirect instant
 * (Cole's spec) so the cohort is durably in the `.spicyrx.com` cookie when
 * the visitor lands on my.spicyrx.com.
 *
 * Use this everywhere a CTA sends the user into the Rimo teleform, so
 * attribution forwarding and arm assignment live in exactly one place.
 */
export function IntakeLink({
  children,
  onClick,
  ...props
}: Omit<ButtonLinkProps, "href">) {
  const [href, setHref] = useState(RIMO_INTAKE_URL);
  const armRef = useRef<FormArm | null>(null);

  useEffect(() => {
    const arm = getOrAssignFormArm();
    armRef.current = arm;
    setHref(withArmTerm(withAttribution(intakeUrlForArm(arm)), arm));
  }, []);

  return (
    <ButtonLink
      href={href}
      onClick={(event) => {
        if (armRef.current) persistFormArm(armRef.current);
        onClick?.(event);
      }}
      {...props}
    >
      {children}
    </ButtonLink>
  );
}
