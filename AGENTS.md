# AGENTS.md

This file provides guidance to AI coding agents (Claude Code, Codex, Cursor, OpenCode, …) when working with code in this repository.

## Project mission

A personal blog about building real projects with AI-assisted coding, published at **techmeat.dev**.

## Stack and hosting

- **Framework:** Astro 6, content as Markdown.
- **Output:** `static`. No SSR adapter is wired up — install `@astrojs/cloudflare` via `bunx astro add cloudflare` only when SSR is actually needed.
- **Host:** Cloudflare Pages — build command `bun run build`, output dir `dist/`. Bun is auto-detected from `bun.lock`; pin the runtime with `BUN_VERSION` env on Pages.
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
2. **`geo-optimizer-skill` CLI** — external pipeline at https://github.com/Auriti-Labs/geo-optimizer-skill, used for GEO work that the Claude skill alone does not cover.

When asked to "prepare an article" without further detail, run: keyword/SERP research → draft via `seo-content-writer` → on-page audit → meta + schema → quality + GEO audits → internal linking. Each step is gated.

## Skills for project work

- **UI/visual design** — go through the `impeccable` skill. Do not freestyle layouts, palettes, or typography.
- **Browser testing** — drive the browser through the `agent-browser` skill, not built-in Chrome DevTools / MCP browser tools or `curl`. `bun run dev` for the server itself is fine.
- **Commit-message / changelog drafting** — when _proposing_ a commit message or changelog entry for the user to apply, follow the `commits` (Conventional Commits) and `changelog` (Keep a Changelog) skills. Drafting only — the user does the actual commit (see _Git operations_).

## Git operations

Git is **read-only** for AI agents. The user runs all write operations themselves. One narrow exception: `git worktree` (see below).

**Allowed:** `git status`, `git diff`, `git log`, `git show`, `git blame`, `git ls-files`, `git rev-parse`, and other non-mutating queries. Plus the entire `git worktree` family (`add`, `list`, `remove`, `move`, `prune`, `lock`, `unlock`, `repair`) — useful for isolating multi-task workflows.

**Forbidden:** anything that creates commits, mutates refs in the main worktree, alters the working tree or index, or talks to a remote — including `commit`, `add`, `push`, `pull`, `fetch`, `merge`, `rebase`, `reset`, `checkout` (state-changing), `cherry-pick`, `stash`, `tag`, `branch` (create/delete/rename), `init`, `clone`, `remote *`, `config`. Bypass flags (`--force`, `--no-verify`, etc.) are forbidden regardless of the underlying command. The forbidden list applies _inside_ worktrees too — creating a worktree does not unlock commits or pushes.

If a skill checklist or built-in workflow (e.g. `/init`, brainstorming spec write-up) instructs to commit, **skip that step** — this rule wins per AGENTS.md / CLAUDE.md precedence. Write the file and tell the user it is ready for them to commit.

## Repository notes

- `.claude/skills/` and `.agents/skills/` are mirror copies of installed skill bundles, pinned via `skills-lock.json`. Manage via the skills toolchain, not by hand-editing.
- `.ai-notes/` holds drafts and AI working notes (e.g. `prompts.md`, the original Russian project brief).
- No content collections (`src/content/`) or i18n routing exist yet — add them when the editorial workflow needs them.
