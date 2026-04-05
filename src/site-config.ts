/**
 * 站点「配置中心」：从构建时环境变量读取，换类目时改 Cloudflare Pages 的 Build 变量即可。
 * 客户端/模板中使用的变量须带 PUBLIC_ 前缀（Astro/Vite 约定）。
 */

const fallbackSiteUrl = "https://la-roofing-v1.pages.dev";

export const PUBLIC_NICHE_LABEL =
  import.meta.env.PUBLIC_NICHE_LABEL ?? "Roofing";

export const PUBLIC_PHONE_E164 =
  import.meta.env.PUBLIC_PHONE_E164 ?? "+17733028078";

export const PUBLIC_PHONE_DISPLAY =
  import.meta.env.PUBLIC_PHONE_DISPLAY ?? "+1 (773) 302-8078";

/** 与 sitemap、绝对 URL 一致；astro.config.mjs 的 site 应使用同一环境变量 */
export const PUBLIC_SITE_URL =
  import.meta.env.PUBLIC_SITE_URL ?? fallbackSiteUrl;

export const siteConfig = {
  nicheLabel: PUBLIC_NICHE_LABEL,
  phoneE164: PUBLIC_PHONE_E164,
  phoneDisplay: PUBLIC_PHONE_DISPLAY,
  siteUrl: PUBLIC_SITE_URL,
} as const;
