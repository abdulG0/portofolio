"use client";

import { motion } from "framer-motion";

type SlideInProps = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: "left" | "right" | "up";
};

export function SlideIn({
  children,
  className,
  delay = 0,
  direction = "up",
}: SlideInProps) {
  const offset =
    direction === "left"
      ? { x: -64, y: 0 }
      : direction === "right"
        ? { x: 64, y: 0 }
        : { x: 0, y: 36 };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98, ...offset }}
      whileInView={{ opacity: 1, scale: 1, x: 0, y: 0 }}
      whileHover={{ y: -4, scale: 1.01 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8, ease: [0.36, 0.66, 0.04, 1], delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
