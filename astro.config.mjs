// @ts-check
import { defineConfig } from "astro/config";
import solid from "@astrojs/solid-js";

import cloudflare from "@astrojs/cloudflare";

// https://astro.build/config
export default defineConfig({
  site: "https://techmeat.dev",
  integrations: [solid()],
  adapter: cloudflare(),
});