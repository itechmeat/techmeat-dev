# Poster design rules — techmeat.dev

These rules apply to every blog-post poster authored in `design/`.
They are derived from `DESIGN.md` (sitewide) and from poster-tier
typography practice (a poster shrinks ~5× in social-feed previews:
Twitter cards 506 × 253, IG cards similar — anything below 30 px on
the 1080-wide canvas becomes unreadable in feed).

## Two formats

Each post and each page has two posters in `design/posters.pen`, both
generated from a reusable component:

| Format                        | Size        | Aspect   | Used for                                                                                                                                                                                                                                      |
| ----------------------------- | ----------- | -------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Portrait** (`PosterMaster`) | 1080 × 1350 | 4 : 5    | Pinterest, Instagram, Bluesky cards, **direct upload to LinkedIn** (occupies more feed real estate). Stored in `public/posters/social/`. Manually uploaded at post time.                                                                      |
| **Wide** (`PosterMasterWide`) | 1200 × 630  | 1.91 : 1 | OG image for link previews on Twitter/X, Facebook, LinkedIn share, Slack/Discord embeds. Stored in `public/posters/og/`. Wired into the site via `og:image` meta tag (`frontmatter.ogImage` for posts, `<BaseLayout ogImage=...>` for pages). |

Safe-area padding:

- Portrait: ≥ **96 px** from every edge.
- Wide: ≥ **80 px** from every edge.

## Required content (every poster)

A poster shrinks ~0.4× in social-feed previews. Below the per-format
minimums each text becomes unreadable. **Mandatory minimums by format:**

### Portrait (1080 × 1350)

1. **Wordmark** — `techmeat.dev`, ≥ **80 px** font size (Newsreader, weight 500).
2. **Headline** — the post title (or a poster-edited variant), sized for dominance, **108–200 px**.
3. **Date** — full publication date, ≥ **56 px**.
4. **Tags** — hashtagged list of post tags, ≥ **48 px**, in muted secondary color.
5. **Issue / category labels** (when present), ≥ **56 px**.

### Wide (1200 × 630)

1. **Wordmark** — `techmeat.dev`, ≥ **48 px** (smaller proportion to canvas; landscape format gives less vertical room).
2. **Headline** — sized for dominance: **80 px** for two-line, **130–160 px** for single-word section titles ("Archive", "Tags", "About", "Stack").
3. **Date** — ≥ **36 px**.
4. **Tags** — ≥ **30 px**.
5. **Issue / category labels** — ≥ **36 px**.

Optional decoration:

- Issue/series number ("01", "02"…) as backdrop or inline accent.
- One thin accent rule, color block, or similar quiet motif. Never more than one decorative system per poster.

## Forbidden

- Any text below the per-format minimums above. If a string does not fit at the minimum, **remove it**. Do not "make it small to fit." If everything important is at or above its minimum, the poster reads in feed; if anything important is below, the poster fails its only job.
- All-caps for running text. Caps are allowed only for single-word labels of up to 8 characters.
- Decorative imagery (per project `DESIGN.md`). Posters are typographic, period.

## Headline line breaks (CRITICAL)

Lines must break at natural grammatical pauses. **Never split semantic pairs** across two lines.

Ban list — these must always stay on one line:

- "coding agents"
- "my blog" / "this blog" / "the blog"
- "AI coding" / "AI-assisted"
- "Astro framework", "Cloudflare Pages", and similar noun + product pairs
- proper names ("Sergey Eroshenkov", any product name)
- "no SSR", "no Tailwind", "no JavaScript" — negation glued to its noun

Implementation hierarchy (use the first that fits):

1. **Split the headline into separate text nodes**, one per line. Most reliable. Use a vertical frame as parent so lines stay anchored.
2. If using a single auto-wrapping text node, glue forbidden pairs with **non-breaking space (` `)**. Example: `"coding agents"`.
3. If the headline still wraps badly at the chosen size, **drop the size** or **widen the column** until the wrap is natural. **Never accept an ugly break to keep the size.**

## Type roles

- **Display** — Newsreader Variable. Used for headline, big numerals, wordmark.
- **Body / meta** — Inter. Used for date, supplementary text.
- **Mono** — IBM Plex Mono. Used for tags and numerical labels only.

## Color roles

Use the document-level variables (must mirror `DESIGN.md` and `src/styles/global.css`):

- **`color-surface`** — `#FBFBFD` (light scene) / **`color-ink-deep`** `#1E2128` (dark scene).
- **`color-text`** — `#2D3036` (light) / **`color-paper-cream`** `#EAE5D6` (dark).
- **`color-text-muted`** — `#74787E` (light) / about 70%-opacity paper-cream (dark).
- **`color-accent`** (Working Indigo) — `#2C3F8C`. Painted on ≤ 10 % of any surface.
- **`color-surface-sunken`** — `#F2F3F6`. Used for the decorative numeral backdrop in the light scene.

## Per-post variables

When cloning the master template for a new post, only the following change:

- Headline text (and its line-split nodes)
- Issue number ("01" → "02"…)
- Date
- Tags
- (Rarely) wordmark domain

Everything else — sizes, padding, palette, type stack — stays constant.
