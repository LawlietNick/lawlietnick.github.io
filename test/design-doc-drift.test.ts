import assert from "node:assert/strict";
import { existsSync, readFileSync, readdirSync } from "node:fs";
import { test } from "vitest";

const read = (path: string) => readFileSync(new URL(`../${path}`, import.meta.url), "utf8");
const doc = read("design_for_claude.md");

test("design_for_claude.md token values match src/styles/tokens.css", () => {
  const tokens = new Map([...read("src/styles/tokens.css").matchAll(/^\s*(--[\w-]+):\s*(.+?);$/gm)].map((m) => [m[1], m[2]]));
  const documented = [...doc.matchAll(/^(--[\w-]+):\s*(.+?);$/gm)];
  assert.ok(documented.length > 0, "no token declarations found in design_for_claude.md");
  for (const [, name, value] of documented) {
    assert.equal(tokens.get(name), value, `${name} differs from tokens.css`);
  }
});

test("components and files named in design_for_claude.md exist", () => {
  const components = new Set(
    (readdirSync(new URL("../src/components", import.meta.url), { recursive: true }) as string[]).map((f) => f.split("/").pop()),
  );
  for (const [, name] of doc.matchAll(/`(?:[\w/]+\/)?(\w+\.astro)`/g)) {
    assert.ok(components.has(name) || existsSync(new URL(`../src/layouts/${name}`, import.meta.url)), `${name} not found`);
  }
  for (const [, path] of doc.matchAll(/`(src\/[\w./-]+\.\w+)`/g)) {
    assert.ok(existsSync(new URL(`../${path}`, import.meta.url)), `${path} not found`);
  }
});
