# Blog Architecture — Design

> **Date:** 2026-04-27
> **Domain:** techmeat.dev
> **Status:** Draft, awaiting user review.

## 1. Mission

A personal blog about building real projects with AI-assisted coding. Information-first, frequent publishing, English primary, at least 10 translations, fully static deployment on Cloudflare Pages.

## 2. Stack

Already pinned in `CLAUDE.md` / `AGENTS.md` and not relitigated here:

- Astro 6, content as Markdown, `output: 'static'`.
- Solid.js islands via `@astrojs/solid-js` for the few interactive bits (theme toggle, code-block copy button).
- Bun runtime + package manager. Cloudflare Pages hosting.
- Tooling: `oxlint`, `oxfmt`, `@astrojs/check`, `lefthook`.

## 3. Information architecture

### 3.1 Pages

**Authored:**

- `/` — home
- `/about` — about + merged contacts
- `/stack` — tools, hardware, AI assistants, technology stack, build pipeline, AI-coding methodology (merged from former `/uses` + `/colophon`)
- `/privacy` — one-paragraph CF Web Analytics notice. **English-only**, not localized.

**Auto-generated:**

- `/posts` — paginated archive
- `/posts/[slug]` — article
- `/tags` — index of all tags
- `/tags/[tag]` — posts filtered by tag
- `/404` — custom not-found, localized
- `/rss.xml` — feed (per locale: `/rss.xml`, `/de/rss.xml`, …)
- `/sitemap-index.xml` — sitemap

All pages except `/privacy` are mirrored per locale (`/de/about`, `/de/posts/[slug]`, etc.).

### 3.2 Header

- **Left:** `techmeat.dev` text wordmark, links to `/`. No image logo in v1.
- **Center:** nav — Posts · About · Stack. **No Tags link** (tags reachable via post pills, `/tags` index, and home All-tags row).
- **Right:** theme toggle (🌓), language switcher (🌐).

### 3.3 Footer

- **Left:** `© 2026 Sergey Eroshenkov · techmeat.dev`.
- **Right:** GitHub · Twitter/X · RSS · Privacy. First three are icons; "Privacy" is muted text.
- No "Built with Astro" badge, no duplicated theme/language switcher.

## 4. Internationalization

- **Default locale:** English at root (`/`); other locales at `/<lang>/`.
- **At least 10 target languages**, exact list TBD per content readiness.
- **Canonical:** every translated page MUST emit `<link rel="canonical">` pointing to its English original. Hard SEO requirement.
- **UI strings** live in `src/i18n/<lang>.ts` dictionaries; rendered via a `t('key')` helper.
- **`/privacy`** is intentionally English-only. The footer Privacy link points to `/privacy` from every locale (never `/de/privacy`).
- **Tag URL slugs** stay English (`/de/tags/claude-code`); localized **display labels** come from `src/i18n/tags.ts`. Meta keywords on tag pages use the localized label, so SEO benefits without URL slug duplication.
- **Language switcher behavior:**
  - On a global page (`/`, `/about`, `/stack`, `/posts`, `/tags`, `/404`): shows all locales.
  - On an article page: shows only locales where the article has a translation file.
  - On `/privacy`: switcher hidden (English-only page).

## 5. Content model

### 5.1 Post frontmatter

Each translation file (`index.<lang>.md`) carries its own frontmatter:

| Field         | Type       | Required | Notes                                                                                       |
| ------------- | ---------- | -------- | ------------------------------------------------------------------------------------------- |
| `title`       | `string`   | yes      | Localized per file.                                                                         |
| `description` | `string`   | yes      | Used as excerpt on listings + `<meta name="description">`.                                  |
| `pubDate`     | `Date`     | yes      | Original publication date.                                                                  |
| `updatedDate` | `Date`     | no       | Renders "Updated: …" in meta strip; feeds the home "Recently updated" section.              |
| `tags`        | `string[]` | yes      | English slugs. Doubles as SEO keywords (mapped to localized labels via `src/i18n/tags.ts`). |
| `prNumber`    | `number`   | yes (en) | GitHub PR number of the **original English article**. Required only on `index.en.md`.       |
| `ogImage`     | `string`   | no       | Manual OG override. Each locale's frontmatter can set this independently.                   |
| `draft`       | `boolean`  | no       | `true` excludes the post from production build; remains visible in `bun run dev`.           |

### 5.2 File layout

```
src/content/posts/<slug>/
  index.en.md       ← canonical
  index.ru.md       ← translation (optional)
  index.de.md       ← translation (optional)
  poster.png        ← optional manual OG override (referenced from any locale's frontmatter)
  …assets…
```

- Slug = folder name.
- Translations are siblings inside one post folder.
- Per-locale assets (e.g., a poster localized into Russian) can live alongside as `poster.ru.png` and be referenced from the Russian frontmatter.

### 5.3 Tags

- Stored as English slugs in `frontmatter.tags`.
- Display labels resolved through a dictionary `src/i18n/tags.ts` keyed by slug; each locale gets its own translation. Untranslated tags fall back to title-cased slug.
- A new tag automatically appears on the home All-tags row and at `/tags` the next build. Adding the localized label is a follow-up step.

### 5.4 Drafts

- `draft: true` excludes the post from `astro build`.
- Drafts remain visible under `bun run dev` so the author can preview before opening the publish PR.

## 6. Per-page composition

### 6.1 Home (`/`)

1. **Hero** — avatar (placeholder until design phase) + 1–2-line tagline and identity. Acts as both visual anchor and identity statement; no separate "About teaser" block.
2. **Latest posts** — 10 cards (title, date, tags, 1–2-sentence excerpt, "Read more →").
3. **Recently updated** — posts whose `updatedDate` falls within the last 30 days; capped at 5 entries; entire section hidden when empty.
4. **All tags** — single horizontal pill row of every tag, linked to `/tags/[tag]`.
5. **"View all posts →"** link to `/posts`, shown only when total posts > 10.

### 6.2 Post (`/posts/[slug]`)

1. `<h1>` title.
2. **Meta strip** — `pubDate · "Updated:" updatedDate? · tag pills · X min read`. `X` is computed from word count at ~225 wpm.
3. **Body** — markdown rendered to HTML; Shiki syntax highlighting; copy-to-clipboard button on each `<pre>` block (small Solid island; no JS hydration on prose itself).
4. **Related posts** — 3 sibling posts with greatest tag overlap, computed at build time. Fewer than 3 acceptable when overlap is thin. Block hidden when no overlap exists.
5. **Footer block:**
   - 💬 **Discuss on PR** → `https://github.com/<owner>/techmeat.dev/pull/<prNumber>`. Microcopy makes it explicit: _"Yes, you can comment even after it's merged."_ The footer is rendered only when the canonical English file carries a `prNumber`; otherwise it is omitted entirely.

### 6.3 About (`/about`)

- CV-style narrative (content authoring, not architecture).
- Bottom block: **"Find me on:"** with extended links and brief descriptions ("GitHub for code", "Twitter/X for thoughts", …).

### 6.4 Stack (`/stack`)

- One unified page covering daily-use tools and hardware, AI assistants, the technology stack, build pipeline, and AI-coding methodology. Replaces the original `/uses` + `/colophon` split — the boundary between "tools" and "stack/methodology" was artificial for this blog. Updated when the underlying setup changes.

### 6.5 Tag (`/tags/[tag]`)

- `<h1>` "Posts tagged: <localized label>".
- Card list of all posts with that tag.

### 6.6 Tag index (`/tags`)

- Every tag with its post count, clickable.

### 6.7 Archive (`/posts`)

- Paginated chronological list of all non-draft posts. Page size 20 (revisable during implementation).

### 6.8 Privacy (`/privacy`)

- One paragraph naming CF Web Analytics, declaring no cookies / no PII / no tracking, linking to Cloudflare's privacy commitments page.
- English only; reachable from any page's footer.

### 6.9 404

- Heading, single sentence, links to `/` and `/posts`. Localized per locale.

## 7. Discussion & feedback

The repo is public on GitHub. Each article ships through a pull request. The per-article footer surfaces two distinct affordances:

- **Discuss on PR** — anchored to the **canonical (English) PR**, so all translations of one article share a single discussion thread. Implements the project rule "discussion belongs to the article-as-idea, not to the translation".
- **Suggest an edit** — anchored to the **per-locale `.md` file**, so a typo in the Russian translation opens a fix-PR against the Russian source.

`prNumber` is stored once in the English frontmatter; the rendering helper resolves it for translated pages by reading the sibling English file via shared slug.

## 8. SEO / GEO

### 8.1 Canonicals

- Each translated post page → English original.
- `/privacy` → self.

### 8.2 Sitemap

- `@astrojs/sitemap` integration.
- Emits `xhtml:link rel="alternate" hreflang="<lang>"` entries for each set of translated pages, including `x-default` for English.

### 8.3 RSS

- `@astrojs/rss` integration.
- Per-locale feed at `/rss.xml`, `/de/rss.xml`, …

### 8.4 Tags as keywords

- Frontmatter `tags` (English slugs) populate:
  - `<meta name="keywords">` using **localized labels** for the current locale.
  - Schema.org `Article.keywords` (JSON-LD) using the same localized labels.
  - Internal-linking signals consumed by the `internal-linking-optimizer` skill.

### 8.5 Open Graph / Twitter cards

Three-tier resolve at render time:

1. If `frontmatter.ogImage` is set → use it.
2. Else if the page is a post or tag page → use auto-generated PNG from a satori-based Astro endpoint:
   - Posts: `/og/posts/<lang>/<slug>.png` (rendered from localized title).
   - Tags: `/og/tags/<lang>/<tag>.png` (rendered as `#<localized-label> · techmeat.dev`).
3. Else → site-wide static `public/og/default.png`.

A single helper, e.g.:

```ts
function resolveOgImage(page) {
  if (page.frontmatter.ogImage) return page.frontmatter.ogImage;
  if (page.type === "post") return `/og/posts/${page.locale}/${page.slug}.png`;
  if (page.type === "tag") return `/og/tags/${page.locale}/${page.tag}.png`;
  return "/og/default.png";
}
```

is consumed by all page templates to populate `<meta property="og:image">` and `<meta name="twitter:image">`.

### 8.6 Editorial pipeline (per article)

`keyword-research` → `serp-analysis` → `seo-content-writer` draft → `on-page-seo-auditor` → `meta-tags-optimizer` + `schema-markup-generator` → `content-quality-auditor` (CORE-EEAT 80-item) + `geo-content-optimizer` → `internal-linking-optimizer`.

Each step is gated. Skills enumerated in `CLAUDE.md`.

## 9. Analytics

- **Cloudflare Web Analytics**, enabled in the CF dashboard for the Pages project.
- ~2 KB script tag in the global layout.
- No cookies, no PII, no consent banner under GDPR/ePrivacy.
- A short paragraph in `/privacy` documents this; the footer Privacy link points to it.

## 10. PWA

- Integration: `@vite-pwa/astro` (Workbox under the hood).
- **Manifest** (English-only): `name`, `short_name`, `theme_color`, `background_color`, `display: standalone`, `start_url: '/'`. Icons at 192×192, 512×512, and 512×512 maskable, plus standard favicons.
- **Service worker:**
  - Precache all build assets (CSS, JS, fonts, icons).
  - Runtime cache for visited HTML using `StaleWhileRevalidate`.
  - Offline fallback at `/offline.html` for un-cached URLs.
- **Update flow:** silent on next navigation. No "new version" toast.

## 11. Out of scope for v1

Explicitly **not** shipping in this iteration. Each is deferrable; revisit when concrete demand exists.

- Comments (no Giscus, no Disqus, no third-party).
- Email subscription / newsletter.
- Reactions / likes.
- Search.
- `/now`, `/projects`, `/changelog`.
- Separate `/archive` distinct from `/posts`.
- Share buttons.
- Prev/next navigation between posts (Related posts replaces this).
- Author byline on posts (single-author site, identity in hero/about).
- Table of contents on posts (defer until a post is long enough to warrant it; can add per-post via `toc: true` flag later).
- GitHub activity feed on the home page.
- Webmentions / IndieWeb.

## 12. Carry-over to design brainstorm

Items deferred to the next brainstorm (visual design):

- **Mobile-first** is a mandatory constraint; desktop is an enhancement.
- **PWA assets:** 192×192, 512×512, 512×512 maskable icons; favicon set; theme color.
- **OG card template** (used for both post and tag auto-generation; renders localized title per locale).
- **Theme tokens** (light/dark CSS-variable palette).
- **Theme toggle UX** at narrow widths (likely inside a hamburger menu).
- **Avatar** asset and format (placeholder until design phase).
- **`public/og/default.png`** static fallback for non-post pages.
