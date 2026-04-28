import { describe, expect, test } from "bun:test";
import { relatedPosts, type RelatedCandidate } from "./relatedPosts";

const candidates: RelatedCandidate[] = [
  { slug: "a", tags: ["x", "y"], pubDate: new Date("2026-01-01") },
  { slug: "b", tags: ["x"], pubDate: new Date("2026-02-01") },
  { slug: "c", tags: ["y", "z"], pubDate: new Date("2026-03-01") },
  { slug: "d", tags: ["q"], pubDate: new Date("2026-04-01") },
];

describe("relatedPosts", () => {
  test("returns up to N candidates ranked by tag overlap", () => {
    const out = relatedPosts({ slug: "self", tags: ["x", "y"] }, candidates, 3);
    expect(out.map((p) => p.slug)).toEqual(["a", "c", "b"]);
  });

  test("excludes the post itself", () => {
    const out = relatedPosts({ slug: "a", tags: ["x", "y"] }, candidates, 3);
    expect(out.find((p) => p.slug === "a")).toBeUndefined();
  });

  test("returns empty array when no overlap exists", () => {
    const out = relatedPosts({ slug: "self", tags: ["unique"] }, candidates, 3);
    expect(out).toEqual([]);
  });

  test("ties broken by recency", () => {
    const sameTags: RelatedCandidate[] = [
      { slug: "old", tags: ["x"], pubDate: new Date("2026-01-01") },
      { slug: "new", tags: ["x"], pubDate: new Date("2026-04-01") },
    ];
    const out = relatedPosts({ slug: "self", tags: ["x"] }, sameTags, 2);
    expect(out.map((p) => p.slug)).toEqual(["new", "old"]);
  });
});
