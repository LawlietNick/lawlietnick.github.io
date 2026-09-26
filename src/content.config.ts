import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

// Typed, validated view over the markdown that already lives (and routes) under
// src/pages — files stay where they are. Used by the Atom feed (src/utils/feed.ts).
// Missing/invalid required fields fail the build with a zod error naming the file.
const postSchema = z
  .object({
    title: z.string().min(1),
    description: z.string().min(1),
    date: z.coerce.date(),
    image: z.string().startsWith("/").optional(),
    imageAlt: z.string().min(1).optional(),
    updatedDate: z.coerce.date().optional(),
    tags: z.array(z.string()).default([]),
    category: z.string().min(1).optional(),
    relatedPosts: z.array(z.string().min(1)).optional(),
    draft: z.boolean().default(false),
  })
  .passthrough(); // layout, image, alternate … belong to the page, not the feed

const posts = (base: string) =>
  defineCollection({ loader: glob({ pattern: "*.md", base }), schema: postSchema });

// Service pages self-route as markdown under src/pages/services and
// src/pages/fi/palvelut; the hub, header menu and related lists read their
// frontmatter directly via import.meta.glob, so no collection is needed here.
export const collections = {
  blog: posts("./src/pages/blog"),
  blogFi: posts("./src/pages/fi/blog"),
};
