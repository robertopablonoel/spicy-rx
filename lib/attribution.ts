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

export function getStoredAttribution(): Attribution {
  if (typeof window === "undefined") return {};

  try {
    const fromSession = sessionStorage.getItem(STORAGE_KEY);
    if (fromSession) return JSON.parse(fromSession);
  } catch {
    // fall through to cookie
  }

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

/**
 * Append stored attribution params to a destination URL (the Rimo intake).
 * Existing params on the URL are not overwritten.
 */
export function withAttribution(url: string): string {
  const stored = getStoredAttribution();
  if (Object.keys(stored).length === 0) return url;
  try {
    const target = new URL(url);
    for (const [key, value] of Object.entries(stored)) {
      if (!target.searchParams.has(key)) target.searchParams.set(key, value);
    }
    return target.toString();
  } catch {
    return url;
  }
}
