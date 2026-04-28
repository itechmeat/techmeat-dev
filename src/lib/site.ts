export const SITE_URL = "https://techmeat.dev";
export const SITE_NAME = "techmeat.dev";
export const TWITTER_HANDLE = "@techmeat";

export function resolveSite(site: URL | undefined): URL {
  return site ?? new URL(SITE_URL);
}

export const AUTHOR = {
  "@type": "Person",
  name: "Sergey Eroshenkov",
  url: `${SITE_URL}/about`,
  sameAs: [
    "https://github.com/itechmeat",
    "https://x.com/techmeat",
    "https://www.linkedin.com/in/techmeat/",
  ],
} as const;
