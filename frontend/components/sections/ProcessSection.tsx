'use client';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Section } from '@/components/layout/Section';
import type { ProcessStep } from '@/lib/serverApi';

export function ProcessSection({ steps }: { steps: ProcessStep[] }) {
  const t = useTranslations('process');

  return (
    <Section id="process">
      <h2 className="font-display text-4xl font-semibold md:text-5xl">{t('title')}</h2>
      <p className="mt-2 text-muted">{t('subtitle')}</p>

      <div className="relative mt-14 flex flex-col gap-10 md:flex-row md:gap-6">
        {steps.length > 1 && (
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: '100%' }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
            className="absolute left-0 top-6 hidden h-0.5 bg-gradient-to-r from-primary to-secondary md:block"
          />
        )}
        {steps.map((s, i) => (
          <motion.div
            key={s.id}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.12 }}
            className="relative flex-1"
          >
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full border border-primary/40 bg-surface text-xl">
              {s.icon}
            </div>
            <span className="font-mono text-xs uppercase tracking-widest text-secondary">
              {t('step')} {String(s.stepNumber).padStart(2, '0')}
            </span>
            <h3 className="mt-1 font-display text-lg font-semibold">{s.title}</h3>
            <p className="mt-2 text-sm text-muted">{s.description}</p>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
