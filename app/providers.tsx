"use client";

import { Suspense, useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { capturePageview, initPostHog } from "@/lib/analytics";
import { captureAttribution } from "@/lib/attribution";

/**
 * Root client provider — initializes PostHog and manually captures
 * pageviews on App Router route changes.
 *
 * App Router doesn't fire a browser navigation event between client-side
 * route transitions, so PostHog's auto-pageview misses them. We listen
 * to `usePathname` + `useSearchParams` and call `capturePageview()`
 * whenever either changes.
 *
 * `useSearchParams` requires Suspense per Next.js docs; the inner
 * <PostHogPageviews /> component is wrapped accordingly.
 */
export function Providers({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    initPostHog();
    // Capture ad click-IDs + UTMs from the landing URL on first load,
    // so CTA clicks can forward them to the Rimo intake.
    captureAttribution();
  }, []);

  return (
    <>
      <Suspense fallback={null}>
        <PostHogPageviews />
      </Suspense>
      {children}
    </>
  );
}

function PostHogPageviews() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (!pathname) return;
    const url =
      searchParams && searchParams.toString().length > 0
        ? `${pathname}?${searchParams.toString()}`
        : pathname;
    capturePageview(url);
  }, [pathname, searchParams]);

  return null;
}
