import { describe, expect, test } from "bun:test";
import { readingTime } from "./readingTime";

describe("readingTime", () => {
  test("returns 1 minute for short text", () => {
    expect(readingTime("hello world")).toBe(1);
  });

  test("computes minutes at ~225 wpm rounded up", () => {
    const text = "word ".repeat(450); // 450 words → 2 min
    expect(readingTime(text)).toBe(2);
  });

  test("rounds up partial minutes", () => {
    const text = "word ".repeat(300); // 300 / 225 = 1.33 → 2
    expect(readingTime(text)).toBe(2);
  });
});
