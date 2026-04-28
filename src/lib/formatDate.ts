import type { Locale } from "../i18n/config";

const localeBcp47: Record<Locale, string> = {
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
};

export function formatDate(date: Date, locale: Locale): string {
  return new Intl.DateTimeFormat(localeBcp47[locale], {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  }).format(date);
}
