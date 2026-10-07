import { siteConfig } from "../data/site.js";

const siteHostname = new URL(siteConfig.url).hostname.replace(/^www\./, "");

export function isExternalLink(href, baseUrl) {
  try {
    const url = new URL(href, baseUrl);
    const hostname = url.hostname.replace(/^www\./, "");
    return /^https?:$/.test(url.protocol)
      && hostname !== siteHostname
      && url.hostname !== new URL(baseUrl).hostname;
  } catch {
    return false;
  }
}
