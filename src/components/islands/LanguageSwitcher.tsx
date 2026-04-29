// src/components/islands/LanguageSwitcher.tsx
import { For } from "solid-js";
import { locales, localeLabels, localeFlags, type Locale } from "../../i18n/config";

interface Props {
  currentLocale: Locale;
  pathname: string;
  availableLocales?: Locale[];
}

export default function LanguageSwitcher(props: Props) {
  const availableLocales = () => {
    const provided = props.availableLocales?.length ? props.availableLocales : locales;
    const set = new Set<Locale>(provided);
    const ordered = locales.filter((l) => set.has(l));
    return ordered.includes(props.currentLocale) ? ordered : [props.currentLocale, ...ordered];
  };

  const switchTo = (target: Locale) => {
    if (target === props.currentLocale) return;
    const path = stripLocale(props.pathname, props.currentLocale);
    const next = target === "en" ? path : `/${target}${path === "/" ? "" : path}`;
    window.location.assign(next || "/");
  };

  return (
    <select aria-label="Language" onChange={(e) => switchTo(e.currentTarget.value as Locale)}>
      <For each={availableLocales()}>
        {(locale) => (
          <option value={locale} selected={locale === props.currentLocale}>
            {localeFlags[locale]} {localeLabels[locale]}
          </option>
        )}
      </For>
    </select>
  );
}

function stripLocale(pathname: string, current: Locale): string {
  if (current === "en") return pathname;
  const prefix = `/${current}`;
  if (pathname === prefix || pathname === `${prefix}/`) return "/";
  if (pathname.startsWith(`${prefix}/`)) return pathname.slice(prefix.length);
  return pathname;
}
