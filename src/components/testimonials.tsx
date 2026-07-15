import { Star, Quote } from "lucide-react";
import { testimonialsData } from "@/data/testimonials";
import { Reveal } from "@/components/reveal";

export function Testimonials() {
  return (
    <section className="py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <p className="text-sm uppercase tracking-[0.24em] text-muted-foreground mb-4">Client Work</p>
          <h2 className="text-3xl font-semibold text-foreground text-balance">
            I build websites and apps for clients
          </h2>
          <p className="mt-4 text-muted-foreground leading-relaxed text-pretty">
            Beyond my own products, I design and develop custom websites and applications for
            businesses and individuals—turning their ideas into polished, production-ready software.
          </p>
        </div>

        <div className="mx-auto grid max-w-4xl gap-6 md:grid-cols-1">
          {testimonialsData.map((testimonial, index) => (
            <Reveal
              key={index}
              delay={index * 0.1}
              className="relative rounded-[28px] border border-border bg-card p-8"
            >
              <Quote className="absolute right-8 top-8 h-8 w-8 text-cyan-500/20" aria-hidden />
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-cyan-500 text-cyan-500" />
                ))}
              </div>
              <p className="text-lg text-foreground leading-relaxed mb-6 text-pretty">
                {testimonial.content}
              </p>
              <div>
                <p className="font-semibold text-foreground">{testimonial.name}</p>
                <p className="text-sm text-muted-foreground">
                  {testimonial.title}, {testimonial.company}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
