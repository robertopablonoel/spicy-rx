import { CardQuiz } from "./CardQuiz";

/**
 * The landing page for a scanned insert-card QR (/qr/pc and /qr/bc both point
 * here once INSERT_QR_DESTINATION is flipped). Nests under app/layout.tsx, so
 * Providers runs initPostHog() + captureAttribution() before any CTA resolves.
 */
export default function CardPage() {
  return <CardQuiz />;
}
