import Link from "next/link";
import Image from "next/image";
import { Reveal } from "@/components/reveal";

type ProjectCardProps = {
  title: string;
  description: string;
  technologies: string[];
  liveDemo: string;
  image?: string;
};

export function ProjectCard({ title, description, technologies, liveDemo, image }: ProjectCardProps) {
  return (
    <Reveal className="group rounded-[28px] border border-border bg-card shadow-none transition-transform duration-300 hover:-translate-y-1.5">
      <div className="overflow-hidden rounded-[28px] bg-card/70 transition duration-300 group-hover:bg-card/85">
        {image && (
          <div className="relative h-48 w-full overflow-hidden">
            <Image
                src={image}
                alt={title}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
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
              href={liveDemo}
              className="rounded-full border border-border bg-muted/50 px-4 py-2 text-sm text-foreground transition hover:border-cyan-400 hover:bg-cyan-500/10 dark:border-white/10 dark:bg-white/5 dark:text-white dark:hover:border-cyan-400 dark:hover:bg-cyan-300/10"
            >
              View Case Study
            </Link>
          </div>
        </div>
      </div>
    </Reveal>
  );
}
