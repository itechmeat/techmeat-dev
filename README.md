# techmeat.dev

Personal blog about building real projects with AI-assisted coding. The site is static, multilingual, and built for publishing articles as Markdown content.

## Stack

- Astro 6 with static output
- Solid.js islands for interactive controls
- Bun for package management and scripts
- Cloudflare Pages for hosting
- Astro content collections for posts
- RSS, sitemap, generated Open Graph images, JSON-LD, and PWA support

## Development

Install dependencies with Bun:

```sh
bun install
```

Run the local dev server:

```sh
bun run dev
```

Useful checks:

```sh
bun test
bun run lint
bun run fmt:check
bun run typecheck
bun run build
```

## Content

Posts live in [src/content/posts](src/content/posts). Each post has one folder per slug and one Markdown file per locale, for example `index.en.md` and `index.ru.md`.

English is the canonical language. Translated article pages must point their canonical URL to the English version of the same article.

## Deployment

Cloudflare Pages builds the site with:

```sh
bun run build
```

The production output directory is [dist](dist). Set `PUBLIC_CF_ANALYTICS_TOKEN` in Cloudflare Pages to enable Cloudflare Web Analytics. Leave it unset locally to skip the analytics beacon.
