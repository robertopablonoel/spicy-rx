import Image from "next/image";
import Link from "next/link";
import { BRAND_NAME } from "@/lib/constants";
import { Pill } from "@/components/ui/pill";

const LEGAL_LINKS = [
  { href: "/policies/privacy-policy", label: "Privacy Policy" },
  { href: "/policies/terms-of-service", label: "Terms of Service" },
  { href: "/policies/refund-policy", label: "Refund Policy" },
  { href: "/pages/telehealth-consent", label: "Telehealth Consent" },
  { href: "/pages/compliance", label: "Compliance" },
];

/**
 * Cosmos-background footer. Brand mark + disclosure copy + Rx/LegitScript
 * pills on the left; a single Legal column on the right linking to the
 * five compliance pages. Bottom rail has the mono batch readout.
 *
 * Non-compliance link columns (Product / Company / placeholder Legal) were
 * removed pending real destinations.
 */
export function Footer() {
  return (
    <footer className="border-t border-ash bg-cosmos">
      <div className="mx-auto max-w-[var(--container-max)] px-5 pt-16 pb-8 md:px-10">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-[2fr_1fr] md:gap-12">
          <div>
            <div className="mb-4 flex items-center gap-2.5">
              <Image
                src="/brand/logo-mark.svg"
                alt=""
                width={28}
                height={34}
              />
              <span className="font-[family-name:var(--font-display)] text-[17px] font-bold tracking-[-0.02em] text-fg">
                {BRAND_NAME.toUpperCase()}
              </span>
            </div>
            <p className="max-w-[460px] text-[13px] leading-[1.55] text-fog">
              Compounded medications, prescribed only after a licensed-clinician
              review. Not for use in patients taking nitrates. Side effects may
              include headache, flushing, and dyspepsia.
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              <Pill tone="ember">Rx ONLY</Pill>
              <Pill tone="fog">LegitScript verified</Pill>
            </div>
          </div>

          <div>
            <p className="mb-4 font-[family-name:var(--font-mono)] text-[11px] font-medium uppercase tracking-[0.14em] text-ember">
              Legal
            </p>
            <div className="flex flex-col gap-3">
              {LEGAL_LINKS.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className="text-sm text-mist transition-colors hover:text-fg"
                >
                  {l.label}
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-ash pt-6 font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-[0.1em] text-fog md:flex-row md:items-center md:justify-between">
          <span>© {new Date().getFullYear()} {BRAND_NAME.toUpperCase()} Inc.</span>
          <span>Batch 0042 · [REVIEW: licensed states]</span>
        </div>
      </div>
    </footer>
  );
}
