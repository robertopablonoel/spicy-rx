import { PRODUCT_NAME } from "@/lib/constants";

/**
 * Placeholder product visual for Hot Sauce until real photography arrives.
 *
 * Renders a pharma-clean card with a stylized bottle silhouette and the
 * product wordmark in serif. Designed to be replaceable with a real
 * <Image src="..." /> drop-in once the agency delivers photography.
 */
export function ProductImage() {
  return (
    <div className="relative aspect-[4/5] w-full overflow-hidden rounded-3xl bg-gradient-to-br from-secondary via-background to-muted">
      {/* Faint brand wordmark frame */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="flex flex-col items-center gap-6">
          {/* Stylized bottle silhouette */}
          <svg
            viewBox="0 0 120 240"
            className="h-48 w-24 drop-shadow-xl sm:h-64 sm:w-32"
            aria-hidden="true"
          >
            <defs>
              <linearGradient id="bottle" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0" stopColor="#7b1c14" />
                <stop offset="0.5" stopColor="#b5251b" />
                <stop offset="1" stopColor="#7b1c14" />
              </linearGradient>
            </defs>
            {/* Neck */}
            <rect x="48" y="10" width="24" height="28" fill="#2d2d2d" rx="3" />
            {/* Cap */}
            <rect x="44" y="2" width="32" height="14" fill="#1a1a1a" rx="2" />
            {/* Body */}
            <path
              d="M30 42 Q30 38 36 38 L84 38 Q90 38 90 42 L90 220 Q90 232 78 232 L42 232 Q30 232 30 220 Z"
              fill="url(#bottle)"
            />
            {/* Label band */}
            <rect
              x="34"
              y="100"
              width="52"
              height="72"
              fill="#fdfaf1"
              rx="2"
            />
            <text
              x="60"
              y="138"
              textAnchor="middle"
              fontFamily="Georgia, serif"
              fontSize="11"
              fontWeight="700"
              fill="#7b1c14"
              letterSpacing="0.05em"
            >
              HOT
            </text>
            <text
              x="60"
              y="154"
              textAnchor="middle"
              fontFamily="Georgia, serif"
              fontSize="11"
              fontWeight="700"
              fill="#7b1c14"
              letterSpacing="0.05em"
            >
              SAUCE
            </text>
            <line x1="40" y1="162" x2="80" y2="162" stroke="#7b1c14" strokeWidth="0.5" />
            <text
              x="60"
              y="172"
              textAnchor="middle"
              fontFamily="Georgia, serif"
              fontSize="5"
              fill="#7b1c14"
              letterSpacing="0.1em"
            >
              SUBLINGUAL · Rx
            </text>
          </svg>
          <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-muted-foreground">
            {PRODUCT_NAME} · Product photography forthcoming
          </p>
        </div>
      </div>
    </div>
  );
}
