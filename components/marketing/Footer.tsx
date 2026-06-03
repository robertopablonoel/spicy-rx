import Image from "next/image";
import Link from "next/link";
import { BRAND_NAME, LEGAL_ENTITY } from "@/lib/constants";
import { Pill } from "@/components/ui/pill";

const LEGAL_LINKS = [
  { href: "/policies/privacy-policy", label: "Privacy Policy" },
  { href: "/policies/terms-of-service", label: "Terms of Service" },
  { href: "/policies/refund-policy", label: "Refund Policy" },
  { href: "/pages/telehealth-consent", label: "Telehealth Consent" },
  { href: "/pages/compliance", label: "Compliance" },
];

/**
 * Cosmos-background footer.
 *
 *   Row 1: brand mark + product disclosure + Rx pill | Legal column
 *   Row 2: Medical Provider Partners disclosure (full-width band)
 *   Row 3: mono copyright + batch readout
 */
export function Footer({
  logoSrc = "/brand/logo-mark.svg",
}: {
  /** Override the brand mark — e.g. the plasma-pink variant on /passion. */
  logoSrc?: string;
} = {}) {
  return (
    <footer className="border-t border-ash bg-cosmos">
      <div className="mx-auto max-w-[var(--container-max)] px-5 pt-16 pb-8 md:px-10">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-[2fr_1fr] md:gap-12">
          <div>
            <div className="mb-4 flex items-center gap-2.5">
              <Image
                src={logoSrc}
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

        {/*
          Medical Provider Partners disclosure — full-width band. Required
          regulatory disclosure that SpicyRx itself doesn't provide
          consultations; care is delivered by the partner medical group.
        */}
        <div className="mt-12 max-w-[820px] border-t border-ash pt-8">
          <p className="mb-3 font-[family-name:var(--font-mono)] text-[11px] font-medium uppercase tracking-[0.14em] text-ember">
            Medical Provider Partners
          </p>
          <p className="text-[13px] leading-[1.55] text-fog">
            We are partnered with{" "}
            <a
              href="https://drtelx.com/"
              target="_blank"
              rel="noopener"
              className="text-mist underline decoration-mist/40 underline-offset-4 transition-colors hover:text-fg hover:decoration-fg"
            >
              DrTelx
            </a>
            , an independent telehealth medical group, to bring the best
            product and overall experience to our membership. Our team meets
            regularly with pharmacies to discuss any product shortages,
            shipping delays, and updated reports on their medication testing.
          </p>
        </div>

        <div className="mt-10 border-t border-ash pt-6 font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-[0.1em] text-fog">
          <span>© {new Date().getFullYear()} {LEGAL_ENTITY}</span>
        </div>
      </div>
    </footer>
  );
}
