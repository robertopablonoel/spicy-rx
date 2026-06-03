import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { RIMO_INTAKE_URL } from "@/lib/constants";
import { PARAM_KEYS, COOKIE_NAME } from "@/lib/attribution-constants";

/**
 * Legacy /consult route — redirects to the Rimo-hosted intake.
 *
 * Forwards attribution so a deep link like
 * `/consult?fbclid=…&utm_source=…` (e.g. an ad pointed straight here)
 * carries its click-IDs into the Rimo teleform. Two sources, in order:
 *   1. params on /consult's own URL (a fresh ad click landing here)
 *   2. the `.spicyrx.com` attribution cookie (set on an earlier landing)
 * Anything already on the URL wins over the cookie.
 *
 * Server-side redirect → Next.js renders a 307.
 */
export default async function ConsultRedirect({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const sp = await searchParams;
  const target = new URL(RIMO_INTAKE_URL);

  // 1) Attribution params present on /consult's own URL.
  for (const key of PARAM_KEYS) {
    const value = sp[key];
    if (typeof value === "string" && value) {
      target.searchParams.set(key, value);
    }
  }

  // 2) Fall back to the attribution cookie for anything not already set.
  const cookieValue = (await cookies()).get(COOKIE_NAME)?.value;
  if (cookieValue) {
    try {
      const stored: Record<string, unknown> = JSON.parse(
        decodeURIComponent(cookieValue),
      );
      for (const [key, value] of Object.entries(stored)) {
        if (!target.searchParams.has(key) && typeof value === "string") {
          target.searchParams.set(key, value);
        }
      }
    } catch {
      // malformed cookie — ignore, redirect without it
    }
  }

  redirect(target.toString());
}
