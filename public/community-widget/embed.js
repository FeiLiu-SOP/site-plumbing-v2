/**
 * Community embed: injects an iframe pointing at property-value-risk.html on the same origin as this script.
 *
 * Usage (replace ORIGIN with your deployed site origin, e.g. https://www.example.com):
 * <div id="pvr-mount"></div>
 * <script
 *   src="ORIGIN/community-widget/embed.js"
 *   async
 *   data-target="pvr-mount"
 *   data-usd="304124"
 *   data-city="Zion, PA"
 *   data-benchmark="Local median benchmark (example)"
 *   data-accent="%232563eb"
 * ></script>
 *
 * data-target: id of element to replace or fill (default: insert after script).
 * data-height: iframe height in px (default: 460).
 * data-usd, data-city, data-benchmark, data-accent: passed as query string to the inner HTML.
 */
(function () {
  var script = document.currentScript;
  if (!script || !script.src) return;

  var u = new URL(script.src);
  var base = u.origin + u.pathname.replace(/\/embed\.js$/i, "");

  function attr(name, fallback) {
    var v = script.getAttribute(name);
    return v != null && v !== "" ? v : fallback;
  }

  var usd = attr("data-usd", "");
  var city = attr("data-city", "");
  var benchmark = attr("data-benchmark", "");
  var accent = attr("data-accent", "");
  var height = parseInt(attr("data-height", "460"), 10) || 460;
  var targetId = attr("data-target", "");

  var qs = new URLSearchParams();
  if (usd) qs.set("usd", usd);
  if (city) qs.set("city", city);
  if (benchmark) qs.set("benchmark", benchmark);
  if (accent) qs.set("accent", accent);

  var src = base + "/property-value-risk.html" + (qs.toString() ? "?" + qs.toString() : "");

  var iframe = document.createElement("iframe");
  iframe.setAttribute("title", "Property value stress estimator (community resource)");
  iframe.setAttribute("loading", "lazy");
  iframe.setAttribute("referrerpolicy", "strict-origin-when-cross-origin");
  iframe.style.width = "100%";
  iframe.style.maxWidth = "560px";
  iframe.style.height = height + "px";
  iframe.style.border = "0";
  iframe.style.display = "block";
  iframe.src = src;

  var mount =
    (targetId && document.getElementById(targetId)) ||
    script.parentNode;

  if (targetId && document.getElementById(targetId)) {
    var el = document.getElementById(targetId);
    el.innerHTML = "";
    el.appendChild(iframe);
  } else if (mount) {
    mount.insertBefore(iframe, script.nextSibling);
  }
})();
