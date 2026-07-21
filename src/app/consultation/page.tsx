import { PageIntro } from "@/components/page-intro";
import { SiteShell } from "@/components/site-shell";
import { ConsultationPricing } from "@/components/consultation-pricing";
import { ConsultationForm } from "@/components/consultation-form";

export const metadata = {
  title: "Book a Consultation",
  description: "Schedule a consultation with Abdullah Sokhona for your technology needs.",
};

export default function ConsultationPage() {
  return (
    <SiteShell>
      <div className="mx-auto max-w-6xl px-6 py-16">
        <PageIntro
          title="Book a Consultation"
          subtitle="Let's discuss your project, challenges, and how I can help bring your ideas to life."
        />

        <div className="mt-20">
          <h2 className="text-2xl font-bold">Consultation Packages</h2>
          <p className="mt-2 text-muted-foreground">
            Choose the package that fits your needs, or let's discuss a custom arrangement.
          </p>
          <div className="mt-8">
            <ConsultationPricing />
          </div>
        </div>

        <div className="mt-20 grid gap-12 lg:grid-cols-2">
          <div>
            <h2 className="text-2xl font-bold">How It Works</h2>
            <ul className="mt-6 space-y-4">
              <li className="flex gap-4">
                <span className="inline-flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-cyan-500/20 text-sm font-semibold text-cyan-600 dark:text-cyan-300">
                  1
                </span>
                <div>
                  <h3 className="font-semibold text-foreground">Fill out the form</h3>
                  <p className="text-sm text-muted-foreground">
                    Tell me about your project, challenges, and what you're trying to achieve.
                  </p>
                </div>
              </li>
              <li className="flex gap-4">
                <span className="inline-flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-cyan-500/20 text-sm font-semibold text-cyan-600 dark:text-cyan-300">
                  2
                </span>
                <div>
                  <h3 className="font-semibold text-foreground">Confirm details</h3>
                  <p className="text-sm text-muted-foreground">
                    I'll review your request and send you a confirmation with the next steps.
                  </p>
                </div>
              </li>
              <li className="flex gap-4">
                <span className="inline-flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-cyan-500/20 text-sm font-semibold text-cyan-600 dark:text-cyan-300">
                  3
                </span>
                <div>
                  <h3 className="font-semibold text-foreground">Schedule call</h3>
                  <p className="text-sm text-muted-foreground">
                    We'll schedule a time that works for both of us to discuss your project in detail.
                  </p>
                </div>
              </li>
              <li className="flex gap-4">
                <span className="inline-flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-cyan-500/20 text-sm font-semibold text-cyan-600 dark:text-cyan-300">
                  4
                </span>
                <div>
                  <h3 className="font-semibold text-foreground">Get recommendations</h3>
                  <p className="text-sm text-muted-foreground">
                    Receive actionable recommendations, technical advice, and next steps.
                  </p>
                </div>
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-bold">Request a Consultation</h2>
            <p className="mt-2 text-muted-foreground">
              Fill out the form below and I'll get back to you within 24 hours.
            </p>
            <div className="mt-8">
              <ConsultationForm />
            </div>
          </div>
        </div>
      </div>
    </SiteShell>
  );
}
