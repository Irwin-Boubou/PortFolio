'use client';
import dynamic from 'next/dynamic';
import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Section } from '@/components/layout/Section';
import type { Skill } from '@/lib/serverApi';

const SkillsOrb = dynamic(() => import('@/components/3d/SkillsOrb'), {
  ssr: false,
  loading: () => <div className="h-[420px] animate-pulse rounded-2xl bg-surface" />,
});

const CATS = ['all', 'frontend', 'backend', 'design', 'tools'] as const;

export function Skills({ skills }: { skills: Skill[] }) {
  const t = useTranslations('skills');
  const [cat, setCat] = useState<(typeof CATS)[number]>('all');
  const filtered = cat === 'all' ? skills : skills.filter((s) => s.category === cat);
  const label = (c: string) => (c === 'all' ? t('all') : c === 'tools' ? t('toolsCat') : t(c as 'frontend'));

  return (
    <Section id="skills">
      <h2 className="font-display text-4xl font-semibold md:text-5xl">{t('title')}</h2>
      <p className="mt-2 text-muted">{t('subtitle')}</p>
      <div className="mt-6 flex flex-wrap gap-2">
        {CATS.map((c) => (
          <button
            key={c}
            onClick={() => setCat(c)}
            aria-pressed={cat === c}
            className={`rounded-full border px-4 py-1.5 text-sm transition-colors ${
              cat === c ? 'border-primary bg-primary/15 text-primary' : 'border-muted/25 text-muted hover:text-body'
            }`}
          >
            {label(c)}
          </button>
        ))}
      </div>
      {/* 3D orb on desktop, static chip grid as mobile/no-WebGL fallback */}
      <div className="mt-4 hidden md:block">
        {filtered.length > 0 && <SkillsOrb skills={filtered} />}
      </div>
      <ul className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 md:hidden">
        {filtered.map((s) => (
          <li key={s.id} className="rounded-xl border border-muted/15 bg-surface px-4 py-3 text-sm">
            {s.name}
            <div className="mt-2 h-1 overflow-hidden rounded-full bg-muted/20">
              <div className="h-full bg-gradient-to-r from-primary to-secondary" style={{ width: `${s.level}%` }} />
            </div>
          </li>
        ))}
      </ul>
    </Section>
  );
}
