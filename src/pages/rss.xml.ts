import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
import type { APIContext } from "astro";
import { defaultLocale } from "../i18n/config";
import { t } from "../i18n/t";
import { isVisiblePost } from "../lib/postVisibility";
import { resolveSite } from "../lib/site";

export async function GET(context: APIContext) {
  const locale = defaultLocale;
  const posts = await getCollection(
    "posts",
    ({ data }) => data.locale === locale && isVisiblePost(data),
  );
  return rss({
    title: "techmeat.dev",
    description: t("home.metaDescription", locale),
    site: resolveSite(context.site).toString(),
    items: posts
      .sort((a, b) => b.data.pubDate.getTime() - a.data.pubDate.getTime())
      .map((post) => ({
        title: post.data.title,
        description: post.data.description,
        pubDate: post.data.pubDate,
        link: `/posts/${post.id.split("/")[0]}`,
      })),
  });
}
