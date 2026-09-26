# Design and Product Guide for Claude

Use this file as the self-contained source of truth when designing or implementing this website. Preserve the existing visual language and product intent. Do not redesign the site unless the user explicitly asks for a redesign.

## Product

This is Niko's bilingual Finnish and English consultant website. It explains services, expertise, practical resources, public thinking, and appearances across SEO, analytics, technical implementation, measurement, reporting, and AI-assisted digital workflows.

The site is a professional brand and services surface, not primarily a portfolio or software product. It should help visitors answer three questions quickly:

1. What can Niko help with?
2. Does his practical working approach fit the situation?
3. How can the visitor start a conversation?

Primary visitors are marketing, SEO, analytics, content, product, development, and business teams dealing with unclear tracking, scattered SEO work, conflicting dashboards, missing documentation, or premature automation. Secondary visitors include collaborators, employers, event organizers, podcast hosts, peers, and practitioners looking for useful articles and implementation resources.

The core offering includes technical SEO, analytics and measurement design, GA4, dataLayer planning, conversion tracking, Google Tag Manager, consent, marketing pixels, reporting, BigQuery, dashboards, practical AI workflows, documentation, and repeatable digital operating models.

## Brand direction

The brand is Finnish, precise, practical, calm, and quietly playful. It should feel like a well-kept technical notebook with a small comic-inspired twist: exact enough to trust, human enough to remember.

Use plain language, concrete examples, and occasional dry humor. Technical depth should be visible through useful detail, not jargon or performance. Lead with the useful outcome or situation, then explain the implementation.

The visual system is minimal and asymmetric, with restrained violet accents, punchy yellow labels, subtle halftone details, tactile controls, and soft abstract panels. Personality must never reduce clarity or credibility.

Avoid:

- Generic consultancy claims about transformation, innovation, or growth.
- Enterprise SaaS layouts, feature theatre, aggressive funnels, and repeated conversion blocks.
- Portfolio-first pages dominated by dashboards, tool logos, or screenshots.
- AI hype or language that makes automation sound magical or autonomous.
- Dense technical documentation without hierarchy or context.
- Fully cartoon-like, novelty-led, noisy, or over-polished personal-brand styling.
- Invented prices, client facts, metrics, case studies, testimonials, or proof points.
- Decorative glassmorphism, gradient text, colored side stripes, and repetitive card grids.

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
- Use `--pop` for the yellow comic accent, badges, and primary tactile moments.
- Use tinted neutrals instead of pure black or white.
- Never communicate state through color alone.
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
- Monospace is only for code and technical samples, never a generic signal for “technical.”
- Keep paragraphs near 65–75 characters wide.
- Use a clear type hierarchy with meaningful scale and weight contrast.
- Use uppercase only for short labels and eyebrows, never body copy.
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
- Do not wrap every section in a card or nest cards.
- Animate transforms, opacity, and similar compositor-friendly properties rather than layout properties.
- Respect `prefers-reduced-motion: reduce`; motion must never be required to understand state.

## Reusable visual patterns

Shared patterns live in `src/styles/patterns.css`. Keep their existing class names and behavior.

### CTA

`.cta` is the signature comic control. Its outer element is a stable hit area. `.cta__surface` provides the solid face, while a neutral halftone shadow sits behind it. Hover lifts the surface slightly and separates the shadow; active presses the surface down and hides the shadow. Focus uses the strong focus ring. `.cta--secondary` uses a dark face and muted outline.

Use `ButtonLink.astro` rather than recreating CTA markup.

### Editorial hero

`.editorial-hero` is the visual family shared by the homepage and article heroes. It uses bordered panels, restrained radii, asymmetric composition, and a dark visual panel. Posts without images use deterministic CSS artwork. Posts with images use a restrained overlay or scrim to preserve text legibility.

### Labels and metadata

- `.eyebrow` and `.label`: compact uppercase violet labels with tracking.
- `.badge`: yellow pill label with a crisp border and small hard shadow. Use `Badge.astro` for repeated badges.
- `.tag`: soft violet pill for categories or metadata.
- `.byline`: compact flexible metadata row. Do not display the author name when all content is by Niko.

### Surfaces and lists

- `.surface`: quiet tinted background, `1px` line, and `--radius-md`.
- `.about` and `.page-section`: responsive two-column content sections.
- `.process-list`: numbered process presentation.
- `.formats-list`: compact arrow-led options.
- `.brand-mark`: the only highlighted-word treatment. It uses italic display type and a soft rotated accent band.

## Components and architecture

The stack is Astro with global CSS and local component styles. Avoid dependencies for behavior achievable with semantic HTML, CSS, or small native JavaScript.

Reusable components include:

- `ButtonLink.astro`: primary and secondary CTA links.
- `SplitSection.astro`: shared two-column section wrapper.
- `PatternList.astro`: numbered and arrow list variants.
- `Badge.astro`: accessible repeated labels.
- `ArticleCard.astro`: article preview card.
- `PostHero.astro`, `TableOfContents.astro`, `AskAI.astro`, `Postscript.astro`, and `RelatedArticles.astro`: article-page patterns.

Header, footer, hero artwork, and large navigation patterns are intentionally bespoke. Do not force them into generic abstractions. Extract a component only when purpose is genuinely shared and repeated.

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
- Keep disabled controls truly disabled. Do not simulate disabled state with appearance alone.
- Ensure active and selected states use more than color.
- Keep touch targets usable and responsive layouts free from horizontal page scrolling.
- Provide meaningful alt text for informative images and hide decorative artwork from assistive technology.
- Use `lang`, `hreflang`, canonical URLs, and alternate-language links correctly.
- Do not add motion for reduced-motion users or rely on motion to communicate meaning.

## Bilingual content

English and Finnish experiences must be equivalent in intent and structure, but copy should sound natural in each language rather than mechanically translated.

- Preserve language-specific navigation, URLs, metadata, and alternate links.
- Use clear, human calls to action such as starting a project, getting in touch, or exploring a useful resource.
- Prefer concrete nouns and short direct sentences.
- Explain what a technical setup helps a team do, who uses it, and what becomes clearer.
- Never invent facts to fill a layout.

## Implementation rules for Claude

Before changing a design:

1. Inspect the existing component, nearby patterns, `src/styles/tokens.css`, `src/styles/global.css`, and `src/styles/patterns.css`.
2. Reuse an existing component or token when its purpose matches.
3. Make the smallest coherent change at the shared source of truth.
4. Preserve current behavior in light and dark themes, keyboard navigation, mobile layouts, and reduced-motion mode.
5. Keep one-off art direction local rather than creating speculative abstractions.

Do not:

- Add a dependency for styling or interaction that native CSS or JavaScript handles.
- Introduce a new color, font, radius, shadow, or motion curve when an existing token fits.
- Move clickable hit areas during animation.
- Animate width, height, margins, or other layout properties.
- Add modals as the first solution when inline or progressive disclosure works.
- Use more copy to compensate for weak hierarchy.
- Change language variants inconsistently.

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
- `npx astro build` passes.
- `/design-system/` still represents the shared visual patterns accurately.
