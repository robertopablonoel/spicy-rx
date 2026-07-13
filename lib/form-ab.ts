"use client";

/**
 * Form A/B test — client-side sticky assignment.
 *
 * Assignment rules (Cole's spec + rx-datachain fleet msg #102):
 *   - STICKY: an existing `form_arm` in the spicyrx_attribution cookie
 *     always wins; a visitor is assigned exactly once.
 *   - 50/50 at first need (when a CTA resolves its destination).
 *   - The arm is persisted into the `.spicyrx.com` cookie synchronously at
 *     assignment (and re-asserted on click), so it survives the hop to
 *     my.spicyrx.com and the order-token join can see it.
 *   - A `form_ab_assigned` PostHog event fires ONCE per assignment — the
 *     denominator for the test (counts assigned visitors who never start
 *     the form, which Rimo exports alone can't see).
 */

import { initPostHog, trackEvent } from "@/lib/analytics";
import {
  getStoredAttribution,
  getStoredFormArm,
  persistFormArm,
} from "@/lib/attribution";
import { isFormArm, pickRandomArm, type FormArm } from "@/lib/form-ab-shared";

export function getOrAssignFormArm(): FormArm {
  const stored = getStoredFormArm();
  if (isFormArm(stored)) return stored;

  const arm = pickRandomArm();
  persistFormArm(arm);

  // React runs child effects before the parent Providers effect, so a CTA
  // can assign before initPostHog() has run — init here (idempotent) so the
  // denominator event is never dropped on a first visit.
  initPostHog();
  const { sc_order } = getStoredAttribution();
  trackEvent("form_ab_assigned", {
    form_arm: arm,
    ...(sc_order ? { sc_order } : {}),
  });

  return arm;
}
