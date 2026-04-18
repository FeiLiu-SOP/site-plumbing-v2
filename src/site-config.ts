/**
 * Plumbing V2 hard isolation config.
 * No runtime linkage to plumbing v1 or shared collection switches.
 */
const HARD_SITE_URL = "https://realtorsatthebeach.com/plumbing";
const HARD_CANONICAL_ORIGIN = "https://realtorsatthebeach.com/plumbing";
const HARD_NICHE_LABEL = "Professional Plumbing Services";
const HARD_PHONE_E164 = "+16074009375";
const HARD_PHONE_DISPLAY = "+1 (607) 400-9375";

export const PUBLIC_SITE_URL = HARD_SITE_URL;
export const PUBLIC_CANONICAL_ORIGIN = HARD_CANONICAL_ORIGIN;
export const PUBLIC_NICHE_LABEL = HARD_NICHE_LABEL;
export const PUBLIC_PHONE_E164 = HARD_PHONE_E164;
export const PUBLIC_PHONE_DISPLAY = HARD_PHONE_DISPLAY;
export const PUBLIC_ROBOTS_CONTENT =
  ((import.meta.env.PUBLIC_ROBOTS_CONTENT as string | undefined)?.trim() || "index, follow");

export const siteConfig = {
  nicheLabel: PUBLIC_NICHE_LABEL,
  phoneE164: PUBLIC_PHONE_E164,
  phoneDisplay: PUBLIC_PHONE_DISPLAY,
  siteUrl: PUBLIC_SITE_URL,
  canonicalOrigin: PUBLIC_CANONICAL_ORIGIN,
  robotsContent: PUBLIC_ROBOTS_CONTENT
} as const;

export function getCanonicalBase(): string {
  return siteConfig.canonicalOrigin.replace(/\/$/, "");
}

export function canonicalPageUrl(...segments: string[]): string {
  const base = getCanonicalBase();
  const parts = segments.filter(Boolean).map((s) => s.replace(/^\/+|\/+$/g, ""));
  if (parts.length === 0) return `${base}/`;
  return `${base}/${parts.join("/")}/`;
}

export function internalPath(...segments: string[]): string {
  const baseRoot = (import.meta.env.BASE_URL as string | undefined) ?? "/";
  const base = baseRoot.endsWith("/") ? baseRoot : `${baseRoot}/`;
  const parts = segments.filter(Boolean).map((s) => s.replace(/^\/+|\/+$/g, ""));
  if (parts.length === 0) return base;
  return new URL(`${parts.join("/")}/`, `http://local${base}`).pathname;
}
