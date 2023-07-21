import { configureLocalization } from "@lit/localize";
import { sourceLocale, targetLocales } from "../generated/locale-codes.js";

export const { getLocale, setLocale } = configureLocalization({
  sourceLocale,
  targetLocales,
  async loadLocale(locale) {
    // eslint-disable-next-line import/no-dynamic-require, global-require
    return require(`/generated/locales/${locale}.ts`);
  },
});

export const setLocaleFromUrl = async () => {
  const url = new URL(window.location.href);
  const locale = url.searchParams.get("lang") || sourceLocale;

  await setLocale(locale);
};

export const localeNames = {
  en: "🇬🇧 English",
  id: "🇮🇩 Indonesia",
  ja: "🇯🇵 Japanese",
  ko: "🇰🇷 Korean",
} as Record<string, string>;
