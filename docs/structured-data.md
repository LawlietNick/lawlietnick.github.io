# Structured data

## Generation flow

`src/layouts/Base.astro` passes each page's canonical URL and metadata to
`src/components/Schema.astro`. The component imports the portrait from
`src/assets/about/portrait.jpeg`, asks Astro's image pipeline for an optimized
WebP, converts the emitted path to an absolute URL using `Astro.site`, and calls
`buildSchemaGraph` in `src/utils/schema.ts`.

Changeable site, WebSite, and Person identity values live in
`src/data/site.js`. The single official `siteName` is
`Niko Karppinen`; `brandName` and both configuration properties derive from it.
`WebSite` has no `alternateName`: `karppinen.one` is the address, not a second
name. Niko remains identified through the Person entity, descriptions, feed
author, and article author metadata.

`Person.url` points to the About page in the page's language:
`https://karppinen.one/about/` on English pages and
`https://karppinen.one/fi/minusta/` on Finnish pages. The identity stays the
single `@id` `https://karppinen.one/#person` in both languages.

`Person.worksFor` embeds Agency Bobble's Organization type, name, and canonical
URL alongside its external `@id`. This keeps the relationship self-contained
without adding a separate Organization node to the site's graph.

## Atom subscription action

The shared `WebSite` node contains one `SubscribeAction` targeting the primary
English Atom feed:

`https://karppinen.one/atom.xml`

The action belongs to `WebSite` because it describes subscribing to the site's
published content, not an action performed on an individual page, article, or
Person. The verified route is stored as `siteConfig.website.atomFeedPath` and is
used by both the English feed generator and the schema builder; the schema turns
it into an absolute URL using the canonical site URL. The separate Finnish feed
at `https://karppinen.one/fi/atom.xml` remains available but is not duplicated
as a second action on the shared site entity.

The shared `<head>` in `src/layouts/Base.astro` also emits one Atom discovery
link. Its title comes from `siteConfig.website.name`, and Astro's configured site
URL makes the production `href` absolute.

## Homepage graph

The English root homepage emits only `WebPage`, `WebSite`, the shared portrait
`ImageObject`, and `Person`, the same as the Finnish homepage at `/fi/`. Its
`WebPage` keeps the canonical identity, website relationship, Person subject,
description, and language; `primaryImageOfPage` and `Person.image` both
reference `https://karppinen.one/#personimage`. It deliberately has no `ReadAction`: loading the
homepage is not a useful reading action. It also has no `BreadcrumbList` or
breadcrumb reference because a one-item breadcrumb that points only to the
current root page adds no hierarchy.

These conditions apply only to `/`. Deeper pages retain their ReadAction and
breadcrumb graph.
The WebSite's single Atom SubscribeAction remains present on the homepage.

## About-page graph

The English About page emits one connected `@graph` containing:

- `ProfilePage` at `https://karppinen.one/about/#profilepage`
- `BreadcrumbList` at `https://karppinen.one/about/#breadcrumb`
- `WebSite` at `https://karppinen.one/#website`
- one shared portrait `ImageObject` at `https://karppinen.one/#personimage`
- `Person` at `https://karppinen.one/#person`

The Finnish page at `https://karppinen.one/fi/minusta/` emits the same shape
with `#profilepage`, `#breadcrumb`, `inLanguage: fi` and the two-level
`Etusivu > Minusta` breadcrumb.

The `ProfilePage` names the Person once, as `mainEntity`, with no separate
`about`. Its
`primaryImageOfPage` and `image`, and the Person's `image`, all reference the
same `ImageObject`. This avoids two nodes describing one file under different
IDs. The page keeps the two-level `Home > About Niko Karppinen` breadcrumb.
About pages carry no `ReadAction`, and the Person has no `mainEntityOfPage`;
`ProfilePage.mainEntity` already states that relationship.

`dateModified` comes from `siteConfig.person.profileDateModified`. Update it
only when the visible profile content changes. Google's ProfilePage guidance
says adding outlinks to places that reference the profile is not a
modification, so new appearance or platform links leave it unchanged. There is no `dateCreated`
because the original publication date is not recorded; the first commit in
this repository is a later baseline.

`Person.knowsAbout` lists only topics the About pages describe. Topics with an
entry in `siteConfig.entities` become a `Thing` with Wikidata, Wikipedia and,
where known, Google Knowledge Graph (`search?kgmid=`) `sameAs` links; the rest
stay plain strings.

`ProfilePage.mentions` lists the podcast episodes shown on the About pages,
from `src/data/appearances.js`, as nested `PodcastEpisode` objects. They sit
on the page rather than `Person.subjectOf` because the episodes are about SEO
and analytics, not about Niko. Each names the Person as `contributor`,
because Niko appeared as a guest; it never claims author, creator or
publisher. `sameAs` holds the same episode on other platforms.

## Portrait asset

The only required source is:

`src/assets/about/portrait.jpeg` — 1000 × 1250 pixels (4:5)

No additional aspect ratios are required for the current ProfilePage JSON-LD.
Keep that filename and location when replacing the portrait. Astro fingerprints
the output, so the public filename can change after a source or pipeline change.
The build validated for this implementation produced:

`https://karppinen.one/_astro/portrait.BGUoeY7r_1uAL3w.webp`

Development-only file-backed paths, including encoded forms of `/@fs/` and
`/Users/`, are rejected by the schema builder. If Astro cannot provide a public
image URL in a development context, the image properties are omitted instead of
publishing a local filesystem path.

## Files changed

- `src/data/site.js`: stores the single official site-name source.
- `src/utils/feed.ts`: uses the centralized primary Atom feed path.
- `src/components/Schema.astro`: resolves the portrait once and passes it as
  the Person image everywhere and as the page image on both homepages and
  About pages.
- `src/layouts/Base.astro`: emits the canonical Atom discovery link and title.
- `src/components/Footer.astro`: displays the official name without appending
  the author as part of the brand name.
- `src/utils/schema.ts`: adds `Person.name`, rejects local image paths, reuses
  the Person image node when the page and Person portraits match, and attaches
  the Atom `SubscribeAction` to the shared WebSite; it also omits the root
  homepage's breadcrumb and ReadAction.
- `test/schema.test.ts`: covers identity values, local-path rejection, graph
  relationships, shared-image behavior, dimensions, and breadcrumbs.
- `docs/structured-data.md`: records the implementation and verification.

## Validation

Run from the project root:

```sh
npm test
npm run build
```

Validation on 2026-07-29 passed all 35 Vitest unit tests and 32 legacy Node
tests. The Astro production build and content validation completed successfully.
The generated `dist/about/index.html` parsed as valid JSON-LD, contained exactly
one portrait `ImageObject`, resolved every internal `@id` reference, and
contained no `/@fs/` or `/Users/niko/` path. The generated `dist/atom.xml`
passed `xmllint`, identifies itself as Atom, and contains absolute production
URLs. The WebSite graph contains exactly one SubscribeAction targeting that
feed; this action does not imply a Google rich result. The generated homepage
contains only WebPage, WebSite, and Person, with no breadcrumb or ReadAction,
and contains exactly one absolute Atom discovery link.
