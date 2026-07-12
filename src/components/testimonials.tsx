"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { testimonialsData } from "@/data/testimonials";

export function Testimonials() {
  return (
    <section className="py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <p className="text-sm uppercase tracking-[0.24em] text-muted-foreground mb-4">Testimonials</p>
          <h2 className="text-3xl font-semibold text-foreground">What People Say</h2>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {testimonialsData.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="rounded-[28px] border border-border bg-card p-6"
            >
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-cyan-500 text-cyan-500" />
                ))}
              </div>
              <p className="text-muted-foreground leading-relaxed mb-6">{testimonial.content}</p>
              <div>
                <p className="font-semibold text-foreground">{testimonial.name}</p>
                <p className="text-sm text-muted-foreground">{testimonial.title}, {testimonial.company}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
