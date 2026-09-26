import type { ImageMetadata } from "astro";

// Frontmatter keeps its public `/images/blog/foo.jpeg` string (that URL still
// serves the jpeg for OG/feed/schema). For on-page display we resolve the same
// filename to its src/assets copy so Astro's <Picture> can emit webp + widths.
const imgs = import.meta.glob<{ default: ImageMetadata }>(
  "/src/assets/blog/*.{jpeg,jpg,png}",
  { eager: true },
);

export const blogImage = (src?: string): ImageMetadata | undefined =>
  src ? imgs[src.replace("/images/blog/", "/src/assets/blog/")]?.default : undefined;
