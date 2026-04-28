// @ts-check
import { defineConfig } from "astro/config";
import solid from "@astrojs/solid-js";
import sitemap from "@astrojs/sitemap";
import AstroPWA from "@vite-pwa/astro";
import expressiveCode from "astro-expressive-code";
import rehypeExternalLinks from "rehype-external-links";

// https://astro.build/config
export default defineConfig({
  site: "https://techmeat.dev",
  markdown: {
    rehypePlugins: [
      [
        rehypeExternalLinks,
        {
          target: "_blank",
          rel: ["noopener", "noreferrer"],
          protocols: ["http", "https", "mailto"],
        },
      ],
    ],
  },
  integrations: [
    expressiveCode({
      themes: ["github-light", "github-dark-dimmed"],
      themeCssRoot: ":root",
      themeCssSelector: (theme) =>
        theme.name === "github-dark-dimmed"
          ? '[data-theme="dark"]'
          : ':root:not([data-theme="dark"])',
      useDarkModeMediaQuery: false,
      defaultProps: {
        wrap: true,
      },
      styleOverrides: {
        borderRadius: "var(--radius-md)",
        borderWidth: "var(--rule-width)",
        codeFontFamily: "var(--font-mono)",
        codeFontSize: "var(--text-sm)",
        codeLineHeight: "1.55",
        uiFontFamily: "var(--font-body)",
        frames: {
          frameBoxShadowCssValue: "none",
        },
      },
    }),
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
        theme_color: "#1c1d22",
        background_color: "#fbfbfd",
        display: "standalone",
        start_url: "/",
        icons: [
          {
            src: "/favicon.svg",
            sizes: "any",
            type: "image/svg+xml",
            purpose: "any",
          },
          {
            src: "/web-app-manifest-192x192.png",
            sizes: "192x192",
            type: "image/png",
            purpose: "maskable",
          },
          {
            src: "/web-app-manifest-512x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "maskable",
          },
          {
            src: "/apple-touch-icon.png",
            sizes: "180x180",
            type: "image/png",
            purpose: "any",
          },
        ],
      },
      workbox: {
        // Hashed asset filenames (Astro adds them automatically) make CSS/JS
        // cache-busting a no-op — different content always gets a new URL,
        // so the precache picks it up without manual invalidation.
        globPatterns: ["**/*.{js,css,svg,png,ico,woff2}"],
        // Activate the new SW immediately on install, take control of all
        // open tabs, and discard outdated runtime caches. Together this
        // means a redeploy is reflected on the very next visit, not the one
        // after that.
        skipWaiting: true,
        clientsClaim: true,
        cleanupOutdatedCaches: true,
        runtimeCaching: [
          {
            // HTML documents go to the network first with a short timeout.
            // Online → always fresh; offline (or slow) → fall back to cache,
            // and if that misses, the navigateFallback below.
            urlPattern: ({ request }) => request.destination === "document",
            handler: "NetworkFirst",
            options: {
              cacheName: "html-pages",
              networkTimeoutSeconds: 3,
              expiration: { maxEntries: 50, maxAgeSeconds: 60 * 60 * 24 * 7 },
            },
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
