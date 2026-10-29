// Turns the user's own site domains (all sharing one GA4 stream) into GA4 "matches RegEx" values.
// Same name with different endings becomes one row: yritys.fi + yritys.com -> yritys\.(fi|com).
const escape = (text) => text.replace(/[.\-]/g, "\\$&");

// GA4 allows at most 50 unwanted referrals per data stream
// (https://support.google.com/analytics/answer/10327750). One regex row counts as one.
export const ga4RowLimit = 50;

// One big regex from list rows, split on row boundaries when it would pass maxLength.
// contains rows become .*value.* and regex rows are kept as they are, so the result means the same
// whether GA4 matches the whole domain or a part of it.
export const bigRegexes = (rows, { maxLength = Infinity } = {}) => {
  const parts = rows.map((row) => (row.match === "contains" ? `.*${escape(row.value)}.*` : `(?:${row.value})`));
  const wrap = (list) => `^(?:${list.join("|")})$`;
  const chunks = [];
  let current = [];
  for (const part of parts) {
    if (current.length && wrap([...current, part]).length > maxLength) {
      chunks.push(wrap(current));
      current = [];
    }
    current.push(part);
  }
  if (current.length) chunks.push(wrap(current));
  return chunks;
};

// "https://www.Yritys.fi/path" -> "yritys.fi"
export const hostOf = (input) =>
  input
    .trim()
    .toLowerCase()
    .replace(/^[a-z][a-z0-9+.-]*:\/\//, "")
    .replace(/[/?#].*$/, "")
    .replace(/:\d+$/, "")
    .replace(/^www\./, "");

const validHost = (host) => /^[a-z0-9-]+(\.[a-z0-9-]+)+$/.test(host);

export const ownDomainRows = (text, { subdomains = true } = {}) => {
  const names = new Map();
  const skipped = [];

  for (const token of text.split(/[\s,;]+/).filter(Boolean)) {
    const host = hostOf(token);
    if (!validHost(host)) {
      skipped.push(token);
      continue;
    }
    const dot = host.indexOf(".");
    const name = host.slice(0, dot);
    names.set(name, (names.get(name) ?? new Set()).add(host.slice(dot + 1)));
  }

  // ponytail: a subdomain typed on its own (shop.yritys.fi) stays an exact host; ask for main domains instead
  const rows = [...names].map(([name, endings]) => {
    const list = [...endings].map(escape);
    const ending = list.length > 1 ? `(${list.join("|")})` : list[0];
    return `${subdomains ? "(?:[a-z0-9\\-]+\\.)*" : ""}${escape(name)}\\.${ending}`;
  });
  return { rows, skipped };
};
