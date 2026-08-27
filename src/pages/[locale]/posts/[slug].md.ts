import type { APIContext } from "astro";
import { getCollection, type CollectionEntry } from "astro:content";
import { locales, defaultLocale, type Locale } from "../../../i18n/config";
import { isVisiblePost } from "../../../lib/postVisibility";
import { renderPostMarkdown } from "../../../lib/webmcp/postMarkdown";

export async function getStaticPaths() {
  const nonDefault = locales.filter((l) => l !== defaultLocale);
  const out: {
    params: { locale: Locale; slug: string };
    props: { entry: CollectionEntry<"posts"> };
  }[] = [];
  for (const locale of nonDefault) {
    const all = await getCollection(
      "posts",
      ({ data }) => data.locale === locale && isVisiblePost(data),
    );
    for (const entry of all) {
      out.push({ params: { locale, slug: entry.id.split("/")[0] }, props: { entry } });
    }
  }
  return out;
}

interface Props {
  entry: CollectionEntry<"posts">;
}

export async function GET(context: APIContext) {
  const { entry } = context.props as Props;
  const slug = entry.id.split("/")[0];
  return new Response(renderPostMarkdown(entry, slug), {
    headers: { "Content-Type": "text/markdown; charset=utf-8" },
  });
}
