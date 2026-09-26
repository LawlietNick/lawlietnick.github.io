# Graph Report - .  (2026-09-26)

## Corpus Check
- 223 files · ~479,776 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 400 nodes · 571 edges · 15 communities detected
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS
- Token cost: 0 input · 0 output
- Edge kinds: contains: 282 · imports_from: 145 · imports: 102 · calls: 42


## Input Scope
- Requested: auto
- Resolved: all (source: default-auto)
- Included files: 223 · Candidates: recursive
- Excluded: 0 untracked · 0 ignored · 1 sensitive · 0 missing committed
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
- None detected - all connections are within the same source files.

## Communities

### Community 2 - "Community 2"
Cohesion: 0.08
Nodes (27): appearances, categories, categoryLabel(), siteConfig, Language, PageType, SchemaItem, SchemaImage (+19 more)

### Community 20 - "Community 20"
Cohesion: 0.67
Nodes (2): logoWhite, bg

### Community 7 - "Community 7"
Cohesion: 0.10
Nodes (13): root, pagesRoot, serviceSchema, toolSchema, types, categoryIds, typesByCategory, allTypeNames (+5 more)

### Community 0 - "Community 0"
Cohesion: 0.06
Nodes (5): enhancedRoots, imgs, RecentPost, selectRecentPosts(), now

### Community 3 - "Community 3"
Cohesion: 0.14
Nodes (20): RequiredLevel, DocumentParameter, DocumentSection, DocumentSettings, DocumentState, ecommerceSources, moneyParameters, sectionDefinitions (+12 more)

### Community 5 - "Community 5"
Cohesion: 0.15
Nodes (18): FieldOption, Template, DIMENSIONS, METRICS, BASE, TEMPLATES, labels, EMPTY_DIMENSIONS (+10 more)

### Community 1 - "Community 1"
Cohesion: 0.09
Nodes (36): SOURCES, TemplateMode, GROUPS, FALLBACK_CURRENCIES, supportedValuesOf, CURRENCY_OPTIONS, GtmRecord, BuilderSettings (+28 more)

### Community 16 - "Community 16"
Cohesion: 0.50
Nodes (2): postSchema, collections

### Community 8 - "Community 8"
Cohesion: 0.13
Nodes (17): phrase(), templateCodes, template(), annotationCategories, commonSuggestions, annotationDateGuidance, templateTerms, characterCount() (+9 more)

### Community 10 - "Community 10"
Cohesion: 0.13
Nodes (10): interactiveTools, toolkit, staticRoutes, blogModules, finnishBlogModules, serviceModules, finnishServiceModules, toolCategories (+2 more)

### Community 18 - "Community 18"
Cohesion: 0.67
Nodes (2): services, work

### Community 6 - "Community 6"
Cohesion: 0.14
Nodes (12): FeedEntryData, feedDate(), selectFeedEntries(), escapeXml(), categoryTerm(), imageMimeType(), FeedLang, FeedSource (+4 more)

### Community 9 - "Community 9"
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

- **Why does `siteConfig` connect `Community 2` to `Community 9`, `Community 10`, `Community 6`?**
  _High betweenness centrality (0.171) - this node is a cross-community bridge._
- **Why does `toolkit` connect `Community 10` to `Community 2`?**
  _High betweenness centrality (0.026) - this node is a cross-community bridge._
- **What connects `logoWhite`, `bg`, `root` to the rest of the system?**
  _99 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Community 2` be split into smaller, more focused modules?**
  _Cohesion score 0.07807807807807808 - nodes in this community are weakly interconnected._
- **Should `Community 7` be split into smaller, more focused modules?**
  _Cohesion score 0.1 - nodes in this community are weakly interconnected._
- **Should `Community 0` be split into smaller, more focused modules?**
  _Cohesion score 0.05874125874125874 - nodes in this community are weakly interconnected._
- **Should `Community 4` be split into smaller, more focused modules?**
  _Cohesion score 0.08 - nodes in this community are weakly interconnected._