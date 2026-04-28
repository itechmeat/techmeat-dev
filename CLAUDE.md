# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project mission

A personal blog about building real projects with AI-assisted coding, published at **techmeat.dev**.

## Stack and hosting

- **Framework:** Astro 6, content as Markdown.
- **Output:** `static`. No SSR adapter is wired up — install `@astrojs/cloudflare` via `bunx astro add cloudflare` only when SSR is actually needed.
- **Host:** Cloudflare Pages — build command `bun run build`, output dir `dist/`. Bun is auto-detected from `bun.lock`; pin the runtime with `BUN_VERSION` env on Pages.
- **Analytics:** Cloudflare Web Analytics. Set `PUBLIC_CF_ANALYTICS_TOKEN` in CF Pages env to enable the beacon. Locally drop it in `.env` (gitignored). Empty/unset → no beacon emitted.
- **Runtime:** Bun. Do not introduce npm/yarn/pnpm.
- **Islands framework:** Solid.js via `@astrojs/solid-js`. Do not introduce React/Vue/Svelte — pick Solid, or stay static if no interactivity is needed.

### Commands

| Command             | Purpose                                         |
| ------------------- | ----------------------------------------------- |
| `bun run dev`       | Dev server at `http://localhost:4321`           |
| `bun run build`     | Production build to `dist/`                     |
| `bun run preview`   | Preview the built site                          |
| `bun run typecheck` | `astro check`                                   |
| `bun run lint`      | `oxlint` (auto-fix with `bun run lint:fix`)     |
| `bun run fmt`       | `oxfmt` write (verify with `bun run fmt:check`) |

`lefthook` runs `oxlint`, `oxfmt --check`, and `typecheck` on every commit. After a fresh clone, run `bunx lefthook install` once to register the hooks.

## Internationalization

- **Primary language:** English. All article sources and committed docs are in English.
- **Translations:** at least 10 popular languages. Every translated page MUST emit `<link rel="canonical">` pointing to the English version of the same article. This is a hard SEO requirement.
- Drafts may be written in any language but must be translated before merging.

## Content pipeline (SEO + GEO)

Every article passes through a multi-stage SEO/GEO flow before publishing. Two ecosystems power it:

1. **Installed Claude skills** — invoke via the `Skill` tool, never read the skill files directly. Grouping by purpose:
   - Research & strategy: `keyword-research`, `serp-analysis`, `competitor-analysis`, `content-gap-analysis`
   - Authoring & on-page: `seo-content-writer`, `meta-tags-optimizer`, `schema-markup-generator`, `on-page-seo-auditor`, `internal-linking-optimizer`
   - Quality gates: `content-quality-auditor` (CORE-EEAT 80-item audit), `domain-authority-auditor`
   - GEO: `geo-content-optimizer`, `entity-optimizer`
   - Maintenance: `content-refresher`, `rank-tracker`, `alert-manager`, `technical-seo-checker`, `backlink-analyzer`, `performance-reporter`, `memory-management`
2. **`geo-optimizer-skill` CLI** — external pipeline at https://github.com/Auriti-Labs/geo-optimizer-skill, for GEO work the Claude skill alone does not cover. **The installed binary is named `geo`** (not `geo-optimizer-skill`); confirm with `geo --version` before assuming it is missing. Reference: https://github.com/Auriti-Labs/geo-optimizer-skill.

### `geo` CLI cheat sheet

Audit (the one you reach for most often):

```sh
geo audit --url https://techmeat.dev                                    # single page, text output
geo audit --url https://techmeat.dev --format json                      # machine-readable
geo audit --url https://techmeat.dev --format html > /tmp/geo.html      # self-contained report
geo audit --sitemap https://techmeat.dev/sitemap-index.xml --max-urls 25 # sitemap batch
geo audit --url https://techmeat.dev --save-history --regression        # track regressions over time
```

Audit covers eight scored areas (robots, llms, schema, meta, content, brand/entity, signals, AI discovery) plus bonus checks (CDN crawler access, JS rendering, WebMCP, negative signals, prompt-injection detection, trust stack, RAG chunk readiness, content decay, per-platform citation profile). Score bands: 86-100 excellent, 68-85 good, 36-67 foundation, 0-35 critical.

Fix and generate:

```sh
geo fix --url https://techmeat.dev --apply                          # auto-write missing files
geo llms --base-url https://techmeat.dev --output ./public/llms.txt # regenerate llms.txt from sitemap
geo schema --type faq --url https://techmeat.dev/posts/foo/         # JSON-LD for a page
```

Compare, track, observe:

```sh
geo diff --before https://techmeat.dev/posts/foo-old --after https://techmeat.dev/posts/foo-new
geo history --url https://techmeat.dev                              # saved trend
geo track --url https://techmeat.dev --report --output ./geo-track.html
geo monitor --domain techmeat.dev                                   # passive AI visibility snapshot
geo coherence --sitemap https://techmeat.dev/sitemap-index.xml      # cross-page terminology consistency
geo logs --file access.log                                          # AI crawler log analysis
```

Snapshots of archived AI answers:

```sh
geo snapshots --query "best AI coding workflow" --from 2026-03-01 --to 2026-03-30
geo snapshots --quality --snapshot-id 12 --target-domain techmeat.dev
```

CI-friendly output formats: `text` (default), `json`, `rich`, `html`, `sarif` (GitHub Code Scanning), `junit`, `github` (Actions annotations).

MCP option: a co-installed `geo-mcp` binary exposes the same checks as MCP tools (`geo_audit`, `geo_fix`, `geo_llms_generate`, `geo_citability`, `geo_schema_validate`, `geo_compare`, `geo_gap_analysis`, `geo_ai_discovery`, `geo_check_bots`, `geo_trust_score`, `geo_negative_signals`, `geo_factual_accuracy`). Wire it once into a project with `claude mcp add geo-optimizer -- geo-mcp` and call those tools instead of shelling out, when the surrounding agent supports MCP.

When asked to "prepare an article" without further detail, run: keyword/SERP research → draft via `seo-content-writer` → on-page audit → meta + schema → quality + GEO audits → internal linking. Each step is gated.

## Skills for project work

- **UI/visual design** — go through the `impeccable` skill. Do not freestyle layouts, palettes, or typography.
- **Browser testing** — drive the browser through the `agent-browser` skill, not built-in Chrome DevTools / MCP browser tools or `curl`. `bun run dev` for the server itself is fine.
- **Commit-message / changelog drafting** — when _proposing_ a commit message or changelog entry for the user to apply, follow the `commits` (Conventional Commits) and `changelog` (Keep a Changelog) skills. Drafting only — the user does the actual commit (see _Git operations_).

## Git operations

Two scopes with different rules.

**In the main worktree** (primary branch `master`): write operations are **forbidden**. No `commit`, `add`, `merge`, `rebase`, `reset`, `cherry-pick`, state-changing `checkout`, `tag`, or `branch` (create/delete/rename) — nothing that would update master's tip or alter the main worktree's working tree or index. The user owns master. If a skill checklist instructs to commit something authored in the main worktree, skip that step and tell the user the file is ready for them to commit.

**In feature worktrees** (any non-master branch created via `git worktree add`): the agent has **full local git rights**. `commit`, `add`, branch management, reset of worktree-local refs are all allowed. The branch represents in-progress work; nothing reaches the project's authoritative state until the user merges or rebases it onto master.

**Always forbidden, regardless of scope:** `push` (no code goes to a remote without user action), `pull` (mutates local refs and combines fetch + merge), `init`, `clone`, `remote *`, `config`. Bypass flags (`--force`, `--no-verify`, `--no-gpg-sign`, etc.) are forbidden regardless of the underlying command.

**Always allowed:** `git status`, `git diff`, `git log`, `git show`, `git blame`, `git ls-files`, `git rev-parse`, `git fetch` (non-mutating), and the entire `git worktree` family (`add`, `list`, `remove`, `move`, `prune`, `lock`, `unlock`, `repair`).

## Repository notes

- `.claude/skills/` and `.agents/skills/` are mirror copies of installed skill bundles, pinned via `skills-lock.json`. Manage via the skills toolchain, not by hand-editing.
- `.ai-notes/` holds drafts and AI working notes (e.g. `prompts.md`, the original Russian project brief).
