import type { APIContext } from "astro";
import { getCollection, type CollectionEntry } from "astro:content";
import { defaultLocale } from "../../i18n/config";
import { isVisiblePost } from "../../lib/postVisibility";
import { renderPostMarkdown } from "../../lib/webmcp/postMarkdown";

export async function getStaticPaths() {
  const all = await getCollection(
    "posts",
    ({ data }) => data.locale === defaultLocale && isVisiblePost(data),
  );
  return all.map((entry) => ({
    params: { slug: entry.id.split("/")[0] },
    props: { entry },
  }));
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
