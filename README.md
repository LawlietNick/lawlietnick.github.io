# karppinen.one

Source for [karppinen.one](https://karppinen.one/), the bilingual (English and Finnish) website of Niko Karppinen, an SEO and analytics consultant.

The site collects articles, step-by-step implementation templates and free browser-based tools for analytics, tracking, SEO and AI-assisted work.

## What's on the site

| Section | English | Finnish |
|---|---|---|
| Articles | `/blog/` | `/fi/blog/` |
| Implementation templates | `/templates/` | `/fi/toteutusmallit/` |
| Tools | `/tools/` | `/fi/tyokalut/` |
| About, contact and how I write | `/about/` | `/fi/minusta/` |
| Privacy policy | `/privacy/` | `/fi/privacy/` |

**Tools** (they run in the browser; what you type stays on your device):

- GTM container builder: builds an importable Google Tag Manager container
- GA4 annotation builder
- dataLayer documentation generator (exports .docx)
- Form name builder
- Metric quality checker

**Under the hood:**

- Static output, deployed to GitHub Pages
- JSON-LD structured data built around one `Person` (see [docs/structured-data.md](docs/structured-data.md))
- RSS and Atom feeds, `llms.txt`, `ai.txt` and an entity map (`/entitymap.json`)
- Content Security Policy as a `<meta>` tag with hashed inline scripts
- Responsive AVIF/WebP images through Astro's image pipeline
- Cookieless visitor statistics with [Rybbit](https://rybbit.com/), including article reading events (scroll start, midpoint, end, estimated read)

## Tech stack

- [Astro](https://astro.build/) with the client router and prefetch
- React for the interactive tools
- Mermaid for diagrams in articles
- Vitest, Node's test runner and Playwright for tests

## Getting started

Requires Node.js and npm.

```bash
npm install
npm run dev
```

The dev server runs at `http://localhost:4321/`.

| Command | What it does |
|---|---|
| `npm run dev` | Start the dev server |
| `npm run build` | Build to `dist/` and validate content |
| `npm run preview` | Serve the production build locally |
| `npm test` | Unit and legacy tests |
| `npm run test:e2e` | Playwright browser tests |
| `npm run validate:content` | Check frontmatter and EN↔FI translation links |

## Project structure

```text
src/
  pages/        Routes. Articles and templates are Markdown files here:
                blog/, fi/blog/, templates/, fi/toteutusmallit/
  layouts/      Base.astro (every page) and ServiceLayout.astro
  components/   Astro components and the React tools
  data/         Site identity, categories, tool registry and other config
  utils/        Schema, feeds, related posts and other helpers
  assets/       Images processed by Astro
  styles/       tokens.css, global.css, patterns.css
public/         Files served as-is (fonts, icons, OG images, robots.txt)
scripts/        Content validation and OG image generation
test/           Unit tests; test/e2e/ for Playwright
docs/           Technical notes
```

## Writing content

An article is a Markdown file in `src/pages/blog/` (English) or `src/pages/fi/blog/` (Finnish). Implementation templates live in `src/pages/templates/` and `src/pages/fi/toteutusmallit/`.

```yaml
---
layout: ../../layouts/Base.astro
title: "Article title"
description: "One or two sentences for search results and social cards."
date: 2026-10-04
updatedDate: 2026-10-05          # optional
category: analytics             # key from src/data/categories.js
tags: ["GA4", "GTM"]
image: /images/blog/example.jpeg
imageAlt: "What the image shows"
imageCredit: "Generated with OpenAI ImageGen"   # say so when an image is AI-made
alternate:                      # the other language version, if any
  lang: fi
  href: /fi/blog/esimerkki/
draft: true                     # optional: served by `npm run dev`, removed from the build
---
```

- `npm run build` fails if required fields are missing or if the EN and FI versions don't link to each other.
- `readingSignals: true` shows the visual reading-tracking demo on an article. Tracking itself runs on every article.

## Configuration

- **`src/data/site.js`:** site name, URL, person details and social profiles. `showServices` hides or publishes the services section.
- **`src/data/interactive-tools.js`:** registry of tools. `draft: true` keeps a tool out of the production build.
- **`astro.config.mjs`:** CSP, redirects, image settings and the step that removes drafts from the build.

## Deployment

Every push to `main` builds the site with GitHub Actions and publishes `dist/` to GitHub Pages ([.github/workflows/deploy.yml](.github/workflows/deploy.yml)). The custom domain is set in the repository's Pages settings.
