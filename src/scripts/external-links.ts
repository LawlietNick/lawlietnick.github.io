import { isExternalLink } from "../utils/external-links.js";

// Use a decorative span so link pseudo-elements remain available.
function updateLink(link: HTMLAnchorElement) {
  const existing = link.querySelector<HTMLElement>(".external-link-icon");
  if (link.closest(".ask-ai, .site-footer__social, .cta, .preferred-source__link, .about-employer, [role='button']") || !isExternalLink(link.getAttribute("href"), document.baseURI)) {
    existing?.remove();
    return;
  }
  if (existing) return;

  const icon = document.createElement("span");
  icon.className = "external-link-icon";
  icon.setAttribute("aria-hidden", "true");
  link.append(icon);
}

function updateLinks(root: ParentNode) {
  if (root instanceof HTMLAnchorElement) updateLink(root);
  root.querySelectorAll<HTMLAnchorElement>("a[href]").forEach(updateLink);
}

// Also covers links rendered later by interactive tools or Astro navigation.
const observer = new MutationObserver((mutations) => {
  for (const mutation of mutations) {
    if (mutation.type === "attributes" && mutation.target instanceof HTMLAnchorElement) {
      updateLink(mutation.target);
    }
    if (mutation.type === "childList" && mutation.target instanceof Element) {
      const link = mutation.target.closest<HTMLAnchorElement>("a[href]");
      if (link) updateLink(link);
    }
    for (const node of mutation.addedNodes) {
      if (node instanceof Element) updateLinks(node);
    }
  }
});

function enhanceExternalLinks() {
  observer.disconnect();
  updateLinks(document.body);
  observer.observe(document.body, {
    childList: true,
    subtree: true,
    attributes: true,
    attributeFilter: ["href"],
  });
}

enhanceExternalLinks();
document.addEventListener("astro:page-load", enhanceExternalLinks);
