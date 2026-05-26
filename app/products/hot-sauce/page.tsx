import type { Metadata } from "next";
import { CTAButton } from "@/components/CTAButton";
import { Separator } from "@/components/ui/separator";

export const metadata: Metadata = {
  title: "Hot Sauce — SpicyRx",
  description:
    "Sublingual ED treatment prescribed online by licensed clinicians.",
};

export default function HotSaucePage() {
  return (
    <article className="mx-auto max-w-3xl px-6 py-20 lg:px-8">
      <p className="text-sm font-medium uppercase tracking-widest text-muted-foreground">
        Product
      </p>
      <h1 className="mt-4 text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
        Hot Sauce
      </h1>
      <p className="mt-6 text-xl leading-relaxed text-muted-foreground">
        A sublingual ED medication prescribed online and delivered to your
        door. Placed under the tongue rather than swallowed — designed for
        a different onset profile than traditional oral tablets.
      </p>

      <Separator className="my-12" />

      <section className="space-y-6">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">
          How it works
        </h2>
        <ol className="space-y-4 text-foreground/90">
          <li>
            <strong>Online consultation.</strong> Complete a brief medical
            questionnaire. A licensed clinician reviews your answers.
          </li>
          <li>
            <strong>Prescription review.</strong> If Hot Sauce is appropriate
            for you, the clinician issues a prescription through our partner
            pharmacy.
          </li>
          <li>
            <strong>Discreet delivery.</strong> Your medication ships to
            the address you provide, in plain packaging.
          </li>
        </ol>
      </section>

      <Separator className="my-12" />

      <section className="space-y-6">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">
          Is Hot Sauce right for you?
        </h2>
        {/* MEDICAL CLAIM: review — placeholder language only. Final copy
            requires Rimo medical-counsel review before launch. */}
        <p className="leading-relaxed text-foreground/90">
          Hot Sauce may not be appropriate for everyone. The consultation
          process screens for contraindications, including nitrate use and
          certain cardiovascular conditions. Final eligibility is determined
          by your reviewing clinician.
        </p>
      </section>

      <Separator className="my-12" />

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <CTAButton location="hot_sauce_product_page" />
        <p className="text-sm text-muted-foreground">
          Begins with an online consultation — no charge if not prescribed.
        </p>
      </div>
    </article>
  );
}
