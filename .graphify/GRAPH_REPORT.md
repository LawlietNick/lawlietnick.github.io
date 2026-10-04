# Graph Report - .  (2026-10-04)

## Corpus Check
- 246 files · ~498,717 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 496 nodes · 1012 edges · 15 communities detected
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS
- Token cost: 0 input · 0 output
- Edge kinds: contains: 317 · MODIFIES: 225 · imports_from: 165 · imports: 113 · ON_BRANCH: 102 · PARENT_OF: 47 · calls: 43


## Input Scope
- Requested: auto
- Resolved: committed (source: default-auto)
- Included files: 246 · Candidates: 274
- Excluded: 3 untracked · 26633 ignored · 1 sensitive · 0 missing committed
- Recommendation: Use --scope all or graphify.yaml inputs.corpus for a knowledge-base folder.

## Graph Freshness
- Built from Git commit: `b6f7954`
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
- `50bd599 Finnish language review 4.10.2026: fix new and changed texts` --ON_BRANCH--> `main`  [EXTRACTED]
  git → git  _Bridges community 1 → community 2_
- `a227870 Add Finnish Cookiebot banner styler` --ON_BRANCH--> `main`  [EXTRACTED]
  git → git  _Bridges community 0 → community 2_
- `a227870 Add Finnish Cookiebot banner styler` --PARENT_OF--> `e500df6 Add Finnish GTM container builder`  [EXTRACTED]
  git → git  _Bridges community 0 → community 1_

## Communities

### Community 0 - "Community 0"
Cohesion: 0.06
Nodes (10): article-image-optimization, a227870 Add Finnish Cookiebot banner styler, ac99fdc Baseline before article image optimization, aef1e56 Prepare site for launch: hide services, add draft mode, translate tools, b7eb340 Rename Finnish form tool to Lomakkeiden nimeämistyökalu, enhancedRoots, now, imgs (+2 more)

### Community 1 - "Community 1"
Cohesion: 0.07
Nodes (43): 50bd599 Finnish language review 4.10.2026: fix new and changed texts, e500df6 Add Finnish GTM container builder, applyTagNamingConvention(), BuilderSettings, BuilderState, BuilderValidation, buildSelectedContainer(), clone() (+35 more)

### Community 2 - "Community 2"
Cohesion: 0.10
Nodes (46): claude/sweet-lamport-b36507, datalayer-print-and-copy-edits, launch-prep, main, 0421511 Add short navSummary lines for services in the mega menu, 17b83c7 Add serviceType and about to service page schema, 1b5b266 Broaden toolkit copy beyond analytics, 1ca05d5 Match mega menu link heights within a grid row (+38 more)

### Community 3 - "Community 3"
Cohesion: 0.07
Nodes (31): inlineScriptHashes, srcDir, appearances, categories, categoryLabel(), allInteractiveTools, profiles, siteConfig (+23 more)

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

### Community 19 - "Community 19"
Cohesion: 0.67
Nodes (2): services, work

### Community 21 - "Community 21"
Cohesion: 0.67
Nodes (2): bg, logoWhite

## Knowledge Gaps
- **102 isolated node(s):** `srcDir`, `inlineScriptHashes`, `logoWhite`, `bg`, `root` (+97 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **Thin community `Community 17`** (2 nodes): `collections`, `postSchema`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 18`** (2 nodes): `gatedBandIndex()`, `metricBandIndex()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 19`** (2 nodes): `services`, `work`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 21`** (2 nodes): `bg`, `logoWhite`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `siteConfig` connect `Community 3` to `Community 4`, `Community 10`?**
  _High betweenness centrality (0.007) - this node is a cross-community bridge._
- **Why does `toolkit` connect `Community 3` to `Community 2`, `Community 4`?**
  _High betweenness centrality (0.002) - this node is a cross-community bridge._
- **What connects `srcDir`, `inlineScriptHashes`, `logoWhite` to the rest of the system?**
  _102 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Community 0` be split into smaller, more focused modules?**
  _Cohesion score 0.06317954745812518 - nodes in this community are weakly interconnected._
- **Should `Community 1` be split into smaller, more focused modules?**
  _Cohesion score 0.07017543859649122 - nodes in this community are weakly interconnected._
- **Should `Community 2` be split into smaller, more focused modules?**
  _Cohesion score 0.10303030303030303 - nodes in this community are weakly interconnected._
- **Should `Community 3` be split into smaller, more focused modules?**
  _Cohesion score 0.07179487179487179 - nodes in this community are weakly interconnected._