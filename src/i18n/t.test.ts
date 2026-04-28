import { describe, expect, test } from "bun:test";
import { t } from "./t";

describe("t()", () => {
  test("returns English string for known key", () => {
    expect(t("nav.posts", "en")).toBe("Posts");
  });

  test("returns Russian string for known key", () => {
    expect(t("nav.posts", "ru")).toBe("Посты");
  });

  test("falls back to English when locale dictionary lacks key", () => {
    // simulate by asking for a key that only exists in 'en' dictionary
    expect(t("__only_en_test_key", "ru")).toBe("only-en-test-fallback");
  });

  test("returns the key itself when missing in all dictionaries", () => {
    expect(t("totally.missing.key", "en")).toBe("totally.missing.key");
  });

  test("substitutes a placeholder with the provided param", () => {
    expect(t("post.readingTime", "en", { min: 5 })).toBe("5 min read");
  });

  test("preserves the placeholder literal when its param is missing", () => {
    expect(t("post.readingTime", "en", { other: 1 })).toBe("{min} min read");
  });
});
