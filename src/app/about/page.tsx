"use client";

import { PageIntro } from "@/components/page-intro";
import { SiteShell } from "@/components/site-shell";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Testimonials } from "@/components/testimonials";
import { profileData } from "@/data/profile";
import { skillsData } from "@/data/skills";
import { useTranslation } from "@/i18n/LanguageProvider";

export default function AboutPage() {
  const { t } = useTranslation();

  const statsLabels: string[] = (t("profile.stats") as string[] | undefined) || profileData.stats.map((s) => s.label);

  return (
    <SiteShell>
      <section className="border-b border-border">
        <div className="mx-auto max-w-6xl px-6 py-16 md:py-24">
          <PageIntro
            eyebrow={t("nav.about")}
            title={t("about.title") || "A dedicated page for profile, strengths, and skills."}
            description={t("about.description") || "This page focuses only on background and capabilities, so it stays readable and does not compete with projects or contact details."}
          />

          <div className="mt-14 grid gap-10 md:grid-cols-[1.1fr_0.9fr]">
            <div>
              <p className="text-lg leading-8 text-muted-foreground">{t("profile.bio") || profileData.bio}</p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {profileData.stats.map((stat, idx) => (
                <div
                  key={stat.label}
                  className="rounded-[24px] border border-border bg-card p-6"
                >
                  <div className="text-3xl font-semibold text-foreground">{stat.value}+</div>
                  <div className="mt-2 text-sm text-muted-foreground">{statsLabels[idx] || stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="mx-auto max-w-6xl px-6 py-16">
          <div className="max-w-3xl">
            <p className="text-xs uppercase tracking-[0.24em] text-muted-foreground">{t("about.skillsLabel") || "Skills"}</p>
            <h2 className="mt-4 text-3xl font-semibold text-foreground">{t("about.skillsTitle") || "Core capability groups."}</h2>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-2">
            {skillsData.categories.map((category, catIndex) => (
              <Card key={category.name} className="rounded-[28px] border-border bg-card shadow-none">
                <CardContent className="p-7">
                  <div className="mb-6 flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-foreground">{category.name}</h3>
                    <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                      {category.skills.length} items
                    </span>
                  </div>

                  <div className="space-y-5">
                    {category.skills.map((skill, skillIndex) => (
                      <div key={skill.name}>
                        <div className="mb-2 flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">{skill.name}</span>
                          <span className="text-muted-foreground">{skill.proficiency}%</span>
                        </div>
                        <Progress
                          value={skill.proficiency}
                          className="h-1.5 bg-secondary"
                        />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <Testimonials />

      <section className="mx-auto max-w-6xl px-6 py-16">
        <div className="flex justify-center">
          <Link
            href="/consultation"
            className="inline-block rounded-full border border-cyan-400/50 bg-cyan-500/10 px-8 py-3 text-sm font-medium text-cyan-600 transition hover:bg-cyan-500/20 dark:text-cyan-300 dark:hover:bg-cyan-500/30"
          >
            Let's work together — Book a Consultation
          </Link>
        </div>
      </section>
    </SiteShell>
  );
}
