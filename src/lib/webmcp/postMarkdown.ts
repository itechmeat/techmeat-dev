// src/lib/webmcp/postMarkdown.ts
//
// Renders the plain-Markdown alternate for a post entry: a small front-block
// (metadata an agent needs before deciding whether to read the body) followed
// by the raw Markdown body, unprocessed by Astro's renderer. Served by
// src/pages/posts/[slug].md.ts and src/pages/[locale]/posts/[slug].md.ts.

import type { CollectionEntry } from "astro:content";
import { SITE_URL } from "../site";

function isoDate(date: Date): string {
  return date.toISOString().slice(0, 10);
}

export function renderPostMarkdown(entry: CollectionEntry<"posts">, slug: string): string {
  const { title, description, pubDate, updatedDate, tags, locale } = entry.data;
  const canonicalUrl = `${SITE_URL}/posts/${slug}`;

  const frontBlock = [
    "---",
    `title: ${title}`,
    `description: ${description}`,
    `canonical_url: ${canonicalUrl}`,
    `date: ${isoDate(pubDate)}`,
    ...(updatedDate ? [`updated: ${isoDate(updatedDate)}`] : []),
    `tags: ${tags.join(", ")}`,
    `language: ${locale}`,
    "---",
    "",
  ].join("\n");

  return `${frontBlock}\n${entry.body ?? ""}`;
}
