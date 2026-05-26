import Link from "next/link";
import { BRAND_NAME, SUPPORT_EMAIL } from "@/lib/constants";

const policyLinks = [
  { href: "/policies/terms-of-service", label: "Terms of Service" },
  { href: "/policies/privacy-policy", label: "Privacy Policy" },
  { href: "/policies/refund-policy", label: "Refund Policy" },
  { href: "/pages/telehealth-consent", label: "Telehealth Consent" },
  { href: "/pages/compliance", label: "Compliance" },
];

const productLinks = [
  { href: "/products/hot-sauce", label: "Hot Sauce" },
  { href: "/how-it-works", label: "How it works" },
  { href: "/faq", label: "FAQ" },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto max-w-6xl px-6 py-16 lg:px-8">
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <p className="text-base font-semibold text-foreground">
              {BRAND_NAME}
            </p>
            <p className="mt-2 max-w-xs text-sm text-muted-foreground">
              Sublingual ED treatment, prescribed online by licensed
              clinicians.
            </p>
          </div>
          <div>
            <p className="text-sm font-semibold text-foreground">Product</p>
            <ul className="mt-3 space-y-2">
              {productLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-sm font-semibold text-foreground">Legal</p>
            <ul className="mt-3 space-y-2">
              {policyLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-sm font-semibold text-foreground">Support</p>
            <p className="mt-3 text-sm text-muted-foreground">
              <a
                href={`mailto:${SUPPORT_EMAIL}`}
                className="hover:text-foreground"
              >
                {SUPPORT_EMAIL}
              </a>
            </p>
            {/*
              LegitScript seal goes here once Rimo confirms certification.
              Do NOT render any verification badge until certification is in hand.
            */}
          </div>
        </div>
        <div className="mt-12 border-t border-border pt-8 text-xs text-muted-foreground">
          <p>
            © {year} {BRAND_NAME}. All rights reserved. This site does not
            provide medical advice; consult a licensed clinician for diagnosis
            and treatment.
          </p>
        </div>
      </div>
    </footer>
  );
}
