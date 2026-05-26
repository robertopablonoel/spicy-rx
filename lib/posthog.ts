"use client";

/**
 * PostHog client initialization.
 *
 * Init is gated on cookie-banner consent — PostHog is only loaded after the
 * user accepts. Until then, no analytics fire and no events are queued.
 *
 * Usage:
 *   import { initPostHog } from "@/lib/posthog";
 *   initPostHog();  // called from CookieBanner after consent
 */

import posthog from "posthog-js";

const KEY = process.env.NEXT_PUBLIC_POSTHOG_KEY;
const HOST =
  process.env.NEXT_PUBLIC_POSTHOG_HOST ?? "https://us.i.posthog.com";

let initialized = false;

export function initPostHog(): void {
  if (initialized) return;
  if (typeof window === "undefined") return;
  if (!KEY) {
    console.warn("PostHog key missing; analytics disabled.");
    return;
  }
  posthog.init(KEY, {
    api_host: HOST,
    person_profiles: "identified_only",
    capture_pageview: true,
    capture_pageleave: true,
    // PHI safety: never auto-capture form fields or input values.
    autocapture: {
      dom_event_allowlist: ["click", "submit"],
    },
    mask_all_text: false,
    mask_all_element_attributes: false,
  });
  initialized = true;
}

export { posthog };
