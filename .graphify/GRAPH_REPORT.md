# Graph Report - .  (2026-10-04)

## Corpus Check
- 216 files · ~461,017 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 613 nodes · 1751 edges · 15 communities detected
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS
- Token cost: 0 input · 0 output
- Edge kinds: MODIFIES: 697 · contains: 315 · ON_BRANCH: 269 · PARENT_OF: 159 · imports_from: 153 · imports: 115 · calls: 43


## Input Scope
- Requested: auto
- Resolved: committed (source: default-auto)
- Included files: 216 · Candidates: 244
- Excluded: 0 untracked · 26569 ignored · 1 sensitive · 0 missing committed
- Recommendation: Use --scope all or graphify.yaml inputs.corpus for a knowledge-base folder.

## Graph Freshness
- Built from Git commit: `1d3fd9a`
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
  git → git  _Bridges community 0 → community 3_
- `05dd422 Fix missing spaces before inline links; match footer order to header` --PARENT_OF--> `553b525 Keep the previous site's URLs alive after the move`  [EXTRACTED]
  git → git  _Bridges community 0 → community 15_
- `2664dca Optimize article content images at build time` --ON_BRANCH--> `main`  [EXTRACTED]
  git → git  _Bridges community 15 → community 3_
- `26bffaf Shorten monthly SEO navSummary to pass content validation` --PARENT_OF--> `c6b29bc Prepare site for launch: hide services, add draft mode, translate tools`  [EXTRACTED]
  git → git  _Bridges community 3 → community 1_
- `2ed8174 Add Finnish Cookiebot banner styler` --PARENT_OF--> `d58ca2d Add Finnish GTM container builder`  [EXTRACTED]
  git → git  _Bridges community 0 → community 2_

## Communities

### Community 0 - "Community 0"
Cohesion: 0.05
Nodes (25): article-image-optimization, 05dd422 Fix missing spaces before inline links; match footer order to header, 2ed8174 Add Finnish Cookiebot banner styler, 4e33f5a Add Rybbit analytics and update privacy policies, 91252c4 Hide home page CTA banner and refresh toolkit descriptions, 9c91710 Hide home page CTA banner and refresh toolkit descriptions, a227870 Add Finnish Cookiebot banner styler, ac99fdc Baseline before article image optimization (+17 more)

### Community 1 - "Community 1"
Cohesion: 0.06
Nodes (28): a028faa Rename Finnish form tool to Lomakkeiden nimeämistyökalu, aef1e56 Prepare site for launch: hide services, add draft mode, translate tools, b7eb340 Rename Finnish form tool to Lomakkeiden nimeämistyökalu, c6b29bc Prepare site for launch: hide services, add draft mode, translate tools, aef1e56 Prepare site for launch: hide services, add draft mode, translate tools, b7eb340 Rename Finnish form tool to Lomakkeiden nimeämistyökalu, categoriesFi, localizeFormTaxonomy() (+20 more)

### Community 2 - "Community 2"
Cohesion: 0.07
Nodes (47): 50bd599 Finnish language review 4.10.2026: fix new and changed texts, aa048bc Finnish language review 4.10.2026: fix new and changed texts, d58ca2d Add Finnish GTM container builder, e500df6 Add Finnish GTM container builder, 50bd599 Finnish language review 4.10.2026: fix new and changed texts, e500df6 Add Finnish GTM container builder, applyTagNamingConvention(), BuilderSettings (+39 more)

### Community 3 - "Community 3"
Cohesion: 0.07
Nodes (50): main, 0280654 Expand text alignment article sources and refresh its images, 08a93f5 Add short navSummary lines for services in the mega menu, 1d3fd9a Stop tracking raw JSON audit reports, 25e57d0 Rewrite about page copy in a plainer voice, 26bffaf Shorten monthly SEO navSummary to pass content validation, 27b8e56 Add robots.txt with sitemap and discovery hints, 2ce6173 Stop tracking the local 'to be used' folder (+42 more)

### Community 4 - "Community 4"
Cohesion: 0.11
Nodes (49): backup/before-purge, claude/sweet-lamport-b36507, datalayer-print-and-copy-edits, launch-prep, 0421511 Add short navSummary lines for services in the mega menu, 17b83c7 Add serviceType and about to service page schema, 1978218 Keep the previous site's URLs alive after the move, 1b5b266 Broaden toolkit copy beyond analytics (+41 more)

### Community 5 - "Community 5"
Cohesion: 0.13
Nodes (45): claude/sweet-lamport-b36507, datalayer-print-and-copy-edits, launch-prep, main, 0421511 Add short navSummary lines for services in the mega menu, 17b83c7 Add serviceType and about to service page schema, 1b5b266 Broaden toolkit copy beyond analytics, 1ca05d5 Match mega menu link heights within a grid row (+37 more)

### Community 6 - "Community 6"
Cohesion: 0.09
Nodes (26): 387e28a Add serviceType and about to service page schema, appearances, categoryLabel(), profiles, PERSON, absoluteUrl(), BlogEntry, blogs (+18 more)

### Community 7 - "Community 7"
Cohesion: 0.13
Nodes (21): 5fcc1ad Make dataLayer documenter print and DOCX exports complete, buildDocxBlob(), buildMarkdown(), clean(), createInitialState(), documentFilename(), DocumentParameter, DocumentSection (+13 more)

### Community 9 - "Community 9"
Cohesion: 0.15
Nodes (18): buildGa4ReportUrl(), compactValues(), FILTER_TYPES, FilterType, isPropertySpecificField(), normalizeCustomDimensions(), ReportConfig, reportErrors() (+10 more)

### Community 10 - "Community 10"
Cohesion: 0.10
Nodes (13): formCategories, formTypes, allTypeNames, categoryIds, errors, labelPattern, pagesRoot, pairPattern (+5 more)

### Community 12 - "Community 12"
Cohesion: 0.16
Nodes (11): now, feedDate(), FeedEntryData, selectFeedEntries(), FeedConfig, FeedLang, FEEDS, FeedSource (+3 more)

### Community 13 - "Community 13"
Cohesion: 0.12
Nodes (13): enPosts, enServices, enTemplates, enTools, Entry, fiPosts, fiServices, fiTemplates (+5 more)

### Community 14 - "Community 14"
Cohesion: 0.15
Nodes (9): interactiveTools, blogModules, finnishBlogModules, finnishServiceModules, GET(), serviceModules, staticRoutes, toolCategories (+1 more)

### Community 15 - "Community 15"
Cohesion: 0.22
Nodes (7): inlineScriptHashes, srcDir, 2664dca Optimize article content images at build time, 553b525 Keep the previous site's URLs alive after the move, allInteractiveTools, siteConfig, toolkit

### Community 16 - "Community 16"
Cohesion: 0.29
Nodes (3): now, RelatedPost, selectRelatedPosts()

## Knowledge Gaps
- **100 isolated node(s):** `srcDir`, `inlineScriptHashes`, `logoWhite`, `bg`, `root` (+95 more)
  These have ≤1 connection - possible missing edges or undocumented components.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `siteConfig` connect `Community 15` to `Community 1`, `Community 13`, `Community 14`, `Community 6`, `Community 12`?**
  _High betweenness centrality (0.007) - this node is a cross-community bridge._
- **Why does `toolkit` connect `Community 15` to `Community 0`, `Community 6`, `Community 14`?**
  _High betweenness centrality (0.001) - this node is a cross-community bridge._
- **What connects `srcDir`, `inlineScriptHashes`, `logoWhite` to the rest of the system?**
  _100 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Community 0` be split into smaller, more focused modules?**
  _Cohesion score 0.053729456384323644 - nodes in this community are weakly interconnected._
- **Should `Community 1` be split into smaller, more focused modules?**
  _Cohesion score 0.0553116769095698 - nodes in this community are weakly interconnected._
- **Should `Community 2` be split into smaller, more focused modules?**
  _Cohesion score 0.06874669487043893 - nodes in this community are weakly interconnected._
- **Should `Community 3` be split into smaller, more focused modules?**
  _Cohesion score 0.07337662337662337 - nodes in this community are weakly interconnected._