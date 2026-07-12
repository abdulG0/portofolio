"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import translations from "./translations";

type Locale = "en" | "fr" | "ar";

const I18nContext = createContext({
  locale: "en" as Locale,
  setLocale: (l: Locale) => {},
  t: (path: string) => undefined as any,
});

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  // Always start with "en" on SSR to avoid hydration mismatch
  const [locale, setLocaleState] = useState<Locale>("en");
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
    const stored = localStorage.getItem("locale") as Locale | null;
    if (stored) {
      setLocaleState(stored);
    }
  }, []);

  useEffect(() => {
    if (!hasMounted) return;
    try {
      localStorage.setItem("locale", locale);
    } catch {}
    // set direction
    if (typeof document !== "undefined") {
      document.documentElement.dir = locale === "ar" ? "rtl" : "ltr";
    }
  }, [locale, hasMounted]);

  const setLocale = (l: Locale) => setLocaleState(l);

  const t = (path: string) => {
    const parts = path.split(".");
    let cur: any = translations[locale] || translations.en;
    for (const p of parts) {
      if (!cur) return path;
      cur = cur[p];
    }
    return cur ?? path;
  };

  // Wait until mounted to render the actual locale to avoid hydration mismatch
  if (!hasMounted) {
    // Render a placeholder or the default locale
    return <I18nContext.Provider value={{ locale: "en", setLocale, t }}>{children}</I18nContext.Provider>;
  }

  return <I18nContext.Provider value={{ locale, setLocale, t }}>{children}</I18nContext.Provider>;
}

export function useTranslation() {
  return useContext(I18nContext) as { locale: Locale; setLocale: (l: Locale) => void; t: (p: string) => any };
}

export function getStoredLocale(): Locale {
  if (typeof window === "undefined") return "en";
  return (localStorage.getItem("locale") as Locale) || "en";
}
