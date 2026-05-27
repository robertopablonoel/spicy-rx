import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LegalPage } from "@/components/legal/LegalPage";

/**
 * /policies/[slug] — Shopify-style URLs for the three "policy" documents:
 *   /policies/privacy-policy
 *   /policies/terms-of-service
 *   /policies/refund-policy
 */
const SLUGS = {
  "privacy-policy": {
    title: "Privacy Policy",
    description:
      "How Spicy Alien and its affiliated medical groups handle personal and health information under HIPAA and applicable state privacy law.",
  },
  "terms-of-service": {
    title: "Terms of Service",
    description:
      "The agreement governing your access to Spicy Alien and the affiliated medical group and pharmacy services.",
  },
  "refund-policy": {
    title: "Refund Policy",
    description:
      "Return windows, non-returnable categories, and the no-charge-if-not-prescribed guarantee.",
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

export default async function PolicyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  if (!(slug in SLUGS)) notFound();
  return <LegalPage file={`${slug}.md`} />;
}
