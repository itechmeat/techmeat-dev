const REPO = "itechmeat/techmeat.dev";

export function resolvePrUrl(prNumber: number): string {
  return `https://github.com/${REPO}/pull/${prNumber}`;
}
