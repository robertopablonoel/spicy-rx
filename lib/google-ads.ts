"use client";

import { GOOGLE_ADS_ID, GOOGLE_ADS_CONSULT_LABEL } from "@/lib/constants";

/**
 * Google Ads conversion helpers.
 *
 * The base tag (gtag.js + `gtag('config', AW-…)`) is loaded site-wide by
 * `components/analytics/GoogleAds.tsx`, which defines the global `gtag`
 * pushing into `window.dataLayer`. This module just fires conversion events
 * against that global — no-op-safe (mirrors lib/analytics.ts) so nothing
 * throws before the tag has loaded or when the conversion label isn't set.
 */

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

let warnedMissingLabel = false;

/**
 * Fire the upper-funnel "Begin Consultation" conversion when a user clicks a
 * CTA into the Rimo intake. Uses beacon transport because the click triggers
 * a same-tab navigation off to my.spicyrx.com — a normal XHR beacon would be
 * cancelled on unload and the conversion lost.
 *
 * Safe to call unconditionally: returns early if gtag hasn't loaded, the
 * Ads ID is unset, or the conversion label hasn't been pasted in yet.
 */
export function trackBeginConsultation(): void {
  if (typeof window === "undefined") return;
  if (typeof window.gtag !== "function") return;
  if (!GOOGLE_ADS_ID) return;
  if (!GOOGLE_ADS_CONSULT_LABEL) {
    if (!warnedMissingLabel) {
      console.info(
        "[google-ads] NEXT_PUBLIC_GOOGLE_ADS_CONSULT_LABEL not set — " +
          "begin-consultation conversion disabled (base tag still active).",
      );
      warnedMissingLabel = true;
    }
    return;
  }
  window.gtag("event", "conversion", {
    send_to: `${GOOGLE_ADS_ID}/${GOOGLE_ADS_CONSULT_LABEL}`,
    transport_type: "beacon",
  });
}
