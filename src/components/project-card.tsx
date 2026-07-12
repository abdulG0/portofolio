"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

type ProjectCardProps = {
  title: string;
  description: string;
  technologies: string[];
  github: string;
  liveDemo: string;
  image?: string;
};

export function ProjectCard({ title, description, technologies, github, liveDemo, image }: ProjectCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 24, scale: 0.99 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -6, scale: 1.01 }}
      className="group rounded-[28px] border border-border bg-card shadow-none"
    >
      <div className="overflow-hidden rounded-[28px] bg-card/70 transition duration-300 group-hover:bg-card/85">
        {image && (
          <div className="relative h-48 w-full overflow-hidden">
            <Image
                src={image}
                alt={title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                unoptimized
              />
          </div>
        )}
        <div className="p-6">
          <div className="text-sm uppercase tracking-[0.24em] text-cyan-500/70 dark:text-cyan-300/70">Project</div>
          <h3 className="mt-4 text-2xl font-semibold text-foreground">{title}</h3>
          <p className="mt-3 text-base leading-7 text-muted-foreground">{description}</p>
          <div className="mt-6 flex flex-wrap gap-2">
            {technologies.map((tech) => (
              <span
                key={tech}
                className="rounded-full border border-border bg-muted/50 px-3 py-1 text-xs uppercase tracking-[0.18em] text-muted-foreground transition group-hover:text-foreground dark:border-white/10 dark:bg-white/5 dark:text-white/60 dark:group-hover:text-white"
              >
                {tech}
              </span>
            ))}
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href={github}
              className="rounded-full border border-cyan-400/40 bg-cyan-500/10 px-4 py-2 text-sm text-cyan-600 transition hover:bg-cyan-500/20 dark:border-cyan-300/40 dark:bg-cyan-300/10 dark:text-cyan-100 dark:hover:bg-cyan-300/20"
            >
              GitHub
            </Link>
            <Link
              href={liveDemo}
              className="rounded-full border border-border bg-muted/50 px-4 py-2 text-sm text-foreground transition hover:border-cyan-400 hover:bg-cyan-500/10 dark:border-white/10 dark:bg-white/5 dark:text-white dark:hover:border-cyan-300 dark:hover:bg-cyan-300/10"
            >
              View Case Study
            </Link>
          </div>
        </div>
      </div>
    </motion.article>
  );
}
