# Graph Report - .  (2026-09-26)

## Corpus Check
- 227 files · ~467,422 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 403 nodes · 691 edges · 15 communities detected
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS
- Token cost: 0 input · 0 output
- Edge kinds: contains: 282 · imports_from: 145 · MODIFIES: 118 · imports: 102 · calls: 42 · ON_BRANCH: 2


## Input Scope
- Requested: auto
- Resolved: committed (source: default-auto)
- Included files: 227 · Candidates: 261
- Excluded: 0 untracked · 26245 ignored · 1 sensitive · 6 missing committed
- Recommendation: Use --scope all or graphify.yaml inputs.corpus for a knowledge-base folder.

## Graph Freshness
- Built from Git commit: `ac99fdc`
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
- None detected - all connections are within the same source files.

## Communities

### Community 0 - "Community 0"
Cohesion: 0.06
Nodes (8): article-image-optimization, main, ac99fdc Baseline before article image optimization, enhancedRoots, now, imgs, RecentPost, selectRecentPosts()

### Community 1 - "Community 1"
Cohesion: 0.09
Nodes (36): applyTagNamingConvention(), BuilderSettings, BuilderState, BuilderValidation, buildSelectedContainer(), clone(), createBuilderState(), EVENT_DETAILS (+28 more)

### Community 2 - "Community 2"
Cohesion: 0.08
Nodes (27): appearances, categories, categoryLabel(), profiles, siteConfig, PERSON, absoluteUrl(), BlogEntry (+19 more)

### Community 3 - "Community 3"
Cohesion: 0.14
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

### Community 9 - "Community 9"
Cohesion: 0.12
Nodes (13): enPosts, enServices, enTemplates, enTools, Entry, fiPosts, fiServices, fiTemplates (+5 more)

### Community 10 - "Community 10"
Cohesion: 0.13
Nodes (10): interactiveTools, toolkit, blogModules, finnishBlogModules, finnishServiceModules, GET(), serviceModules, staticRoutes (+2 more)

### Community 13 - "Community 13"
Cohesion: 0.29
Nodes (3): now, RelatedPost, selectRelatedPosts()

### Community 16 - "Community 16"
Cohesion: 0.50
Nodes (2): collections, postSchema

### Community 17 - "Community 17"
Cohesion: 0.83
Nodes (2): gatedBandIndex(), metricBandIndex()

### Community 18 - "Community 18"
Cohesion: 0.67
Nodes (2): services, work

### Community 20 - "Community 20"
Cohesion: 0.67
Nodes (2): bg, logoWhite

## Knowledge Gaps
- **99 isolated node(s):** `logoWhite`, `bg`, `root`, `pagesRoot`, `serviceSchema` (+94 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **Thin community `Community 16`** (2 nodes): `collections`, `postSchema`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 17`** (2 nodes): `gatedBandIndex()`, `metricBandIndex()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 18`** (2 nodes): `services`, `work`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 20`** (2 nodes): `bg`, `logoWhite`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `siteConfig` connect `Community 2` to `Community 9`, `Community 10`, `Community 6`?**
  _High betweenness centrality (0.010) - this node is a cross-community bridge._
- **Why does `toolkit` connect `Community 10` to `Community 2`?**
  _High betweenness centrality (0.001) - this node is a cross-community bridge._
- **Why does `interactiveTools` connect `Community 10` to `Community 9`?**
  _High betweenness centrality (0.001) - this node is a cross-community bridge._
- **What connects `logoWhite`, `bg`, `root` to the rest of the system?**
  _99 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Community 0` be split into smaller, more focused modules?**
  _Cohesion score 0.05658263305322129 - nodes in this community are weakly interconnected._
- **Should `Community 1` be split into smaller, more focused modules?**
  _Cohesion score 0.08603145235892692 - nodes in this community are weakly interconnected._
- **Should `Community 2` be split into smaller, more focused modules?**
  _Cohesion score 0.07807807807807808 - nodes in this community are weakly interconnected._