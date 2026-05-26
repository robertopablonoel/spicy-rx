import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { STATE_HEADER } from "@/lib/constants";

/**
 * Edge middleware: reads visitor's US state from Vercel geolocation headers
 * and attaches it as a downstream-readable header so server components can
 * gate CTAs by state without re-doing the IP lookup.
 *
 * On Vercel, the relevant header is `x-vercel-ip-country-region`.
 * In local dev (and on other hosts) it will be absent — components must
 * tolerate `null` and default to showing the CTA.
 */
export function proxy(request: NextRequest) {
  const state =
    request.headers.get("x-vercel-ip-country-region") ?? "";

  const response = NextResponse.next();
  if (state) {
    response.headers.set(STATE_HEADER, state.toUpperCase());
  }
  return response;
}

export const config = {
  matcher: [
    // Run on all paths except Next internals, static assets, and the favicon.
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:png|jpg|jpeg|gif|svg|webp|ico)).*)",
  ],
};
