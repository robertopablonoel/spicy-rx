import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { SUPPORT_EMAIL } from "@/lib/constants";

interface StateRestrictionNoticeProps {
  state: string;
}

/**
 * Shown in place of the Get Started CTA when the visitor's state is on the
 * BLOCKED_STATES list. We name the state so it's clear we're not generically
 * unavailable — just not licensed in their location yet.
 */
export function StateRestrictionNotice({ state }: StateRestrictionNoticeProps) {
  return (
    <Alert>
      <AlertTitle>Not available in {state} yet</AlertTitle>
      <AlertDescription>
        We&apos;re not licensed to prescribe in {state} at this time. We&apos;re
        actively working to expand. Email{" "}
        <a
          href={`mailto:${SUPPORT_EMAIL}`}
          className="font-medium underline underline-offset-4"
        >
          {SUPPORT_EMAIL}
        </a>{" "}
        to be notified when we launch in your state.
      </AlertDescription>
    </Alert>
  );
}
