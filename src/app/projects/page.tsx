"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { PageIntro } from "@/components/page-intro";
import { SiteShell } from "@/components/site-shell";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { projectsData } from "@/data/projects";
import { useTranslation } from "@/i18n/LanguageProvider";

export default function ProjectsPage() {
  const { t } = useTranslation();

  return (
    <SiteShell>
      <section>
        <div className="mx-auto max-w-6xl px-6 py-16 md:py-24">
          <PageIntro
            eyebrow={t("nav.projects")}
            title={t("projects.title") || "Projects grouped in one dedicated place."}
            description={t("projects.description") || "Instead of stacking projects into the landing page, this page keeps the work portfolio focused and easy to browse."}
          />

          <div className="mt-14 grid gap-5 md:grid-cols-2">
            {projectsData.map((project, index) => (
              <Card key={project.id} className="h-full rounded-[28px] border-border bg-card shadow-none">
                <CardContent className="flex h-full flex-col p-0">
                  {project.image && (
                    <div className="relative h-48 w-full overflow-hidden rounded-t-[28px]">
                      <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover transition-transform duration-500 hover:scale-105"
                      unoptimized
                    />
                    </div>
                  )}
                  <div className="p-7 flex flex-col flex-1">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                          {t("projects.itemPrefix") || `Project ${String(index + 1).padStart(2, "0")}`}
                        </p>
                        <h2 className="mt-3 text-2xl font-semibold text-foreground">{t(`projects.items.${project.id}.title`) || project.title}</h2>
                      </div>
                      <ArrowUpRight className="mt-1 h-5 w-5 text-muted-foreground" />
                    </div>

                    <p className="mt-5 text-base leading-7 text-muted-foreground flex-1">{t(`projects.items.${project.id}.description`) || project.description}</p>

                    <div className="mt-6 flex flex-wrap gap-2">
                      {project.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="rounded-full border border-border px-3 py-1 text-xs uppercase tracking-[0.14em] text-muted-foreground"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    <div className="mt-6 space-y-2 border-t border-border pt-5 text-sm text-muted-foreground">
                      {(t(`projects.items.${project.id}.results`) as any[] | undefined)?.length
                        ? (t(`projects.items.${project.id}.results`) as any[]).map((result: string) => <p key={result}>{result}</p>)
                        : project.results.map((result) => <p key={result}>{result}</p>)}
                    </div>

                    <div className="mt-8 flex flex-wrap gap-3">
                      <Button asChild>
                        <Link href={project.liveDemo}>{t("projects.liveDemo") || "Live Demo"}</Link>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
