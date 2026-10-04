# Graph Report - .  (2026-10-04)

## Corpus Check
- 211 files · ~470,178 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 608 nodes · 1726 edges · 23 communities detected
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS
- Token cost: 0 input · 0 output
- Edge kinds: MODIFIES: 679 · contains: 315 · ON_BRANCH: 266 · PARENT_OF: 156 · imports_from: 152 · imports: 115 · calls: 43


## Input Scope
- Requested: auto
- Resolved: committed (source: default-auto)
- Included files: 211 · Candidates: 239
- Excluded: 14 untracked · 26543 ignored · 1 sensitive · 0 missing committed
- Recommendation: Use --scope all or graphify.yaml inputs.corpus for a knowledge-base folder.

## Graph Freshness
- Built from Git commit: `729f29b`
- Compare this hash to `git rev-parse HEAD` before trusting freshness-sensitive graph output.
## God Nodes (most connected - your core abstractions)
1. `buildSelectedContainer()` - 9 edges
2. `buildSchemaGraph()` - 9 edges
3. `siteConfig` - 8 edges
4. `buildGa4ReportUrl()` - 6 edges
5. `clone()` - 6 edges
6. `tagOptions()` - 6 edges
7. `createBuilderState()` - 6 edges
8. `selectedSections()` - 5 edges
9. `buildMarkdown()` - 5 edges
10. `compactValues()` - 5 edges

## Surprising Connections (you probably didn't know these)
- `05dd422 Fix missing spaces before inline links; match footer order to header` --ON_BRANCH--> `main`  [EXTRACTED]
  git → git  _Bridges community 14 → community 2_
- `25e57d0 Rewrite about page copy in a plainer voice` --PARENT_OF--> `f3674bb Remove the proof section from service pages`  [EXTRACTED]
  git → git  _Bridges community 2 → community 17_
- `26bffaf Shorten monthly SEO navSummary to pass content validation` --PARENT_OF--> `c6b29bc Prepare site for launch: hide services, add draft mode, translate tools`  [EXTRACTED]
  git → git  _Bridges community 2 → community 1_
- `2ed8174 Add Finnish Cookiebot banner styler` --PARENT_OF--> `d58ca2d Add Finnish GTM container builder`  [EXTRACTED]
  git → git  _Bridges community 1 → community 0_
- `387e28a Add serviceType and about to service page schema` --PARENT_OF--> `5fcc1ad Make dataLayer documenter print and DOCX exports complete`  [EXTRACTED]
  git → git  _Bridges community 17 → community 8_

## Communities

### Community 2 - "Community 2"
Cohesion: 0.07
Nodes (52): srcDir, inlineScriptHashes, allInteractiveTools, toolkit, 0280654 Expand text alignment article sources and refresh its images, 08a93f5 Add short navSummary lines for services in the mega menu, 25e57d0 Rewrite about page copy in a plainer voice, 2664dca Optimize article content images at build time (+44 more)

### Community 5 - "Community 5"
Cohesion: 0.16
Nodes (3): b2d293f Baseline before article image optimization, ac99fdc Baseline before article image optimization, article-image-optimization

### Community 26 - "Community 26"
Cohesion: 0.67
Nodes (2): logoWhite, bg

### Community 11 - "Community 11"
Cohesion: 0.10
Nodes (13): root, pagesRoot, serviceSchema, toolSchema, types, categoryIds, typesByCategory, allTypeNames (+5 more)

### Community 13 - "Community 13"
Cohesion: 0.18
Nodes (2): imgs, ac99fdc Baseline before article image optimization

### Community 17 - "Community 17"
Cohesion: 0.32
Nodes (2): 387e28a Add serviceType and about to service page schema, f3674bb Remove the proof section from service pages

### Community 1 - "Community 1"
Cohesion: 0.07
Nodes (31): categoriesFi, typesFi, localizeFormTaxonomy(), phrase(), templateCodes, template(), annotationCategories, commonSuggestions (+23 more)

### Community 14 - "Community 14"
Cohesion: 0.15
Nodes (4): 05dd422 Fix missing spaces before inline links; match footer order to header, 4e33f5a Add Rybbit analytics and update privacy policies, 84ac798 Add Rybbit analytics and update privacy policies, dd89d84 Fix missing spaces before inline links; match footer order to header

### Community 0 - "Community 0"
Cohesion: 0.07
Nodes (47): SOURCES, TemplateMode, GROUPS, FALLBACK_CURRENCIES, supportedValuesOf, currencyOptions(), GtmRecord, BuilderSettings (+39 more)

### Community 16 - "Community 16"
Cohesion: 0.24
Nodes (6): RecentPost, selectRecentPosts(), now, 91252c4 Hide home page CTA banner and refresh toolkit descriptions, 9c91710 Hide home page CTA banner and refresh toolkit descriptions, 9c91710 Hide home page CTA banner and refresh toolkit descriptions

### Community 8 - "Community 8"
Cohesion: 0.13
Nodes (21): RequiredLevel, DocumentParameter, DocumentSection, DocumentSettings, DocumentState, ecommerceSources, moneyParameters, sectionDefinitions (+13 more)

### Community 10 - "Community 10"
Cohesion: 0.15
Nodes (18): FieldOption, Template, DIMENSIONS, METRICS, BASE, TEMPLATES, labels, EMPTY_DIMENSIONS (+10 more)

### Community 22 - "Community 22"
Cohesion: 0.50
Nodes (2): postSchema, collections

### Community 6 - "Community 6"
Cohesion: 0.09
Nodes (25): appearances, siteConfig, Language, PageType, SchemaItem, SchemaImage, Frontmatter, SchemaOptions (+17 more)

### Community 24 - "Community 24"
Cohesion: 0.67
Nodes (2): categories, categoryLabel()

### Community 7 - "Community 7"
Cohesion: 0.07
Nodes (22): interactiveTools, Page, enPosts, fiPosts, enTools, enTemplates, fiTools, fiTemplates (+14 more)

### Community 21 - "Community 21"
Cohesion: 0.40
Nodes (1): feedResponse()

### Community 25 - "Community 25"
Cohesion: 0.67
Nodes (1): enhancedRoots

### Community 15 - "Community 15"
Cohesion: 0.19
Nodes (11): FeedEntryData, feedDate(), selectFeedEntries(), escapeXml(), categoryTerm(), imageMimeType(), FeedLang, FeedSource (+3 more)

### Community 23 - "Community 23"
Cohesion: 0.83
Nodes (2): metricBandIndex(), gatedBandIndex()

### Community 18 - "Community 18"
Cohesion: 0.29
Nodes (3): RelatedPost, selectRelatedPosts(), now

### Community 4 - "Community 4"
Cohesion: 0.12
Nodes (45): 0421511 Add short navSummary lines for services in the mega menu, 17b83c7 Add serviceType and about to service page schema, 1b5b266 Broaden toolkit copy beyond analytics, 1ca05d5 Match mega menu link heights within a grid row, 1f0d968 Add GitHub Pages deploy workflow, 275d114 Add a running header with logo to the printed dataLayer document, 2b25b7c Correct ai.txt descriptions of tools and translations, 3313846 Align content consumption article with the tracking script (+37 more)

### Community 3 - "Community 3"
Cohesion: 0.12
Nodes (47): 0421511 Add short navSummary lines for services in the mega menu, 17b83c7 Add serviceType and about to service page schema, 1978218 Keep the previous site's URLs alive after the move, 1b5b266 Broaden toolkit copy beyond analytics, 1be7a11 Keep unfinished service pages and draft posts out of the repo, 1ca05d5 Match mega menu link heights within a grid row, 1f0d968 Add GitHub Pages deploy workflow, 275d114 Add a running header with logo to the printed dataLayer document (+39 more)

## Knowledge Gaps
- **100 isolated node(s):** `srcDir`, `inlineScriptHashes`, `logoWhite`, `bg`, `root` (+95 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **Thin community `Community 26`** (2 nodes): `logoWhite`, `bg`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 13`** (2 nodes): `imgs`, `ac99fdc Baseline before article image optimization`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 17`** (2 nodes): `387e28a Add serviceType and about to service page schema`, `f3674bb Remove the proof section from service pages`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 22`** (2 nodes): `postSchema`, `collections`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 24`** (2 nodes): `categories`, `categoryLabel()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 21`** (1 nodes): `feedResponse()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 25`** (1 nodes): `enhancedRoots`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 23`** (2 nodes): `metricBandIndex()`, `gatedBandIndex()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `siteConfig` connect `Community 6` to `Community 2`, `Community 1`, `Community 7`, `Community 15`?**
  _High betweenness centrality (0.007) - this node is a cross-community bridge._
- **Why does `toolkit` connect `Community 2` to `Community 16`, `Community 6`, `Community 7`?**
  _High betweenness centrality (0.001) - this node is a cross-community bridge._
- **What connects `srcDir`, `inlineScriptHashes`, `logoWhite` to the rest of the system?**
  _100 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Community 2` be split into smaller, more focused modules?**
  _Cohesion score 0.06721215663354763 - nodes in this community are weakly interconnected._
- **Should `Community 11` be split into smaller, more focused modules?**
  _Cohesion score 0.1 - nodes in this community are weakly interconnected._
- **Should `Community 1` be split into smaller, more focused modules?**
  _Cohesion score 0.06779661016949153 - nodes in this community are weakly interconnected._
- **Should `Community 14` be split into smaller, more focused modules?**
  _Cohesion score 0.14705882352941177 - nodes in this community are weakly interconnected._