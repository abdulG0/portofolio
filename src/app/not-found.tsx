import Link from "next/link";
import { SiteShell } from "@/components/site-shell";

export default function NotFound() {
  return (
    <SiteShell>
      <section className="flex min-h-[70vh] items-center justify-center px-6 py-20">
        <div className="max-w-xl text-center">
          <p className="text-sm uppercase tracking-[0.3em] text-cyan-400/80">404</p>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
            This page is missing.
          </h1>
          <p className="mt-5 text-base leading-8 text-muted-foreground">
            The route you requested could not be found. Return home and continue exploring the portfolio.
          </p>
          <Link
            href="/"
            className="mt-8 inline-flex rounded-full border border-border/70 bg-background/80 px-5 py-2.5 text-sm font-medium text-foreground transition hover:border-cyan-400/60"
          >
            Go back home
          </Link>
        </div>
      </section>
    </SiteShell>
  );
}
