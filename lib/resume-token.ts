import crypto from "node:crypto";

/**
 * Opaque, self-contained resume tokens for the abandoned-intake recovery flow.
 *
 * The email agency merges `https://spicyrx.com/r/<token>` into their sends. The
 * token encodes the recipient's email; /r/[token] decrypts it, mints a fresh
 * Rimo SSO link at click time, and 302s the browser through.
 *
 * WHY ENCRYPTED-STATELESS RATHER THAN A LOOKUP TABLE:
 * this app is stateless and Vercel-hosted with no datastore. AES-256-GCM over a
 * server secret gives us confidentiality (the email is not readable from the
 * URL) and integrity (GCM's auth tag makes forgery infeasible) with no new
 * infrastructure. The trade-off is no per-token revocation — to invalidate every
 * outstanding token at once, rotate SPICYRX_LINK_SECRET. Given tokens already
 * expire on their own (MAX_AGE_DAYS) and each one only ever yields a session for
 * the single customer it encodes, that is an acceptable trade for a recovery
 * campaign. If per-token revocation is ever needed, swap this module for a table
 * lookup — the route handler's interface does not change.
 *
 * WHY NOT JUST PUT THE EMAIL IN THE URL: a `/r?email=…` endpoint that returns a
 * logged-in session is a full account-takeover vulnerability — anyone could
 * enumerate addresses and log in as any patient. The token must be opaque and
 * unforgeable, which is exactly what GCM gives us.
 */

const ALGORITHM = "aes-256-gcm";
const IV_BYTES = 12;
const TAG_BYTES = 16;

/**
 * Tokens self-expire — this bounds how long a forwarded or leaked email can be
 * used to sign in as someone.
 *
 * MUST match TOKEN_MAX_AGE_DAYS in sync-resume-tokens.mjs. 180 days gives the
 * monthly refresh cron a ~6x safety margin, so a token never ages out while a
 * live campaign is still linking to it.
 */
export const MAX_AGE_DAYS = 180;

type Payload = {
  /** recipient email */
  e: string;
  /** issued-at, epoch ms */
  t: number;
  /** optional Rimo returnTo path (used only for the Passion segment) */
  r?: string;
};

/**
 * Derive a 32-byte key from the configured secret. Hashing (rather than
 * requiring an exactly-32-byte env var) lets the secret be any high-entropy
 * string — generate with `openssl rand -base64 48`.
 */
function encryptionKey(): Buffer {
  const secret = process.env.SPICYRX_LINK_SECRET;
  if (!secret || secret.length < 32) {
    throw new Error(
      "SPICYRX_LINK_SECRET is missing or too short (need >= 32 chars)",
    );
  }
  return crypto.createHash("sha256").update(secret).digest();
}

/** Build a token for one recipient. Used by scripts/generate-resume-tokens.mjs. */
export function mintResumeToken(email: string, returnTo?: string): string {
  const normalized = email.trim().toLowerCase();
  if (!normalized.includes("@")) throw new Error("mintResumeToken: not an email");

  const payload: Payload = { e: normalized, t: Date.now() };
  if (returnTo) payload.r = returnTo;

  const iv = crypto.randomBytes(IV_BYTES);
  const cipher = crypto.createCipheriv(ALGORITHM, encryptionKey(), iv);
  const ciphertext = Buffer.concat([
    cipher.update(JSON.stringify(payload), "utf8"),
    cipher.final(),
  ]);

  // iv | tag | ciphertext — fixed-width prefixes so read() can slice without a delimiter.
  return Buffer.concat([iv, cipher.getAuthTag(), ciphertext]).toString(
    "base64url",
  );
}

/**
 * Decrypt and validate a token. Returns null for anything malformed, tampered
 * with, or past MAX_AGE_DAYS — the caller treats every null identically (bounce
 * to the marketing site) so this never leaks *why* a token failed.
 */
export function readResumeToken(
  token: string,
): { email: string; returnTo: string | null } | null {
  try {
    const raw = Buffer.from(token, "base64url");
    if (raw.length <= IV_BYTES + TAG_BYTES) return null;

    const decipher = crypto.createDecipheriv(
      ALGORITHM,
      encryptionKey(),
      raw.subarray(0, IV_BYTES),
    );
    decipher.setAuthTag(raw.subarray(IV_BYTES, IV_BYTES + TAG_BYTES));

    const plaintext = Buffer.concat([
      decipher.update(raw.subarray(IV_BYTES + TAG_BYTES)),
      decipher.final(),
    ]).toString("utf8");

    const payload = JSON.parse(plaintext) as Payload;
    if (typeof payload?.e !== "string" || typeof payload?.t !== "number") {
      return null;
    }
    if (Date.now() - payload.t > MAX_AGE_DAYS * 86_400_000) return null;

    // Only ever allow same-origin relative paths through to Rimo — a token is
    // unforgeable, but this keeps a bad generation run from becoming an open redirect.
    const returnTo =
      typeof payload.r === "string" &&
      payload.r.startsWith("/") &&
      !payload.r.startsWith("//")
        ? payload.r
        : null;

    return { email: payload.e, returnTo };
  } catch {
    // bad base64, failed auth tag, unparseable JSON — all indistinguishable to the caller
    return null;
  }
}
