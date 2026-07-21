'use client';
import { useState } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import type { TrustCompany } from '@/lib/serverApi';

type Filter = 'all' | 'client' | 'partner' | 'worked-at';

export function ClientsFilterGrid({ companies }: { companies: TrustCompany[] }) {
  const t = useTranslations('clients');
  const [filter, setFilter] = useState<Filter>('all');

  const filtered = filter === 'all' ? companies : companies.filter((c) => c.category === filter);

  const labelFor = (f: Filter) =>
    f === 'all' ? t('categoryAll') : f === 'client' ? t('categoryClient') : f === 'partner' ? t('categoryPartner') : t('categoryWorkedAt');

  return (
    <>
      <div className="mb-8 flex flex-wrap gap-2">
        {(['all', 'client', 'partner', 'worked-at'] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            aria-pressed={filter === f}
            className={`rounded-full border px-4 py-1.5 text-sm transition-colors ${
              filter === f ? 'border-primary bg-primary/15 text-primary' : 'border-muted/25 text-muted hover:text-body'
            }`}
          >
            {labelFor(f)}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <p className="font-mono text-muted">{t('empty')}</p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((c) => (
            <div
              key={c.id}
              className="flex flex-col items-center gap-4 rounded-2xl border border-muted/15 bg-surface p-6 text-center shadow-lg transition-transform hover:-translate-y-1"
            >
              <div className="relative h-16 w-full">
                <Image src={c.logoUrl} alt={c.name} fill sizes="200px" className="object-contain" />
              </div>
              <div>
                <p className="font-medium text-body">{c.name}</p>
                {c.description && <p className="mt-1 text-sm text-muted">{c.description}</p>}
              </div>
              <a
                href={c.websiteUrl}
                target="_blank"
                rel="noreferrer"
                className="text-sm font-medium text-secondary underline-offset-4 hover:underline"
              >
                {t('visitWebsite')} →
              </a>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
