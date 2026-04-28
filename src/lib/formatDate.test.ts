import { describe, expect, test } from "bun:test";
import { formatDate } from "./formatDate";

describe("formatDate", () => {
  test("formats English date in long form", () => {
    const out = formatDate(new Date("2026-04-28T00:00:00Z"), "en");
    expect(out).toMatch(/April 28, 2026/);
  });

  test("formats Russian date in long form", () => {
    const out = formatDate(new Date("2026-04-28T00:00:00Z"), "ru");
    expect(out).toMatch(/28 апреля 2026/);
  });
});
