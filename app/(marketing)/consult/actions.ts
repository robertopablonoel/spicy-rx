"use server";

/**
 * Consultation submission. Stores nothing yet — just console.logs on the
 * server. When we wire up Rimo / persistence, this is the single point
 * that needs to change.
 *
 * Returns a result the client can branch on. Throws stay reserved for
 * truly unexpected failures (the form should validate locally first).
 */
export type ConsultPayload = {
  dob: string;
  nitrates: string;
  history: string;
};

export type ConsultResult = {
  ok: true;
  message: string;
};

export async function submitConsult(
  payload: ConsultPayload,
): Promise<ConsultResult> {
  console.log("[consult] received submission:", payload);

  // TODO: forward to Rimo intake endpoint, persist, queue for clinician.
  return {
    ok: true,
    message: "A clinician will review within 24 hours.",
  };
}
