# Graph Report - .  (2026-10-04)

## Corpus Check
- Large corpus: 239 files · ~518,916 words. Semantic extraction will be expensive (many Claude tokens). Consider running on a subfolder, or use --no-semantic to run AST-only.

## Summary
- 468 nodes · 928 edges · 14 communities detected
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS
- Token cost: 0 input · 0 output
- Edge kinds: contains: 310 · MODIFIES: 198 · imports_from: 156 · imports: 109 · ON_BRANCH: 84 · calls: 42 · PARENT_OF: 29


## Input Scope
- Requested: auto
- Resolved: committed (source: default-auto)
- Included files: 239 · Candidates: 267
- Excluded: 1 untracked · 26373 ignored · 1 sensitive · 0 missing committed
- Recommendation: Use --scope all or graphify.yaml inputs.corpus for a knowledge-base folder.

## Graph Freshness
- Built from Git commit: `b7eb340`
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

## Communities

### Community 0 - "Community 0"
Cohesion: 0.06
Nodes (9): article-image-optimization, ac99fdc Baseline before article image optimization, aef1e56 Prepare site for launch: hide services, add draft mode, translate tools, b7eb340 Rename Finnish form tool to Lomakkeiden nimeämistyökalu, enhancedRoots, now, imgs, RecentPost (+1 more)

### Community 1 - "Community 1"
Cohesion: 0.09
Nodes (36): applyTagNamingConvention(), BuilderSettings, BuilderState, BuilderValidation, buildSelectedContainer(), clone(), createBuilderState(), EVENT_DETAILS (+28 more)

### Community 2 - "Community 2"
Cohesion: 0.15
Nodes (33): claude/sweet-lamport-b36507, datalayer-print-and-copy-edits, launch-prep, main, 0421511 Add short navSummary lines for services in the mega menu, 17b83c7 Add serviceType and about to service page schema, 1b5b266 Broaden toolkit copy beyond analytics, 1ca05d5 Match mega menu link heights within a grid row (+25 more)

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
- **101 isolated node(s):** `logoWhite`, `bg`, `root`, `pagesRoot`, `serviceSchema` (+96 more)
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
  _High betweenness centrality (0.008) - this node is a cross-community bridge._
- **Why does `toolkit` connect `Community 3` to `Community 2`, `Community 4`?**
  _High betweenness centrality (0.001) - this node is a cross-community bridge._
- **Why does `interactiveTools` connect `Community 4` to `Community 0`?**
  _High betweenness centrality (0.001) - this node is a cross-community bridge._
- **What connects `logoWhite`, `bg`, `root` to the rest of the system?**
  _101 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Community 0` be split into smaller, more focused modules?**
  _Cohesion score 0.061122538936232734 - nodes in this community are weakly interconnected._
- **Should `Community 1` be split into smaller, more focused modules?**
  _Cohesion score 0.08603145235892692 - nodes in this community are weakly interconnected._
- **Should `Community 3` be split into smaller, more focused modules?**
  _Cohesion score 0.07422402159244265 - nodes in this community are weakly interconnected._