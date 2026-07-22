'use client';
import { useRef } from 'react';
import Image from 'next/image';
import { motion, useReducedMotion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { FiAward } from 'react-icons/fi';
import type { Award } from '@/lib/serverApi';
import { Section } from '@/components/layout/Section';

const STAGGER = 0.1;

function AwardCard({ award, locale, index }: { award: Award; locale: string; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left - r.width / 2) / (r.width / 2);
    const y = (e.clientY - r.top - r.height / 2) / (r.height / 2);
    el.style.transform = `perspective(600px) rotateX(${-y * 6}deg) rotateY(${x * 6}deg)`;
  };
  const onLeave = () => {
    if (ref.current) ref.current.style.transform = 'perspective(600px) rotateX(0) rotateY(0)';
  };

  const formattedDate = new Date(award.date).toLocaleDateString(locale, { year: 'numeric', month: 'long' });
  const content = (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      initial={reduce ? { opacity: 0 } : { opacity: 0, y: 60, rotateX: 15, scale: 0.95 }}
      whileInView={reduce ? { opacity: 1 } : { opacity: 1, y: 0, rotateX: 0, scale: 1 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1], delay: index * STAGGER }}
      className="rounded-2xl border border-muted/15 bg-surface p-6 shadow-lg transition-transform duration-200 ease-out will-change-transform"
    >
      <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary">
        {award.badgeUrl ? (
          <div className="relative h-14 w-14">
            <Image src={award.badgeUrl} alt={award.title} fill sizes="56px" className="object-contain" />
          </div>
        ) : (
          <FiAward size={24} />
        )}
      </div>
      <h3 className="font-display text-lg font-semibold">{award.title}</h3>
      <p className="mt-1 text-sm text-muted">{award.issuer}</p>
      <p className="mt-2 font-mono text-xs text-secondary">{formattedDate}</p>
    </motion.div>
  );

  if (award.url) {
    return (
      <a href={award.url} target="_blank" rel="noreferrer" className="block">
        {content}
      </a>
    );
  }
  return content;
}

export function AwardsSection({ awards, locale, title, subtitle }: { awards: Award[]; locale: string; title?: string; subtitle?: string }) {
  const t = useTranslations('awards');

  return (
    <Section id="awards">
      <h2 className="font-display text-4xl font-semibold md:text-5xl">{title || t('title')}</h2>
      <p className="mt-2 text-muted">{subtitle || t('subtitle')}</p>

      {awards.length === 0 ? (
        <p className="mt-8 font-mono text-muted">{t('empty')}</p>
      ) : (
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3" style={{ perspective: '1200px' }}>
          {awards.map((a, i) => (
            <AwardCard key={a.id} award={a} locale={locale} index={i} />
          ))}
        </div>
      )}
    </Section>
  );
}
