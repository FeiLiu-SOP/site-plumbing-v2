/**
 * 主域 Hub 下按路径分流（/roofing /plumbing /pestcontrol）时，Astro 的 `site` 若只有裸主域，
 * sitemap 会错误指向 https://域名/sitemap-0.xml。在构建时按 ACTIVE_COLLECTION 补上路径段。
 * *.pages.dev 不处理（预览站页面仍在根路径）。
 * 设 PUBLIC_AUTO_SITEMAP_PATH=0 可关闭。
 */
const SEGMENT_BY_COLLECTION = {
  roofing: "roofing",
  plumbing: "plumbing",
  pestcontrol: "pestcontrol",
};

/**
 * @param {string} siteStr
 * @param {string} activeCollection roofing | plumbing | pestcontrol
 * @param {string | undefined} disableAugment "0" 关闭
 */
export function augmentHubPathForMainSite(siteStr, activeCollection, disableAugment) {
  if (disableAugment === "0" || !siteStr) return siteStr;
  const key = (activeCollection ?? "").toLowerCase().trim();
  const seg = SEGMENT_BY_COLLECTION[key];
  if (!seg) return siteStr;
  try {
    const u = new URL(siteStr);
    if (u.hostname.endsWith(".pages.dev")) return siteStr;
    const parts = u.pathname.split("/").filter(Boolean);
    if (parts.length > 0) return siteStr;
    const allowed =
      u.hostname === "rockwellpropertiesmaine.com" ||
      u.hostname === "www.rockwellpropertiesmaine.com";
    if (!allowed) return siteStr;
    return `${u.origin}/${seg}`;
  } catch {
    return siteStr;
  }
}
