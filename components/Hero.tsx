import { CTAButton } from "@/components/CTAButton";
import { BRAND_NAME, PRODUCT_TAGLINE } from "@/lib/constants";

export function Hero() {
  return (
    <section className="border-b border-border bg-background">
      <div className="mx-auto flex max-w-6xl flex-col items-start gap-8 px-6 py-20 sm:py-28 lg:px-8">
        <p className="text-sm font-medium uppercase tracking-widest text-muted-foreground">
          {BRAND_NAME}
        </p>
        <h1 className="max-w-2xl text-4xl font-semibold leading-tight tracking-tight text-foreground sm:text-5xl lg:text-6xl">
          {PRODUCT_TAGLINE}
        </h1>
        <p className="max-w-xl text-lg leading-relaxed text-muted-foreground">
          Quattro is a sublingual ED medication prescribed online by licensed
          clinicians. No clinic visits. No insurance hassle. Delivered to your
          door.
        </p>
        <CTAButton location="hero" />
      </div>
    </section>
  );
}
