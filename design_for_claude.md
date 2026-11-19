# Design and Product Guide for Claude

This file carries everything needed to design or build for this website without access to the repository. Inside the repo, `DESIGN.md`, `PRODUCT.md` and `src/styles/tokens.css` are the sources it summarises.

Work inside the existing visual language: extend what is here, and treat a redesign as a separate request the user makes explicitly. The site's character comes from a small set of deliberate details, and changes that drift from them read as a different site.

## Product

This is Niko's bilingual Finnish and English consultant website. It explains services, expertise, practical resources, public thinking, and appearances across SEO, analytics, technical implementation, measurement, reporting, and AI-assisted digital workflows.

The site is a professional brand and services surface, not primarily a portfolio or software product. It should help visitors answer three questions quickly:

1. What can Niko help with?
2. Does his practical working approach fit the situation?
3. How can the visitor start a conversation?

Primary visitors are marketing, SEO, analytics, content, product, development, and business teams dealing with unclear tracking, scattered SEO work, conflicting dashboards, missing documentation, or premature automation. Secondary visitors include collaborators, employers, event organizers, podcast hosts, peers, and practitioners looking for useful articles and implementation resources.

The core offering includes technical SEO, analytics and measurement design, GA4, dataLayer planning, conversion tracking, Google Tag Manager, consent, marketing pixels, reporting, BigQuery, dashboards, practical AI workflows, documentation, and repeatable digital operating models.

## Article hero images

Read this section before generating, editing or proposing variants of a hero image. These requirements apply to article and landing-page heroes.

- **TMNT is the common element.** Every new hero and every variant must include a recognizable TMNT-inspired turtle character from the site's established visual family. Match the existing green turtle's expressive eyes, shell, proportions and tactile rendering. The setting, action, clothing and composition can vary with the topic.
- **Use the established soft 3D style.** Match the warm light, rounded cream panels, lavender and purple details and restrained yellow accents in the current heroes. A palette match alone is insufficient: the character and rendering must also belong to the same series.
- **Read the visual references before generating.** Inspect the five most recent article heroes and use at least one existing hero as an image reference in the generation call. Start with `src/assets/blog/contact-detail-clicks-and-copy-tracking.jpeg`, `src/assets/blog/heatmaps-and-content-element-tracking.jpeg` and `src/assets/blog/page-classification-for-website-analytics.jpeg` for the current turtle and rendering style.
- **Vary the scene within the series.** Different versions may change the turtle's pose, setting, metaphor, props, camera angle or composition. Vary at least two of these dimensions from the nearest similar hero. Keep the TMNT character family and soft 3D rendering consistent. A flat, paper-cut, abstract or character-free image is a change of visual direction and requires Niko's explicit request.
- Create new hero images at **1536 × 1024 pixels (3:2)**. Existing assets may keep their dimensions. Keep essential subjects within the central 75% of the width and 70% of the height for cropping.
- Keep the idea readable at thumbnail size. Put article titles in HTML, and keep text, detailed code and unnecessary interface clutter out of the image.
- In the prompt, state the topic, character, action, setting, composition and rendering style. Say which reference qualities to preserve and which scene elements to vary.
- Before finishing, compare the result with the reference heroes at thumbnail size and check the actual desktop and mobile crops. Revise a result that changes the series' style, loses the turtle or crops an essential subject.
- Save the JPEG source under `public/images/blog/` and an identical copy under `src/assets/blog/` for responsive image generation. Use a descriptive lowercase filename with hyphens; preserve alternatives with distinct filenames.
- Set `image`, meaningful `imageAlt` and `imageCredit` in article frontmatter. Finnish AI-generated images use `imageCredit: "Luotu OpenAI ImageGenillä"`; use the corresponding English credit for English articles.
- Article images are CC0 by default, matching the Terms of Use. Set `imageLicense: reserved` only when Niko says an image is reserved, such as a photo he owns.

## Brand direction

The brand is Finnish, precise, practical, calm, and quietly playful. It should feel like a well-kept technical notebook with a small comic-inspired twist: exact enough to trust, human enough to remember.

Use plain language, concrete examples, and occasional dry humor. Technical depth should be visible through useful detail, not jargon or performance. Lead with the useful outcome or situation, then explain the implementation.

The visual system is minimal and asymmetric, with restrained violet accents, punchy yellow labels, subtle halftone details, tactile controls, and soft abstract panels. Personality sits on top of clarity and credibility, never in place of them.

What that means in practice, and why:

- **Specific over generic.** Name the situation and the result ("dashboards that agree with each other"), because claims about transformation or growth could sit on any consultancy site.
- **One clear route to contact.** Visitors come to judge fit, so a single human call to action works better than repeated conversion blocks or funnel pressure.
- **Decisions over artefacts.** Show what a setup helps a team decide; dashboards, tool logos and screenshots support that story rather than carry it.
- **AI as a tool people direct.** Describe what a person does with it, which keeps the site credible with readers wary of AI hype.
- **Hierarchy before density.** Give technical material a path a non-specialist can follow.
- **Comic details as accents.** Halftone shadows and yellow labels add memory; the page underneath stays calm and exact.
- **Only facts the user supplied.** Prices, clients, metrics, case studies and testimonials come from Niko. An empty slot is better than an invented one, because one false number undermines every true one.
- **Flat, tonal surfaces.** Borders and tinted panels carry structure, which keeps the look away from glassmorphism, gradient text, colored side stripes and repetitive card grids.

## Design tokens

Tokens live in `src/styles/tokens.css` and are authoritative. Reuse them before adding values.

### Color

The site supports light and dark themes through `color-scheme` and `light-dark()`.

```css
--color-neutral-950: oklch(18% 0.01 286);
--color-neutral-900: oklch(24% 0.01 286);
--color-neutral-700: oklch(50% 0.018 286);
--color-neutral-500: oklch(68% 0.018 286);
--color-neutral-200: oklch(93% 0.006 286);
--color-neutral-100: oklch(96% 0.006 286);
--color-neutral-050: oklch(99.5% 0.004 286);
--color-accent: light-dark(oklch(52% 0.23 286), oklch(72% 0.17 286));
--color-pop: oklch(89% 0.16 92);
--color-danger: light-dark(oklch(52% 0.19 27), oklch(70% 0.17 25));
--color-warning: light-dark(oklch(55% 0.14 70), oklch(80% 0.14 85));
--color-ink: light-dark(var(--color-neutral-950), var(--color-neutral-100));
--color-bg: light-dark(var(--color-neutral-050), oklch(17% 0.008 286));
--color-muted: light-dark(var(--color-neutral-700), var(--color-neutral-500));
--color-line: light-dark(var(--color-neutral-200), oklch(25% 0.008 286));
--color-surface: color-mix(in srgb, var(--color-ink) 4%, var(--color-bg));
--color-surface-raised: color-mix(in srgb, var(--color-bg) 98%, transparent);
--color-accent-soft: color-mix(in srgb, var(--color-accent) 8%, transparent);
--color-accent-panel: color-mix(in srgb, var(--color-accent) 5%, var(--color-bg));
```

Semantic aliases are `--ink`, `--bg`, `--muted`, `--line`, `--accent`, and `--pop`.

- Use `--accent` for links, emphasis, and quiet active states.
- Use `--pop` for the yellow comic accent, badges, and primary tactile moments. Text on `--pop` is always `--color-neutral-950`, never `--ink` (white in dark mode).
- Use tinted neutrals instead of pure black or white.
- Pair color with a second signal (weight, underline, icon, text) for every state, so it survives color blindness and forced-colors mode.
- Maintain WCAG AA contrast in both themes.

### Typography

```css
--font-body: "Roboto Flex", system-ui, sans-serif;
--font-display: "Fraunces", Georgia, serif;
--font-mono: ui-monospace, "SF Mono", "Cascadia Code", "JetBrains Mono", Menlo, Consolas, monospace;
--font-weight-body: 420;
--font-weight-medium: 560;
--font-weight-strong: 650;
--font-weight-bold: 700;
--font-size-body: 18px;
--line-height-body: 1.65;
--tracking-label: 0.08em;
--tracking-eyebrow: 0.2em;
```

- Roboto Flex is for body copy, navigation, controls, metadata, and labels.
- Fraunces is for page headings, section headings, post titles, and selected brand moments.
- Monospace is for code and technical samples only; technical credibility comes from the content.
- Keep paragraphs near 65–75 characters wide.
- Use a clear type hierarchy with meaningful scale and weight contrast.
- Use uppercase only for short labels and eyebrows; body copy stays in sentence case for readability.
- Use `text-wrap: pretty` for body content and `text-wrap: balance` for headings.

### Layout, shape, and motion

```css
--container-width: 68rem;
--container-gutter: 2.5rem;
--section-y: 4rem;
--section-y-large: 5rem;
--split-gap: 2.5rem;
--split-gap-wide: 4.5rem;
--radius-xs: 4px;
--radius-sm: 6px;
--radius-md: 12px;
--radius-lg: 16px;
--radius-xl: 24px;
--radius-pill: 999px;
--duration-fast: 150ms;
--duration-base: 180ms;
--ease-snap: cubic-bezier(0.22, 1, 0.36, 1);
```

- Prefer calm asymmetric layouts and varied spacing rhythm.
- Keep the standard page container at `68rem`; article heroes may break out to `100rem` while retaining the viewport gutter.
- Use borders and tonal surfaces for structure. Use shadows sparingly and purposefully.
- Let most sections sit directly on the page; reserve cards for genuinely separate items, one level deep.
- Animate transforms, opacity, and similar compositor-friendly properties rather than layout properties.
- Respect `prefers-reduced-motion: reduce`; motion must never be required to understand state.

## Reusable visual patterns

Shared patterns live in `src/styles/patterns.css`. Keep their existing class names and behavior.

### CTA

`.cta` is the signature comic control with a solid offset shadow. Hover lifts it, turns it violet and runs a speed-line swipe; active squashes it into a sunken dark frame. The primary (pop yellow) adds a 1px border, a top highlight, a bottom bevel and a soft top shade when pressed. Focus uses the strong focus ring. `.cta--secondary` uses a plain face and muted outline.

Use `ButtonLink.astro` rather than recreating CTA markup.

### Editorial hero

`.editorial-hero` is the visual family shared by the homepage and article heroes. It uses bordered panels, restrained radii, asymmetric composition, and a dark visual panel. Posts without images use deterministic CSS artwork. Posts with images use a restrained overlay or scrim to preserve text legibility.

### Labels and metadata

- `.eyebrow` and `.label`: compact uppercase violet labels with tracking.
- `.badge`: yellow pill label with a crisp border and small hard shadow. Use `Badge.astro` for repeated badges.
- `.featured-label`: framed label overlapping the top edge of a featured article or selected resource card. Reuse the same theme-aware background, border and compact typography; the containing link stays positioned and allows the label to extend beyond its top edge.
- `ServiceCard` `quiet`: low-key variant for pages where the card sits beside content cards (the home page tools and templates band). Hairline `--line` border, `--radius-lg`, `--font-display` sentence-case title, dotted shadow only on hover and focus. Hubs keep the default card.
- `.featured-card`: shared hover treatment for article and resource cards, revealing a halftone pattern at the top right and changing the title to the accent color.
- `.tag`: soft violet pill for categories or metadata.
- `.byline`: compact flexible metadata row. It omits the author name, since all content is by Niko.

### Surfaces and lists

- `.surface`: quiet tinted background, `1px` line, and `--radius-md`.
- `.workbench`: two-column tool layout. Inputs stack on the left; `.workbench__output` is sticky beside them from 64rem and stacks below on narrow screens. Use it for tools where the output updates live as the user edits.
- `.field`: text input and select. 1px control border at 3:1 contrast, `--radius-md`, `--focus-ring` on focus.
- `.combobox`: text input with a toggle and a grouped listbox menu (`.combobox__menu`, `__heading`, `__option`, `__name`, `__desc`, `__tag`). Options show a name, a one-line truncated description and a tag. Use `role="combobox"` with `aria-controls`, `aria-expanded` and `aria-activedescendant`; options carry `aria-selected`. The menu heading is sticky.
- `.segmented`: group of toggle buttons where one has `aria-pressed="true"`. The pressed segment inverts ink and background, so state does not rely on color alone.
- `.code-output`: select-all `<pre>` for generated code, with the mono font and a 1px control border. Add `data-no-chrome` so the shared code-block header and copy button are skipped when the tool has its own copy button.
- `.notice`: one status message with a leading symbol as the second signal. Variants: `--success`, `--warning`, `--danger`; the default uses `--accent`. Set `role="status"` (or `role="alert"` for errors).
- `.chip`: small bordered label for state or category inside tools (`--danger`, `--warning`, `--success`). Use `.badge` for the yellow content-type label and `.tag` for article metadata.
- `.field-label`, `.field-hint`, `.field-error`: label, hint and error text around a `.field`. The error uses `--color-danger` with bold weight; pair it with `role="alert"` or `aria-live` when it appears after input.
- `.btn-quiet`: bordered secondary action (`--dashed` for "add" actions, `--primary` for the filled accent version). Use `.cta` for the main action of a page and `.btn-quiet` inside tools. Toggle state uses `aria-pressed`.
- `.field-row`: one labelled value with its controls and an inline error (`__top`, `__label`, `__key`, `__controls`, `__error`, `__warning`, `__remove`). The label side and the controls wrap onto separate lines on narrow screens.
- `.popover` with `.popover-anchor`: panel opened by a button and placed under it, with `.popover__close`. The button carries `aria-expanded` and `aria-controls`; Escape closes the panel and returns focus to the button.
- `.combobox` select-only variant: a read-only `.combobox__input` with a listbox of `.combobox__option` items that have a `.combobox__name` only. Use it instead of a native `<select>` when the list is long. The chosen value lives in `data-value`; arrow keys move `.is-active`, Enter or Space selects, Escape and Tab close.
- `.panel-heading` with `.panel-heading__title`: small uppercase title with a rule beneath and room for a chip or count on the right. The title class also works alone for a small uppercase label.
- `.btn-link`: link-styled button for an action that is not navigation. Use `.text-link` for real links.
- `.toast` with `.toast-anchor`: short status ("Copied") above the control that caused it. Give it `role="status"` and add `.is-visible` for a moment.
- `.wide-band`: full-width wrapper for tool pages that need more room than the reading column. The Meta event builder uses it around `.workbench`.
- `.viz`: bordered figure frame for in-article animated explainers (`src/styles/viz.css`, tokens only, so light and dark follow the site). The default markup is the finished state; `[data-state]` adds the animation, so the figure still reads without JavaScript or with reduced motion. Parts: `.viz__head`, `.viz__title`, `.viz__replay`, `.viz__phase`, `.viz__caption`. Visual-specific classes use short prefixes (`.vm__*`, `.df__*`, `.uc__*`).
- `.about` and `.page-section`: responsive two-column content sections.
- `.process-list`: numbered process presentation.
- `.formats-list`: compact arrow-led options.
- `.brand-mark`: the only highlighted-word treatment. It uses italic display type and a soft rotated accent band.

## Components and architecture

The stack is Astro with global CSS and local component styles. Reach for semantic HTML, CSS, or small native JavaScript before a dependency.

Reusable components include:

- `ButtonLink.astro`: primary and secondary CTA links.
- `SplitSection.astro`: shared two-column section wrapper.
- `PatternList.astro`: numbered and arrow list variants.
- `Badge.astro`: accessible repeated labels.
- `ImageModal.astro`: shared full-window image viewer for opted-in figures or image links. Uses the native dialog, theme tokens and the body font. Keeps close and zoom controls visible, fits images without cropping, supports dragging and pinch zoom, and restores focus and the reading position. See README for the `data-image-modal` markup and fallback link.
- `viz/VizFrame.astro`, `ViewsMerge.astro`, `DataFlow.astro`, `UrlChange.astro`: language-version visuals for articles. All text is real HTML/SVG text. `src/layouts/ArticleWithVisuals.astro` wraps Markdown articles: mark each spot with `<div data-viz="views-merge"></div>` (or `data-flow`, `url-change`) and the layout swaps in the rendered component. Copy comes from `src/data/language-visuals.js`; the figure takes `lang` from the page path.
- `Appearances.astro`: talks, podcasts and publications list used on the About pages. Each item has a date, a yellow `Podcast` badge and the episode language on one meta line, then a serif title, a muted description and pill-shaped platform links under a "Listen on" label. Data comes from `src/data/appearances.js`. The design-system page renders the component itself.
- `ArticleCard.astro`: article preview card.
- `PostHero.astro`, `TableOfContents.astro`, `AskAI.astro`, `Postscript.astro`, and `RelatedArticles.astro`: article-page patterns.

Header, footer, hero artwork, and large navigation patterns are intentionally bespoke. Extract a component only when purpose is genuinely shared and repeated.

## Article and prose styling

Markdown and HTML post content is wrapped in `.prose`; its shared styles live in `src/styles/global.css`.

- Maintain generous heading rhythm and a centered readable text column.
- Figures are quiet bordered panels that contain image and caption. Images inside figures do not receive a second border.
- Embedded `iframe`, `embed`, and `object` elements have no border.
- Tables use a crisp bordered panel, responsive horizontal overflow, and clear header hierarchy.
- Inline code uses a soft accent chip. Sample output uses a neutral outlined treatment. Code blocks include a native copy button.
- Blockquotes, details, forms, inputs, choice controls, and buttons use the same restrained comic vocabulary.
- Content links use the multiline comic-highlight treatment: violet underline at rest, delayed yellow underline and shadow on hover or keyboard focus, a soft accent background, cloned decoration across wrapped lines, and reduced-motion support.
- Disabled prose buttons and disabled radio/checkbox choice rows shake briefly on primary pointer press. Disabled fields do not shake. Native `disabled` semantics remain intact, and the behavior is removed for reduced-motion users.

## Interaction and accessibility

Accessibility is a design requirement, not a cleanup step.

- Use semantic HTML and meaningful heading order.
- Preserve complete keyboard access and visible `:focus-visible` states.
- Use `aria-current`, `aria-expanded`, `aria-controls`, `aria-hidden`, and accessible names where their semantics apply.
- Use native `disabled` for disabled controls, so assistive technology and keyboards treat them as disabled too.
- Ensure active and selected states use more than color.
- Keep touch targets usable and responsive layouts free from horizontal page scrolling.
- Provide meaningful alt text for informative images and hide decorative artwork from assistive technology.
- Use `lang`, `hreflang`, canonical URLs, and alternate-language links correctly.
- Remove nonessential motion for reduced-motion users, and carry meaning in something besides motion.

## Bilingual content

English and Finnish experiences must be equivalent in intent and structure, but copy should sound natural in each language rather than mechanically translated.

- Preserve language-specific navigation, URLs, metadata, and alternate links.
- Use clear, human calls to action such as starting a project, getting in touch, or exploring a useful resource.
- Prefer concrete nouns and short direct sentences.
- Explain what a technical setup helps a team do, who uses it, and what becomes clearer.
- Fill layouts only with facts the user supplied; leave a slot empty rather than invent one.

## How to make a change

1. Read the existing component, nearby patterns, `src/styles/tokens.css`, `src/styles/global.css`, and `src/styles/patterns.css`.
2. Reuse an existing component or token when its purpose matches.
3. Make the smallest coherent change at the shared source of truth, so the fix reaches every page that uses it.
4. Keep current behavior intact in light and dark themes, keyboard navigation, mobile layouts, and reduced-motion mode.
5. Keep one-off art direction local; extract only what is already repeated.

Defaults that keep the site consistent:

- Native CSS and small JavaScript for styling and interaction; the site ships few dependencies and stays fast.
- Existing tokens for color, font, radius, shadow, and motion. A new value is a design decision to raise with the user.
- Stable hit areas: animate the visual surface inside a control, so the target never moves under the pointer.
- Transform and opacity for motion, because animating layout properties causes jank and reflow.
- Inline content or progressive disclosure first; a modal is the fallback.
- Stronger hierarchy rather than more copy when a section reads weakly.
- English and Finnish variants changed together in the same edit.

## Quality checklist

Before handing off a change, verify:

- The outcome is immediately understandable.
- The page still feels calm, exact, practical, and quietly playful.
- Both color schemes maintain contrast and visual hierarchy.
- Keyboard focus, touch targets, and semantics remain correct.
- Reduced-motion mode removes nonessential motion.
- Finnish and English paths remain equivalent where applicable.
- Mobile layouts do not overflow horizontally.
- `npm test` passes.
- `npm run build` passes (it also validates frontmatter and EN↔FI links).
- `/design-system/` still represents the shared visual patterns accurately.
