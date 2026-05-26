import { headers } from "next/headers";
import { ProductImage } from "@/components/ProductImage";
import { PackSelector } from "@/components/PackSelector";
import { BRAND_NAME, PRODUCT_TAGLINE, STATE_HEADER } from "@/lib/constants";

/**
 * Hero / product hero — the homepage IS the product page on SpicyRx.
 * Single SKU, single landing surface; everything a visitor needs to
 * understand the offer and start a consultation lives in this section.
 */
export async function Hero() {
  const h = await headers();
  const userState = h.get(STATE_HEADER);

  return (
    <section className="bg-background">
      <div className="mx-auto max-w-6xl px-6 py-16 sm:py-20 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Product image */}
          <div>
            <ProductImage />
          </div>

          {/* Title + buy area */}
          <div className="flex flex-col gap-6">
            <div>
              <div className="flex items-center gap-3">
                <span className="text-xs font-medium uppercase tracking-[0.2em] text-primary">
                  {BRAND_NAME}
                </span>
                <span className="inline-block rounded-full bg-primary/10 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-primary">
                  Prescription required
                </span>
              </div>
              <h1 className="mt-4 text-5xl font-semibold leading-[1.05] tracking-tight text-foreground sm:text-6xl">
                {PRODUCT_TAGLINE}
              </h1>
              <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
                Hot Sauce is a sublingual ED medication, prescribed online
                by licensed clinicians.{" "}
                <em>
                  No clinics, no insurance forms, no awkward waiting rooms.
                </em>
              </p>
            </div>

            <div>
              <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-foreground">
                Choose your supply
              </p>
              <PackSelector userState={userState} />
            </div>

            <ul className="grid grid-cols-1 gap-2 border-t border-border pt-5 text-xs text-muted-foreground sm:grid-cols-2">
              <li className="flex items-start gap-2">
                <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                Licensed clinician review for every order
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                Discreet packaging, no branding on box
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                HIPAA-compliant intake
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                No insurance forms
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
