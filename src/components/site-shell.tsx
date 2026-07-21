"use client";

import Link from "next/link";
import { useState } from "react";
import { Moon, Sun, Menu, X } from "lucide-react";
import { profileData } from "@/data/profile";
import { useTranslation } from "@/i18n/LanguageProvider";
import { useTheme } from "@/components/theme-provider";

const navigation = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Experience", href: "/experience" },
  { label: "Projects", href: "/projects" },
  { label: "CV", href: "/cv" },
  { label: "Contact", href: "/contact" },
];

type SiteShellProps = {
  children: React.ReactNode;
  hideHeader?: boolean;
};

export function SiteShell({ children, hideHeader = false }: SiteShellProps) {
  return <InnerShell hideHeader={hideHeader}>{children}</InnerShell>;
}

function InnerShell({ children, hideHeader = false }: SiteShellProps) {
  const { t, locale, setLocale } = useTranslation();
  const { theme, toggleTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  return (
    <div className="min-h-screen bg-background text-foreground">
      <header
        className={`sticky top-0 z-50 border-b border-border/70 bg-background/90 backdrop-blur ${
          hideHeader ? "opacity-0 pointer-events-none h-0" : ""
        }`}
      >
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <Link href="/" className="text-sm font-semibold uppercase tracking-[0.24em] text-foreground">
            {t("profile.name")}
          </Link>
          <div className="flex items-center gap-3">
            <nav className="hidden items-center gap-6 md:flex">
              <Link href="/" className="text-sm text-muted-foreground transition hover:text-foreground">{t("nav.home")}</Link>
              <Link href="/about" className="text-sm text-muted-foreground transition hover:text-foreground">{t("nav.about")}</Link>
              <Link href="/experience" className="text-sm text-muted-foreground transition hover:text-foreground">{t("nav.experience")}</Link>
              <Link href="/projects" className="text-sm text-muted-foreground transition hover:text-foreground">{t("nav.projects")}</Link>
              <Link href="/cv" className="text-sm text-muted-foreground transition hover:text-foreground">{t("nav.cv")}</Link>
              <Link href="/contact" className="text-sm text-muted-foreground transition hover:text-foreground">{t("nav.contact")}</Link>
              <Link href="/consultation" className="text-sm text-cyan-600 font-medium transition hover:text-cyan-500 dark:text-cyan-300 dark:hover:text-cyan-200">Book a Consultation</Link>
            </nav>
            <button
              type="button"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden rounded-full border border-border/70 bg-background/70 p-2 text-foreground transition hover:border-cyan-400/60"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
            <div className="hidden md:flex items-center gap-2">
              <button
                onClick={() => setLocale?.("en")}
                className={`h-8 w-8 rounded-full text-xs transition ${locale === "en" ? "bg-cyan-500/20 text-cyan-600 dark:text-cyan-300 border border-cyan-400/50" : "bg-muted/50 text-muted-foreground hover:bg-muted"}`}
                aria-label="English"
              >
                EN
              </button>
              <button
                onClick={() => setLocale?.("fr")}
                className={`h-8 w-8 rounded-full text-xs transition ${locale === "fr" ? "bg-cyan-500/20 text-cyan-600 dark:text-cyan-300 border border-cyan-400/50" : "bg-muted/50 text-muted-foreground hover:bg-muted"}`}
                aria-label="French"
              >
                FR
              </button>
              <button
                onClick={() => setLocale?.("ar")}
                className={`h-8 w-8 rounded-full text-xs transition ${locale === "ar" ? "bg-cyan-500/20 text-cyan-600 dark:text-cyan-300 border border-cyan-400/50" : "bg-muted/50 text-muted-foreground hover:bg-muted"}`}
                aria-label="Arabic"
              >
                AR
              </button>
            </div>
            <button
              type="button"
              onClick={toggleTheme}
              className="rounded-full border border-border/70 bg-background/70 p-2 text-foreground transition hover:border-cyan-400/60"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </button>
          </div>
        </div>
        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-border/70 bg-background/95 backdrop-blur">
            <div className="mx-auto max-w-6xl px-6 py-4 flex flex-col gap-4">
              <nav className="flex flex-col gap-3">
                <Link
                  href="/"
                  onClick={() => setIsMenuOpen(false)}
                  className="text-sm text-muted-foreground transition hover:text-foreground"
                >
                  {t("nav.home")}
                </Link>
                <Link
                  href="/about"
                  onClick={() => setIsMenuOpen(false)}
                  className="text-sm text-muted-foreground transition hover:text-foreground"
                >
                  {t("nav.about")}
                </Link>
                <Link
                  href="/experience"
                  onClick={() => setIsMenuOpen(false)}
                  className="text-sm text-muted-foreground transition hover:text-foreground"
                >
                  {t("nav.experience")}
                </Link>
                <Link
                  href="/projects"
                  onClick={() => setIsMenuOpen(false)}
                  className="text-sm text-muted-foreground transition hover:text-foreground"
                >
                  {t("nav.projects")}
                </Link>
                <Link
                  href="/cv"
                  onClick={() => setIsMenuOpen(false)}
                  className="text-sm text-muted-foreground transition hover:text-foreground"
                >
                  {t("nav.cv")}
                </Link>
                <Link
                  href="/contact"
                  onClick={() => setIsMenuOpen(false)}
                  className="text-sm text-muted-foreground transition hover:text-foreground"
                >
                  {t("nav.contact")}
                </Link>
                <Link
                  href="/consultation"
                  onClick={() => setIsMenuOpen(false)}
                  className="text-sm text-cyan-600 font-medium transition hover:text-cyan-500 dark:text-cyan-300 dark:hover:text-cyan-200"
                >
                  Book a Consultation
                </Link>
              </nav>
              <div className="flex items-center gap-2 pt-3 border-t border-border/50">
                <button
                  onClick={() => setLocale?.("en")}
                  className={`h-8 w-8 rounded-full text-xs transition ${locale === "en" ? "bg-cyan-500/20 text-cyan-600 dark:text-cyan-300 border border-cyan-400/50" : "bg-muted/50 text-muted-foreground hover:bg-muted"}`}
                  aria-label="English"
                >
                  EN
                </button>
                <button
                  onClick={() => setLocale?.("fr")}
                  className={`h-8 w-8 rounded-full text-xs transition ${locale === "fr" ? "bg-cyan-500/20 text-cyan-600 dark:text-cyan-300 border border-cyan-400/50" : "bg-muted/50 text-muted-foreground hover:bg-muted"}`}
                  aria-label="French"
                >
                  FR
                </button>
                <button
                  onClick={() => setLocale?.("ar")}
                  className={`h-8 w-8 rounded-full text-xs transition ${locale === "ar" ? "bg-cyan-500/20 text-cyan-600 dark:text-cyan-300 border border-cyan-400/50" : "bg-muted/50 text-muted-foreground hover:bg-muted"}`}
                  aria-label="Arabic"
                >
                  AR
                </button>
              </div>
            </div>
          </div>
        )}
      </header>

      <main>{children}</main>

      <footer className="border-t border-border/60 bg-background/80 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] backdrop-blur-xl">
        <div className="mx-auto max-w-6xl px-6 py-8">
          <div className="mb-8 flex flex-col items-center justify-center gap-4 sm:flex-row sm:justify-between">
            <div className="flex items-center gap-3">
              <span className="h-2.5 w-2.5 rounded-full bg-cyan-400/80 shadow-[0_0_12px_rgba(34,211,238,0.7)]" />
              <p className="text-sm text-muted-foreground">
                © {new Date().getFullYear()} {t("profile.name")}
              </p>
            </div>
            <Link
              href="/consultation"
              className="inline-block rounded-full border border-cyan-400/50 bg-cyan-500/10 px-6 py-2.5 text-sm font-medium text-cyan-600 transition hover:bg-cyan-500/20 dark:text-cyan-300 dark:hover:bg-cyan-500/30"
            >
              Book a Consultation
            </Link>
            <p className="text-center text-sm uppercase tracking-[0.24em] text-muted-foreground/80 sm:text-right">{t("footer.copyright")}</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
