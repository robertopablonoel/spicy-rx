import { CTAButton } from "@/components/CTAButton";
import { BRAND_NAME, PRODUCT_TAGLINE } from "@/lib/constants";

export function Hero() {
  return (
    <section className="border-b border-border bg-background">
      <div className="mx-auto flex max-w-6xl flex-col items-start gap-8 px-6 py-24 sm:py-32 lg:px-8">
        <p className="text-sm font-medium uppercase tracking-[0.18em] text-primary">
          {BRAND_NAME}
        </p>
        <h1 className="max-w-3xl text-5xl font-semibold leading-[1.05] tracking-tight text-foreground sm:text-6xl lg:text-7xl">
          {PRODUCT_TAGLINE}
        </h1>
        <p className="max-w-xl text-lg leading-relaxed text-muted-foreground sm:text-xl">
          Hot Sauce is a sublingual ED medication prescribed online by licensed
          clinicians. <em>No clinics, no insurance forms, no awkward
          waiting rooms.</em> Just the medicine, the consult, and discreet
          delivery to your door.
        </p>
        <div className="mt-2">
          <CTAButton location="hero" />
        </div>
      </div>
    </section>
  );
}
