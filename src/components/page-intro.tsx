"use client";

import { motion } from "framer-motion";

type PageIntroProps = {
  eyebrow: string;
  title: string;
  description: string;
};

const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] },
  },
};

export function PageIntro({ eyebrow, title, description }: PageIntroProps) {
  return (
    <motion.div
      className="max-w-3xl"
      initial="hidden"
      animate="show"
      variants={container}
    >
      <motion.p
        className="mb-4 text-xs font-medium uppercase tracking-[0.28em] text-muted-foreground"
        variants={item}
      >
        {eyebrow}
      </motion.p>
      <motion.h1
        className="text-4xl font-semibold tracking-tight text-foreground sm:text-5xl md:text-6xl"
        variants={item}
      >
        {title}
      </motion.h1>
      <motion.p
        className="mt-5 text-base leading-8 text-muted-foreground sm:text-lg"
        variants={item}
      >
        {description}
      </motion.p>
    </motion.div>
  );
}
