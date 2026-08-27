// src/lib/webmcp/manifest.ts
//
// Pure data shaping for the WebMCP manifest (src/pages/webmcp/manifest.json.ts).
// Kept separate from the Astro endpoint so the URL-derivation rules can be
// exercised without spinning up the content collection loader.

import { defaultLocale, locales, type Locale } from "../../i18n/config";
import { AUTHOR, SITE_NAME, SITE_URL } from "../site";

export interface WebMcpManifestPost {
  slug: string;
  locale: Locale;
  title: string;
  description: string;
  tags: string[];
  pubDate: string;
  updatedDate: string | null;
  /** Locale-correct URL of the HTML page. */
  url: string;
  /** Always the English URL of the same article, per the site's canonical policy. */
  canonicalUrl: string;
  /** Locale-correct URL of the plain-Markdown alternate. */
  markdownUrl: string;
}

export interface WebMcpManifestSite {
  name: string;
  url: string;
  author: string;
  description: string;
  defaultLanguage: Locale;
  languages: readonly Locale[];
  feeds: { rss: string; sitemap: string; llms: string };
  aiPolicy: {
    indexing: string;
    citation: string;
    training: string;
    derivativeWorks: string;
  };
}

export interface WebMcpManifest {
  $schema_note: string;
  generated: string;
  site: WebMcpManifestSite;
  posts: WebMcpManifestPost[];
}

export interface ManifestPostInput {
  slug: string;
  locale: Locale;
  title: string;
  description: string;
  tags: string[];
  pubDate: Date;
  updatedDate?: Date;
}

function isoDate(date: Date): string {
  return date.toISOString().slice(0, 10);
}

function postPageUrl(slug: string, locale: Locale): string {
  return locale === defaultLocale
    ? `${SITE_URL}/posts/${slug}`
    : `${SITE_URL}/${locale}/posts/${slug}`;
}

function postMarkdownUrl(slug: string, locale: Locale): string {
  return locale === defaultLocale
    ? `${SITE_URL}/posts/${slug}.md`
    : `${SITE_URL}/${locale}/posts/${slug}.md`;
}

// Mirrors public/ai/summary.json's "ai_policy" block. Keep the two in sync —
// they describe the same policy for two different audiences (JSON-LD-style
// discovery document vs. WebMCP tool manifest).
export const AI_POLICY: WebMcpManifestSite["aiPolicy"] = {
  indexing: "allowed",
  citation: "required",
  training: "allowed",
  derivativeWorks: "allowed-with-attribution",
};

export function buildManifestSite(): WebMcpManifestSite {
  return {
    name: SITE_NAME,
    url: SITE_URL,
    author: AUTHOR.name,
    description:
      "A working journal on the engineering practice of AI-assisted coding: how to brief agents, which specs and prompts hold up, and where the line sits between human judgment and agent execution.",
    defaultLanguage: defaultLocale,
    languages: locales,
    feeds: {
      rss: `${SITE_URL}/rss.xml`,
      sitemap: `${SITE_URL}/sitemap-index.xml`,
      llms: `${SITE_URL}/llms.txt`,
    },
    aiPolicy: AI_POLICY,
  };
}

export function buildManifestPost(input: ManifestPostInput): WebMcpManifestPost {
  return {
    slug: input.slug,
    locale: input.locale,
    title: input.title,
    description: input.description,
    tags: input.tags,
    pubDate: isoDate(input.pubDate),
    updatedDate: input.updatedDate ? isoDate(input.updatedDate) : null,
    url: postPageUrl(input.slug, input.locale),
    canonicalUrl: postPageUrl(input.slug, defaultLocale),
    markdownUrl: postMarkdownUrl(input.slug, input.locale),
  };
}

export function buildManifest(posts: ManifestPostInput[]): WebMcpManifest {
  return {
    $schema_note: "WebMCP tool data source for techmeat.dev",
    generated: new Date().toISOString(),
    site: buildManifestSite(),
    posts: posts
      .slice()
      .sort((a, b) => b.pubDate.getTime() - a.pubDate.getTime())
      .map(buildManifestPost),
  };
}
