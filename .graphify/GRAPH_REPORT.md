# Graph Report - .  (2026-09-29)

## Corpus Check
- Large corpus: 233 files · ~512,107 words. Semantic extraction will be expensive (many Claude tokens). Consider running on a subfolder, or use --no-semantic to run AST-only.

## Summary
- 439 nodes · 760 edges · 15 communities detected
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS
- Token cost: 0 input · 0 output
- Edge kinds: contains: 302 · imports_from: 146 · MODIFIES: 136 · imports: 102 · calls: 42 · ON_BRANCH: 18 · PARENT_OF: 14


## Input Scope
- Requested: auto
- Resolved: committed (source: default-auto)
- Included files: 233 · Candidates: 261
- Excluded: 1 untracked · 26559 ignored · 1 sensitive · 0 missing committed
- Recommendation: Use --scope all or graphify.yaml inputs.corpus for a knowledge-base folder.

## Graph Freshness
- Built from Git commit: `f9eff52`
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
- `3313846 Align content consumption article with the tracking script` --PARENT_OF--> `fca2e3b Rewrite about page copy in a plainer voice`  [EXTRACTED]
  git → git  _Bridges community 11 → community 0_

## Communities

### Community 0 - "Community 0"
Cohesion: 0.05
Nodes (13): article-image-optimization, claude/sweet-lamport-b36507, 50b19e2 Optimize article content images at build time, ac99fdc Baseline before article image optimization, f9eff52 Remove the proof section from service pages, fca2e3b Rewrite about page copy in a plainer voice, services, work (+5 more)

### Community 1 - "Community 1"
Cohesion: 0.09
Nodes (36): applyTagNamingConvention(), BuilderSettings, BuilderState, BuilderValidation, buildSelectedContainer(), clone(), createBuilderState(), EVENT_DETAILS (+28 more)

### Community 2 - "Community 2"
Cohesion: 0.08
Nodes (27): appearances, categories, categoryLabel(), profiles, siteConfig, PERSON, absoluteUrl(), BlogEntry (+19 more)

### Community 3 - "Community 3"
Cohesion: 0.13
Nodes (20): buildDocxBlob(), buildMarkdown(), clean(), createInitialState(), documentFilename(), DocumentParameter, DocumentSection, DocumentSettings (+12 more)

### Community 5 - "Community 5"
Cohesion: 0.15
Nodes (18): buildGa4ReportUrl(), compactValues(), FILTER_TYPES, FilterType, isPropertySpecificField(), normalizeCustomDimensions(), ReportConfig, reportErrors() (+10 more)

### Community 6 - "Community 6"
Cohesion: 0.14
Nodes (12): now, feedDate(), FeedEntryData, selectFeedEntries(), FeedConfig, FeedLang, feedResponse(), FEEDS (+4 more)

### Community 7 - "Community 7"
Cohesion: 0.10
Nodes (13): formCategories, formTypes, allTypeNames, categoryIds, errors, labelPattern, pagesRoot, pairPattern (+5 more)

### Community 8 - "Community 8"
Cohesion: 0.13
Nodes (17): annotationCategories, annotationDateGuidance, characterCount(), commonSuggestions, getDescriptionSuggestions(), hasPlaceholder(), normalize(), phrase() (+9 more)

### Community 10 - "Community 10"
Cohesion: 0.12
Nodes (13): enPosts, enServices, enTemplates, enTools, Entry, fiPosts, fiServices, fiTemplates (+5 more)

### Community 11 - "Community 11"
Cohesion: 0.24
Nodes (12): main, 0421511 Add short navSummary lines for services in the mega menu, 1b5b266 Broaden toolkit copy beyond analytics, 1ca05d5 Match mega menu link heights within a grid row, 3313846 Align content consumption article with the tracking script, 5b0ebbb Offset all anchor jumps below the sticky header, 5ff3941 Show live reading signals in the content consumption article, 824dc06 Unify desktop mega menus into one layout (+4 more)

### Community 12 - "Community 12"
Cohesion: 0.13
Nodes (10): interactiveTools, toolkit, blogModules, finnishBlogModules, finnishServiceModules, GET(), serviceModules, staticRoutes (+2 more)

### Community 15 - "Community 15"
Cohesion: 0.29
Nodes (3): now, RelatedPost, selectRelatedPosts()

### Community 18 - "Community 18"
Cohesion: 0.50
Nodes (2): collections, postSchema

### Community 19 - "Community 19"
Cohesion: 0.83
Nodes (2): gatedBandIndex(), metricBandIndex()

### Community 21 - "Community 21"
Cohesion: 0.67
Nodes (2): bg, logoWhite

## Knowledge Gaps
- **99 isolated node(s):** `logoWhite`, `bg`, `root`, `pagesRoot`, `serviceSchema` (+94 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **Thin community `Community 18`** (2 nodes): `collections`, `postSchema`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 19`** (2 nodes): `gatedBandIndex()`, `metricBandIndex()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 21`** (2 nodes): `bg`, `logoWhite`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `siteConfig` connect `Community 2` to `Community 0`, `Community 10`, `Community 12`, `Community 6`?**
  _High betweenness centrality (0.009) - this node is a cross-community bridge._
- **Why does `toolkit` connect `Community 12` to `Community 11`, `Community 2`?**
  _High betweenness centrality (0.001) - this node is a cross-community bridge._
- **Why does `interactiveTools` connect `Community 12` to `Community 10`?**
  _High betweenness centrality (0.001) - this node is a cross-community bridge._
- **What connects `logoWhite`, `bg`, `root` to the rest of the system?**
  _99 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Community 0` be split into smaller, more focused modules?**
  _Cohesion score 0.05362614913176711 - nodes in this community are weakly interconnected._
- **Should `Community 1` be split into smaller, more focused modules?**
  _Cohesion score 0.08603145235892692 - nodes in this community are weakly interconnected._
- **Should `Community 2` be split into smaller, more focused modules?**
  _Cohesion score 0.08095238095238096 - nodes in this community are weakly interconnected._