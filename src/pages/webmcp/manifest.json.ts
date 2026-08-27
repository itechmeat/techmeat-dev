import { getCollection } from "astro:content";
import { isVisiblePost } from "../../lib/postVisibility";
import { buildManifest } from "../../lib/webmcp/manifest";

export async function GET() {
  const posts = await getCollection("posts", ({ data }) => isVisiblePost(data));
  const manifest = buildManifest(
    posts.map((entry) => ({
      slug: entry.id.split("/")[0],
      locale: entry.data.locale,
      title: entry.data.title,
      description: entry.data.description,
      tags: entry.data.tags,
      pubDate: entry.data.pubDate,
      updatedDate: entry.data.updatedDate,
    })),
  );
  return new Response(JSON.stringify(manifest, null, 2), {
    headers: { "Content-Type": "application/json" },
  });
}
