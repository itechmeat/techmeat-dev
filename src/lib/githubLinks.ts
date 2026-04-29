const REPO = "itechmeat/techmeat-dev";

export function resolvePrUrl(prNumber: number, fileId?: string): string {
  const base = `https://github.com/${REPO}/pull/${prNumber}`;
  return fileId ? `${base}/changes#diff-${fileId}` : base;
}
