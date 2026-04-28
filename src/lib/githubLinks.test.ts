import { describe, expect, test } from "bun:test";
import { resolvePrUrl } from "./githubLinks";

describe("githubLinks", () => {
  test("resolvePrUrl builds correct PR URL", () => {
    expect(resolvePrUrl(42)).toBe("https://github.com/itechmeat/techmeat.dev/pull/42");
  });
});
