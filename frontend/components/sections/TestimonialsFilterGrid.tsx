'use client';
import { useState } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { FaStar } from 'react-icons/fa';
import { FiStar } from 'react-icons/fi';
import type { Testimonial } from '@/lib/serverApi';

type Filter = 'all' | '5' | '4plus';

function initials(name: string) {
  return name.split(' ').map((p) => p[0]).filter(Boolean).slice(0, 2).join('').toUpperCase();
}

function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex gap-1 text-secondary">
      {Array.from({ length: 5 }).map((_, i) => (i < rating ? <FaStar key={i} size={13} /> : <FiStar key={i} size={13} />))}
    </div>
  );
}

export function TestimonialsFilterGrid({ testimonials }: { testimonials: Testimonial[] }) {
  const t = useTranslations('testimonials');
  const [filter, setFilter] = useState<Filter>('all');

  const filtered = testimonials.filter((tm) => {
    if (filter === '5') return tm.rating === 5;
    if (filter === '4plus') return tm.rating >= 4;
    return true;
  });

  return (
    <>
      <div className="mb-8 flex flex-wrap gap-2">
        {([
          ['all', t('filterAll')],
          ['5', t('filter5')],
          ['4plus', t('filter4')],
        ] as const).map(([key, label]) => (
          <button
            key={key}
            onClick={() => setFilter(key)}
            aria-pressed={filter === key}
            className={`rounded-full border px-4 py-1.5 text-sm transition-colors ${
              filter === key ? 'border-primary bg-primary/15 text-primary' : 'border-muted/25 text-muted hover:text-body'
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <p className="font-mono text-muted">{t('empty')}</p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((tm) => (
            <div key={tm.id} className="relative rounded-2xl border border-muted/15 bg-surface p-6 shadow-lg">
              {tm.featured && (
                <span className="absolute right-4 top-4 rounded-full bg-secondary/15 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-secondary">
                  ⭐ {t('featured')}
                </span>
              )}
              <Stars rating={tm.rating} />
              <p className="mt-4 font-display italic text-body">&ldquo;{tm.content}&rdquo;</p>
              <div className="mt-5 flex items-center gap-3">
                {tm.avatarUrl ? (
                  <Image src={tm.avatarUrl} alt={tm.name} width={40} height={40} className="rounded-full object-cover" />
                ) : (
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-xs font-semibold text-white">
                    {initials(tm.name)}
                  </div>
                )}
                <div>
                  <p className="text-sm font-medium text-body">{tm.name}</p>
                  <p className="text-xs text-muted">{tm.role} @ {tm.company}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
