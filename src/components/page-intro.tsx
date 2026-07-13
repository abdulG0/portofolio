import { Reveal } from "@/components/reveal";

type PageIntroProps = {
  eyebrow: string;
  title: string;
  description: string;
};

export function PageIntro({ eyebrow, title, description }: PageIntroProps) {
  return (
    <div className="max-w-3xl">
      <Reveal>
        <p className="mb-4 text-xs font-medium uppercase tracking-[0.28em] text-muted-foreground">
          {eyebrow}
        </p>
      </Reveal>
      <Reveal delay={0.08}>
        <h1 className="text-4xl font-semibold tracking-tight text-foreground sm:text-5xl md:text-6xl">
          {title}
        </h1>
      </Reveal>
      <Reveal delay={0.16}>
        <p className="mt-5 text-base leading-8 text-muted-foreground sm:text-lg">
          {description}
        </p>
      </Reveal>
    </div>
  );
}
