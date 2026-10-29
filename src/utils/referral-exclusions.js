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

// "https://www.Yritys.fi/path" -> "www.yritys.fi"
export const hostOf = (input) =>
  input
    .trim()
    .toLowerCase()
    .replace(/^[a-z][a-z0-9+.-]*:\/\//, "")
    .replace(/[/?#].*$/, "")
    .replace(/:\d+$/, "");

const validHost = (host) => /^[a-z0-9-]+(\.[a-z0-9-]+)+$/.test(host);

// ponytail: the last label is the ending, or the last two for endings like co.uk; a longer list of those if one is needed
const twoPartEnding = /^(co|com|org|net|gov|ac)\.[a-z]{2}$/;

// One row per name: endings and subdomains of the same name are merged, www.yritys.fi and blog.yritys.com
// into (?:(www|blog)\.)?yritys\.(fi|com). A subdomain listed for one ending is then allowed for all of them.
export const ownDomainRows = (text) => {
  const names = new Map();
  const skipped = [];

  for (const token of text.split(/[\s,;]+/).filter(Boolean)) {
    const host = hostOf(token);
    if (!validHost(host)) {
      skipped.push(token);
      continue;
    }
    const labels = host.split(".");
    const endingLength = twoPartEnding.test(labels.slice(-2).join(".")) && labels.length > 2 ? 2 : 1;
    const ending = labels.slice(-endingLength).join(".");
    const name = labels[labels.length - endingLength - 1];
    const prefix = labels.slice(0, -endingLength - 1).join(".");
    const entry = names.get(name) ?? { endings: new Set(), prefixes: new Set() };
    entry.endings.add(ending);
    if (prefix) entry.prefixes.add(prefix);
    names.set(name, entry);
  }

  const rows = [...names].map(([name, { endings, prefixes }]) => {
    const list = [...endings].map(escape);
    const ending = list.length > 1 ? `(${list.join("|")})` : list[0];
    const prefix = prefixes.size ? `(?:(${[...prefixes].map(escape).join("|")})\\.)?` : "";
    return `${prefix}${escape(name)}\\.${ending}`;
  });
  return { rows, skipped };
};
