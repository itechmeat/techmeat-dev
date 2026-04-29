import { en, type DictionaryKey } from "./en";
import { es } from "./es";
import { fr } from "./fr";
import { de } from "./de";
import { pt } from "./pt";
import { ru } from "./ru";
import { sr } from "./sr";
import { tr } from "./tr";
import { ar } from "./ar";
import { hi } from "./hi";
import { zh } from "./zh";
import { bn } from "./bn";
import type { Locale } from "./config";

const dicts: Record<Locale, Partial<Record<string, string>>> = {
  en,
  es,
  fr,
  de,
  pt,
  ru,
  sr,
  tr,
  ar,
  hi,
  zh,
  bn,
};

export function t(key: string, locale: Locale, params?: Record<string, string | number>): string {
  const value = dicts[locale]?.[key] ?? dicts.en?.[key] ?? key;
  if (!params) return value;
  return value.replace(/\{(\w+)\}/g, (_, k) => String(params[k] ?? `{${k}}`));
}

export type { DictionaryKey };
