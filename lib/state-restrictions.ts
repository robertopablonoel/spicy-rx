/**
 * State-restriction configuration.
 *
 * Rimo provides the authoritative list of states where Hot Sauce (sublingual
 * ED medication) may be prescribed. Until Rimo confirms, these arrays are
 * empty placeholders. Do not populate with guesses.
 *
 * Convention: two-letter USPS state codes, uppercase.
 */

/** States where service is fully blocked. Visitors see <StateRestrictionNotice>. */
export const BLOCKED_STATES: string[] = [];

/** States where synchronous-only consultation is required (no async). */
export const SYNC_ONLY_STATES: string[] = [];

export function isBlocked(state: string | null | undefined): boolean {
  if (!state) return false;
  return BLOCKED_STATES.includes(state.toUpperCase());
}

export function requiresSync(state: string | null | undefined): boolean {
  if (!state) return false;
  return SYNC_ONLY_STATES.includes(state.toUpperCase());
}
