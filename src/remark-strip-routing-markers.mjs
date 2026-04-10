/**
 * 从 Markdown AST 中移除生成器注入的「Internal routing markers: …」整段，
 * 避免最终 HTML 出现无意义 token 串（不改动源 .md，仅影响渲染）。
 */
export function remarkStripRoutingMarkers() {
  return (tree) => {
    strip(tree);
  };
}

function paragraphText(p) {
  let s = "";
  for (const c of p.children || []) {
    if (c.type === "text") s += c.value;
  }
  return s;
}

function strip(node) {
  if (!node?.children) return;
  node.children = node.children.filter((child) => {
    if (child.type === "paragraph") {
      const t = paragraphText(child);
      if (/^\s*Internal routing markers:/i.test(t)) return false;
    }
    strip(child);
    return true;
  });
}
