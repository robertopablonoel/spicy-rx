"use client";

import { useState } from "react";
import { RIMO_PORTAL_URL } from "@/lib/constants";
import { StateRestrictionNotice } from "@/components/StateRestrictionNotice";
import { isBlocked } from "@/lib/state-restrictions";

interface Pack {
  size: number;
  price: number;
  badge?: string;
}

/**
 * Pack tiers for Hot Sauce. Pricing is real (per Cole 2026-05-26):
 *   5-pack $99 / 10-pack $119 / 20-pack $199
 *
 * The 20-pack delivers ~50% lower per-dose cost vs the 5-pack;
 * the "Best value" badge anchors that contrast. 10-pack defaults
 * (middle option, most-popular pattern).
 */
const PACKS: Pack[] = [
  { size: 5, price: 99 },
  { size: 10, price: 119, badge: "Most popular" },
  { size: 20, price: 199, badge: "Best value" },
];

const DEFAULT_INDEX = 1;

interface PackSelectorProps {
  /** State code read from proxy headers in the parent server component. */
  userState: string | null;
}

export function PackSelector({ userState }: PackSelectorProps) {
  const [selectedIdx, setSelectedIdx] = useState(DEFAULT_INDEX);

  if (isBlocked(userState)) {
    return <StateRestrictionNotice state={userState ?? ""} />;
  }

  const selected = PACKS[selectedIdx];
  const perDose = selected.price / selected.size;

  return (
    <div className="space-y-6">
      <div role="radiogroup" aria-label="Pack size" className="space-y-3">
        {PACKS.map((pack, i) => {
          const isSelected = i === selectedIdx;
          const packPerDose = pack.price / pack.size;
          return (
            <button
              key={pack.size}
              role="radio"
              aria-checked={isSelected}
              onClick={() => setSelectedIdx(i)}
              className={`group w-full rounded-2xl border-2 px-5 py-4 text-left transition-all ${
                isSelected
                  ? "border-primary bg-secondary shadow-sm"
                  : "border-border bg-card hover:border-primary/40"
              }`}
            >
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <span
                    className={`flex h-5 w-5 items-center justify-center rounded-full border-2 ${
                      isSelected
                        ? "border-primary"
                        : "border-muted-foreground/40"
                    }`}
                  >
                    {isSelected && (
                      <span className="h-2.5 w-2.5 rounded-full bg-primary" />
                    )}
                  </span>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-base font-semibold text-foreground">
                        {pack.size}-Pack
                      </span>
                      {pack.badge && (
                        <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-primary">
                          {pack.badge}
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground">
                      ${packPerDose.toFixed(2)} per dose
                    </p>
                  </div>
                </div>
                <span className="text-lg font-semibold text-foreground tabular-nums">
                  ${pack.price}
                </span>
              </div>
            </button>
          );
        })}
      </div>

      <a
        href={RIMO_PORTAL_URL}
        data-cta-location="hot_sauce_pdp"
        data-pack-size={selected.size}
        className="inline-flex h-14 w-full items-center justify-center rounded-full bg-primary px-8 text-sm font-bold uppercase tracking-wider text-primary-foreground transition-colors hover:bg-accent"
      >
        Start consultation — ${selected.price}
      </a>

      <p className="text-center text-xs text-muted-foreground">
        Prescription required. ${perDose.toFixed(2)} per dose. No charge if
        not prescribed.
      </p>
    </div>
  );
}
