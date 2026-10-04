export interface RelatedPost {
  slug: string;
  language: "en" | "fi";
  title: string;
  description: string;
  date: Date;
  url: string;
  tags?: string[];
  category?: string;
  relatedPosts?: string[];
  draft?: boolean;
  noindex?: boolean;
  image?: string;
  imageAlt?: string;
  minutes?: number;
}

const relevance = (current: RelatedPost, candidate: RelatedPost): number => {
  const tags = new Set((current.tags ?? []).map((tag) => tag.toLowerCase()));
  const tagMatches = (candidate.tags ?? []).filter((tag) => tags.has(tag.toLowerCase())).length;
  const categoryMatch =
    current.category && current.category !== "templates" && candidate.category
      ? Number(current.category.toLowerCase() === candidate.category.toLowerCase())
      : 0;
  return tagMatches + categoryMatch;
};

const newestFirst = (a: RelatedPost, b: RelatedPost): number =>
  b.date.getTime() - a.date.getTime() || a.slug.localeCompare(b.slug);

export function selectRelatedPosts(
  current: RelatedPost,
  candidates: RelatedPost[],
  { now = new Date(), limit = 3 }: { now?: Date; limit?: number } = {},
): RelatedPost[] {
  const eligible = [
    ...new Map(
      candidates
        .filter(
          (post) =>
            post.language === current.language &&
            post.slug !== current.slug &&
            post.url !== current.url &&
            !post.draft &&
            !post.noindex &&
            post.date.getTime() <= now.getTime(),
        )
        .map((post) => [post.url, post]),
    ).values(),
  ];
  const bySlug = new Map(eligible.map((post) => [post.slug, post]));
  const selected = [...new Set(current.relatedPosts ?? [])]
    .map((slug) => bySlug.get(slug))
    .filter((post): post is RelatedPost => Boolean(post))
    .slice(0, limit);
  const selectedSlugs = new Set(selected.map((post) => post.slug));
  const remaining = eligible.filter((post) => !selectedSlugs.has(post.slug));
  const matching = remaining
    .filter((post) => relevance(current, post) > 0)
    .sort((a, b) => relevance(current, b) - relevance(current, a) || newestFirst(a, b));

  for (const post of matching) {
    if (selected.length === limit) break;
    if (!selectedSlugs.has(post.slug)) {
      selected.push(post);
      selectedSlugs.add(post.slug);
    }
  }
  return selected;
}
