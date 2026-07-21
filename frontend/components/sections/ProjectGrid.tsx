'use client';
import { useMemo, useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Link } from '@/navigation';
import type { Project, Tag } from '@/lib/serverApi';

/**
 * Shared filterable project grid used by both work pages.
 * `terminal` variant = dev aesthetic (§7.2); default = gallery (§7.3).
 */
export function ProjectGrid({ projects, tags, variant }: { projects: Project[]; tags: Tag[]; variant: 'terminal' | 'gallery' }) {
  const t = useTranslations('work');
  const [active, setActive] = useState<string[]>([]);
  const toggle = (slug: string) =>
    setActive((a) => (a.includes(slug) ? a.filter((s) => s !== slug) : [...a, slug]));

  const filtered = useMemo(
    () => (active.length === 0 ? projects : projects.filter((p) => p.tags.some((tg) => active.includes(tg.slug)))),
    [projects, active],
  );

  const hrefBase = variant === 'terminal' ? '/work/dev/' : '/work/design-project/';

  return (
    <div>
      {tags.length > 0 && (
        <div className="mb-10 flex flex-wrap gap-2">
          {tags.map((tag) => (
            <button
              key={tag.slug}
              onClick={() => toggle(tag.slug)}
              aria-pressed={active.includes(tag.slug)}
              className={`rounded-full border px-4 py-1.5 font-mono text-xs transition-colors ${
                active.includes(tag.slug)
                  ? 'border-secondary bg-secondary/10 text-secondary'
                  : 'border-muted/25 text-muted hover:text-body'
              }`}
            >
              {tag.name}
            </button>
          ))}
        </div>
      )}

      {filtered.length === 0 ? (
        <p className="font-mono text-muted">
          <span className="text-success">$</span> {t('empty')}<span className="animate-pulse">▌</span>
        </p>
      ) : (
        <div className={variant === 'gallery' ? 'columns-1 gap-6 sm:columns-2 lg:columns-3 [&>*]:mb-6' : 'grid gap-6 md:grid-cols-2 lg:grid-cols-3'}>
          {filtered.map((p, i) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: (i % 3) * 0.08 }}
              className={variant === 'gallery' ? 'break-inside-avoid' : ''}
            >
              <Link href={`${hrefBase}${p.slug}`} className="group block overflow-hidden rounded-xl border border-muted/15 bg-surface transition-all hover:-translate-y-1 hover:border-primary/50 hover:shadow-[0_8px_40px_rgba(108,99,255,0.2)]">
                {variant === 'terminal' && (
                  <div className="flex items-center gap-1.5 border-b border-muted/15 px-4 py-2.5">
                    <span className="h-2.5 w-2.5 rounded-full bg-error/80" />
                    <span className="h-2.5 w-2.5 rounded-full bg-yellow-400/80" />
                    <span className="h-2.5 w-2.5 rounded-full bg-success/80" />
                    <span className="ml-2 truncate font-mono text-xs text-muted">~/{p.slug}</span>
                  </div>
                )}
                <div className="relative aspect-video">
                  <Image src={p.thumbnailUrl} alt={p.title} fill sizes="(max-width:768px) 100vw, 33vw"
                         className="object-cover transition-transform duration-500 group-hover:scale-105" />
                </div>
                <div className="p-5">
                  <h3 className="font-display text-lg font-semibold">{p.title}</h3>
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {(variant === 'terminal' ? p.techStack : p.tools).slice(0, 4).map((tech) => (
                      <span key={tech} className="rounded bg-primary/10 px-2 py-0.5 font-mono text-[11px] text-primary">{tech}</span>
                    ))}
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
