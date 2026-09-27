# Graph Report - .  (2026-09-27)

## Corpus Check
- Large corpus: 232 files · ~508,934 words. Semantic extraction will be expensive (many Claude tokens). Consider running on a subfolder, or use --no-semantic to run AST-only.

## Summary
- 412 nodes · 719 edges · 16 communities detected
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS
- Token cost: 0 input · 0 output
- Edge kinds: contains: 282 · imports_from: 145 · MODIFIES: 128 · imports: 102 · calls: 42 · ON_BRANCH: 12 · PARENT_OF: 8


## Input Scope
- Requested: auto
- Resolved: committed (source: default-auto)
- Included files: 232 · Candidates: 261
- Excluded: 1 untracked · 26483 ignored · 1 sensitive · 1 missing committed
- Recommendation: Use --scope all or graphify.yaml inputs.corpus for a knowledge-base folder.

## Graph Freshness
- Built from Git commit: `e4eedad`
- Compare this hash to `git rev-parse HEAD` before trusting freshness-sensitive graph output.
## God Nodes (most connected - your core abstractions)
1. `buildSelectedContainer()` - 9 edges
2. `buildSchemaGraph()` - 9 edges
3. `siteConfig` - 7 edges
4. `buildGa4ReportUrl()` - 6 edges
5. `clone()` - 6 edges
6. `tagOptions()` - 6 edges
7. `createBuilderState()` - 6 edges
8. `selectedSections()` - 5 edges
9. `buildMarkdown()` - 5 edges
10. `compactValues()` - 5 edges

## Surprising Connections (you probably didn't know these)
- `50b19e2 Optimize article content images at build time` --ON_BRANCH--> `main`  [EXTRACTED]
  git → git  _Bridges community 0 → community 5_

## Communities

### Community 0 - "Community 0"
Cohesion: 0.06
Nodes (9): enhancedRoots, imgs, RecentPost, selectRecentPosts(), now, 50b19e2 Optimize article content images at build time, ac99fdc Baseline before article image optimization, claude/sweet-lamport-b36507 (+1 more)

### Community 20 - "Community 20"
Cohesion: 0.67
Nodes (2): logoWhite, bg

### Community 8 - "Community 8"
Cohesion: 0.10
Nodes (13): root, pagesRoot, serviceSchema, toolSchema, types, categoryIds, typesByCategory, allTypeNames (+5 more)

### Community 5 - "Community 5"
Cohesion: 0.13
Nodes (8): 0421511 Add short navSummary lines for services in the mega menu, 1b5b266 Broaden toolkit copy beyond analytics, 1ca05d5 Match mega menu link heights within a grid row, 5b0ebbb Offset all anchor jumps below the sticky header, 824dc06 Unify desktop mega menus into one layout, 9f56ebe Reduce anchor scroll offset to 2.5rem, e4eedad Show the page classification example as a quiet info box, main

### Community 2 - "Community 2"
Cohesion: 0.08
Nodes (27): appearances, categories, categoryLabel(), siteConfig, Language, PageType, SchemaItem, SchemaImage (+19 more)

### Community 3 - "Community 3"
Cohesion: 0.14
Nodes (20): RequiredLevel, DocumentParameter, DocumentSection, DocumentSettings, DocumentState, ecommerceSources, moneyParameters, sectionDefinitions (+12 more)

### Community 6 - "Community 6"
Cohesion: 0.15
Nodes (18): FieldOption, Template, DIMENSIONS, METRICS, BASE, TEMPLATES, labels, EMPTY_DIMENSIONS (+10 more)

### Community 1 - "Community 1"
Cohesion: 0.09
Nodes (36): SOURCES, TemplateMode, GROUPS, FALLBACK_CURRENCIES, supportedValuesOf, CURRENCY_OPTIONS, GtmRecord, BuilderSettings (+28 more)

### Community 16 - "Community 16"
Cohesion: 0.50
Nodes (2): postSchema, collections

### Community 9 - "Community 9"
Cohesion: 0.13
Nodes (17): phrase(), templateCodes, template(), annotationCategories, commonSuggestions, annotationDateGuidance, templateTerms, characterCount() (+9 more)

### Community 11 - "Community 11"
Cohesion: 0.13
Nodes (10): interactiveTools, toolkit, staticRoutes, blogModules, finnishBlogModules, serviceModules, finnishServiceModules, toolCategories (+2 more)

### Community 18 - "Community 18"
Cohesion: 0.67
Nodes (2): services, work

### Community 7 - "Community 7"
Cohesion: 0.14
Nodes (12): FeedEntryData, feedDate(), selectFeedEntries(), escapeXml(), categoryTerm(), imageMimeType(), FeedLang, FeedSource (+4 more)

### Community 10 - "Community 10"
Cohesion: 0.12
Nodes (13): Page, enServices, fiServices, enPosts, fiPosts, enTools, enTemplates, fiTools (+5 more)

### Community 17 - "Community 17"
Cohesion: 0.83
Nodes (2): metricBandIndex(), gatedBandIndex()

### Community 13 - "Community 13"
Cohesion: 0.29
Nodes (3): RelatedPost, selectRelatedPosts(), now

## Knowledge Gaps
- **99 isolated node(s):** `logoWhite`, `bg`, `root`, `pagesRoot`, `serviceSchema` (+94 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **Thin community `Community 20`** (2 nodes): `logoWhite`, `bg`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 16`** (2 nodes): `postSchema`, `collections`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 18`** (2 nodes): `services`, `work`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 17`** (2 nodes): `metricBandIndex()`, `gatedBandIndex()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `siteConfig` connect `Community 2` to `Community 0`, `Community 10`, `Community 11`, `Community 7`?**
  _High betweenness centrality (0.010) - this node is a cross-community bridge._
- **Why does `toolkit` connect `Community 11` to `Community 5`, `Community 2`?**
  _High betweenness centrality (0.002) - this node is a cross-community bridge._
- **Why does `interactiveTools` connect `Community 11` to `Community 10`?**
  _High betweenness centrality (0.001) - this node is a cross-community bridge._
- **What connects `logoWhite`, `bg`, `root` to the rest of the system?**
  _99 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Community 0` be split into smaller, more focused modules?**
  _Cohesion score 0.05737234652897304 - nodes in this community are weakly interconnected._
- **Should `Community 8` be split into smaller, more focused modules?**
  _Cohesion score 0.1 - nodes in this community are weakly interconnected._
- **Should `Community 5` be split into smaller, more focused modules?**
  _Cohesion score 0.12648221343873517 - nodes in this community are weakly interconnected._