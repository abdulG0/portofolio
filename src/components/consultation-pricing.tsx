"use client";

import { Check } from "lucide-react";
import { consultationTiers } from "@/data/consultation";

export function ConsultationPricing() {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {consultationTiers.map((tier) => (
        <div
          key={tier.id}
          className={`rounded-lg border p-6 transition ${
            tier.id === "strategy"
              ? "border-cyan-400/50 bg-cyan-500/10 shadow-lg shadow-cyan-500/10"
              : "border-border/70 bg-background/40 hover:border-cyan-400/30"
          }`}
        >
          <h3 className="text-lg font-semibold text-foreground">{tier.name}</h3>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-3xl font-bold text-cyan-400">{tier.price}</span>
            <span className="text-sm text-muted-foreground">{tier.duration}</span>
          </div>
          <p className="mt-3 text-sm text-muted-foreground">{tier.description}</p>

          <ul className="mt-6 space-y-3">
            {tier.features.map((feature) => (
              <li key={feature} className="flex gap-3 text-sm">
                <Check className="h-4 w-4 flex-shrink-0 text-cyan-400" />
                <span className="text-muted-foreground">{feature}</span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
