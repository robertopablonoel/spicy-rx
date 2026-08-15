/**
 * Destination-split A/B test — `spicyrx.com/go/<surface>` (typ | halo).
 *
 * Same attribution machinery as the affiliate vanity redirects (lib/affiliates.ts):
 * a short own-domain link 307-redirects to a destination with UTMs stamped, AND writes
 * the `.spicyrx.com` attribution cookie server-side (in middleware) so the source
 * survives a VPN/privacy-browser utm_* strip. The difference: SpicyRx OWNS the
 * assignment here. The Spicy Cubes surfaces (thank-you extension, halo theme) point at
 * these two stable entry URLs and never change again; this side decides control vs /eros,
 * mints the UTMs post-landing, and logs the arm.
 *
 * Experiment `spicyrx-destination-2026-08`, 50/50:
 *   control → DEST_CONTROL_URL (https://www.spicyrx.com/)      — current destination
 *   eros    → DEST_EROS_URL    (https://www.spicyrx.com/eros)  — new treatment page
 *
 * Assignment is COOKIE-STICKY and INDEPENDENT PER SURFACE (Cole's call): a first-party
 * `sc_dest_arm` cookie remembers each surface's arm across visits, and a visitor who hits
 * BOTH surfaces can be eros on one and control on the other (keeps per-surface analysis
 * clean). The arm is the LANDING PATH (/ vs /eros) — strip-proof; sc_dest mirrors it as a
 * forwarded param for the order-level Rimo join. One-param-one-experiment: sc_dest is
 * separate from utm_content (surface + IG halo arm t1/t2) and utm_term (form A/B arm).
 *
 * Kept directive-free so the middleware (edge) can import it.
 */

import { PARAM_KEYS, FORM_ARM_KEY } from "@/lib/attribution-constants";

export const DESTINATION_EXPERIMENT_ID = "spicyrx-destination-2026-08";

export type DestinationArm = "control" | "eros";

/** The stable per-surface entry segments: spicyrx.com/go/<surface>. */
export type DestSurface = "typ" | "halo";

const SURFACES: Record<string, DestSurface> = { typ: "typ", halo: "halo" };

/** Resolve the /go/<segment> surface, or undefined if it isn't one we own. */
export function lookupDestSurface(segment: string): DestSurface | undefined {
  return SURFACES[segment.toLowerCase()];
}

/**
 * Landing targets — on-the-fly dials (Vercel env vars, no link change), like
 * AFFILIATE_DESTINATION. Defaults: the marketing root (control) and /eros (treatment),
 * both on www so captureAttribution() runs on load and the apex 307 is avoided.
 */
export const DEST_CONTROL_URL =
  process.env.DEST_CONTROL_URL ?? "https://www.spicyrx.com/";
export const DEST_EROS_URL =
  process.env.DEST_EROS_URL ?? "https://www.spicyrx.com/eros";

/** First-party sticky-arm cookie: JSON `{ typ?: arm, halo?: arm }` — independent per surface. */
export const DEST_COOKIE_NAME = "sc_dest_arm";

/**
 * Per-surface UTM identity, MINTED server-side after the visitor lands (so the Cubes side
 * doesn't have to carry these across the seam). utm_source is the same `spicycubes` string
 * every Spicy-Cubes-origin surface uses. For halo, utm_content is NOT minted here — it
 * carries the surface + IG halo arm (e.g. `pdp__t1`), which only the theme knows, so it's
 * forwarded on the /go/halo link and folded in below.
 */
const DEST_UTM_SOURCE = "spicycubes";
const SURFACE_UTM: Record<DestSurface, { medium: string; campaign: string; content?: string }> = {
  typ: { medium: "post-purchase", campaign: "post-purchase-upsell", content: "thank-you-page" },
  halo: { medium: "halo", campaign: "halo_effect" },
};

/** 50/50 coin flip for a fresh (uncookied) surface. crypto is available in the edge runtime. */
export function coinFlipArm(): DestinationArm {
  return crypto.getRandomValues(new Uint8Array(1))[0] < 128 ? "control" : "eros";
}

/** Parse the sticky-arm cookie into `{ typ?, halo? }`; tolerant of a malformed/absent value. */
export function readDestStore(cookieValue: string | undefined): Partial<Record<DestSurface, DestinationArm>> {
  if (!cookieValue) return {};
  try {
    const parsed = JSON.parse(decodeURIComponent(cookieValue));
    const out: Partial<Record<DestSurface, DestinationArm>> = {};
    for (const s of ["typ", "halo"] as DestSurface[]) {
      if (parsed?.[s] === "control" || parsed?.[s] === "eros") out[s] = parsed[s];
    }
    return out;
  } catch {
    return {};
  }
}

/**
 * Build the fully-stamped landing URL. The arm picks the page (control → /, eros → /eros);
 * the per-surface UTMs are minted here and the visitor's inbound PARAM_KEYS (`forward` — the
 * halo surface__arm utm_content, click IDs, and sc_order) fill any remaining slots. sc_dest
 * is set to the arm (authoritative; a forwarded sc_dest can't override it).
 */
export function destinationTarget(
  surface: DestSurface,
  arm: DestinationArm,
  forward: Record<string, string>,
): URL {
  const target = new URL(arm === "eros" ? DEST_EROS_URL : DEST_CONTROL_URL);
  const cfg = SURFACE_UTM[surface];
  target.searchParams.set("utm_source", DEST_UTM_SOURCE);
  target.searchParams.set("utm_medium", cfg.medium);
  target.searchParams.set("utm_campaign", cfg.campaign);
  if (cfg.content) target.searchParams.set("utm_content", cfg.content);
  target.searchParams.set("sc_dest", arm);
  for (const key of PARAM_KEYS) {
    if (forward[key] && !target.searchParams.has(key)) {
      target.searchParams.set(key, forward[key]);
    }
  }
  return target;
}

/**
 * Attribution-cookie snapshot to write server-side on the redirect, keyed off the PATH
 * (strip-proof). Last-touch: replaces the snapshot with the minted UTMs + inbound PARAM_KEYS
 * + sc_dest(arm). The sticky form_arm is carried forward so a destination-split hit never
 * wipes the visitor's form A/B arm.
 */
export function destinationSnapshot(
  existing: Record<string, unknown>,
  surface: DestSurface,
  arm: DestinationArm,
  forward: Record<string, string>,
): Record<string, string> {
  const cfg = SURFACE_UTM[surface];
  const snapshot: Record<string, string> = {
    utm_source: DEST_UTM_SOURCE,
    utm_medium: cfg.medium,
    utm_campaign: cfg.campaign,
    sc_dest: arm,
  };
  if (cfg.content) snapshot.utm_content = cfg.content;
  for (const key of PARAM_KEYS) {
    if (!(key in snapshot) && forward[key]) snapshot[key] = forward[key];
  }
  const priorArm = existing[FORM_ARM_KEY];
  if (typeof priorArm === "string" && priorArm) snapshot[FORM_ARM_KEY] = priorArm;
  return snapshot;
}
