'use client';
import { motion, useInView } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { useTranslations } from 'next-intl';
import ReactMarkdown from 'react-markdown';
import { Section } from '@/components/layout/Section';

interface Stat { label: string; value: number }

/** Animated count-up stat (spec §7.1.2), counts once when scrolled into view. */
function Counter({ stat }: { stat: Stat }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const start = performance.now();
    const tick = (t: number) => {
      const p = Math.min((t - start) / 1200, 1);
      setN(Math.round(stat.value * (1 - Math.pow(1 - p, 3)))); // ease-out cubic
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [inView, stat.value]);
  return (
    <div className="rounded-2xl border border-muted/15 bg-surface p-6">
      <span ref={ref} className="font-display text-4xl font-bold text-primary">{n}+</span>
      <p className="mt-1 text-sm text-muted">{stat.label}</p>
    </div>
  );
}

export function About({ bio, stats, title }: { bio: string; stats: Stat[]; title?: string }) {
  const t = useTranslations('about');
  return (
    <Section id="about">
      <h2 className="mb-10 font-display text-4xl font-semibold md:text-5xl">{title || t('title')}</h2>
      <div className="grid gap-10 md:grid-cols-2">
        <div className="grid grid-cols-2 gap-4 self-start sm:grid-cols-3 md:grid-cols-2">
          {stats.map((s) => <Counter key={s.label} stat={s} />)}
        </div>
        <div>
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="prose prose-invert max-w-none text-lg leading-relaxed text-muted [&_p]:mb-4"
          >
            <ReactMarkdown>{bio}</ReactMarkdown>
          </motion.div>
          <div className="mt-6 flex gap-6 text-sm font-medium">
            <a href="/cv.pdf" className="text-secondary underline-offset-4 hover:underline">{t('downloadCv')} ↓</a>
          </div>
        </div>
      </div>
    </Section>
  );
}
