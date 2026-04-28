import type { Locale } from "./config";

const labels: Record<string, Partial<Record<Locale, string>>> = {
  "ai-coding": {
    en: "AI coding",
    es: "codificación con IA",
    fr: "codage IA",
    de: "KI-Coding",
    pt: "codificação com IA",
    ru: "AI-кодинг",
    ar: "البرمجة بالذكاء الاصطناعي",
    hi: "AI कोडिंग",
    zh: "AI 编码",
    bn: "AI কোডিং",
  },
  astro: {
    en: "Astro",
    es: "Astro",
    fr: "Astro",
    de: "Astro",
    pt: "Astro",
    ru: "Astro",
    ar: "Astro",
    hi: "Astro",
    zh: "Astro",
    bn: "Astro",
  },
  bun: {
    en: "Bun",
    es: "Bun",
    fr: "Bun",
    de: "Bun",
    pt: "Bun",
    ru: "Bun",
    ar: "Bun",
    hi: "Bun",
    zh: "Bun",
    bn: "Bun",
  },
  // Add more tags as posts introduce them.
};

export function tagLabel(slug: string, locale: Locale): string {
  return labels[slug]?.[locale] ?? labels[slug]?.en ?? toTitle(slug);
}

function toTitle(slug: string): string {
  return slug
    .split("-")
    .map((p) => p.charAt(0).toUpperCase() + p.slice(1))
    .join(" ");
}
