import { defineCollection } from "astro:content";
import { z } from "astro/zod";
import { glob } from "astro/loaders";
import { locales } from "./i18n/config";

const posts = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/posts" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    tags: z.array(z.string()).default([]),
    prNumber: z.number().int().positive().optional(),
    prFileId: z.string().min(1).optional(),
    ogImage: z.string().optional(),
    draft: z.boolean().default(false),
    locale: z.enum(locales),
  }),
});

export const collections = { posts };
