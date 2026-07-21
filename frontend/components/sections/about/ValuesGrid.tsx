'use client';
import { motion } from 'framer-motion';
import type { Value } from '@/lib/serverApi';

export function ValuesGrid({ values }: { values: Value[] }) {
  return (
    <div className="grid gap-6 md:grid-cols-3">
      {values.map((v, i) => (
        <motion.div
          key={v.id}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, delay: i * 0.1 }}
          className="rounded-2xl border border-muted/15 bg-surface p-7 text-center"
        >
          <div className="relative mx-auto mb-4 flex h-16 w-16 items-center justify-center">
            <span className="absolute inset-0 rounded-full bg-primary/20 blur-xl" aria-hidden="true" />
            <span className="relative text-4xl">{v.icon}</span>
          </div>
          <h3 className="font-display text-lg font-semibold">{v.title}</h3>
          <p className="mt-2 text-sm leading-relaxed text-muted">{v.description}</p>
        </motion.div>
      ))}
    </div>
  );
}
