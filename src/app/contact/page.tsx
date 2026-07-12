"use client";

import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import { PageIntro } from "@/components/page-intro";
import { SiteShell } from "@/components/site-shell";
import { Card, CardContent } from "@/components/ui/card";
import { contactData } from "@/data/contact";
import { useTranslation } from "@/i18n/LanguageProvider";

export default function ContactPage() {
  const { t } = useTranslation();

  return (
    <SiteShell>
      <section>
        <div className="mx-auto max-w-6xl px-6 py-16 md:py-24">
          <PageIntro
            eyebrow={t("nav.contact")}
            title={t("contact.title") || "Contact information on its own page."}
            description={t("contact.description") || "This page is intentionally simple, so people can reach out quickly without scrolling through the rest of the portfolio."}
          />

          <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            <Card className="rounded-[28px] border-border bg-card shadow-none">
              <CardContent className="p-6">
                <Mail className="h-5 w-5 text-muted-foreground" />
                <p className="mt-5 text-sm uppercase tracking-[0.18em] text-muted-foreground">{t("contact.email") || "Email"}</p>
                <p className="mt-3 break-all text-base leading-7 text-foreground">{contactData.email}</p>
              </CardContent>
            </Card>

            <Card className="rounded-[28px] border-border bg-card shadow-none">
              <CardContent className="p-6">
                <Phone className="h-5 w-5 text-muted-foreground" />
                <p className="mt-5 text-sm uppercase tracking-[0.18em] text-muted-foreground">{t("contact.phone") || "Phone"}</p>
                <p className="mt-3 text-base leading-7 text-foreground">{contactData.phone}</p>
              </CardContent>
            </Card>

            <Card className="rounded-[28px] border-border bg-card shadow-none">
              <CardContent className="p-6">
                <MapPin className="h-5 w-5 text-muted-foreground" />
                <p className="mt-5 text-sm uppercase tracking-[0.18em] text-muted-foreground">{t("contact.location") || "Location"}</p>
                <p className="mt-3 text-base leading-7 text-foreground">{contactData.location}</p>
              </CardContent>
            </Card>

            <Card className="rounded-[28px] border-border bg-card shadow-none">
              <CardContent className="p-6">
                <p className="text-sm uppercase tracking-[0.18em] text-muted-foreground">{t("contact.links") || "Links"}</p>
                <div className="mt-5 space-y-3">
                  {contactData.socials.map((social) => (
                    <Link
                      key={social.name}
                      href={social.url}
                      className="block text-base text-muted-foreground transition hover:text-foreground"
                    >
                      {t(`contact.socials.${social.name}`) || social.name}
                    </Link>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
