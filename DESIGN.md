# Design System

This design system documents the current Niko site as it exists in code. It is an extraction layer, not a redesign.

## Design direction

The site is a bilingual consultant brand surface: Finnish, minimal, practical and quietly playful. The visual system should feel calm and exact, with a small comic-style twist in the halftone CTA shadow, soft abstract panels and punchy yellow labels.

The system should support services, writing, resources and public proof without becoming a generic consultancy or SaaS landing page.

## Core principles

1. Preserve clarity before decoration.
2. Use technical detail only when it helps the visitor understand the work.
3. Keep layouts calm, asymmetric and readable.
4. Add personality through small, deliberate details.
5. Meet WCAG AA in light and dark themes.
6. Use only claims, metrics, testimonials and proof points the user supplied.

## Token layers

Design tokens live in `src/styles/tokens.css`.

- Primitive colors use OKLCH where possible.
- Semantic aliases such as `--ink`, `--bg`, `--muted`, `--line`, `--accent` and `--pop` remain for compatibility.
- Radius, spacing, focus and motion tokens should be used before introducing hard-coded values.
- Light and dark themes are handled with `color-scheme` and `light-dark()`.

Use `--color-warning` for warning states, with `--color-success` and `--color-danger`. Use `--pop` for the yellow comic accent. Text on `--pop` yellow is always `--color-neutral-950`, never `--ink`, which turns white in dark mode. Use `--accent` for links, emphasis and quiet active states. Pair accent color with a second signal (weight, underline, icon) whenever it marks state.

## Global styles

Global base styles live in `src/styles/global.css`.

- Body text uses Roboto Flex.
- Display headings use Fraunces because the current brand already relies on that shape.
- Markdown content uses the `.prose` pattern.
- The skip link, copy button, table styles and visually hidden utility are global.

## Typography usage

Typography is part of the brand voice: practical body text with a slightly odd, expressive display face. Use the font tokens from `src/styles/tokens.css` before introducing new font declarations.

### Font roles

- `--font-body`: Roboto Flex. Use for body copy, navigation, buttons, metadata, labels, service cards and most UI text.
- `--font-display`: Fraunces. Use for page headings, section headings, post titles and selected brand moments.
- Monospace: use only for code inside prose or technical examples. Technical credibility comes from the content, not the typeface.

### Type rules

- Body copy uses `18px` with `1.65` line-height through `--font-size-body` and `--line-height-body`.
- Interactive tools inherit the same body family and root size, with `--font-size-ui-sm` and `--font-size-ui-xs` reserved for secondary labels and metadata.
- Keep paragraphs readable. Aim for roughly 65 to 75 characters per line.
- Use Fraunces for hierarchy and personality, not for long paragraphs, labels, badges or navigation.
- Use Roboto Flex with `--font-weight-body`, `--font-weight-medium`, `--font-weight-strong` and `--font-weight-bold` instead of hard-coded weight values.
- Use `.eyebrow` and `.label` for short uppercase labels with tracking. Body copy stays in sentence case.
- Tool heroes never use an eyebrow. The breadcrumb already provides category context.
- The `.brand-mark` pattern is the only highlighted-word treatment. It uses the display context around it, with italic styling and the soft rotated accent band.
- In dark mode, keep muted text large enough and spacious enough to stay readable. Make dense sections fit by restructuring them, keeping body size and line-height.

## Reusable patterns

Shared patterns live in `src/styles/patterns.css`.

- `.cta`: comic CTA with a solid offset shadow. Hover lifts it, turns it violet and runs a speed-line swipe; press squashes it into a sunken dark frame. The primary (pop yellow) adds a 1px border, a top highlight, a bottom bevel and a soft top shade when pressed. Secondary CTAs use a plain face with a muted outline. On the design-system page, `.is-hover`, `.is-active` and `.is-focus` freeze a state for comparison.
- `.editorial-hero`: shared visual family for the homepage bento and blog post split hero. Reuse its outer frame, panel surfaces, spacing, radii and dark visual treatment while allowing page-specific composition. Posts without images use deterministic CSS artwork; posts with images use a dark lower scrim and restrained halftone overlay.
- `.eyebrow`: small uppercase section label.
- `.about`: two-column split section used for intro/about-style content.
- `.page-section`: two-column content section used for services and structured pages.
- `.process-list`: numbered process list.
- `.formats-list`: arrow list for compact project formats or options.
- `.badge`: yellow label for content type or status. Use the `Badge.astro` component for repeated labels such as `Podcast`. Add one only where layout does not already communicate prominence (the larger first post card needs none).
- `.featured-label`: framed label overlapping the top edge of a featured article or selected resource card. Reuse the same theme-aware background, border and compact typography; the containing link stays positioned and allows the label to extend beyond its top edge.
- `ServiceCard` `quiet`: low-key variant for pages where the card sits beside content cards (the home page tools and templates band). Hairline `--line` border, `--radius-lg`, `--font-display` sentence-case title, dotted shadow only on hover and focus. Hubs keep the default card.
- `.featured-card`: shared hover treatment for article and resource cards, revealing a halftone pattern at the top right and changing the title to the accent color.
- `.tag` and `.byline`: compact metadata and label rows. They omit the author name, since all content is written by the site owner.
- `.surface`: quiet bordered surface.
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
- Tool-specific layout classes (`.meb-*` in `src/styles/meta-event-builder.css`) only handle spacing and arrangement. Compose the shared pieces above first.

Keep existing class names when they are already part of the site language.

## Components

Reusable components live in `src/components/`.

- `ButtonLink.astro`: CTA link, preserving `.cta`.
- `SplitSection.astro`: shared two-column section wrapper.
- `PatternList.astro`: numbered and arrow lists.
- `Badge.astro`: accessible visual label.
- `ImageModal.astro`: shared full-window image viewer for opted-in figures or image links. Uses the native dialog, theme tokens and the body font. Keeps close and zoom controls visible, fits images without cropping, supports dragging and pinch zoom, and restores focus and the reading position. See README for the `data-image-modal` markup and fallback link.
- `Appearances.astro`: talks, podcasts and publications list used on the About pages. Each item has a date, a yellow `Podcast` badge and the episode language on one meta line, then a serif title, a muted description and pill-shaped platform links under a "Listen on" label. Data comes from `src/data/appearances.js`. The design-system page renders the component itself.
- `ToolHero.astro`: shared heading and lead structure for interactive and content-based tool pages.
- `Ga4AnnotationBuilder.astro`: category-led annotation editor using the existing tool typography, surfaces and controls; route-specific behavior is recorded in [.impeccable/surfaces/src-pages-fi-tyokalut-ga4-annotaatiot-astro.md](.impeccable/surfaces/src-pages-fi-tyokalut-ga4-annotaatiot-astro.md).

- `viz/VizFrame.astro`, `ViewsMerge.astro`, `DataFlow.astro`, `UrlChange.astro`: language-version visuals for articles. All text is real HTML/SVG text. `src/layouts/ArticleWithVisuals.astro` wraps Markdown articles: mark each spot with `<div data-viz="views-merge"></div>` (or `data-flow`, `url-change`) and the layout swaps in the rendered component. Copy comes from `src/data/language-visuals.js`; the figure takes `lang` from the page path.

Header, footer, hero artwork and large navigation patterns remain bespoke. They use shared tokens and keep their own markup.

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

## Accessibility rules

- Maintain WCAG AA contrast in both themes.
- Use visible focus states for all keyboard targets.
- Active and current states must use more than color alone.
- Keep language links semantic with `lang`, `hreflang`, `rel="alternate"` where applicable and `aria-current` for the current language.
- Keep layouts responsive without horizontal scrolling.
- Respect reduced motion.

## When to abstract

Extract a component when the purpose is shared and the pattern is likely to be reused. Visual similarity alone is not enough.

Keep one-off art direction local. The home hero, mega navigation, footer theme toggle and appearance list can stay bespoke until the same pattern appears in more places.

## Visual QA

Use `/design-system/` for local visual checks. It is intentionally hidden from navigation and marked `noindex,nofollow`.

Header reflow: the brand name wraps as needed, toggle/close controls retain 44px targets, and mobile panel placement follows the measured header height. CSS and JavaScript share the 56rem desktop breakpoint. Verified FI/EN at 320–1440px with 100%/200% root text sizing, including focus trapping and breakpoint transitions.
