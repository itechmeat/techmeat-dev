export const locales = [
  "en",
  "es",
  "fr",
  "de",
  "pt",
  "ru",
  "sr",
  "tr",
  "ar",
  "hi",
  "zh",
  "bn",
] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

export const localeLabels: Record<Locale, string> = {
  en: "English",
  es: "Español",
  fr: "Français",
  de: "Deutsch",
  pt: "Português",
  ru: "Русский",
  sr: "Srpski",
  tr: "Türkçe",
  ar: "العربية",
  hi: "हिन्दी",
  zh: "中文",
  bn: "বাংলা",
};

export const rtlLocales: ReadonlySet<Locale> = new Set(["ar"]);

export const localeOgLang: Record<Locale, string> = {
  en: "en_US",
  es: "es_ES",
  fr: "fr_FR",
  de: "de_DE",
  pt: "pt_BR",
  ru: "ru_RU",
  sr: "sr_RS",
  tr: "tr_TR",
  ar: "ar_AR",
  hi: "hi_IN",
  zh: "zh_CN",
  bn: "bn_BD",
};

// Regional-indicator flag emojis. Choices follow localeOgLang above. Note
// that Windows historically does not ship colour glyphs for flag emojis —
// users on Windows will see two-letter regional indicators instead. Other
// platforms (macOS, iOS, Android, Linux with Noto Color Emoji) render flags.
export const localeFlags: Record<Locale, string> = {
  en: "🇺🇸",
  es: "🇪🇸",
  fr: "🇫🇷",
  de: "🇩🇪",
  pt: "🇧🇷",
  ru: "🇷🇺",
  sr: "🇷🇸",
  tr: "🇹🇷",
  ar: "🇸🇦",
  hi: "🇮🇳",
  zh: "🇨🇳",
  bn: "🇧🇩",
};
