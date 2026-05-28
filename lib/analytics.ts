"use client";

/**
 * PostHog client wrapper.
 *
 * `initPostHog()` is idempotent and safe to call before the env var is set —
 * if `NEXT_PUBLIC_POSTHOG_KEY` is missing it no-ops and logs a console
 * warning once. Every other helper is a thin pass-through that also no-ops
 * when the client isn't initialized.
 *
 * PHI safety: never call `identify()` from marketing surfaces. Patient
 * identity lives in Rimo, not here. If we ever capture intake-completion
 * events, they must use anonymous IDs derived from non-PHI signals only.
 */

import posthog from "posthog-js";

const KEY = process.env.NEXT_PUBLIC_POSTHOG_KEY;
const HOST =
  process.env.NEXT_PUBLIC_POSTHOG_HOST ?? "https://us.i.posthog.com";

let initialized = false;
let warnedMissingKey = false;

export function initPostHog(): void {
  if (initialized) return;
  if (typeof window === "undefined") return;
  if (!KEY) {
    if (!warnedMissingKey) {
      console.info(
        "[posthog] NEXT_PUBLIC_POSTHOG_KEY not set — analytics disabled.",
      );
      warnedMissingKey = true;
    }
    return;
  }
  posthog.init(KEY, {
    api_host: HOST,
    // App Router needs manual pageview capture (see PostHogProvider).
    capture_pageview: false,
    capture_pageleave: true,
    person_profiles: "identified_only",
    autocapture: {
      // Capture clicks + form submits. Don't capture keystrokes / focus.
      dom_event_allowlist: ["click", "submit"],
    },
    // PHI safety: never mask text or attributes by default, but never
    // call `identify()` from marketing surfaces either.
    mask_all_text: false,
    mask_all_element_attributes: false,
  });
  initialized = true;
}

export function trackEvent(
  name: string,
  properties?: Record<string, unknown>,
): void {
  if (!initialized) return;
  posthog.capture(name, properties);
}

export function capturePageview(path: string): void {
  if (!initialized) return;
  posthog.capture("$pageview", { $current_url: path });
}

export { posthog };
