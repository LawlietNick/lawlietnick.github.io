---
version: 1
slug: "src-pages-fi-tyokalut-ga4-annotaatiot-astro"
primary_target: "src/pages/fi/tyokalut/ga4-annotaatiot.astro"
related_targets: ["src/components/Ga4AnnotationBuilder.astro","src/data/ga4-annotations.js","route:/fi/tyokalut/ga4-annotaatiot"]
---

# GA4 annotation tool

**Scope and mode:** Operate. Finnish route `/fi/tyokalut/ga4-annotaatiot/`, with a Finnish interface and Finnish/English annotation templates and suggestions. No separate English page.

**Audience and task:** Practitioners recording changes that help explain GA4 data. Choose a category and event template, edit the title and description directly, then copy each field into GA4. The editor follows GA4 field order: title, description, date/range guidance, then the category color recommendation. Concise Finnish date guidance follows the selected event template (all 49 templates, with general guidance for custom entries), distinguishing the relevant event day from a date range; date and color are selected manually in GA4.

**Built direction:** A category-led writing desk within the existing site. `ToolHero` introduces the task; six category rows sit beside the editor on desktop. At 760px and below, a synchronized native category select replaces the desktop radios. The tool is capped at 1200px, with compact route-specific hero spacing. Existing Fraunces headings, Roboto Flex UI text, theme surfaces, radii and focus tokens are inherited. Selected categories have a checkmark and outlined surface as well as color.

**Content and interaction:** Six category codes and colors (MPR violet, TECH red, SITE green, ADS turquoise, DATA blue, EXT brown), 49 event templates and a custom entry for each category. TECH includes suspected SaaS abuse and related description suggestions. Description suggestions appear in a scrollable overlay anchored above the textarea, without moving the date/color guidance; close with the close button, Escape or focus outside. Suggestions respond to typing and caret position; choosing one inserts usable text and selects any placeholder for completion. Plain arrow keys retain native multiline editing. A disclosure button opens suggestions explicitly; Tab navigates the ordinary buttons and Escape dismisses. Explicit dismissal and insertion suppress automatic reopening per draft. Popup height respects the header and visual viewport; automatic opening never scrolls, and manual opening may scroll to make room.

**Constraints:** The title counter includes its category prefix within 60 characters; the description allows 150. Empty fields, known unfinished template placeholders and over-limit values cannot be copied. Clipboard failure selects the text and gives honest manual-copy instructions, including the title prefix. Language preference persists in browser storage when available; untouched template titles follow the chosen language, while user text remains unchanged. Language metadata follows known generated content; free edits have unknown language instead of being relabelled by the selector. Copy success appears in the fixed-width copy button; failures appear beside the affected field. Suggestions are filtered to the selected template plus shared copy. Drafts survive category/template switching only within the current page. No backend or new dependencies.

**Review:** September 26 refinement verified with 10 passing browser tests, 88 passing unit/legacy tests, successful production build and content validation and desktop/mobile light/dark captures. Browser height reduction approximates keyboard space; physical mobile keyboard not verified. The shared header overflow at 200% root text size was subsequently fixed and verified on both FI/EN routes. Desktop/mobile light and dark captures are in `.impeccable/review/ga4-*.png`. No unresolved surface decisions.
