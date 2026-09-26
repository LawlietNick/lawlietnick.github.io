// Pure feed-entry selection: published-only, newest first, capped.
// Kept free of Astro imports so `node --test` can exercise it directly.

export interface FeedEntryData {
  title: string;
  description: string;
  date: Date;
  updatedDate?: Date;
  tags: string[];
  draft: boolean;
  noindex?: boolean;
}

// updated articles sort by their update date, so they move back to the top
export const feedDate = (data: FeedEntryData): Date => data.updatedDate ?? data.date;

export function selectFeedEntries<T extends { data: FeedEntryData }>(
  entries: T[],
  { now = new Date(), limit = 10 }: { now?: Date; limit?: number } = {},
): T[] {
  return entries
    .filter(({ data }) => !data.draft && !data.noindex && data.date.getTime() <= now.getTime())
    .sort((a, b) => feedDate(b.data).getTime() - feedDate(a.data).getTime())
    .slice(0, limit);
}
