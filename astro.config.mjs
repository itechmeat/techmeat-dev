// @ts-check
import { defineConfig } from "astro/config";
import solid from "@astrojs/solid-js";
import sitemap from "@astrojs/sitemap";
import AstroPWA from "@vite-pwa/astro";

// https://astro.build/config
export default defineConfig({
  site: "https://techmeat.dev",
  integrations: [
    solid(),
    sitemap({
      i18n: {
        defaultLocale: "en",
        locales: {
          en: "en-US",
          es: "es-ES",
          fr: "fr-FR",
          de: "de-DE",
          pt: "pt-BR",
          ru: "ru-RU",
          ar: "ar",
          hi: "hi-IN",
          zh: "zh-CN",
          bn: "bn-BD",
        },
      },
    }),
    AstroPWA({
      registerType: "autoUpdate",
      manifest: {
        name: "techmeat.dev",
        short_name: "techmeat.dev",
        description: "Building real projects with AI-assisted coding.",
        theme_color: "#0a0a0a",
        background_color: "#0a0a0a",
        display: "standalone",
        start_url: "/",
        icons: [
          // v1 placeholders — design phase ships real PNGs at 192/512/maskable.
          { src: "/favicon.svg", sizes: "any", type: "image/svg+xml", purpose: "any" },
        ],
      },
      workbox: {
        globPatterns: ["**/*.{js,css,html,svg,png,ico,woff2}"],
        runtimeCaching: [
          {
            urlPattern: ({ request }) => request.destination === "document",
            handler: "StaleWhileRevalidate",
            options: { cacheName: "html-pages" },
          },
        ],
        navigateFallback: "/offline.html",
        navigateFallbackDenylist: [/^\/og\//, /^\/api\//],
      },
    }),
  ],
  i18n: {
    defaultLocale: "en",
    locales: ["en", "es", "fr", "de", "pt", "ru", "ar", "hi", "zh", "bn"],
    routing: {
      prefixDefaultLocale: false,
      redirectToDefaultLocale: false,
    },
  },
});
