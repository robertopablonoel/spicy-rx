import { redirect } from "next/navigation";
import { RIMO_INTAKE_URL } from "@/lib/constants";

/**
 * Legacy /consult route. Redirects to the Rimo-hosted intake surface.
 *
 * The previous on-site intake form was a stub written before Rimo
 * provisioned the SpicyRx-branded sales channel. Now that
 * `my.spicyrx.com/intake/sh-rhdbd4` is live, the canonical intake path
 * is external — but we keep this route as a redirect so any deep links
 * (emails, ads, prior shares) still land users in the right place.
 *
 * Server-side redirect via `next/navigation` — Next.js renders a 307.
 */
export default function ConsultRedirect() {
  redirect(RIMO_INTAKE_URL);
}
