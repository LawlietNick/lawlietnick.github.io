# karppinen.one

Niko Karppinen's bilingual (English and Finnish) consultant site: articles, implementation templates and browser-based tools for SEO, analytics and AI-assisted work. Astro, static output, deployed to GitHub Pages on every push to `main`.

Read the file that matches the task before you start:

- **Commands, structure, frontmatter:** [README.md](README.md)
- **Who the site is for, voice, what it must never claim:** [PRODUCT.md](PRODUCT.md)
- **Visual system, tokens, shared patterns:** [DESIGN.md](DESIGN.md). [design_for_claude.md](design_for_claude.md) is the same material as one self-contained file for tools that cannot read the repo; keep it in sync when you change DESIGN.md or PRODUCT.md.
- **Structured data:** [docs/structured-data.md](docs/structured-data.md)

## Conventions the code won't tell you

- **Every page has a twin.** English and Finnish versions share intent and structure, link to each other through `alternate` frontmatter, and get changed together. Write the Finnish side as natural Finnish, not as a translation; load the `suomi-finnish-skill` skill for any Finnish copy.
- **Facts come from Niko.** Prices, client names, metrics, testimonials and outcomes appear only when the user supplied them. When a layout wants a number you don't have, leave the slot empty and say so.
- **Dates are Helsinki calendar days.** Frontmatter holds a plain date (`2026-10-04`); `isoDate` turns it into midnight Europe/Helsinki with that day's offset. Keep that path rather than writing ISO timestamps by hand.
- **AI-made images say so** in `imageCredit`.
- **FAQ sections are plain `<details>` accordions.** Google limits FAQ rich results to government and health sites, so the site skips `FAQPage` markup.
- **JSON-LD references stay bare** (`{ "@id": ... }`), and breadcrumbs use Google's `ListItem` form. `test/schema.test.ts` guards the graph shape; the user validates it with Schema Workbench and the Rich Results Test.
- **Short codes and tags are readable words** or abbreviations the industry already uses (CMP, SEO, API).
- **Drafts live outside git.** Unpublished service pages and some posts are listed in `.gitignore`; they exist on disk but not in the public repo. Publishing one means removing its `.gitignore` line.

## Done means

`npm test` and `npm run build` both pass. `build` also validates frontmatter, EN↔FI links and page classification, so a missing translation link fails there. For visual changes, check the page in the browser in light and dark themes and at mobile width.

## graphify

A local knowledge graph lives in `.graphify/` (gitignored, so it may be missing). When `.graphify/graph.json` exists, start codebase questions with it, because it returns a scoped subgraph that is much smaller than grep output:

1. `graphify summary --graph .graphify/graph.json` for first-hop orientation.
2. `graphify query "<question>"`, `graphify path "<A>" "<B>"` or `graphify explain "<concept>"` for focused questions.
3. `graphify review-delta --graph .graphify/graph.json` for the impact of changed files.
4. `.graphify/GRAPH_REPORT.md` only for broad architecture review, or when the commands above come back thin.

If `.graphify/needs_update` exists or `.graphify/branch.json` has `stale=true`, tell the user the graph is stale before relying on it and suggest `/graphify . --update`. After modifying code files, run `npx graphify hook-rebuild` to keep the graph current.
