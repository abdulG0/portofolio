"use client";

import { PageIntro } from "@/components/page-intro";
import { SiteShell } from "@/components/site-shell";
import { experienceData } from "@/data/experience";
import { useTranslation } from "@/i18n/LanguageProvider";

export default function ExperiencePage() {
  const { t } = useTranslation();

  return (
    <SiteShell>
      <section>
        <div className="mx-auto max-w-6xl px-6 py-16 md:py-24">
          <PageIntro
            eyebrow={t("nav.experience")}
            title={t("experience.title") || "Professional work on its own page."}
            description={t("experience.description") || "This section is separated from the rest of the site so visitors can focus only on timeline, role, and outcomes."}
          />

          <div className="mt-14 space-y-8">
            {experienceData.map((role) => (
              <div
                key={role.id}
                className="grid gap-5 rounded-[28px] border border-border bg-card p-6 md:grid-cols-[180px_1fr] md:p-8"
              >
                <div>
                  <p className="text-sm font-medium uppercase tracking-[0.18em] text-muted-foreground">
                    {t(`experience.items.${role.id}.period`) || role.period}
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl font-semibold text-foreground">{t(`experience.items.${role.id}.position`) || role.position}</h2>
                  <p className="mt-2 text-base text-muted-foreground">{t(`experience.items.${role.id}.company`) || role.company}</p>
                  <p className="mt-5 max-w-2xl text-base leading-7 text-muted-foreground">
                    {t(`experience.items.${role.id}.description`) || role.description}
                  </p>

                  <div className="mt-6 grid gap-3 sm:grid-cols-2">
                    {(t(`experience.items.${role.id}.achievements`) as any[] | undefined)?.length
                      ? (t(`experience.items.${role.id}.achievements`) as any[]).map((achievement: string) => (
                          <div
                            key={achievement}
                            className="rounded-[18px] border border-border px-4 py-3 text-sm leading-6 text-muted-foreground"
                          >
                            {achievement}
                          </div>
                        ))
                      : role.achievements.map((achievement) => (
                          <div
                            key={achievement}
                            className="rounded-[18px] border border-border px-4 py-3 text-sm leading-6 text-muted-foreground"
                          >
                            {achievement}
                          </div>
                        ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
