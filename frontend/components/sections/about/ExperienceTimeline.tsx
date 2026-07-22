'use client';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import type { Experience } from '@/lib/serverApi';

function initials(name: string) {
  return name.split(' ').map((p) => p[0]).filter(Boolean).slice(0, 2).join('').toUpperCase();
}

function LogoOrInitials({ src, name }: { src: string | null; name: string }) {
  return (
    <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full border border-muted/20 bg-surface">
      {src ? (
        <Image src={src} alt={name} fill sizes="48px" className="object-cover" />
      ) : (
        <div className="flex h-full w-full items-center justify-center font-display text-sm font-semibold text-primary">
          {initials(name)}
        </div>
      )}
    </div>
  );
}

function BulletList({ description }: { description: string }) {
  const lines = description.split('\n').map((l) => l.trim()).filter(Boolean);
  return (
    <ul className="mt-3 space-y-1.5 text-left text-sm leading-relaxed text-muted">
      {lines.map((line, i) => (
        <li key={i} className="list-disc pl-1">
          {line.replace(/^-\s*/, '')}
        </li>
      ))}
    </ul>
  );
}

export function ExperienceTimeline({ experience }: { experience: Experience[] }) {
  const t = useTranslations('about');

  return (
    <div className="relative">
      {/* Outer wrapper owns the centering position; Framer Motion owns `transform` on the inner
          element for the scaleY draw-in, so the two never fight over the same CSS property. */}
      <div className="absolute bottom-0 left-4 top-0 w-px md:left-1/2 md:-translate-x-1/2" aria-hidden="true">
        <motion.div
          initial={{ scaleY: 0 }}
          whileInView={{ scaleY: 1 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 1 }}
          style={{ transformOrigin: 'top' }}
          className="h-full w-px bg-gradient-to-b from-primary to-secondary"
        />
      </div>
      <ol className="space-y-10">
        {experience.map((e, i) => {
          const even = i % 2 === 0;
          return (
            <li key={e.id} className="relative pl-12 md:pl-0">
              <span
                className="absolute left-[9px] top-1.5 h-3.5 w-3.5 rounded-full border-2 border-bg bg-primary md:left-1/2 md:-translate-x-1/2"
                aria-hidden="true"
              />
              <div className={`md:flex ${even ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                <div className={`md:w-1/2 ${even ? 'md:pr-10 md:text-right' : 'md:pl-10'}`}>
                  <div className="rounded-2xl border border-muted/15 bg-surface p-6 text-left">
                    <div className={`flex items-start gap-4 ${even ? 'md:flex-row-reverse' : ''}`}>
                      <LogoOrInitials src={e.logoUrl} name={e.company} />
                      <div className="min-w-0 flex-1">
                        <div className={`flex flex-wrap items-center gap-2 ${even ? 'md:justify-end' : ''}`}>
                          <h3 className="font-display text-lg font-semibold">{e.role}</h3>
                          {e.current && (
                            <span className="animate-pulse rounded-full bg-success/15 px-2.5 py-0.5 text-xs font-medium text-success">
                              ● {t('now')}
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-muted">
                          {e.company}
                          {e.location ? ` · ${e.location}` : ''}
                        </p>
                        <p className="mt-1 font-mono text-xs text-secondary">{e.period}</p>
                      </div>
                    </div>
                    <BulletList description={e.description} />
                    {e.tags?.length > 0 && (
                      <div className={`mt-4 flex flex-wrap gap-2 ${even ? 'md:justify-end' : ''}`}>
                        {e.tags.map((tag) => (
                          <span key={tag} className="rounded-full bg-primary/10 px-2.5 py-1 text-xs text-primary">
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
                <div className="hidden md:block md:w-1/2" />
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
