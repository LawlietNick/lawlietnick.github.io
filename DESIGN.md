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

Use `--pop` for the yellow comic accent. Use `--accent` for links, emphasis and quiet active states. Pair accent color with a second signal (weight, underline, icon) whenever it marks state.

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

- `.cta`: comic CTA with a clean solid face and a full-size neutral halftone shadow. The outer `.cta` is the stable hit area; `.cta__surface` lifts while the shadow separates farther down and right on hover, then compresses on press. The hitbox stays still, so the target never moves under the pointer, and the dots stay clear of the label. Secondary CTAs use a dark face with a muted neutral outline.
- `.editorial-hero`: shared visual family for the homepage bento and blog post split hero. Reuse its outer frame, panel surfaces, spacing, radii and dark visual treatment while allowing page-specific composition. Posts without images use deterministic CSS artwork; posts with images use a dark lower scrim and restrained halftone overlay.
- `.eyebrow`: small uppercase section label.
- `.about`: two-column split section used for intro/about-style content.
- `.page-section`: two-column content section used for services and structured pages.
- `.process-list`: numbered process list.
- `.formats-list`: arrow list for compact project formats or options.
- `.badge`: yellow label for content type or status. Use the `Badge.astro` component for repeated labels such as `Podcast`. Add one only where layout does not already communicate prominence (the larger first post card needs none).
- `.tag` and `.byline`: compact metadata and label rows. They omit the author name, since all content is written by the site owner.
- `.surface`: quiet bordered surface.

Keep existing class names when they are already part of the site language.

## Components

Reusable components live in `src/components/`.

- `ButtonLink.astro`: CTA link, preserving `.cta`.
- `SplitSection.astro`: shared two-column section wrapper.
- `PatternList.astro`: numbered and arrow lists.
- `Badge.astro`: accessible visual label.
- `ToolHero.astro`: shared heading and lead structure for interactive and content-based tool pages.
- `Ga4AnnotationBuilder.astro`: category-led annotation editor using the existing tool typography, surfaces and controls; route-specific behavior is recorded in [.impeccable/surfaces/src-pages-fi-tyokalut-ga4-annotaatiot-astro.md](.impeccable/surfaces/src-pages-fi-tyokalut-ga4-annotaatiot-astro.md).

Header, footer, hero artwork and large navigation patterns remain bespoke. They use shared tokens and keep their own markup.

## Article hero images

- Create new article hero images at **1536 × 1024 pixels (3:2)**. This is the standard for new assets; existing images may keep their dimensions.
- Keep the subject and essential visual details within the central 75% of the width and 70% of the height. Heroes and article cards use `object-fit: cover` with different frame proportions; check the actual crops at desktop and mobile widths before finishing.
- Use a simple editorial illustration that remains readable as a thumbnail. Keep article titles in HTML rather than inside the image.
- Build continuity through restrained cream, lavender and yellow accents, clear shapes and a quietly playful tone. Vary the subject and scene: a character, an object metaphor, a miniature environment or an abstract composition can each carry an article's idea. Choose the visual metaphor from the specific topic.
- Before generating, inspect the five most recent article heroes. Make the new image differ from the nearest similar hero in at least two of these dimensions: subject or character, setting, composition or camera angle, illustration technique, and dominant background color. A new screen or prop in the same scene is not sufficient variation.
- Characters are optional. When using one, choose a character and action that fit the topic; the turtle is one option, not a default mascot for every article. Alternate character scenes with images focused on objects or environments. Likewise, alternate tactile 3D scenes with flat editorial, paper-cut or restrained line illustrations when they suit the idea.
- Describe the chosen subject, action, setting, framing and medium explicitly in the generation prompt. When supplying a previous hero as a reference, specify which qualities to retain and which to vary. Compare the result with recent heroes at thumbnail size; revise if it repeats their scene or silhouette.
- Save the JPEG source under `public/images/blog/` and an identically named copy under `src/assets/blog/` so the shared image component can generate responsive formats. Use a descriptive lowercase filename with hyphens.
- Set `image`, a meaningful `imageAlt`, and `imageCredit` in article frontmatter. AI-generated images use `imageCredit: "Luotu OpenAI ImageGenillä"` for Finnish articles and the corresponding English credit for English articles.

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
