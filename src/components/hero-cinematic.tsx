"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { profileData } from "@/data/profile";
import { useTranslation } from "@/i18n/LanguageProvider";
import { useTheme } from "@/components/theme-provider";
import { Home, User, Briefcase, Grid, FileText, Mail, Moon, Sun } from "lucide-react";

type Particle = {
  id: number;
  x: number;
  y: number;
  size: number;
  angle: number;
};

const particleCount = 32;

const navItems = [
  { key: "home", href: "/" },
  { key: "about", href: "/about" },
  { key: "experience", href: "/experience" },
  { key: "projects", href: "/projects" },
  { key: "cv", href: "/cv" },
  { key: "contact", href: "/contact" },
];

function randomParticle(seed: number): Particle {
  // Simple pseudo-random generator using a seed to keep SSR and client in sync
  const x = ((seed * 9301 + 49297) % 233280) / 233280;
  const y = ((seed * 12345 + 67890) % 233280) / 233280;
  const size = 1 + (((seed * 23456 + 78901) % 233280) / 233280) * 2;
  const angle = (((seed * 34567 + 89012) % 233280) / 233280) * Math.PI * 2;
  return { id: seed, x: x * 100, y: y * 100, size, angle };
}

export function HeroCinematic() {
  const [isMobile, setIsMobile] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const spotlightRef = useRef<HTMLDivElement | null>(null);
  const { t, setLocale, locale } = useTranslation();
  const { theme, toggleTheme } = useTheme();

  // Generate particles using fixed seeds for consistent SSR and client rendering
  const particles = useMemo(
    () => Array.from({ length: particleCount }, (_, i) => randomParticle(i + 1)),
    []
  );

  useEffect(() => {
    // Skip pointer effects on touch / small screens where they aren't visible.
    if (typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches) {
      return;
    }

    let frame = 0;
    const handleMove = (event: MouseEvent) => {
      if (frame) return;
      // Throttle to one update per animation frame and write directly to the
      // DOM (no React re-render) to keep interactions smooth.
      frame = requestAnimationFrame(() => {
        frame = 0;
        const rect = containerRef.current?.getBoundingClientRect();
        const spotlight = spotlightRef.current;
        if (!rect || !spotlight) return;
        const x = ((event.clientX - rect.left) / rect.width) * 100;
        const y = ((event.clientY - rect.top) / rect.height) * 100;
        spotlight.style.left = `${x}%`;
        spotlight.style.top = `${y}%`;
      });
    };

    const element = containerRef.current;
    element?.addEventListener("mousemove", handleMove, { passive: true });
    return () => {
      if (frame) cancelAnimationFrame(frame);
      element?.removeEventListener("mousemove", handleMove);
    };
  }, []);

  useEffect(() => {
    const updateViewportState = () => setIsMobile(window.innerWidth < 640);
    updateViewportState();
    window.addEventListener("resize", updateViewportState);
    return () => window.removeEventListener("resize", updateViewportState);
  }, []);

  // The home hero is the landing hub and should always be framed from the top.
  // On client navigation back to home, Next.js may restore a previous scroll
  // position, so reset to the top when the hero mounts. We reset both on mount
  // and after a frame to reliably win against Next.js scroll restoration.
  useEffect(() => {
    const reset = () => window.scrollTo({ top: 0, left: 0, behavior: "instant" as ScrollBehavior });
    // Reset immediately, then over the next few frames to reliably override
    // Next.js scroll restoration (which can run after this effect on back/fwd nav).
    reset();
    let count = 0;
    let raf = 0;
    const loop = () => {
      reset();
      if (++count < 5) raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    window.addEventListener("pageshow", reset);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pageshow", reset);
    };
  }, []);

  const radius = isMobile ? 34 : 42;

  return (
    <section
      ref={containerRef}
      className="relative isolate flex min-h-[100svh] flex-col overflow-hidden bg-background px-4 py-3 sm:min-h-screen sm:px-8 sm:py-6"
    >
      <div className="absolute inset-0 bg-background/95" aria-hidden />

      {/* Floating controls: brand name, language switcher, theme toggle */}
      <div className="absolute inset-x-0 top-0 z-50 flex items-center justify-between px-4 py-4 sm:px-8">
        <Link href="/" className="text-xs font-semibold uppercase tracking-[0.24em] text-foreground sm:text-sm">
          {profileData.name}
        </Link>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5">
            {(["en", "fr", "ar"] as const).map((lng) => (
              <button
                key={lng}
                type="button"
                onClick={() => setLocale(lng)}
                className={`h-8 w-8 rounded-full text-xs uppercase transition ${
                  locale === lng
                    ? "border border-cyan-400/50 bg-cyan-500/20 text-cyan-600 dark:text-cyan-300"
                    : "bg-muted/50 text-muted-foreground hover:bg-muted"
                }`}
                aria-label={lng === "en" ? "English" : lng === "fr" ? "French" : "Arabic"}
              >
                {lng}
              </button>
            ))}
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

      <div className="absolute inset-0 opacity-0 sm:opacity-100" aria-hidden="true">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.14),transparent_24%),radial-gradient(circle_at_85%_30%,rgba(168,85,247,0.18),transparent_20%)] dark:bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.14),transparent_24%),radial-gradient(circle_at_85%_30%,rgba(168,85,247,0.18),transparent_20%)] light:bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.1),transparent_24%),radial-gradient(circle_at_85%_30%,rgba(168,85,247,0.12),transparent_20%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.06),transparent_60%)] dark:bg-[linear-gradient(180deg,rgba(255,255,255,0.06),transparent_60%)] light:bg-[linear-gradient(180deg,rgba(0,0,0,0.04),transparent_60%)]" />
        <div className="absolute inset-0 opacity-80">
          <div className="absolute inset-0 bg-grid-mask bg-[length:160px_160px] bg-center" />
        </div>
      </div>

          <div className="absolute inset-0 pointer-events-none">
        {particles.map((particle) => (
          <span
            key={particle.id}
            className="absolute block rounded-full bg-cyan-300/20 blur-sm dark:bg-cyan-300/20 light:bg-cyan-500/25"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              width: `${particle.size * 2}px`,
              height: `${particle.size * 2}px`,
              transform: `translate(-50%, -50%) rotate(${particle.angle}rad)`,
            }}
          />
        ))}
        <div
          ref={spotlightRef}
          style={{ left: "50%", top: "50%" }}
          className="absolute h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/5 blur-3xl dark:bg-white/5 light:bg-black/5"
        />
      </div>

        <div className="relative z-10 flex w-full flex-1 flex-col items-center justify-start text-center sm:justify-center">
          <div className="flex flex-1 w-full max-w-5xl items-center justify-center py-4 sm:py-0">
            <div className="relative mx-auto h-[min(82vw,520px)] w-[min(82vw,520px)] sm:h-[520px] sm:w-[520px]">
            <div className="pointer-events-none absolute inset-0 rounded-full border border-cyan-300/12 bg-[radial-gradient(ellipse_at_center,_rgba(255,255,255,0.02),transparent_40%)] dark:border-cyan-300/12 dark:bg-[radial-gradient(ellipse_at_center,_rgba(255,255,255,0.02),transparent_40%)] light:border-cyan-400/20 light:bg-[radial-gradient(ellipse_at_center,_rgba(0,0,0,0.03),transparent_40%)]" />
            {/* Spinning decorative rings (visual only; nav nodes stay static & clickable) */}
            <div className="pointer-events-none absolute inset-0 animate-spin-slow rounded-full border border-transparent border-t-cyan-400/50 border-r-cyan-400/20">
              <span className="absolute left-1/2 top-0 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-400 shadow-[0_0_12px_rgba(34,211,238,0.9)]" />
            </div>
            <div className="pointer-events-none absolute inset-12 animate-spin-slow rounded-full border border-cyan-300/10 opacity-60 [animation-direction:reverse] [animation-duration:32s] dark:border-cyan-300/10 light:border-cyan-400/15" />
            <div className="pointer-events-none absolute inset-28 animate-spin-slow rounded-full border border-transparent border-b-white/25 opacity-50 [animation-duration:26s] dark:border-b-white/25 light:border-b-black/20" />

              <div className="absolute inset-0 flex items-center justify-center">
                <Link
                  href="/cv"
                  aria-label={`${t("profile.name")} — ${t("nav.cv")}`}
                  className="group pointer-events-auto z-40 rounded-full border border-border bg-card/92 px-5 py-4 text-center shadow-[0_0_120px_rgba(0,0,0,0.2)] backdrop-blur-xl transition hover:border-cyan-400/50 hover:bg-cyan-500/5 sm:px-8 sm:py-6"
                >
                  <p className="text-[10px] uppercase tracking-[0.28em] text-cyan-500/70 dark:text-cyan-300/70 sm:text-xs">{t("hero.navigationHub")}</p>
                  <h2 className="mt-1 text-base font-semibold text-foreground transition group-hover:text-cyan-500 dark:group-hover:text-cyan-300 sm:text-xl">{t("profile.name")}</h2>
                  <span className="mt-1 block text-[9px] uppercase tracking-[0.24em] text-muted-foreground opacity-0 transition group-hover:opacity-100 sm:text-[10px]">{t("nav.cv")}</span>
                </Link>
              </div>

            <div className="absolute inset-0">
              <div className="relative h-full w-full">
                <div className="absolute inset-0 animate-spin-slow" style={{ animationDuration: "28s" }}>
                  {navItems.map((item, idx) => {
                    const Icon = [Home, User, Briefcase, Grid, FileText, Mail][idx] || Home;
                    const angle = (idx / navItems.length) * Math.PI * 2 - Math.PI / 2; // start at top
                    const radiusPercent = radius; // percent radius
                    const cx = 50 + Math.cos(angle) * radiusPercent;
                    const cy = 50 + Math.sin(angle) * radiusPercent;
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        aria-label={t(`nav.${item.key}`)}
                        className="absolute pointer-events-auto z-40"
                        style={{ top: `${cy}%`, left: `${cx}%`, transform: "translate(-50%, -50%)" }}
                      >
                        {/* Counter-spin at the same speed so icons/labels stay upright while orbiting */}
                        <div
                          className="flex animate-spin-slow flex-col items-center [animation-direction:reverse]"
                          style={{ animationDuration: "28s" }}
                        >
                          <div className="flex h-11 w-11 items-center justify-center rounded-full border border-border bg-card/85 shadow-[0_12px_24px_rgba(0,0,0,0.15)] transition hover:scale-110 hover:border-cyan-400/40 hover:bg-cyan-500/10 dark:hover:bg-cyan-300/12 pointer-events-auto sm:h-14 sm:w-14">
                            <Icon className="h-5 w-5 text-cyan-500 dark:text-cyan-200 sm:h-6 sm:w-6" aria-hidden />
                          </div>
                          <span className="mt-2 block text-[10px] text-muted-foreground sm:text-xs">{t(`nav.${item.key}`)}</span>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </div>
            </div>
            </div>
          </div>
        </div>
    </section>
  );
}
