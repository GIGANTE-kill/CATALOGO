import { motion, type Variants } from "framer-motion";
import { type ReactNode } from "react";

type Variant = "fade-up" | "fade-left" | "fade-right" | "zoom-in" | "scale-in";

const variants: Record<Variant, Variants> = {
  "fade-up": {
    hidden: { opacity: 0, y: 40 },
    show: { opacity: 1, y: 0 },
  },
  "fade-left": {
    hidden: { opacity: 0, x: -60 },
    show: { opacity: 1, x: 0 },
  },
  "fade-right": {
    hidden: { opacity: 0, x: 60 },
    show: { opacity: 1, x: 0 },
  },
  "zoom-in": {
    hidden: { opacity: 0, scale: 0.85 },
    show: { opacity: 1, scale: 1 },
  },
  "scale-in": {
    hidden: { opacity: 0, scale: 0.95 },
    show: { opacity: 1, scale: 1 },
  },
};

type Props = {
  children: ReactNode;
  variant?: Variant;
  delay?: number;
  duration?: number;
  className?: string;
  /** When true, children are staggered. Each direct child should be wrapped in <Reveal.Item /> */
  stagger?: boolean;
  staggerDelay?: number;
  amount?: number;
};

export function Reveal({
  children,
  variant = "fade-up",
  delay = 0,
  duration = 0.7,
  className,
  stagger = false,
  staggerDelay = 0.12,
  amount = 0.2,
}: Props) {
  if (stagger) {
    return (
      <motion.div
        className={className}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount }}
        variants={{
          hidden: {},
          show: {
            transition: {
              staggerChildren: staggerDelay,
              delayChildren: delay,
            },
          },
        }}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount }}
      variants={variants[variant]}
      transition={{ duration, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

export function RevealItem({
  children,
  variant = "fade-up",
  duration = 0.7,
  className,
}: {
  children: ReactNode;
  variant?: Variant;
  duration?: number;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      variants={variants[variant]}
      transition={{ duration, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
