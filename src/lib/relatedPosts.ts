export interface RelatedCandidate {
  slug: string;
  tags: string[];
  pubDate: Date;
}

interface SourcePost {
  slug: string;
  tags: string[];
}

export function relatedPosts(
  source: SourcePost,
  candidates: RelatedCandidate[],
  limit: number,
): RelatedCandidate[] {
  const sourceTags = new Set(source.tags);

  const scored = candidates
    .filter((c) => c.slug !== source.slug)
    .map((c) => ({
      candidate: c,
      overlap: c.tags.filter((t) => sourceTags.has(t)).length,
    }))
    .filter((x) => x.overlap > 0);

  scored.sort((a, b) => {
    if (b.overlap !== a.overlap) return b.overlap - a.overlap;
    return b.candidate.pubDate.getTime() - a.candidate.pubDate.getTime();
  });

  return scored.slice(0, limit).map((x) => x.candidate);
}
