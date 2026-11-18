// Newest first. Entries dated in the future or without a valid date are skipped.
// `skip` drops entries, `uniqueBy` keeps the first of each key, `tieBreak` orders same-day entries.
export function selectNewest<T extends { date?: Date | string }>(
  entries: T[],
  {
    now = new Date(),
    limit = 3,
    skip,
    uniqueBy,
    tieBreak,
  }: {
    now?: Date;
    limit?: number;
    skip?: (entry: T) => boolean;
    uniqueBy?: (entry: T) => string;
    tieBreak?: (a: T, b: T) => number;
  } = {},
): T[] {
  const time = (entry: T) => new Date(entry.date as Date | string).getTime();
  const seen = new Set<string>();
  return entries
    .filter((entry) => !skip?.(entry) && time(entry) <= now.getTime())
    .sort((a, b) => time(b) - time(a) || tieBreak?.(a, b) || 0)
    .filter((entry) => {
      const key = uniqueBy?.(entry);
      if (key === undefined) return true;
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    })
    .slice(0, limit);
}
