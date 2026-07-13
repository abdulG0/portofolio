"use client";

import { useMemo, useState } from "react";
import { skillsData } from "@/data/skills";

const nodes = [
  { id: "AI", x: 50, y: 8, label: "AI" },
  { id: "Backend", x: 25, y: 35, label: "Backend" },
  { id: "Cloud", x: 75, y: 35, label: "Cloud" },
  { id: "You", x: 50, y: 55, label: "You" },
  { id: "DevOps", x: 35, y: 75, label: "DevOps" },
  { id: "Frontend", x: 65, y: 75, label: "Frontend" },
];

const links = [
  { from: "AI", to: "You" },
  { from: "Backend", to: "You" },
  { from: "Cloud", to: "You" },
  { from: "DevOps", to: "You" },
  { from: "Frontend", to: "You" },
  { from: "AI", to: "Backend" },
  { from: "Cloud", to: "DevOps" },
];

const skillMap = {
  AI: ["Machine Learning", "Deep Learning", "NLP", "Computer Vision"],
  Backend: ["Node.js", "Python", "Go", "Databases"],
  Cloud: ["AWS", "Docker", "Kubernetes", "CI/CD"],
  DevOps: ["Infrastructure", "Automation", "Monitoring", "Reliability"],
  Frontend: ["React", "Next.js", "TypeScript", "Design"],
};

export function SkillsNetwork() {
  const [active, setActive] = useState("You");
  const highlighted = useMemo(() => skillMap[active as keyof typeof skillMap] || [], [active]);

  return (
    <div className="rounded-[32px] border border-border bg-card p-8 shadow-[0_0_120px_rgba(0,0,0,0.03)] backdrop-blur-xl">
      <div className="grid gap-8 lg:grid-cols-[0.6fr_0.4fr]">
        <div className="relative h-[420px] rounded-[28px] border border-border bg-card/70 p-6">
          <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            {links.map((link) => {
              const from = nodes.find((node) => node.id === link.from);
              const to = nodes.find((node) => node.id === link.to);
              if (!from || !to) return null;
              return (
                <line
                  key={`${link.from}-${link.to}`}
                  x1={from.x}
                  y1={from.y}
                  x2={to.x}
                  y2={to.y}
                  stroke={active === link.from || active === link.to ? "rgba(56,189,248,0.85)" : "rgba(148,163,184,0.3)"}
                  strokeWidth={0.8}
                />
              );
            })}
            {nodes.map((node) => (
              <circle
                key={node.id}
                cx={node.x}
                cy={node.y}
                r={active === node.id ? 5.2 : 4}
                fill={active === node.id ? "#38bdf8" : "#0f172a"}
                opacity={active === node.id ? 1 : 0.9}
                className="dark:fill-white"
              />
            ))}
          </svg>

          {nodes.map((node) => (
            <button
              key={node.id}
              type="button"
              onMouseEnter={() => setActive(node.id)}
              onFocus={() => setActive(node.id)}
              className={`absolute -translate-x-1/2 rounded-full border px-4 py-2 text-sm font-medium transition-all hover:scale-[1.03] active:scale-[0.98] ${
                active === node.id
                  ? "border-cyan-400 bg-cyan-500/15 text-cyan-600 shadow-[0_0_32px_rgba(56,189,248,0.18)] dark:text-cyan-100 dark:border-cyan-300 dark:bg-cyan-300/15"
                  : "border-border bg-muted/50 text-muted-foreground hover:border-cyan-400 hover:text-foreground dark:border-white/10 dark:bg-white/5 dark:text-white/70 dark:hover:border-cyan-300 dark:hover:text-white"
              }`}
              style={{ left: `${node.x}%`, top: `${node.y}%` }}
            >
              {node.label}
            </button>
          ))}
        </div>

        <div className="flex flex-col justify-between rounded-[28px] border border-border bg-card p-6">
          <div>
            <p className="text-xs uppercase tracking-[0.24em] text-muted-foreground">Skill Network</p>
            <h2 className="mt-4 text-3xl font-semibold text-foreground">Connected expertise, not separate bars.</h2>
            <p className="mt-4 text-base leading-7 text-muted-foreground">
              Hover a node to reveal the related capabilities and see how the whole system connects through the core of your experience.
            </p>
          </div>
          <div className="mt-8 space-y-4 rounded-[24px] border border-border bg-muted/30 p-6 text-foreground">
            <p className="text-sm uppercase tracking-[0.28em] text-cyan-500/80 dark:text-cyan-200/80">Focused skills</p>
            <div className="space-y-3">
              {highlighted.map((skill) => (
                <div key={skill} className="rounded-2xl border border-border bg-muted/50 px-4 py-3 text-sm dark:border-white/5 dark:bg-white/5">
                  {skill}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
