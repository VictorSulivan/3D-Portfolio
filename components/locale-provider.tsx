"use client";

import { usePathname } from "next/navigation";
import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import en from "@/data/en.json";
import fr from "@/data/fr.json";

export type Locale = "fr" | "en";
export type Dictionary = typeof fr;

const dictionaries: Record<Locale, Dictionary> = {
  fr,
  en: en as Dictionary,
};

const STORAGE_KEY = "portfolio-lang";

const LocaleContext = createContext<{
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: Dictionary;
}>({
  locale: "fr",
  setLocale: () => {},
  t: fr,
});

function persistLocale(next: Locale) {
  localStorage.setItem(STORAGE_KEY, next);
  document.cookie = `${STORAGE_KEY}=${next}; path=/; max-age=31536000; samesite=lax`;
}

export function LocaleProvider({
  initialLocale = "fr",
  children,
}: {
  initialLocale?: Locale;
  children: React.ReactNode;
}) {
  const [locale, setLocaleState] = useState<Locale>(initialLocale);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if ((saved === "fr" || saved === "en") && saved !== initialLocale) {
      setLocaleState(saved);
    }
  }, [initialLocale]);

  useEffect(() => {
    document.documentElement.lang = locale;
    persistLocale(locale);
  }, [locale]);

  const setLocale = (next: Locale) => {
    setLocaleState(next);
    persistLocale(next);
  };

  const value = useMemo(
    () => ({ locale, setLocale, t: dictionaries[locale] }),
    [locale],
  );

  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>;
}

export function useLocale() {
  return useContext(LocaleContext);
}

const routeTitles: Record<string, keyof Dictionary["titles"]> = {
  "/": "home",
  "/competences": "skills",
  "/projets": "projects",
  "/github": "github",
  "/parcours": "experience",
  "/contact": "contact",
  "/secrets": "secrets",
};

export function DocumentTitle() {
  const pathname = usePathname();
  const { t } = useLocale();

  useEffect(() => {
    if (/^\/projets\/\d+$/.test(pathname)) return;
    const key = routeTitles[pathname] ?? "home";
    const next = t.titles[key];
    const apply = () => {
      if (document.title !== next) document.title = next;
    };
    apply();
    const title = document.querySelector("title");
    if (!title) return;
    const observer = new MutationObserver(apply);
    observer.observe(title, { childList: true, characterData: true, subtree: true });
    return () => observer.disconnect();
  }, [pathname, t]);

  return null;
}

export function LanguageSelect() {
  const { locale, setLocale, t } = useLocale();

  return (
    <select
      value={locale}
      aria-label={t.language.label}
      onChange={(event) => setLocale(event.target.value as Locale)}
      className="rounded-md border border-gh-border bg-gh-surface px-2 py-1.5 font-mono text-xs text-gh-text outline-none"
    >
      <option value="fr">FR</option>
      <option value="en">EN</option>
    </select>
  );
}
