import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LegalPage } from "@/components/legal/LegalPage";

/**
 * /pages/[slug] — Shopify-style URLs for the two "informational" documents:
 *   /pages/telehealth-consent
 *   /pages/compliance
 */
const SLUGS = {
  "telehealth-consent": {
    title: "Telehealth Consent",
    description:
      "Informed consent for the use of telehealth services through the SpicyRx platform, including ED-specific risk disclosures.",
  },
  compliance: {
    title: "Compliance & State Availability",
    description:
      "Where SpicyRx services are available, our synchronous-visit states, and our pharmacy and provider network.",
  },
} as const;

type Slug = keyof typeof SLUGS;

export function generateStaticParams() {
  return Object.keys(SLUGS).map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  if (!(slug in SLUGS)) return {};
  const meta = SLUGS[slug as Slug];
  return { title: meta.title, description: meta.description };
}

export default async function InfoPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  if (!(slug in SLUGS)) notFound();
  return <LegalPage file={`${slug}.md`} />;
}
