import type { APIContext } from "astro";
import { getCollection } from "astro:content";
import satori from "satori";
import { Resvg } from "@resvg/resvg-js";
import { loadOgFonts } from "../../../../lib/ogFont";
import { isVisiblePost } from "../../../../lib/postVisibility";

export async function getStaticPaths() {
  const all = await getCollection("posts", ({ data }) => isVisiblePost(data));
  return all.map((entry) => ({
    params: {
      locale: entry.data.locale,
      slug: entry.id.split("/")[0],
    },
    props: { title: entry.data.title },
  }));
}

interface Props {
  title: string;
}

export async function GET(context: APIContext) {
  const { title } = context.props as Props;
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
        justifyContent: "space-between",
        padding: "80px",
        fontFamily: "Inter",
      },
      children: [
        {
          type: "div",
          props: {
            style: { fontSize: "32px", color: "#888" },
            children: "techmeat.dev",
          },
        },
        {
          type: "div",
          props: {
            style: { fontSize: "72px", lineHeight: 1.1, fontWeight: 700 },
            children: title,
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
