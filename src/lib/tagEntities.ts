// src/lib/tagEntities.ts
//
// Mapping from a post tag slug to a Knowledge Graph entity, used to populate
// `Article.about` in JSON-LD. The `sameAs` URLs anchor the topic to a
// canonical entity (Wikipedia + Wikidata when both exist, Wikidata-only for
// topics without a Wikipedia article yet) so AI engines and search engines
// can disambiguate the subject of the article.
//
// Tags that are organisational rather than topical (e.g. "meta" — posts
// about the blog itself) are intentionally absent. They have no canonical
// entity to map to, and inventing one would be an SEO-anti-pattern.

export interface TagEntity {
  name: string;
  sameAs: string[];
}

export const tagEntities: Record<string, TagEntity> = {
  "ai-coding": {
    name: "AI-assisted software development",
    sameAs: [
      "https://en.wikipedia.org/wiki/AI-assisted_software_development",
      "https://www.wikidata.org/wiki/Q135423070",
    ],
  },
  astro: {
    name: "Astro (web framework)",
    sameAs: ["https://www.wikidata.org/wiki/Q114769542"],
  },
  bun: {
    name: "Bun (JavaScript runtime)",
    sameAs: [
      "https://en.wikipedia.org/wiki/Bun_(software)",
      "https://www.wikidata.org/wiki/Q113048518",
    ],
  },
};

export function tagAbout(tag: string): TagEntity | null {
  return tagEntities[tag] ?? null;
}

export function tagsToAboutThings(tags: readonly string[]): Array<{
  "@type": "Thing";
  name: string;
  sameAs: string[];
}> {
  return tags.flatMap((tag) => {
    const entity = tagAbout(tag);
    if (!entity) return [];
    return [{ "@type": "Thing" as const, name: entity.name, sameAs: entity.sameAs }];
  });
}
