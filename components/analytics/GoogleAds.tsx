import Script from "next/script";
import { GOOGLE_ADS_ID } from "@/lib/constants";

/**
 * Site-wide Google Ads tag (gtag.js).
 *
 * Loads the base tag and registers the conversion-linker so a `gclid` is
 * captured in Google's first-party cookie. The inline init also defines the
 * global `gtag()` that `lib/google-ads.ts` calls to fire conversions.
 *
 * `allow_ad_personalization_signals: false` is deliberate and load-bearing:
 * SpicyRx is ED / sensitive-health, where Google prohibits personalized
 * advertising and remarketing. This tag is conversion-measurement only —
 * no audience building.
 *
 * The actual Purchase conversion is reported Rimo-side (offline import keyed
 * on the forwarded gclid); this tag handles the site-side signal only.
 */
export function GoogleAds() {
  if (!GOOGLE_ADS_ID) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GOOGLE_ADS_ID}`}
        strategy="afterInteractive"
      />
      <Script id="gtag-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GOOGLE_ADS_ID}', { allow_ad_personalization_signals: false });
        `}
      </Script>
    </>
  );
}
