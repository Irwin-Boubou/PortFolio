'use client';
import { motion, useReducedMotion } from 'framer-motion';
import { PropsWithChildren } from 'react';

/**
 * Standard scroll-reveal wrapper (spec §5.5.1):
 * fade-up 40px, 0.6s, custom easing, fires when 80% into view.
 * Respects prefers-reduced-motion automatically.
 */
export function Section({ children, className = '', id }: PropsWithChildren<{ className?: string; id?: string }>) {
  const reduce = useReducedMotion();
  return (
    <motion.section
      id={id}
      className={`mx-auto max-w-content px-6 py-16 md:py-24 ${className}`}
      initial={reduce ? undefined : { opacity: 0, y: 40 }}
      whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
    >
      {children}
    </motion.section>
  );
}
