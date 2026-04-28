# Product

## Register

brand

## Users

Engineers and developers who already work with AI coding agents (or are about to) and want to see how a single person actually does it on a real project, with proper specs and without the hype. Traffic comes mostly from social and search; a typical session is one long-form article, often read in the evening from a laptop or on the go from a phone. The reader's goal is to leave with one concrete technique, prompt, or workflow they can reproduce tomorrow. The archive matters more than the feed: articles are written to be revisited, cited, and bookmarked, not consumed once and forgotten.

## Product Purpose

techmeat.dev is the author's working journal on the engineering practice of AI coding: how to brief agents, which specs and prompts hold up, where the line sits between human judgement and agent execution. It is a **brand surface**: the publication itself is the product, and the design represents the author as an engineer. Success is measured by quality, not volume: a small body of articles that are read end-to-end, discussed, and shared. The site should feel like a place readers come back to, not a feed and not a portfolio.

## Brand Personality

Three words: **methodical · candid · light**.

- **Methodical.** The author is an AI enthusiast who treats AI as a configurable part of the development process, the opposite of vibe coding. Respect for specs, clean code, and repeatable patterns. The voice is engineering: confident without bragging, no "revolution in software", no inflated claims.
- **Candid.** Show the work honestly, including the moments where the agent got it wrong, or where the problem statement was not precise enough. No marketing gloss.
- **Light.** No heaviness, visual or tonal. Air, calm rhythm, no pressure on the reader. The text needs room to breathe.

The emotional goal is **trust and focus**. The reader should never catch themselves thinking "nice design"; they should quietly finish the article.

## Anti-references

- **The AI-blog template.** Neon gradients, glassmorphism hero, oversized hero metric, promises of "a new AI era". This is the category reflex the site explicitly rejects.
- **The Medium / Substack look.** Identical article cards topped with a generic illustration, pull-quote blocks with quotation-mark art, intrusive subscription CTAs.
- **The dev-portfolio Vercel / Linear clone.** Dark-by-default, oversized hero stats, signature gradient rings, heavy motion, layered effects done because "the big ones do it".
- **Hacker terminal aesthetic.** Monospace everywhere, ASCII borders, blinking cursors. That is the aesthetic of someone showing off, not of someone working methodically.
- **Any "heavy" treatment.** Bold dark background slabs, dense full-width colored panels, illustration for illustration's sake, icons everywhere. The site must always read as light and airy.
- **Decorative imagery as a substitute for structure.** Ideally there are no images at all; if any appear, they are substantive (a diagram, a code screenshot). No stock photography, no AI illustrations used to set a mood.

## Design Principles

1. **Design recedes.** If the reader notices the design, the design has failed. The goal is organic presentation: visuals so calm they never compete with the text for attention. No wow moments.
2. **Craft shows in the details, not in effects.** Quality lives in type scales, spacing rhythm, correct line lengths, deliberate margins, and the consistency of the dark and light themes. This is the "invisible plumbing" the author values from a long frontend background.
3. **Hand-built, no libraries.** Tailwind, UI kits, and component libraries are explicitly off the table. Plain CSS, CSS variables, Astro `<style>` blocks, and Solid islands where interactivity is genuinely needed. This is part of the author's stance: specs and clean code beat shortcuts.
4. **Lightness is a commitment.** Air over density. Thin borders, soft surfaces, restrained colors, a small palette. When the choice is between "louder" and "quieter", quieter wins.
5. **Multilingual typography is first-class.** Latin, Cyrillic, Arabic (RTL), Devanagari, Bengali, and CJK must all look right. The font stack is selected for every language in the site, not optimized for English. RTL is a fully-supported layout mode, not a checkbox.

## Accessibility & Inclusion

- **Target level: WCAG 2.2 AA.** Contrast ≥ 4.5:1 for body text, ≥ 3:1 for large text, in both themes.
- **Color is never the sole carrier of meaning.** Link states, visited links, the current nav item, and the active locale are always reinforced by a second cue: underline, weight, or icon.
- **`prefers-reduced-motion` is honored.** All transitions and animations are disabled or reduced to a minimum. Motion is used sparingly to begin with.
- **Full RTL for Arabic.** Layout mirroring, correct `start`/`end` properties, careful punctuation, direction-aware iconography. Not "set `dir="rtl"` and call it done".
- **Mobile-first.** The narrow column for phones is the starting point; wider layouts are layered on top. Breakpoints follow the content (for example, the point where a line passes 75ch) rather than fixed 768/1024 defaults.
- **Keyboard navigation.** A visible but non-aggressive focus state, a correct tab order, and a skip-link to main content at the top of every page.
- **Multi-script font stack.** System fallbacks must render every one of the ten locales legibly. Web fonts are added only where they materially improve a script, and always with `font-display: swap` so they never block render.
- **Imagery.** Every substantive image carries a meaningful `alt`. By the anti-reference rule above, decorative imagery should not exist in the project.
