<!-- SEED: re-run $impeccable document once there's code to capture the actual tokens and components. -->

---
name: techmeat.dev
description: A long-form journal on AI-assisted engineering, built around quiet typography and cool-neutral surfaces that get out of the reader's way.
---

# Design System: techmeat.dev

## 1. Overview

**Creative North Star: "The Reading Room"**

The site behaves like a quiet reading room: cool, neutral walls, one steady lamp, a single reader, the text doing all the work. No paper aesthetic, no editorial nostalgia, no decoration for its own sake. The page's only lead actor is the writing; everything else (margins, dividers, navigation, theme toggle) recedes and works for readability rather than for impression. Light is the default theme, because the primary reading scenario is a long article in daytime or evening light, on a laptop or phone. Dark is an equal mode, not an "inversion" but a separate scene built for the same texts in a dim room.

The system rests on four strategic moves: **cool-neutral surfaces** (an almost-grey palette with a barely-perceptible cool undertone, never warm, never `#fff` or `#000`), a **restrained palette with one quiet accent capped at 10%** of any surface, a **two-voice typography pairing** (Source Serif 4 Variable for the display tier, the system humanist sans for everything else, with `:lang()` graceful degradation for scripts the serif does not cover), and **restrained motion**, where transitions exist only in response to state changes, never as choreography. The site explicitly rejects the "AI-blog" category reflex: no neon gradients, no glassmorphism heroes, no hero metrics, no loud promises about a new AI era.

**Key Characteristics:**

- Cool-neutral surfaces: almost-grey, with chroma 0.003–0.006 and hue near 250°, reading as quiet contemporary infrastructure, not as paper or sepia.
- A single accent (deep midnight indigo) covers no more than 10% of any surface, used for links, the active nav state, the active locale, and focus rings.
- Two type voices: Source Serif 4 Variable on the display tier (h1, h2, wordmark, hero), the system humanist sans on body, navigation, captions, and h3 and below.
- Light is the default; dark is a self-contained scene with its own neutral anchor, not a mathematical inversion.
- Depth comes from thin borders and tonal layering of neutrals; shadows are almost never used.
- Mobile-first, with breakpoints placed where a line passes about 75ch rather than at the conventional 768/1024 px.

## 2. Colors: The Cool Slate Palette

The palette is *Restrained*: cool-neutral surfaces carry the page, and a single accent works only at points of interactivity. Concrete OKLCH values are committed in `src/styles/global.css`; this section describes the roles and the rules.

### Primary

- **Working Indigo** *(`oklch(38% 0.11 245)` light / `oklch(76% 0.10 245)` dark)*: the only accent. Used for links, focus rings, the active locale, the active nav border, and the underline that signals discoverable text. Never paints surfaces, never tints headings, never appears on more than 10% of any screen. The hue stays close to deep ink-blue rather than electric cobalt, so it reads "quiet and considered" rather than "AI-product cobalt".

### Neutral

- **Surface** *(`oklch(99% 0.003 250)` light / `oklch(15% 0.006 250)` dark)*: the page background. Cool-neutral, never `#fff` or `#000`. Carries a barely-perceptible cool undertone (chroma 0.003–0.006), so the surface looks contemporary rather than warm or printed.
- **Surface Sunken** *(`oklch(96% 0.004 250)` light / `oklch(20% 0.006 250)` dark)*: the "one step in" surface, used for inline code chips and code-block backgrounds. Half a step from the main surface, never enough to create an island.
- **Ink** *(`oklch(20% 0.006 250)` light / `oklch(93% 0.004 250)` dark)*: body text. Almost-black or almost-white, carrying the same micro-cool hue as the surface so the text and ground sit in the same family.
- **Margin Ink** *(`oklch(48% 0.006 250)` light / `oklch(65% 0.006 250)` dark)*: dimmed text (metadata, captions, timestamps, secondary links). Stepped in lightness to mark the second hierarchy level, while always kept above 4.5:1.
- **Rule** *(`oklch(90% 0.005 250)` light / `oklch(27% 0.006 250)` dark)*: thin dividers and borders. One step lighter than `Margin Ink`, never used as an "accent" or as decoration.

Each role is defined in both themes. Dark is not a reflection of light; it is a separate score with its own contrast anchors.

### Named Rules

**The One Voice Rule.** There is one accent. It covers no more than 10% of any screen. Its rarity is the point, so decorative tinting, colored panels, and brand-color background fills are **forbidden**.

**The Cool Neutral Rule.** Pure `#fff`, `#000`, and any warm-tinted neutral (warm beige, off-white with yellow undertone, sepia greys) are forbidden everywhere. Every neutral carries the same cool hue (around 250°) at chroma 0.003–0.006; without this discipline, the site starts reading as either a system panel (chroma 0) or a paper editorial (warm hue).

**The Two Scenes Rule.** Light and dark are two **different** physical scenes, not one inverted. Each has its own neutral anchor and its own corrected accent; contrast and legibility are verified separately in each.

**The Quiet Accent Rule.** The Working Indigo accent never paints headings, never tints backgrounds, never appears as a gradient. It is reserved for points of interactivity (links, focus, active locale, current nav). Underline thickness and placement carry more visual weight than the accent color itself.

## 3. Typography

**Display Font:** `Source Serif 4 Variable`, self-hosted via `@fontsource-variable/source-serif-4` (opsz axis subset). Used for h1, h2, the site wordmark, and the home hero, only. Source Serif 4 is a contemporary text serif by Adobe with a tight optical-size axis (`opsz`, 8–60), full Latin and Cyrillic coverage, and modern proportions that read as "considered" rather than "editorial-paper". It is paired with the cool-slate ground specifically because cool surfaces neutralize any leftover "warm book" undertone in serif metrics.

**Body / Interface Font:** the system humanist sans stack, identical for every other text role on every locale. The stack is `-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", "Liberation Sans", sans-serif`, plus Apple/Segoe emoji at the tail. On macOS this resolves to San Francisco; on Windows, Segoe UI; on Android, Roboto. All three are excellent humanist sans families with Cyrillic and most additional scripts through the OS fallback chain.

**Mono Font:** the system mono stack (`ui-monospace, SFMono-Regular, "JetBrains Mono", "Fira Code", Menlo, Monaco, Consolas, monospace`). Used only for inline code and code blocks. Never for interface typography, never for the wordmark, never for hero text.

**Character.** Source Serif on display, system sans on everything else. The serif appears only at moments that deserve it (page title, section heading, wordmark, hero); the rest of the site is set in the OS native sans, so reading is fast, locale coverage is automatic, and the serif lands as a real accent rather than as wallpaper. Hierarchy below the display tier lives in weight and size, not in another font swap.

### Hierarchy

- **Display** *(Source Serif 4 Variable, weight 500, opsz 60, `clamp(2rem, 4vw + 1rem, 3rem)`, line-height ~1.1, letter-spacing -0.018em)*: the article title, h1 on every page. One per page. The hero h1 on the home page goes one step heavier on opsz (96) and a touch larger.
- **Headline** *(Source Serif 4 Variable, weight 500, opsz 60, `clamp(1.5rem, 2vw + 1rem, 2rem)`, line-height ~1.2, letter-spacing -0.012em)*: h2 inside an article body and on list section headings.
- **Title** *(sans, 600, `1.25rem`, line-height ~1.3)*: h3, post-card headings, header widget titles.
- **Body** *(sans, 400, `1rem` to `1.0625rem`, line-height ~1.65, max-width **65–75ch**)*: the main text. The line-length cap is mandatory.
- **Label** *(sans, 500, `0.8125rem`, letter-spacing `0.02em`, *NOT* uppercase)*: post metadata, tags, breadcrumbs. Uppercase is **forbidden**; it shouts too loudly for a quiet voice.

### Named Rules

**The Two Voices Rule.** The site uses exactly two type families: a serif (Source Serif 4) for the display tier, and the system sans for everything else. Adding a third family is forbidden. The display serif paints under 5% of any screen by area; the rest is sans.

**The Multilingual Equality Rule.** Source Serif 4 covers Latin, Cyrillic, Greek, and Vietnamese. For locales whose script is outside this subset (Arabic, Hindi, Chinese, Bengali), display headings render in the body sans through `:lang()` overrides. This is not "under-design", it is respect for the script: a single good system sans beats a forced fallback that fakes a serif.

**The Line Length Rule.** The article body is always capped between `65ch` and `75ch`. On wide screens, expanding the column past that limit is forbidden. Line length is the only layout limiter on desktop.

**The No-Caps Label Rule.** No `text-transform: uppercase` in the interface. Uppercase reads as decoration and breaks "design recedes".

**The No-Italic-Body Rule.** Italic is reserved for genuine semantic cases (terms, citations, foreign words). Italic-as-mood styling is forbidden.

## 4. Elevation

The system is **flat by default**. Depth is not signaled by shadows; it is signaled by thin borders (the `Rule` color, 1px) and a half-step shift in neutral (tonal layering). A shadow appears in exactly one place for exactly one job: a soft ambient under the locale-switcher dropdown menu, when and if a custom dropdown ever replaces the native `<select>`. There is no second elevation tier, no floating cards, no glassmorphism panels.

### Shadow Vocabulary

- **Ambient-Drop** *(precise `box-shadow` declared in tokens as `--shadow-ambient`)*: the only permitted shadow. Very soft, low chroma, low opacity. Reserved for any future custom popover surface; the native `<select>` element does not need it.

### Named Rules

**The Flat-By-Default Rule.** All surfaces are flat at rest. A shadow is permitted only on a single component, and only in its open state. Any attempt to add a shadow for a "card" or a "section" is a violation.

**The Border Over Shadow Rule.** When a block boundary needs to be visible, draw a hairline `1px solid Rule`. A shadow **never** does this job.

## 5. Components

*Documented inline in `src/styles/global.css`.* The implemented set so far covers: the site header (wordmark + nav + theme toggle + language switcher), the site footer, the post page (article column at `var(--measure)`, post meta strip, related posts, post-footer), the post card (used on home and on the posts list), the tag list (count column in tabular numerals), the skip-link, and native form controls. Code blocks (fenced markdown) are rendered by `astro-expressive-code`, which owns its own frame, the dual-theme switching (driven by `[data-theme="dark"]`, not by `prefers-color-scheme`), and the copy-button affordance. New components must derive from the rules above before being added: cool neutrals, the two-voice typography hierarchy, flat-by-default elevation, and Restrained motion.

## 6. Do's and Don'ts

### Do:

- **Do** keep the Working Indigo accent on no more than 10% of any screen. If you catch yourself thinking "let's color the heading", stop.
- **Do** cap the body line between `65ch` and `75ch` on every screen, including wide desktop.
- **Do** use cool-neutral tints (`oklch` chroma 0.003–0.006, hue ~250°) wherever you would otherwise reach for white or black.
- **Do** design the dark theme as a self-contained scene with its own anchor, not as an inversion of light.
- **Do** keep the whole site in one sans family. New text styles change weight or size, never the family.
- **Do** honor `prefers-reduced-motion` by collapsing every transition to zero or near zero.
- **Do** signal hierarchy through type weight and size; use thin `Rule` 1px hairlines for separation.
- **Do** place layout breakpoints by content (the moment a line crosses 75ch), not at the conventional 768 / 1024 px.
- **Do** build mobile-first: start with the narrow column, then layer wider layouts on top.

### Don't:

- **Don't** reproduce the **AI-blog template**: neon gradients, glassmorphism hero, oversized hero metric, promises of "a new AI era". This is the category reflex the site explicitly rejects.
- **Don't** drift into a **warm paper aesthetic**: yellow-tinted off-white, sepia neutrals, editorial-book serif headings. The earlier seed of this design tried that direction and it read as dated and yellowy.
- **Don't** copy the **Medium / Substack template**: identical post cards topped with a generic illustration, pull-quote blocks with quotation-mark art, intrusive subscription CTAs.
- **Don't** drift into a **dev-portfolio Vercel / Linear clone**: dark by default, oversized hero stats, signature gradient rings, heavy motion.
- **Don't** chase a **hacker terminal aesthetic**: monospace across the interface, ASCII borders, blinking cursors. Mono is for code only.
- **Don't** add **heavy treatments**: bold dark slabs, dense full-width colored panels, illustration for illustration's sake, icons everywhere.
- **Don't** insert **decorative imagery**. Ideally there are no images at all; if any appear, they are substantive (a diagram, a code screenshot, with a meaningful `alt`).
- **Don't** use `#fff` or `#000`. Ever. Every neutral is cool-tinted.
- **Don't** use any serif other than Source Serif 4 Variable, and only at the display tier (h1, h2, wordmark, hero). No Georgia, no editorial italic body, no decorative serif for tags or buttons.
- **Don't** paint backgrounds, panels, headings, or any large area in the accent. The accent works only at rare interactive points.
- **Don't** apply `text-transform: uppercase` to labels or interface typography.
- **Don't** use `border-left` or `border-right` thicker than 1px as a colored stripe on cards, list items, or callouts. Never intentional; rewrite with a different structure.
- **Don't** combine `background-clip: text` with a gradient. Emphasis is delivered by weight and size.
- **Don't** make glassmorphism the default. Backdrop blurs and glass panels are **forbidden** in this project.
- **Don't** build the layout from identical card grids (icon plus heading plus text, repeated like a chorus). That is an AI-slop marker.
- **Don't** pull in UI libraries, Tailwind, or component kits. Only plain CSS, CSS custom properties, Astro `<style>` blocks, and Solid islands where interactivity is genuinely needed.
- **Don't** put shadows on "cards", "sections", or "hero" blocks. Flat-By-Default is the law.
- **Don't** animate CSS layout properties. If a transition isn't required, don't add one; if it is, transition `transform` or `opacity`.
- **Don't** use the em dash (`—`) or `--` in project copy. Use commas, colons, semicolons, periods, or parentheses.
