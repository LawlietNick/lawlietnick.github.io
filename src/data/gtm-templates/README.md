# GTM container builder

This React tool is embedded in the existing Astro website at `/tools/gtm-container-builder/`. It has one job: choose the GA4 tags you need, then export a complete Google Tag Manager import file.

## Run it

```sh
npm install
npm run dev
```

Open `http://localhost:4321/tools/gtm-container-builder/`.

Checks:

```sh
npm test
npm run test:e2e
npm run build
```

## Use it

1. Enter the GA4 measurement ID and company suffix. Both start empty and are required. The builder never pre-fills the source placeholders, so a container cannot be exported against a fake GA4 property. Currency and container name are pre-filled and editable.
2. Choose a tag structure: individual event tags from `full_ecom_gtm.json`, or one shared ecommerce tag from `full_simplified_ecom_gtm.json`.
3. Independently choose numbered tag names or short tag names. Either naming convention works with either structure.
4. `GA4 - Page View - All Pages` is always included because the exported file is a complete container built from scratch. With individual tags, you can choose the essential preset or select other events separately.
5. Copy or download the generated output. It is built at click time, so it always matches what is on screen.
6. Import it into a GTM workspace and review the proposed changes.
7. Use GTM Preview, test the data layer, and verify consent behavior before publishing.

## How selection works

The JSON files in this folder remain the immutable source of truth. The builder uses the file matching the selected structure, copies only the selected tags, then automatically follows their firing and blocking triggers and all `{{Variable Name}}` references. It recursively includes required variables, folders, built-in variables, and custom templates. Users never need to manage those internal dependencies.

The builder replaces the GA4 ID placeholder, company suffix, and container name without flattening GTM parameters or removing unknown source fields. The individual template also supports a default currency. The simplified template reads currency from `ecommerce.currency` in the data layer. Output uses two-space indentation, ends with a newline, and preserves `exportFormatVersion: 2`.

Selections are saved in `localStorage`. No container data is uploaded.
