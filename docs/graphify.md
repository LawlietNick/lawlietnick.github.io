# graphify

A local knowledge graph lives in `.graphify/` (gitignored, so it may be missing). When `.graphify/graph.json` exists, start codebase questions with it, because it returns a scoped subgraph that is much smaller than grep output:

1. `graphify summary --graph .graphify/graph.json` for first-hop orientation.
2. `graphify query "<question>"`, `graphify path "<A>" "<B>"` or `graphify explain "<concept>"` for focused questions.
3. `graphify review-delta --graph .graphify/graph.json` for the impact of changed files.
4. `.graphify/GRAPH_REPORT.md` only for broad architecture review, or when the commands above come back thin.

If `.graphify/needs_update` exists or `.graphify/branch.json` has `stale=true`, tell the user the graph is stale before relying on it and suggest `/graphify . --update`. After modifying code files, run `npx graphify hook-rebuild` to keep the graph current.
