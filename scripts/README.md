# Scripts

- `generate-og.mjs`: regenerates the EN/FI default and tool social cards as JPEG in `public/images/og/`. Run `node scripts/generate-og.mjs` after changing the brand or site typography.
- `validate-content.mjs`: checks file-routed content with no collection guarding it, plus EN/FI `alternate` reciprocity. Runs in `npm run build`, or on its own with `npm run validate:content`.
- `validate-page-classification.mjs`: checks the built HTML in `dist/` against the page classification. Run after a build with `npm run validate:classification`.
