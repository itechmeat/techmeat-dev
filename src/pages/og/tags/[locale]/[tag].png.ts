import type { APIContext } from "astro";
import { getCollection } from "astro:content";
import satori from "satori";
import { Resvg } from "@resvg/resvg-js";
import { tagLabel } from "../../../../i18n/tags";
import type { Locale } from "../../../../i18n/config";
import { loadOgFonts } from "../../../../lib/ogFont";
import { isVisiblePost } from "../../../../lib/postVisibility";

export async function getStaticPaths() {
  const all = await getCollection("posts", ({ data }) => isVisiblePost(data));
  const tagsByLocale = new Map<Locale, Set<string>>();
  for (const entry of all) {
    const locale = entry.data.locale;
    const set = tagsByLocale.get(locale) ?? new Set();
    for (const tag of entry.data.tags) set.add(tag);
    tagsByLocale.set(locale, set);
  }
  const out: { params: { locale: Locale; tag: string } }[] = [];
  for (const [locale, tags] of tagsByLocale) {
    for (const tag of tags) out.push({ params: { locale, tag } });
  }
  return out;
}

export async function GET(context: APIContext) {
  const locale = context.params.locale as Locale;
  const tag = context.params.tag as string;
  const label = `#${tagLabel(tag, locale)}`;
  const fontDatas = await loadOgFonts();

  const element = {
    type: "div",
    props: {
      style: {
        width: "1200px",
        height: "630px",
        background: "#0a0a0a",
        color: "#fafafa",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        fontFamily: "Inter",
      },
      children: [
        {
          type: "div",
          props: {
            style: { fontSize: "120px", fontWeight: 700 },
            children: label,
          },
        },
        {
          type: "div",
          props: {
            style: { fontSize: "32px", color: "#888", marginTop: "20px" },
            children: "techmeat.dev",
          },
        },
      ],
    },
  };

  const svg = await satori(element as any, {
    width: 1200,
    height: 630,
    fonts: fontDatas.map((data) => ({
      name: "Inter",
      data,
      weight: 700 as const,
      style: "normal" as const,
    })),
  });

  const png = new Resvg(svg).render().asPng();
  return new Response(new Uint8Array(png), {
    headers: { "Content-Type": "image/png" },
  });
}
