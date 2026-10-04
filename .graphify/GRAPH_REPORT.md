# Graph Report - .  (2026-10-04)

## Corpus Check
- Large corpus: 244 files · ~531,366 words. Semantic extraction will be expensive (many Claude tokens). Consider running on a subfolder, or use --no-semantic to run AST-only.

## Summary
- 482 nodes · 972 edges · 14 communities detected
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS
- Token cost: 0 input · 0 output
- Edge kinds: contains: 315 · MODIFIES: 211 · imports_from: 165 · imports: 113 · ON_BRANCH: 90 · calls: 43 · PARENT_OF: 35


## Input Scope
- Requested: auto
- Resolved: committed (source: default-auto)
- Included files: 244 · Candidates: 272
- Excluded: 0 untracked · 26384 ignored · 1 sensitive · 0 missing committed
- Recommendation: Use --scope all or graphify.yaml inputs.corpus for a knowledge-base folder.

## Graph Freshness
- Built from Git commit: `9c91710`
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
- `467af12 Draft the Cookiebot banner styler in both languages` --PARENT_OF--> `9c91710 Hide home page CTA banner and refresh toolkit descriptions`  [EXTRACTED]
  git → git  _Bridges community 2 → community 0_

## Communities

### Community 0 - "Community 0"
Cohesion: 0.06
Nodes (12): article-image-optimization, 9c91710 Hide home page CTA banner and refresh toolkit descriptions, a227870 Add Finnish Cookiebot banner styler, ac99fdc Baseline before article image optimization, aef1e56 Prepare site for launch: hide services, add draft mode, translate tools, b7eb340 Rename Finnish form tool to Lomakkeiden nimeämistyökalu, e500df6 Add Finnish GTM container builder, enhancedRoots (+4 more)

### Community 1 - "Community 1"
Cohesion: 0.08
Nodes (41): applyTagNamingConvention(), BuilderSettings, BuilderState, BuilderValidation, buildSelectedContainer(), clone(), createBuilderState(), EVENT_DETAILS (+33 more)

### Community 2 - "Community 2"
Cohesion: 0.14
Nodes (36): claude/sweet-lamport-b36507, datalayer-print-and-copy-edits, launch-prep, main, 0421511 Add short navSummary lines for services in the mega menu, 17b83c7 Add serviceType and about to service page schema, 1b5b266 Broaden toolkit copy beyond analytics, 1ca05d5 Match mega menu link heights within a grid row (+28 more)

### Community 3 - "Community 3"
Cohesion: 0.07
Nodes (29): appearances, categories, categoryLabel(), allInteractiveTools, profiles, siteConfig, toolkit, PERSON (+21 more)

### Community 4 - "Community 4"
Cohesion: 0.07
Nodes (22): interactiveTools, enPosts, enServices, enTemplates, enTools, Entry, fiPosts, fiServices (+14 more)

### Community 5 - "Community 5"
Cohesion: 0.13
Nodes (20): buildDocxBlob(), buildMarkdown(), clean(), createInitialState(), documentFilename(), DocumentParameter, DocumentSection, DocumentSettings (+12 more)

### Community 7 - "Community 7"
Cohesion: 0.09
Nodes (16): categoriesFi, localizeFormTaxonomy(), typesFi, formCategories, formTypes, allTypeNames, categoryIds, errors (+8 more)

### Community 8 - "Community 8"
Cohesion: 0.12
Nodes (19): annotationCategories, annotationDateGuidance, characterCount(), commonSuggestions, enDateGuidance, fiDateGuidance, getDescriptionSuggestions(), hasPlaceholder() (+11 more)

### Community 9 - "Community 9"
Cohesion: 0.15
Nodes (18): buildGa4ReportUrl(), compactValues(), FILTER_TYPES, FilterType, isPropertySpecificField(), normalizeCustomDimensions(), ReportConfig, reportErrors() (+10 more)

### Community 10 - "Community 10"
Cohesion: 0.14
Nodes (12): now, feedDate(), FeedEntryData, selectFeedEntries(), FeedConfig, FeedLang, feedResponse(), FEEDS (+4 more)

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
- **100 isolated node(s):** `logoWhite`, `bg`, `root`, `pagesRoot`, `serviceSchema` (+95 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **Thin community `Community 17`** (2 nodes): `collections`, `postSchema`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 18`** (2 nodes): `gatedBandIndex()`, `metricBandIndex()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 20`** (2 nodes): `bg`, `logoWhite`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `siteConfig` connect `Community 3` to `Community 4`, `Community 10`?**
  _High betweenness centrality (0.007) - this node is a cross-community bridge._
- **Why does `toolkit` connect `Community 3` to `Community 0`, `Community 4`?**
  _High betweenness centrality (0.001) - this node is a cross-community bridge._
- **Why does `interactiveTools` connect `Community 4` to `Community 0`?**
  _High betweenness centrality (0.001) - this node is a cross-community bridge._
- **What connects `logoWhite`, `bg`, `root` to the rest of the system?**
  _100 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Community 0` be split into smaller, more focused modules?**
  _Cohesion score 0.05903866248693835 - nodes in this community are weakly interconnected._
- **Should `Community 1` be split into smaller, more focused modules?**
  _Cohesion score 0.07547169811320754 - nodes in this community are weakly interconnected._
- **Should `Community 2` be split into smaller, more focused modules?**
  _Cohesion score 0.13636363636363635 - nodes in this community are weakly interconnected._