'use client';
import { useMemo, useState } from 'react';
import { useTranslations } from 'next-intl';
import { FiSearch } from 'react-icons/fi';
import type { FaqItem } from '@/lib/serverApi';
import { FaqSection } from '@/components/sections/FaqSection';

export function FaqSearchGrid({ faqs }: { faqs: FaqItem[] }) {
  const t = useTranslations('faq');
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return faqs;
    return faqs.filter((f) => f.question.toLowerCase().includes(q) || f.answer.toLowerCase().includes(q));
  }, [faqs, query]);

  return (
    <div>
      <div className="relative mb-8 max-w-md">
        <FiSearch className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-muted" />
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={t('search')}
          className="w-full rounded-xl border border-muted/25 bg-surface py-3 pl-11 pr-4 text-body placeholder:text-muted/60 focus:border-primary focus:outline-none"
        />
      </div>
      {filtered.length === 0 ? (
        <p className="font-mono text-muted">{t('empty')}</p>
      ) : (
        <FaqSection faqs={filtered} showAll />
      )}
    </div>
  );
}
