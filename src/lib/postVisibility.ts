export function isVisiblePost(data: { draft?: boolean }): boolean {
  return import.meta.env.DEV || !data.draft;
}
