'use client';
import { useState } from 'react';
import Image from 'next/image';
import { motion, useReducedMotion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Link } from '@/navigation';
import { Section } from '@/components/layout/Section';
import type { Project } from '@/lib/serverApi';

/** Featured work with dev/design tab toggle (spec §7.1.4). */
export function FeaturedWork({ projects }: { projects: Project[] }) {
  const t = useTranslations('work');
  const reduce = useReducedMotion();
  const STAGGER = 0.12;
  const [tab, setTab] = useState<'DEVELOPMENT' | 'DESIGN'>('DEVELOPMENT');
  const visible = projects.filter((p) => p.category === tab).slice(0, 3);
  const seeAllHref = tab === 'DEVELOPMENT' ? '/work/development' : '/work/design';

  return (
    <Section id="work">
      <div className="mb-10 flex flex-wrap items-end justify-between gap-6">
        <h2 className="font-display text-4xl font-semibold md:text-5xl">{t('featured')}</h2>
        <div className="flex rounded-full border border-muted/20 p-1 text-sm" role="tablist">
          {(['DEVELOPMENT', 'DESIGN'] as const).map((c) => (
            <button
              key={c}
              role="tab"
              aria-selected={tab === c}
              onClick={() => setTab(c)}
              className={`rounded-full px-5 py-2 transition-colors ${tab === c ? 'bg-primary text-white' : 'text-muted hover:text-body'}`}
            >
              {c === 'DEVELOPMENT' ? t('devTab') : t('designTab')}
            </button>
          ))}
        </div>
      </div>

      {visible.length === 0 ? (
        <p className="font-mono text-muted">{t('empty')}</p>
      ) : (
        <div className="grid gap-6 md:grid-cols-3" style={{ perspective: '1200px' }}>
          {visible.map((p, i) => (
            <motion.div
              key={p.id}
              initial={reduce ? { opacity: 0 } : { opacity: 0, y: 60, rotateX: 15, scale: 0.95 }}
              whileInView={reduce ? { opacity: 1 } : { opacity: 1, y: 0, rotateX: 0, scale: 1 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1], delay: i * STAGGER }}
            >
              <Link
                href={`${p.category === 'DEVELOPMENT' ? '/work/dev/' : '/work/design-project/'}${p.slug}`}
                className="group block overflow-hidden rounded-2xl border border-muted/15 bg-surface transition-colors hover:border-primary/50"
              >
                <div className="relative aspect-video overflow-hidden">
                  <Image
                    src={p.thumbnailUrl}
                    alt={p.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-5">
                  <span className="font-mono text-[11px] uppercase tracking-widest text-secondary">
                    {p.category === 'DEVELOPMENT' ? t('devTab') : t('designTab')}
                  </span>
                  <h3 className="mt-1 font-display text-lg font-semibold">{p.title}</h3>
                  {p.subtitle && <p className="mt-1 line-clamp-2 text-sm text-muted">{p.subtitle}</p>}
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      )}
      <div className="mt-8 text-right">
        <Link href={seeAllHref} className="text-sm font-medium text-secondary underline-offset-4 hover:underline">
          {t('seeAll')} →
        </Link>
      </div>
    </Section>
  );
}
