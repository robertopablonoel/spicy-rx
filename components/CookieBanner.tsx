"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { initPostHog } from "@/lib/posthog";

const CONSENT_KEY = "spicyrx-analytics-consent";

/**
 * Lightweight cookie/consent banner.
 *
 * On first visit, prompts the user to accept or decline analytics. Choice
 * is stored in localStorage. PostHog is only initialized after explicit
 * acceptance — no events fire pre-consent.
 *
 * Telehealth sites attract privacy scrutiny; this should ship on day one.
 */
export function CookieBanner() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem(CONSENT_KEY);
    if (consent === "accepted") {
      initPostHog();
    } else if (consent !== "declined") {
      setShow(true);
    }
  }, []);

  function accept() {
    localStorage.setItem(CONSENT_KEY, "accepted");
    initPostHog();
    setShow(false);
  }

  function decline() {
    localStorage.setItem(CONSENT_KEY, "declined");
    setShow(false);
  }

  if (!show) return null;

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label="Cookie consent"
      className="fixed inset-x-4 bottom-4 z-50 rounded-lg border border-border bg-background p-6 shadow-lg sm:inset-x-auto sm:bottom-6 sm:left-6 sm:max-w-md"
    >
      <p className="text-sm text-foreground">
        We use analytics cookies to understand how the site is used. No health
        information is collected here. You can decline without affecting the
        service.
      </p>
      <div className="mt-4 flex gap-3">
        <Button onClick={accept} className="flex-1">
          Accept
        </Button>
        <Button onClick={decline} variant="outline" className="flex-1">
          Decline
        </Button>
      </div>
    </div>
  );
}
