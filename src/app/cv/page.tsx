"use client";

import Link from "next/link";
import { DownloadCvButton } from "@/components/download-cv-button";
import { PageIntro } from "@/components/page-intro";
import { SiteShell } from "@/components/site-shell";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { contactData } from "@/data/contact";
import { experienceData } from "@/data/experience";
import { profileData } from "@/data/profile";
import { projectsData } from "@/data/projects";
import { useTranslation } from "@/i18n/LanguageProvider";

export default function CvPage() {
  const { t } = useTranslation();

  return (
    <SiteShell>
      <section className="border-b border-border">
        <div className="mx-auto max-w-6xl px-6 py-16 md:py-24">
          <PageIntro
            eyebrow={t("cv.eyebrow") || "CV"}
            title={t("cv.title") || "A separate resume page with a PDF download."}
            description={t("cv.description") || "This page keeps the resume function focused. Visitors can read a concise summary here or download the generated PDF."}
          />

          <div className="mt-14 grid gap-8 md:grid-cols-[1.1fr_0.9fr]">
            <Card className="rounded-[28px] border-border bg-card shadow-none">
              <CardContent className="p-8">
                <p className="text-xs uppercase tracking-[0.24em] text-muted-foreground">{t("cv.profile")}</p>
                <h2 className="mt-4 text-3xl font-semibold text-foreground">{t("profile.title") || profileData.title}</h2>
                <p className="mt-5 text-base leading-8 text-muted-foreground">{t("profile.bio") || profileData.bio}</p>

                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <DownloadCvButton className="h-12 rounded-full px-6" />
                  <Button
                    asChild
                    variant="outline"
                    className="h-12 rounded-full px-6"
                  >
                    <Link href="/contact">{t("nav.contact")}</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="rounded-[28px] border-border bg-card shadow-none">
              <CardContent className="p-8">
                <div className="space-y-5">
                  <div>
                    <p className="text-sm text-muted-foreground">{t("contact.email") || "Email"}</p>
                    <p className="mt-1 break-all text-foreground">{contactData.email}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">{t("contact.phone") || "Phone"}</p>
                    <p className="mt-1 text-foreground">{contactData.phone}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">{t("contact.location") || "Location"}</p>
                    <p className="mt-1 text-foreground">{contactData.location}</p>
                  </div>
                  <div className="border-t border-border pt-5">
                    <p className="text-sm text-muted-foreground">{t("cv.included") || "Included in the PDF"}</p>
                    <ul className="mt-3 space-y-2 text-sm leading-6 text-muted-foreground">
                      <li>{t("cv.experience") || `${experienceData.length} experience entries`}</li>
                      <li>{t("cv.projects") || `${projectsData.slice(0, 4).length} selected projects`}</li>
                      <li>{t("cv.skills") || "Skills summary"}</li>
                      <li>{t("cv.links") || "Primary links and contact details"}</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
