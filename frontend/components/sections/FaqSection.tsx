'use client';
import { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { FiChevronDown } from 'react-icons/fi';
import { Link } from '@/navigation';
import { Section } from '@/components/layout/Section';
import type { FaqItem } from '@/lib/serverApi';

const CATEGORY_KEYS: Record<string, string> = {
  general: 'categoryGeneral',
  process: 'categoryProcess',
  pricing: 'categoryPricing',
  technical: 'categoryTechnical',
};

export function FaqSection({ faqs, showAll = true, title, subtitle }: { faqs: FaqItem[]; showAll?: boolean; title?: string; subtitle?: string }) {
  const t = useTranslations('faq');
  const [openId, setOpenId] = useState<string | null>(null);
  const [category, setCategory] = useState('all');

  const categories = useMemo(() => Array.from(new Set(faqs.map((f) => f.category))), [faqs]);

  const filtered = category === 'all' ? faqs : faqs.filter((f) => f.category === category);
  const visible = showAll ? filtered : filtered.slice(0, 5);

  const categoryLabel = (c: string) => {
    const key = CATEGORY_KEYS[c.toLowerCase()];
    return key ? t(key as 'categoryGeneral') : c.charAt(0).toUpperCase() + c.slice(1);
  };

  return (
    <Section id="faq">
      <h2 className="font-display text-4xl font-semibold md:text-5xl">{title || t('title')}</h2>
      <p className="mt-2 text-muted">{subtitle || t('subtitle')}</p>

      {faqs.length === 0 ? (
        <p className="mt-8 font-mono text-muted">{t('empty')}</p>
      ) : (
        <>
          {categories.length > 1 && (
            <div className="mt-6 flex flex-wrap gap-2">
              <button
                onClick={() => setCategory('all')}
                aria-pressed={category === 'all'}
                className={`rounded-full border px-4 py-1.5 text-sm transition-colors ${
                  category === 'all' ? 'border-primary bg-primary/15 text-primary' : 'border-muted/25 text-muted hover:text-body'
                }`}
              >
                {t('categoryAll')}
              </button>
              {categories.map((c) => (
                <button
                  key={c}
                  onClick={() => setCategory(c)}
                  aria-pressed={category === c}
                  className={`rounded-full border px-4 py-1.5 text-sm transition-colors ${
                    category === c ? 'border-primary bg-primary/15 text-primary' : 'border-muted/25 text-muted hover:text-body'
                  }`}
                >
                  {categoryLabel(c)}
                </button>
              ))}
            </div>
          )}

          <div className="mt-8 divide-y divide-muted/15 rounded-2xl border border-muted/15 bg-surface">
            {visible.map((f) => {
              const isOpen = openId === f.id;
              return (
                <div key={f.id} className="px-6">
                  <button
                    onClick={() => setOpenId(isOpen ? null : f.id)}
                    aria-expanded={isOpen}
                    className="flex w-full items-center justify-between gap-4 py-5 text-left"
                  >
                    <span className="font-medium text-body">{f.question}</span>
                    <FiChevronDown className={`flex-shrink-0 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
                        className="overflow-hidden"
                      >
                        <p className="pb-5 text-sm text-muted">{f.answer}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

          {!showAll && filtered.length > 5 && (
            <div className="mt-6 text-right">
              <Link href="/faq" className="text-sm font-medium text-secondary underline-offset-4 hover:underline">
                {t('seeAll')} →
              </Link>
            </div>
          )}
        </>
      )}
    </Section>
  );
}
