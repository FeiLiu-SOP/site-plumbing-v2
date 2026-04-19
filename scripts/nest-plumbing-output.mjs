/**
 * Astro static output places routes at dist/<route>/ while still prefixing
 * hrefs with config.base (/plumbing/). Files must live under dist/plumbing/
 * so URLs like /plumbing/plumbing-v2-city-st-zip/ resolve on Cloudflare Pages.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const dist = path.join(root, "dist");
const nestDir = path.join(dist, "plumbing");

/** Leave at dist root for Cloudflare / platform. */
const KEEP_AT_DIST_ROOT = new Set([
  "_redirects",
  "_headers",
  "_routes.json",
]);

function main() {
  if (process.env.SKIP_NEST_PLUMBING_OUTPUT === "1") {
    console.log("[nest-plumbing-output] SKIP_NEST_PLUMBING_OUTPUT=1, skip");
    return;
  }
  if (!fs.existsSync(dist)) {
    console.error("[nest-plumbing-output] missing dist/");
    process.exit(1);
  }
  const flatStateDir = path.join(dist, "ak");
  const nestedIndex = path.join(nestDir, "index.html");
  if (fs.existsSync(nestedIndex) && !fs.existsSync(flatStateDir)) {
    console.log("[nest-plumbing-output] already nested, skip");
    return;
  }
  if (!fs.existsSync(flatStateDir)) {
    console.log("[nest-plumbing-output] no flat state dir (ak/), skip");
    return;
  }

  fs.mkdirSync(nestDir, { recursive: true });
  for (const name of fs.readdirSync(dist)) {
    if (name === "plumbing") continue;
    if (KEEP_AT_DIST_ROOT.has(name)) continue;
    const from = path.join(dist, name);
    const to = path.join(nestDir, name);
    fs.renameSync(from, to);
  }
  console.log("[nest-plumbing-output] moved build output into dist/plumbing/");
}

main();
