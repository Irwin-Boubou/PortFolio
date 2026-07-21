'use client';
import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import type { Skill } from '@/lib/serverApi';

const CATS = ['frontend', 'backend', 'design', 'tools'] as const;

function SkillCard({ skill, active }: { skill: Skill; active: boolean }) {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    setWidth(0);
    if (!active) return;
    const id = setTimeout(() => setWidth(skill.level), 50);
    return () => clearTimeout(id);
  }, [active, skill.level]);

  return (
    <div className="rounded-xl border border-muted/15 bg-surface p-5">
      <div className="flex items-center gap-3">
        {skill.iconUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={skill.iconUrl} alt={skill.name} className="h-8 w-8 object-contain" />
        ) : (
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 font-display text-sm font-semibold text-primary">
            {skill.name[0]?.toUpperCase()}
          </div>
        )}
        <span className="font-medium">{skill.name}</span>
        <span className="ml-auto font-mono text-xs text-muted">{skill.level}%</span>
      </div>
      <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-muted/20">
        <div
          className="h-full rounded-full bg-gradient-to-r from-primary to-secondary transition-all duration-700 ease-out"
          style={{ width: `${width}%` }}
        />
      </div>
    </div>
  );
}

export function SkillsTabs({ skills }: { skills: Skill[] }) {
  const t = useTranslations('about');
  const [cat, setCat] = useState<(typeof CATS)[number]>('frontend');
  const filtered = skills.filter((s) => s.category === cat);

  return (
    <div>
      <div className="flex flex-wrap gap-2">
        {CATS.map((c) => (
          <button
            key={c}
            onClick={() => setCat(c)}
            aria-pressed={cat === c}
            className={`rounded-full border px-4 py-1.5 text-sm transition-colors ${
              cat === c ? 'border-primary bg-primary/15 text-primary' : 'border-muted/25 text-muted hover:text-body'
            }`}
          >
            {t(`tabs.${c}`)}
          </button>
        ))}
      </div>
      <div key={cat} className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((s) => (
          <SkillCard key={s.id} skill={s} active />
        ))}
      </div>
    </div>
  );
}
