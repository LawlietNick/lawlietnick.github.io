export interface RecentPost {
  url: string;
  date: Date | string;
  draft?: boolean;
  noindex?: boolean;
}

export function selectRecentPosts<T extends RecentPost>(
  posts: T[],
  { now = new Date(), limit = 3 }: { now?: Date; limit?: number } = {},
): T[] {
  const seen = new Set<string>();
  return [...posts]
    .filter((post) => !post.draft && !post.noindex && new Date(post.date).getTime() <= now.getTime())
    .sort(
      (a, b) =>
        new Date(b.date).getTime() - new Date(a.date).getTime() ||
        a.url.localeCompare(b.url),
    )
    .filter((post) => {
      if (seen.has(post.url)) return false;
      seen.add(post.url);
      return true;
    })
    .slice(0, limit);
}
