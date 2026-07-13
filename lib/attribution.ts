"use client";

/**
 * Cross-domain attribution capture & forwarding.
 *
 * The marketing site (spicyrx.com) and the Rimo teleform (my.spicyrx.com)
 * are different surfaces. To attribute a conversion that fires on Rimo back
 * to the ad click that started here, we:
 *
 *   1. CAPTURE the ad click-IDs + UTMs from the landing URL.
 *   2. PERSIST them (sessionStorage for same-session forwarding; a
 *      `.spicyrx.com` cookie so the Rimo subdomain can also read them).
 *   3. FORWARD them onto the Rimo intake URL when the user clicks a CTA.
 *
 * Rimo then reports the conversion back to Meta/Google with the click-ID
 * attached, closing the attribution loop.
 *
 * Last-touch model: a fresh visit carrying click-IDs replaces the stored
 * context (the most recent ad click is the one the platform will match).
 * A visit with no attribution params leaves the prior context untouched.
 */

import {
  PARAM_KEYS,
  STORAGE_KEY,
  COOKIE_NAME,
  COOKIE_MAX_AGE,
  FORM_ARM_KEY,
} from "@/lib/attribution-constants";

type Attribution = Record<string, string>;

/**
 * Scope the cookie to `.spicyrx.com` in production so the Rimo subdomain
 * (my.spicyrx.com) can read it directly. On localhost / *.vercel.app the
 * apex domain doesn't apply, so fall back to a host-only cookie — the
 * URL-forwarding path (withAttribution) still works there regardless.
 */
function cookieDomainAttr(): string {
  if (typeof window === "undefined") return "";
  const host = window.location.hostname;
  return host === "spicyrx.com" || host.endsWith(".spicyrx.com")
    ? "; Domain=.spicyrx.com"
    : "";
}

export function captureAttribution(): void {
  if (typeof window === "undefined") return;

  const incoming: Attribution = {};
  const params = new URL(window.location.href).searchParams;
  for (const key of PARAM_KEYS) {
    const value = params.get(key);
    if (value) incoming[key] = value;
  }

  // No attribution params on this visit → keep whatever we already had.
  if (Object.keys(incoming).length === 0) return;

  // The A/B form arm is sticky, not last-touch: carry it across the
  // snapshot replacement so a later UTM-carrying visit can't wipe the
  // visitor's assigned arm. Read it from the cookie (not sessionStorage)
  // — the cookie is the arm's source of truth across sessions.
  const arm = readCookieAttribution()[FORM_ARM_KEY];
  if (arm) incoming[FORM_ARM_KEY] = arm;

  const serialized = JSON.stringify(incoming);
  try {
    sessionStorage.setItem(STORAGE_KEY, serialized);
  } catch {
    // sessionStorage can throw in private mode / when full — cookie still set.
  }
  document.cookie =
    `${COOKIE_NAME}=${encodeURIComponent(serialized)}` +
    `; Path=/; Max-Age=${COOKIE_MAX_AGE}; SameSite=Lax${cookieDomainAttr()}`;
}

function readCookieAttribution(): Attribution {
  if (typeof window === "undefined") return {};
  const match = document.cookie.match(
    new RegExp(`(?:^|; )${COOKIE_NAME}=([^;]*)`),
  );
  if (match) {
    try {
      return JSON.parse(decodeURIComponent(match[1]));
    } catch {
      return {};
    }
  }
  return {};
}

export function getStoredAttribution(): Attribution {
  if (typeof window === "undefined") return {};

  try {
    const fromSession = sessionStorage.getItem(STORAGE_KEY);
    if (fromSession) return JSON.parse(fromSession);
  } catch {
    // fall through to cookie
  }

  return readCookieAttribution();
}

/**
 * The visitor's sticky A/B form arm, read straight from the cookie — the
 * cookie (not sessionStorage) is the arm's source of truth, so a stale
 * same-session snapshot written before assignment can't shadow it.
 */
export function getStoredFormArm(): string | undefined {
  return readCookieAttribution()[FORM_ARM_KEY];
}

/**
 * Write the A/B form arm into the attribution cookie (and mirror it into
 * the sessionStorage snapshot) SYNCHRONOUSLY. Called at assignment and
 * re-asserted in the CTA's onClick, so the arm is durably in the
 * `.spicyrx.com` cookie the instant the redirect to Rimo happens.
 */
export function persistFormArm(arm: string): void {
  if (typeof window === "undefined") return;

  const forCookie = { ...readCookieAttribution(), [FORM_ARM_KEY]: arm };
  document.cookie =
    `${COOKIE_NAME}=${encodeURIComponent(JSON.stringify(forCookie))}` +
    `; Path=/; Max-Age=${COOKIE_MAX_AGE}; SameSite=Lax${cookieDomainAttr()}`;

  try {
    const fromSession = sessionStorage.getItem(STORAGE_KEY);
    const forSession = {
      ...(fromSession ? JSON.parse(fromSession) : {}),
      [FORM_ARM_KEY]: arm,
    };
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(forSession));
  } catch {
    // sessionStorage unavailable / malformed snapshot — cookie already set.
  }
}

/**
 * Read attribution params straight off the current URL. Used as a fallback
 * so forwarding doesn't depend on captureAttribution() having run first —
 * on a first visit React fires child effects before the parent Providers
 * effect, so a CTA can resolve its href before the landing params are
 * persisted. Reading live params here closes that race (and also catches
 * click-IDs that arrive on an SPA route transition).
 */
function liveAttribution(): Attribution {
  if (typeof window === "undefined") return {};
  const live: Attribution = {};
  const params = new URL(window.location.href).searchParams;
  for (const key of PARAM_KEYS) {
    const value = params.get(key);
    if (value) live[key] = value;
  }
  return live;
}

/**
 * Append stored attribution params to a destination URL (the Rimo intake).
 * Stored (persisted last-touch) context wins; live URL params fill any gaps
 * so a first-visit click still forwards before capture has persisted them.
 * Existing params on the URL are not overwritten. Only PARAM_KEYS are
 * forwarded — internal fields in the snapshot (the A/B `form_arm`) never
 * leak onto the URL; the arm rides utm_term via lib/form-ab-shared instead.
 */
export function withAttribution(url: string): string {
  const merged = { ...liveAttribution(), ...getStoredAttribution() };
  try {
    const target = new URL(url);
    for (const key of PARAM_KEYS) {
      const value = merged[key];
      if (value && !target.searchParams.has(key)) {
        target.searchParams.set(key, value);
      }
    }
    return target.toString();
  } catch {
    return url;
  }
}
