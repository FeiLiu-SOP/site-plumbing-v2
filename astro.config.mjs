// @ts-check
import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";

// https://astro.build/config
// sitemap 绝对链接依赖 site；与 src/site-config.ts 共用 PUBLIC_SITE_URL（Cloudflare Build 环境变量）
const site =
  process.env.PUBLIC_SITE_URL ?? "https://la-roofing-v1.pages.dev";

export default defineConfig({
  site,
  integrations: [sitemap()],
});
