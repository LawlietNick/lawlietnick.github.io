export interface ToolkitEntry {
  href: string;
  title: string;
  summary: string;
  icon?: string;
  date: Date | string;
  order?: number;
}

// Newest first. Entries without a date or dated in the future are skipped.
// Ties (several tools share a go-live day) fall back to `order`, then href.
export function selectLatestToolkit<T extends ToolkitEntry>(
  entries: T[],
  { now = new Date(), limit = 3 }: { now?: Date; limit?: number } = {},
): T[] {
  return entries
    .filter((entry) => {
      const time = new Date(entry.date).getTime();
      return Number.isFinite(time) && time <= now.getTime();
    })
    .sort(
      (a, b) =>
        new Date(b.date).getTime() - new Date(a.date).getTime() ||
        (a.order ?? 0) - (b.order ?? 0) ||
        a.href.localeCompare(b.href),
    )
    .slice(0, limit);
}
