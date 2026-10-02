# Graph Report - .  (2026-10-02)

## Corpus Check
- Large corpus: 235 files · ~513,444 words. Semantic extraction will be expensive (many Claude tokens). Consider running on a subfolder, or use --no-semantic to run AST-only.

## Summary
- 449 nodes · 826 edges · 14 communities detected
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS
- Token cost: 0 input · 0 output
- Edge kinds: contains: 302 · MODIFIES: 163 · imports_from: 146 · imports: 102 · ON_BRANCH: 48 · calls: 42 · PARENT_OF: 23


## Input Scope
- Requested: auto
- Resolved: committed (source: default-auto)
- Included files: 235 · Candidates: 263
- Excluded: 0 untracked · 26358 ignored · 1 sensitive · 0 missing committed
- Recommendation: Use --scope all or graphify.yaml inputs.corpus for a knowledge-base folder.

## Graph Freshness
- Built from Git commit: `562d5a6`
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
- `ac99fdc Baseline before article image optimization` --ON_BRANCH--> `claude/sweet-lamport-b36507`  [EXTRACTED]
  git → git  _Bridges community 0 → community 2_
- `bbab67a Remove Funky Analytics concept name from the site` --ON_BRANCH--> `main`  [EXTRACTED]
  git → git  _Bridges community 3 → community 2_

## Communities

### Community 0 - "Community 0"
Cohesion: 0.06
Nodes (7): article-image-optimization, ac99fdc Baseline before article image optimization, enhancedRoots, now, imgs, RecentPost, selectRecentPosts()

### Community 1 - "Community 1"
Cohesion: 0.09
Nodes (36): applyTagNamingConvention(), BuilderSettings, BuilderState, BuilderValidation, buildSelectedContainer(), clone(), createBuilderState(), EVENT_DETAILS (+28 more)

### Community 2 - "Community 2"
Cohesion: 0.11
Nodes (27): claude/sweet-lamport-b36507, datalayer-print-and-copy-edits, main, 0421511 Add short navSummary lines for services in the mega menu, 17b83c7 Add serviceType and about to service page schema, 1b5b266 Broaden toolkit copy beyond analytics, 1ca05d5 Match mega menu link heights within a grid row, 275d114 Add a running header with logo to the printed dataLayer document (+19 more)

### Community 3 - "Community 3"
Cohesion: 0.08
Nodes (28): bbab67a Remove Funky Analytics concept name from the site, appearances, categories, categoryLabel(), profiles, siteConfig, PERSON, absoluteUrl() (+20 more)

### Community 4 - "Community 4"
Cohesion: 0.06
Nodes (23): interactiveTools, toolkit, enPosts, enServices, enTemplates, enTools, Entry, fiPosts (+15 more)

### Community 5 - "Community 5"
Cohesion: 0.13
Nodes (20): buildDocxBlob(), buildMarkdown(), clean(), createInitialState(), documentFilename(), DocumentParameter, DocumentSection, DocumentSettings (+12 more)

### Community 7 - "Community 7"
Cohesion: 0.15
Nodes (18): buildGa4ReportUrl(), compactValues(), FILTER_TYPES, FilterType, isPropertySpecificField(), normalizeCustomDimensions(), ReportConfig, reportErrors() (+10 more)

### Community 8 - "Community 8"
Cohesion: 0.14
Nodes (12): now, feedDate(), FeedEntryData, selectFeedEntries(), FeedConfig, FeedLang, feedResponse(), FEEDS (+4 more)

### Community 9 - "Community 9"
Cohesion: 0.10
Nodes (13): formCategories, formTypes, allTypeNames, categoryIds, errors, labelPattern, pagesRoot, pairPattern (+5 more)

### Community 10 - "Community 10"
Cohesion: 0.13
Nodes (17): annotationCategories, annotationDateGuidance, characterCount(), commonSuggestions, getDescriptionSuggestions(), hasPlaceholder(), normalize(), phrase() (+9 more)

### Community 14 - "Community 14"
Cohesion: 0.29
Nodes (3): now, RelatedPost, selectRelatedPosts()

### Community 17 - "Community 17"
Cohesion: 0.50
Nodes (2): collections, postSchema

### Community 18 - "Community 18"
Cohesion: 0.83
Nodes (2): gatedBandIndex(), metricBandIndex()

### Community 20 - "Community 20"
Cohesion: 0.67
Nodes (2): bg, logoWhite

## Knowledge Gaps
- **99 isolated node(s):** `logoWhite`, `bg`, `root`, `pagesRoot`, `serviceSchema` (+94 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **Thin community `Community 17`** (2 nodes): `collections`, `postSchema`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 18`** (2 nodes): `gatedBandIndex()`, `metricBandIndex()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 20`** (2 nodes): `bg`, `logoWhite`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `siteConfig` connect `Community 3` to `Community 4`, `Community 8`?**
  _High betweenness centrality (0.008) - this node is a cross-community bridge._
- **Why does `toolkit` connect `Community 4` to `Community 2`, `Community 3`?**
  _High betweenness centrality (0.001) - this node is a cross-community bridge._
- **What connects `logoWhite`, `bg`, `root` to the rest of the system?**
  _99 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Community 0` be split into smaller, more focused modules?**
  _Cohesion score 0.06414414414414414 - nodes in this community are weakly interconnected._
- **Should `Community 1` be split into smaller, more focused modules?**
  _Cohesion score 0.08603145235892692 - nodes in this community are weakly interconnected._
- **Should `Community 2` be split into smaller, more focused modules?**
  _Cohesion score 0.11097560975609756 - nodes in this community are weakly interconnected._
- **Should `Community 3` be split into smaller, more focused modules?**
  _Cohesion score 0.07823613086770982 - nodes in this community are weakly interconnected._