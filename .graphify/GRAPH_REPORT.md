# Graph Report - .  (2026-10-04)

## Corpus Check
- 211 files · ~469,631 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 603 nodes · 1703 edges · 21 communities detected
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS
- Token cost: 0 input · 0 output
- Edge kinds: MODIFIES: 666 · contains: 315 · ON_BRANCH: 261 · imports_from: 152 · PARENT_OF: 151 · imports: 115 · calls: 43


## Input Scope
- Requested: auto
- Resolved: committed (source: default-auto)
- Included files: 211 · Candidates: 239
- Excluded: 3 untracked · 26473 ignored · 1 sensitive · 0 missing committed
- Recommendation: Use --scope all or graphify.yaml inputs.corpus for a knowledge-base folder.

## Graph Freshness
- Built from Git commit: `b75b160`
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
  git → git  _Bridges community 15 → community 3_
- `25e57d0 Rewrite about page copy in a plainer voice` --ON_BRANCH--> `main`  [EXTRACTED]
  git → git  _Bridges community 16 → community 3_
- `25e57d0 Rewrite about page copy in a plainer voice` --PARENT_OF--> `f3674bb Remove the proof section from service pages`  [EXTRACTED]
  git → git  _Bridges community 16 → community 15_
- `26bffaf Shorten monthly SEO navSummary to pass content validation` --PARENT_OF--> `c6b29bc Prepare site for launch: hide services, add draft mode, translate tools`  [EXTRACTED]
  git → git  _Bridges community 3 → community 1_
- `2ed8174 Add Finnish Cookiebot banner styler` --PARENT_OF--> `d58ca2d Add Finnish GTM container builder`  [EXTRACTED]
  git → git  _Bridges community 1 → community 0_

## Communities

### Community 0 - "Community 0"
Cohesion: 0.07
Nodes (47): 50bd599 Finnish language review 4.10.2026: fix new and changed texts, aa048bc Finnish language review 4.10.2026: fix new and changed texts, d58ca2d Add Finnish GTM container builder, e500df6 Add Finnish GTM container builder, 50bd599 Finnish language review 4.10.2026: fix new and changed texts, e500df6 Add Finnish GTM container builder, applyTagNamingConvention(), BuilderSettings (+39 more)

### Community 1 - "Community 1"
Cohesion: 0.07
Nodes (31): 2ed8174 Add Finnish Cookiebot banner styler, a028faa Rename Finnish form tool to Lomakkeiden nimeämistyökalu, a227870 Add Finnish Cookiebot banner styler, aef1e56 Prepare site for launch: hide services, add draft mode, translate tools, b7eb340 Rename Finnish form tool to Lomakkeiden nimeämistyökalu, c6b29bc Prepare site for launch: hide services, add draft mode, translate tools, a227870 Add Finnish Cookiebot banner styler, aef1e56 Prepare site for launch: hide services, add draft mode, translate tools (+23 more)

### Community 2 - "Community 2"
Cohesion: 0.12
Nodes (47): backup/before-purge, claude/sweet-lamport-b36507, datalayer-print-and-copy-edits, launch-prep, 0421511 Add short navSummary lines for services in the mega menu, 17b83c7 Add serviceType and about to service page schema, 1978218 Keep the previous site's URLs alive after the move, 1b5b266 Broaden toolkit copy beyond analytics (+39 more)

### Community 3 - "Community 3"
Cohesion: 0.08
Nodes (44): inlineScriptHashes, srcDir, main, 0280654 Expand text alignment article sources and refresh its images, 08a93f5 Add short navSummary lines for services in the mega menu, 2664dca Optimize article content images at build time, 26bffaf Shorten monthly SEO navSummary to pass content validation, 27b8e56 Add robots.txt with sitemap and discovery hints (+36 more)

### Community 4 - "Community 4"
Cohesion: 0.12
Nodes (45): claude/sweet-lamport-b36507, datalayer-print-and-copy-edits, launch-prep, main, 0421511 Add short navSummary lines for services in the mega menu, 17b83c7 Add serviceType and about to service page schema, 1b5b266 Broaden toolkit copy beyond analytics, 1ca05d5 Match mega menu link heights within a grid row (+37 more)

### Community 5 - "Community 5"
Cohesion: 0.08
Nodes (27): appearances, categories, categoryLabel(), profiles, siteConfig, PERSON, absoluteUrl(), BlogEntry (+19 more)

### Community 6 - "Community 6"
Cohesion: 0.07
Nodes (22): interactiveTools, enPosts, enServices, enTemplates, enTools, Entry, fiPosts, fiServices (+14 more)

### Community 7 - "Community 7"
Cohesion: 0.14
Nodes (3): ac99fdc Baseline before article image optimization, b2d293f Baseline before article image optimization, imgs

### Community 8 - "Community 8"
Cohesion: 0.13
Nodes (21): 5fcc1ad Make dataLayer documenter print and DOCX exports complete, buildDocxBlob(), buildMarkdown(), clean(), createInitialState(), documentFilename(), DocumentParameter, DocumentSection (+13 more)

### Community 10 - "Community 10"
Cohesion: 0.15
Nodes (18): buildGa4ReportUrl(), compactValues(), FILTER_TYPES, FilterType, isPropertySpecificField(), normalizeCustomDimensions(), ReportConfig, reportErrors() (+10 more)

### Community 11 - "Community 11"
Cohesion: 0.10
Nodes (13): formCategories, formTypes, allTypeNames, categoryIds, errors, labelPattern, pagesRoot, pairPattern (+5 more)

### Community 13 - "Community 13"
Cohesion: 0.16
Nodes (12): now, feedDate(), FeedEntryData, selectFeedEntries(), FeedConfig, FeedLang, feedResponse(), FEEDS (+4 more)

### Community 14 - "Community 14"
Cohesion: 0.20
Nodes (2): article-image-optimization, ac99fdc Baseline before article image optimization

### Community 15 - "Community 15"
Cohesion: 0.22
Nodes (6): 05dd422 Fix missing spaces before inline links; match footer order to header, 387e28a Add serviceType and about to service page schema, 4e33f5a Add Rybbit analytics and update privacy policies, 84ac798 Add Rybbit analytics and update privacy policies, dd89d84 Fix missing spaces before inline links; match footer order to header, f3674bb Remove the proof section from service pages

### Community 16 - "Community 16"
Cohesion: 0.23
Nodes (3): 25e57d0 Rewrite about page copy in a plainer voice, 54272a1 Align content consumption article with the tracking script, 8343592 Apply Finnish language review to site copy

### Community 17 - "Community 17"
Cohesion: 0.24
Nodes (6): 91252c4 Hide home page CTA banner and refresh toolkit descriptions, 9c91710 Hide home page CTA banner and refresh toolkit descriptions, 9c91710 Hide home page CTA banner and refresh toolkit descriptions, now, RecentPost, selectRecentPosts()

### Community 19 - "Community 19"
Cohesion: 0.29
Nodes (3): now, RelatedPost, selectRelatedPosts()

### Community 23 - "Community 23"
Cohesion: 0.50
Nodes (2): collections, postSchema

### Community 24 - "Community 24"
Cohesion: 0.83
Nodes (2): gatedBandIndex(), metricBandIndex()

### Community 25 - "Community 25"
Cohesion: 0.67
Nodes (1): enhancedRoots

### Community 26 - "Community 26"
Cohesion: 0.67
Nodes (2): bg, logoWhite

## Knowledge Gaps
- **100 isolated node(s):** `srcDir`, `inlineScriptHashes`, `logoWhite`, `bg`, `root` (+95 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **Thin community `Community 14`** (2 nodes): `article-image-optimization`, `ac99fdc Baseline before article image optimization`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 23`** (2 nodes): `collections`, `postSchema`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 24`** (2 nodes): `gatedBandIndex()`, `metricBandIndex()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 25`** (1 nodes): `enhancedRoots`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 26`** (2 nodes): `bg`, `logoWhite`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `siteConfig` connect `Community 5` to `Community 3`, `Community 1`, `Community 6`, `Community 13`?**
  _High betweenness centrality (0.007) - this node is a cross-community bridge._
- **Why does `toolkit` connect `Community 3` to `Community 17`, `Community 5`, `Community 6`?**
  _High betweenness centrality (0.001) - this node is a cross-community bridge._
- **What connects `srcDir`, `inlineScriptHashes`, `logoWhite` to the rest of the system?**
  _100 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Community 0` be split into smaller, more focused modules?**
  _Cohesion score 0.06874669487043893 - nodes in this community are weakly interconnected._
- **Should `Community 1` be split into smaller, more focused modules?**
  _Cohesion score 0.06779661016949153 - nodes in this community are weakly interconnected._
- **Should `Community 2` be split into smaller, more focused modules?**
  _Cohesion score 0.12025901942645699 - nodes in this community are weakly interconnected._
- **Should `Community 3` be split into smaller, more focused modules?**
  _Cohesion score 0.08115942028985507 - nodes in this community are weakly interconnected._