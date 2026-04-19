/**
 * Plumbing V2 hard isolation config.
 * No runtime linkage to plumbing v1 or shared collection switches.
 */
const HARD_SITE_URL = "https://realtorsatthebeach.com/plumbing";
const HARD_CANONICAL_ORIGIN = "https://realtorsatthebeach.com/plumbing";
const HARD_NICHE_LABEL = "Professional Plumbing Services";
const HARD_PHONE_E164 = "+16074009375";
const HARD_PHONE_DISPLAY = "+1 (607) 400-9375";

/** Must stay in sync with `stableHashUint32` in repo root `main.go` (Go generator alias picks). */
function stableHash(input: string): number {
  let h = 2166136261;
  for (let i = 0; i < input.length; i++) {
    h ^= input.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

/** 顺序与条数须与 `new_word/main.go` → `plumbingV2AliasForJob` 内 `pool` 完全一致。 */
const PLUMBING_V2_ALIAS_POOL = [
  "Professional Plumbing Services",
  "Emergency Pipe Repair",
  "Leak Detection Pros",
  "Drain Line Restoration Crew",
  "Slab Leak Response Unit",
  "Water Heater & Pipe Experts",
  "Hydro-Jetting Specialists",
  "Basement Sump Service Team",
  "Whole-Home Repiping Advisors",
  "Fixture & Supply Line Pros",
] as const;

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

export function getNicheLabelForSeed(seed?: string | null): string {
  const aliasSeed = (seed ?? "home").trim() || "home";
  return PLUMBING_V2_ALIAS_POOL[stableHash(aliasSeed) % PLUMBING_V2_ALIAS_POOL.length]!;
}

/**
 * 规范为 E.164（联盟/解析/JSON-LD 更稳）：仅数字时按北美 +1 处理
 */
export function normalizePhoneE164(input: string): string {
  const t = input.trim();
  if (t.startsWith("+")) {
    const digits = t.slice(1).replace(/\D/g, "");
    return `+${digits}`;
  }
  const digits = t.replace(/\D/g, "");
  if (digits.length === 11 && digits.startsWith("1")) return `+${digits}`;
  if (digits.length === 10) return `+1${digits}`;
  return t;
}

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
