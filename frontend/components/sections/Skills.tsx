'use client';
import dynamic from 'next/dynamic';
import { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Section } from '@/components/layout/Section';
import { SkillIcon } from '@/components/ui/SkillIcon';
import { ToolsMode } from '@/components/sections/skills/ToolsMode';
import type { Skill } from '@/lib/serverApi';

const SkillsOrb = dynamic(() => import('@/components/3d/SkillsOrb'), {
  ssr: false,
  loading: () => <div className="h-[420px] animate-pulse rounded-2xl bg-surface" />,
});

const CATS = ['all', 'frontend', 'backend', 'design', 'ai', 'tools'] as const;
const GRID_ORDER = ['frontend', 'backend', 'design', 'ai', 'tools'] as const;
type ViewMode = '3d' | 'grid' | 'tools';

function GridView({ skills, catLabels }: { skills: Skill[]; catLabels: Record<string, string> }) {
  const reduce = useReducedMotion();
  const groups = GRID_ORDER.map((cat) => ({ cat, items: skills.filter((s) => s.category === cat) })).filter(
    (g) => g.items.length > 0,
  );

  return (
    <div className="mt-8 space-y-10">
      {groups.map((g) => (
        <div key={g.cat}>
          <h3 className="mb-4 text-sm font-medium uppercase tracking-wide text-muted">{catLabels[g.cat]}</h3>
          <div className="flex flex-wrap gap-4">
            {g.items.map((s, i) => (
              <motion.div
                key={s.id}
                initial={reduce ? { opacity: 0 } : { opacity: 0, y: 30, rotateX: 15, scale: 0.9 }}
                whileInView={reduce ? { opacity: 1 } : { opacity: 1, y: 0, rotateX: 0, scale: 1 }}
                viewport={{ once: true, margin: '-40px' }}
                whileHover={{ scale: 1.08 }}
                transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1], delay: i * 0.03 }}
                className="flex h-16 w-16 flex-col items-center justify-center gap-1 rounded-2xl border border-muted/15 bg-surface p-2 text-center transition-colors hover:border-primary/60 hover:shadow-[0_0_20px_rgba(108,99,255,0.3)] sm:h-20 sm:w-20"
                style={{ perspective: '600px' }}
              >
                <SkillIcon skill={s} size={36} />
                <p className="line-clamp-1 text-[10px] sm:text-xs">{s.name}</p>
              </motion.div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export function Skills({ skills }: { skills: Skill[] }) {
  const t = useTranslations('skills');
  const [cat, setCat] = useState<(typeof CATS)[number]>('all');
  const [view, setView] = useState<ViewMode>('3d');

  const filtered = cat === 'all' ? skills : skills.filter((s) => s.category === cat);

  const catLabels: Record<(typeof CATS)[number], string> = {
    all: t('categories.all'),
    frontend: t('categories.frontend'),
    backend: t('categories.backend'),
    design: t('categories.design'),
    ai: t('categories.ai'),
    tools: t('categories.tools'),
  };

  const viewBtn = (mode: ViewMode, icon: string, text: string) => (
    <button
      onClick={() => setView(mode)}
      aria-pressed={view === mode}
      className={`rounded-full border px-4 py-1.5 text-sm transition-colors ${
        view === mode ? 'border-primary bg-primary/15 text-primary' : 'border-muted/25 text-muted hover:text-body'
      }`}
    >
      <span className="mr-1.5" aria-hidden="true">{icon}</span>
      {text}
    </button>
  );

  return (
    <Section id="skills">
      <h2 className="font-display text-4xl font-semibold md:text-5xl">{t('title')}</h2>
      <p className="mt-2 text-muted">{t('subtitle')}</p>

      <div className="mt-6 flex flex-wrap items-center gap-2">
        {viewBtn('3d', '🌐', t('view3d'))}
        {viewBtn('grid', '⊞', t('viewGrid'))}
        <span aria-hidden="true" className="mx-2 h-6 w-px bg-muted/20" />
        {viewBtn('tools', '🧰', t('viewTools'))}
      </div>

      {view !== 'tools' && (
        <div className="mt-4 flex flex-wrap gap-2">
          {CATS.map((c) => (
            <button
              key={c}
              onClick={() => setCat(c)}
              aria-pressed={cat === c}
              className={`rounded-full border px-4 py-1.5 text-sm transition-colors ${
                cat === c ? 'border-primary bg-primary/15 text-primary' : 'border-muted/25 text-muted hover:text-body'
              }`}
            >
              {catLabels[c]}
            </button>
          ))}
        </div>
      )}

      {view === 'tools' && <ToolsMode skills={skills} />}

      {view === 'grid' && <GridView skills={filtered} catLabels={catLabels} />}

      {view === '3d' && (
        <>
          {/* 3D orb on desktop only; grid fallback on mobile / no-WebGL */}
          <div className="mt-4 hidden md:block">
            {filtered.length > 0 && (
              <SkillsOrb skills={filtered} dimCategory={cat === 'all' ? null : cat} />
            )}
          </div>
          <div className="md:hidden">
            <GridView skills={filtered} catLabels={catLabels} />
          </div>
        </>
      )}
    </Section>
  );
}
