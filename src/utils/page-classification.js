import { categories } from "../data/categories.js";

export const pageTypes = ["home", "article", "template", "tool", "listing", "service", "about", "legal", "error", "page"];

export function classifyPage(pathname, metadata = {}) {
  const parts = pathname.split("/").filter(Boolean);
  if (parts[0] === "fi") parts.shift();
  const [section] = parts;
  let pageType = "page";
  if (!section) pageType = "home";
  else if (["blog", "templates", "toteutusmallit", "tools", "tyokalut"].includes(section)) {
    pageType = parts.length === 1 ? "listing"
      : section === "blog" ? "article"
      : ["templates", "toteutusmallit"].includes(section) ? "template" : "tool";
  } else if (["services", "palvelut"].includes(section)) pageType = parts.length === 1 ? "listing" : "service";
  else if (["about", "minusta"].includes(section)) pageType = "about";
  else if (["privacy", "tietosuojaseloste", "terms", "kayttoehdot"].includes(section)) pageType = "legal";
  else if (["404", "404.html"].includes(section)) pageType = "error";

  const primaryCategory = metadata.primaryCategory
    ?? (pageType === "article" ? metadata.category
      : pageType === "service" ? metadata.group
      : pageType === "legal" ? (["privacy", "tietosuojaseloste"].includes(section) ? "privacy" : "general")
      : ["template", "tool"].includes(pageType) ? undefined : "general");
  if (!Object.hasOwn(categories, primaryCategory)) {
    throw new Error(`${pathname}: missing or invalid primaryCategory (${primaryCategory}).`);
  }
  return { pageType, primaryCategory };
}
