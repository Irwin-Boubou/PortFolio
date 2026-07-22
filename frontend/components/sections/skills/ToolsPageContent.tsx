'use client';
/** Standalone /tools page body: hero, featured row, sticky filter, full tool grid (spec §8D). */
import { useMemo, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Link } from '@/navigation';
import type { Skill, Project } from '@/lib/serverApi';
import { SkillIcon } from '@/components/ui/SkillIcon';

const CATS = ['all', 'frontend', 'backend', 'design', 'ai', 'tools'] as const;

function projectsFor(skillName: string, projects: Project[]) {
  return projects.filter((p) => p.techStack.some((ts) => ts.toLowerCase() === skillName.toLowerCase()));
}

function ToolCard({ skill, projects, index }: { skill: Skill; projects: Project[]; index: number }) {
  const t = useTranslations('skills');
  const reduce = useReducedMotion();
  const used = projectsFor(skill.name, projects);
  const glow = skill.brandColor ? `${skill.brandColor}4d` : 'rgba(108,99,255,0.3)';

  return (
    <motion.div
      initial={reduce ? { opacity: 0 } : { opacity: 0, y: 50, rotateX: 15, scale: 0.95 }}
      whileInView={reduce ? { opacity: 1 } : { opacity: 1, y: 0, rotateX: 0, scale: 1 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1], delay: index * 0.05 }}
      style={{ perspective: '1000px' }}
      className="flex flex-col rounded-2xl border border-muted/15 bg-surface p-6"
    >
      <div className="flex items-center gap-4">
        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl" style={{ boxShadow: `0 0 30px ${glow}` }}>
          <SkillIcon skill={skill} size={44} />
        </div>
        <div className="min-w-0">
          <h3 className="truncate font-display text-lg font-semibold">{skill.name}</h3>
          <span className="mt-1 inline-block rounded-full bg-primary/15 px-2 py-0.5 text-[10px] uppercase tracking-wide text-primary">
            {skill.category}
          </span>
        </div>
      </div>
      {skill.description && <p className="mt-4 text-sm leading-relaxed text-muted">{skill.description}</p>}
      <div className="mt-4">
        <div className="flex items-center justify-between text-[11px] text-muted">
          <span>{t('proficiency')}</span>
          <span>{skill.level}%</span>
        </div>
        <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-muted/20">
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-primary to-secondary"
            initial={{ width: 0 }}
            whileInView={{ width: `${skill.level}%` }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: 'easeOut', delay: index * 0.05 + 0.2 }}
          />
        </div>
      </div>
      {used.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-2">
          {used.slice(0, 4).map((p) => (
            <Link
              key={p.id}
              href={`/work/dev/${p.slug}`}
              className="rounded-full border border-muted/20 px-2.5 py-1 text-[11px] text-muted transition-colors hover:border-primary/50 hover:text-primary"
            >
              {p.title}
            </Link>
          ))}
        </div>
      )}
    </motion.div>
  );
}

export function ToolsPageContent({ skills, projects }: { skills: Skill[]; projects: Project[] }) {
  const t = useTranslations('skills');
  const tp = useTranslations('toolsPage');
  const reduce = useReducedMotion();
  const [cat, setCat] = useState<(typeof CATS)[number]>('all');

  const catLabels: Record<(typeof CATS)[number], string> = {
    all: t('categories.all'),
    frontend: t('categories.frontend'),
    backend: t('categories.backend'),
    design: t('categories.design'),
    ai: t('categories.ai'),
    tools: t('categories.tools'),
  };

  const counts = useMemo(() => {
    const c: Record<string, number> = { all: skills.length };
    for (const cc of ['frontend', 'backend', 'design', 'ai', 'tools']) {
      c[cc] = skills.filter((s) => s.category === cc).length;
    }
    return c;
  }, [skills]);

  const featured = useMemo(() => skills.filter((s) => s.featured).slice(0, 3), [skills]);
  const filtered = cat === 'all' ? skills : skills.filter((s) => s.category === cat);
  const floatingLogos = useMemo(() => skills.filter((s) => s.iconUrl).slice(0, 10), [skills]);

  return (
    <>
      <section className="relative overflow-hidden px-6 pb-16 pt-32 text-center">
        <div className="pointer-events-none absolute inset-0 hidden md:block" aria-hidden="true">
          {floatingLogos.map((s, i) => (
            <motion.div
              key={s.id}
              className="absolute opacity-20"
              style={{ left: `${((i * 37) % 90) + 2}%`, top: `${((i * 53) % 80) + 5}%`, width: 40, height: 40 }}
              animate={reduce ? undefined : { y: [0, -20, 0], x: [0, 10, 0] }}
              transition={{ duration: 15 + i * 2, repeat: Infinity, ease: 'easeInOut' }}
            >
              <SkillIcon skill={s} size={40} />
            </motion.div>
          ))}
        </div>
        <div className="relative mx-auto max-w-content">
          <h1 className="font-display text-4xl font-semibold md:text-6xl">{tp('title')}</h1>
          <p className="mx-auto mt-4 max-w-2xl text-muted">{tp('subtitle')}</p>
        </div>
      </section>

      {featured.length > 0 && (
        <section className="mx-auto max-w-content px-6 pb-16">
          <h2 className="mb-6 font-display text-2xl font-semibold">{tp('featured')}</h2>
          <div className="grid gap-6 md:grid-cols-3" style={{ perspective: '1200px' }}>
            {featured.map((s, i) => (
              <motion.div
                key={s.id}
                initial={reduce ? { opacity: 0 } : { opacity: 0, y: 40, rotateX: 15, scale: 0.95 }}
                whileInView={reduce ? { opacity: 1 } : { opacity: 1, y: 0, rotateX: 0, scale: 1 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.6, delay: i * 0.1, ease: [0.25, 0.1, 0.25, 1] }}
                className="rounded-2xl border border-primary/30 bg-surface p-8 text-center"
              >
                <div
                  className="mx-auto flex h-16 w-16 items-center justify-center"
                  style={{ boxShadow: `0 0 40px ${s.brandColor ? `${s.brandColor}66` : 'rgba(108,99,255,0.4)'}` }}
                >
                  <SkillIcon skill={s} size={56} />
                </div>
                <h3 className="mt-4 font-display text-xl font-semibold">{s.name}</h3>
                {s.description && <p className="mt-3 font-display text-sm italic text-muted">&ldquo;{s.description}&rdquo;</p>}
              </motion.div>
            ))}
          </div>
        </section>
      )}

      <div className="sticky top-20 z-10 border-y border-muted/15 bg-bg/90 backdrop-blur">
        <div className="mx-auto flex max-w-content flex-wrap gap-2 px-6 py-4">
          {CATS.map((c) => (
            <button
              key={c}
              onClick={() => setCat(c)}
              aria-pressed={cat === c}
              className={`relative overflow-hidden rounded-full border px-4 py-1.5 text-sm transition-colors ${
                cat === c ? 'border-primary text-primary' : 'border-muted/25 text-muted hover:text-body'
              }`}
            >
              {cat === c && (
                <motion.span
                  layoutId="tools-active-cat"
                  className="absolute inset-0 -z-10 rounded-full bg-primary/15"
                  transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                />
              )}
              {catLabels[c]} ({counts[c] ?? 0})
            </button>
          ))}
        </div>
      </div>

      <section className="mx-auto max-w-content px-6 py-16">
        {filtered.length === 0 ? (
          <p className="text-center text-muted">{tp('noTools')}</p>
        ) : (
          <>
            <h2 className="mb-6 font-display text-2xl font-semibold">{tp('allTools')}</h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filtered.map((s, i) => (
                <ToolCard key={s.id} skill={s} projects={projects} index={i} />
              ))}
            </div>
          </>
        )}
      </section>
    </>
  );
}
