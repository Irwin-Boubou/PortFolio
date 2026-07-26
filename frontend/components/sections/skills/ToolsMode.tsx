'use client';
/** Brand-logo tool browser: grouped by category, hover reveals a rich detail tooltip (spec §8C). */
import { useRef, useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import type { Skill } from '@/lib/serverApi';
import { SkillIcon } from '@/components/ui/SkillIcon';

const CATEGORY_ORDER = ['frontend', 'backend', 'design', 'ai', 'tools'] as const;

function ToolItem({ skill, usedInCount }: { skill: Skill; usedInCount: number }) {
  const t = useTranslations('skills');
  const reduce = useReducedMotion();
  const [hovered, setHovered] = useState(false);
  const [flip, setFlip] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const handleEnter = () => {
    setHovered(true);
    const el = ref.current;
    if (el) {
      const r = el.getBoundingClientRect();
      setFlip(r.left + 280 > window.innerWidth);
    }
  };

  return (
    <div
      ref={ref}
      onMouseEnter={handleEnter}
      onMouseLeave={() => setHovered(false)}
      className="relative shrink-0 snap-start"
    >
      <div className="flex w-24 flex-col items-center gap-2 rounded-xl border border-muted/15 bg-surface px-2 py-3 text-center transition-colors hover:border-primary/50 md:w-full">
        <SkillIcon skill={skill} size={48} />
        <p className="line-clamp-1 text-xs">{skill.name}</p>
      </div>
      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: 8, scale: 0.96 }}
            animate={reduce ? { opacity: 1 } : { opacity: 1, y: 0, scale: 1 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, y: 8, scale: 0.96 }}
            transition={{ duration: 0.15 }}
            className={`absolute top-full z-20 mt-2 w-64 rounded-xl border border-primary/30 bg-surface p-4 shadow-xl ${
              flip ? 'right-0' : 'left-0'
            }`}
          >
            <div className="flex items-center justify-between gap-2">
              <p className="font-display text-base font-semibold">{skill.name}</p>
              <span className="rounded-full bg-primary/15 px-2 py-0.5 text-[10px] uppercase tracking-wide text-primary">
                {skill.category}
              </span>
            </div>
            {skill.description && <p className="mt-2 text-xs leading-relaxed text-muted">{skill.description}</p>}
            <div className="mt-3">
              <div className="flex items-center justify-between text-[11px] text-muted">
                <span>{t('proficiency')}</span>
                <span>{skill.level}%</span>
              </div>
              <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-muted/20">
                <motion.div
                  className="h-full rounded-full bg-gradient-to-r from-primary to-secondary"
                  initial={{ width: 0 }}
                  animate={{ width: `${skill.level}%` }}
                  transition={{ duration: 0.6, ease: 'easeOut' }}
                />
              </div>
            </div>
            {usedInCount > 0 && (
              <p className="mt-3 text-[11px] text-secondary">
                {t('usedIn')} {usedInCount}
              </p>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function ToolsMode({ skills, usageCounts = {} }: { skills: Skill[]; usageCounts?: Record<string, number> }) {
  const t = useTranslations('skills');
  const catLabels: Record<string, string> = {
    frontend: t('categories.frontend'),
    backend: t('categories.backend'),
    design: t('categories.design'),
    ai: t('categories.ai'),
    tools: t('categories.tools'),
  };
  const groups = CATEGORY_ORDER.map((cat) => ({ cat, items: skills.filter((s) => s.category === cat) })).filter(
    (g) => g.items.length > 0,
  );

  return (
    <div className="mt-8 space-y-10">
      {groups.map((g) => (
        <div key={g.cat}>
          <h3 className="mb-4 text-sm font-medium uppercase tracking-wide text-muted">{catLabels[g.cat]}</h3>
          <div className="flex snap-x gap-3 overflow-x-auto pb-2 md:grid md:grid-cols-4 md:gap-4 md:overflow-visible lg:grid-cols-6">
            {g.items.map((s) => (
              <ToolItem key={s.id} skill={s} usedInCount={usageCounts[s.name.toLowerCase()] ?? 0} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
