import type { Locale } from "../i18n/config";

export type OgInput =
  | { kind: "post"; locale: Locale; slug: string; ogImage?: string }
  | { kind: "tag"; locale: Locale; tag: string; ogImage?: string }
  | { kind: "page"; ogImage?: string };

export function resolveOgImage(input: OgInput): string {
  if ("ogImage" in input && input.ogImage) return input.ogImage;
  if (input.kind === "post") return `/og/posts/${input.locale}/${input.slug}.png`;
  if (input.kind === "tag") return `/og/tags/${input.locale}/${input.tag}.png`;
  return "/posters/og/pages/home.png";
}
