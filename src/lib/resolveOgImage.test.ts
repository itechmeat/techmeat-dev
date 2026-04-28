import { describe, expect, test } from "bun:test";
import { resolveOgImage } from "./resolveOgImage";

describe("resolveOgImage", () => {
  test("returns frontmatter ogImage when set", () => {
    expect(
      resolveOgImage({ kind: "post", locale: "en", slug: "x", ogImage: "/uploads/cover.png" }),
    ).toBe("/uploads/cover.png");
  });

  test("returns auto-generated path for posts without override", () => {
    expect(resolveOgImage({ kind: "post", locale: "ru", slug: "hello" })).toBe(
      "/og/posts/ru/hello.png",
    );
  });

  test("returns auto-generated path for tags", () => {
    expect(resolveOgImage({ kind: "tag", locale: "en", tag: "astro" })).toBe(
      "/og/tags/en/astro.png",
    );
  });

  test("falls back to site-wide default", () => {
    expect(resolveOgImage({ kind: "page" })).toBe("/og/default.png");
  });
});
