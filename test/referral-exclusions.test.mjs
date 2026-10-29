import assert from "node:assert/strict";
import test from "node:test";
import { groups, isRe2Safe, matchTypes, rowMatches, rows, services } from "../src/data/payment-referrals.js";
import { bigRegexes, ownDomainRows } from "../src/utils/referral-exclusions.js";

const regexRows = rows.filter((r) => r.match === "regex");

test("every row uses a known match type and has a value", () => {
  for (const r of rows) {
    assert.ok(matchTypes[r.match], r.value);
    assert.ok(r.value.trim() === r.value && r.value, r.value);
  }
});

test("regex rows compile, avoid syntax RE2 rejects and fully match their sample hosts", () => {
  for (const r of regexRows) {
    assert.ok(isRe2Safe(r.value), `not RE2-safe: ${r.value}`);
    assert.ok(r.samples?.length, `no samples: ${r.value}`);
    const re = new RegExp(`^(?:${r.value})$`);
    for (const host of r.samples) assert.match(host, re);
  }
});

test("the RE2 guard catches the syntax it is meant to catch", () => {
  assert.equal(isRe2Safe("3dsecure(?:(\\-vrp|\\psa):)\\.(de|com|no)"), false);
  assert.equal(isRe2Safe("a(?=b)"), false);
  assert.equal(isRe2Safe("(a)\\1"), false);
  assert.equal(isRe2Safe("\\p{L}+"), true);
});

test("every row's service exists and every service has at least one row", () => {
  for (const r of rows) assert.ok(!r.service || services[r.service], r.value);
  for (const key of Object.keys(services)) assert.ok(rows.some((r) => r.service === key), key);
});

test("no contains row is already covered by another row", () => {
  for (const r of rows.filter((x) => x.match === "contains")) {
    const other = rows.find((o) => o !== r && rowMatches(o, r.value));
    assert.equal(other, undefined, `${r.value} is already covered by ${other?.value}`);
  }
});

test("own domains: same name with several endings becomes one regex row", () => {
  const { rows: out, skipped } = ownDomainRows("yritys.fi\nyritys.com", { subdomains: false });
  assert.deepEqual(out, ["yritys\\.(fi|com)"]);
  assert.deepEqual(skipped, []);
});

test("own domains: urls, www, case and separators are cleaned and different names get their own rows", () => {
  const { rows: out } = ownDomainRows("https://www.Yritys.fi/tuotteet, kauppa-yritys.fi; yritys.fi", { subdomains: false });
  assert.deepEqual(out, ["yritys\\.fi", "kauppa\\-yritys\\.fi"]);
});

test("own domains: subdomain prefix is on by default and the result is RE2-safe and matches the hosts", () => {
  const { rows: out } = ownDomainRows("yritys.fi yritys.com");
  assert.equal(out.length, 1);
  assert.ok(isRe2Safe(out[0]));
  const re = new RegExp(`^(?:${out[0]})$`);
  for (const host of ["yritys.fi", "www.yritys.com", "kauppa.yritys.fi", "a.b.yritys.fi"]) assert.match(host, re);
  for (const host of ["xyritys.fi", "yritys.net", "yritys.fi.evil.com"]) assert.doesNotMatch(host, re);
});

test("own domains: input that is not a domain is reported, not turned into a row", () => {
  const { rows: out, skipped } = ownDomainRows("yritys, ,fi.");
  assert.deepEqual(out, []);
  assert.deepEqual(skipped, ["yritys", "fi."]);
});

test("big regex: one regex matches every sample host and every contains value, and is RE2-safe", () => {
  const [big, ...rest] = bigRegexes(rows);
  assert.equal(rest.length, 0);
  assert.ok(isRe2Safe(big));
  const re = new RegExp(big);
  for (const r of rows) {
    if (r.match === "contains") assert.match(`sub.${r.value}`, re, r.value);
    else for (const host of r.samples) assert.match(host, re, host);
  }
});

test("big regex: regex rows stay whole-host, so lookalike hosts do not match", () => {
  const [big] = bigRegexes([{ match: "regex", value: "(?:(pay)\\.)?checkout\\.fi" }, { match: "contains", value: "paypal.com" }]);
  const re = new RegExp(big);
  for (const host of ["checkout.fi", "pay.checkout.fi", "www.paypal.com"]) assert.match(host, re);
  for (const host of ["xcheckout.fi", "checkout.fi.evil.com", "paypalxcom"]) assert.doesNotMatch(host, re);
});

test("big regex: maxLength splits on row boundaries and every row still matches one chunk", () => {
  const chunks = bigRegexes(rows, { maxLength: 400 });
  assert.ok(chunks.length > 1);
  for (const chunk of chunks) assert.ok(chunk.length <= 400, `chunk of ${chunk.length}`);
  const res = chunks.map((c) => new RegExp(c));
  for (const r of rows.filter((x) => x.match === "regex")) {
    for (const host of r.samples) assert.ok(res.some((re) => re.test(host)), host);
  }
});

test("big regex: a single row longer than maxLength stays whole in its own chunk", () => {
  const long = { match: "regex", value: "a".repeat(50) };
  assert.equal(bigRegexes([long, { match: "contains", value: "b.com" }], { maxLength: 30 }).length, 2);
});

test("every row belongs to a group and every group has rows", () => {
  for (const r of rows) assert.ok(groups[r.group], `${r.value} has no valid group`);
  for (const key of Object.keys(groups)) assert.ok(rows.some((r) => r.group === key), key);
});

test("a whole group merged into one regex matches all its rows", () => {
  for (const key of Object.keys(groups)) {
    const [merged, ...rest] = bigRegexes(rows.filter((r) => r.group === key));
    assert.equal(rest.length, 0, key);
    assert.ok(isRe2Safe(merged), key);
    const re = new RegExp(merged);
    for (const r of rows.filter((x) => x.group === key)) {
      if (r.match === "contains") assert.match(`sub.${r.value}`, re, r.value);
      else for (const host of r.samples) assert.match(host, re, host);
    }
  }
});

test("no duplicate rows", () => {
  const keys = rows.map((r) => `${r.match}:${r.value}`);
  assert.equal(new Set(keys).size, keys.length);
});
