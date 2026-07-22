'use client';
import { motion, useReducedMotion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { FiCheck } from 'react-icons/fi';
import { Link } from '@/navigation';
import { Section } from '@/components/layout/Section';
import type { PricingPackage } from '@/lib/serverApi';

const STAGGER = 0.09;

export function PricingSection({ packages, title, subtitle }: { packages: PricingPackage[]; title?: string; subtitle?: string }) {
  const t = useTranslations('pricing');
  const reduce = useReducedMotion();

  return (
    <Section id="pricing">
      <h2 className="font-display text-4xl font-semibold md:text-5xl">{title || t('title')}</h2>
      <p className="mt-2 text-muted">{subtitle || t('subtitle')}</p>

      {packages.length === 0 ? (
        <p className="mt-8 font-mono text-muted">{t('empty')}</p>
      ) : (
        <div className="mt-10 grid gap-6 md:grid-cols-3" style={{ perspective: '1200px' }}>
          {packages.map((pkg, i) => (
            <motion.div
              key={pkg.id}
              initial={reduce ? { opacity: 0 } : { opacity: 0, y: 60, rotateX: 15, scale: 0.95 }}
              whileInView={reduce ? { opacity: 1 } : { opacity: 1, y: 0, rotateX: 0, scale: 1 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1], delay: i * STAGGER }}
              className={`relative flex flex-col rounded-2xl border bg-surface p-8 shadow-lg transition-transform hover:-translate-y-1 ${
                pkg.highlighted ? 'ring-2 ring-primary shadow-[0_0_40px_rgba(108,99,255,0.35)]' : 'border-muted/15'
              }`}
            >
              {pkg.highlighted && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-primary px-4 py-1 text-xs font-semibold text-white">
                  {t('popular')}
                </span>
              )}
              <h3 className="font-display text-xl font-semibold">{pkg.name}</h3>
              <p className="mt-1 text-sm text-muted">{pkg.tagline}</p>
              <p className="mt-6 font-display text-3xl font-bold">
                {pkg.price}
                {pkg.currency && pkg.price !== 'On request' && <span className="text-lg font-normal text-muted"> {pkg.currency}</span>}
                {pkg.period && <span className="text-sm font-normal text-muted"> /{pkg.period}</span>}
              </p>
              <ul className="mt-6 flex-1 space-y-3">
                {pkg.features.map((f, fi) => (
                  <li key={fi} className="flex items-start gap-2 text-sm text-body">
                    <FiCheck className="mt-0.5 flex-shrink-0 text-primary" />
                    {f}
                  </li>
                ))}
              </ul>
              {pkg.ctaLabel &&
                (pkg.ctaUrl?.startsWith('/') ? (
                  <Link
                    href={pkg.ctaUrl}
                    className="mt-8 inline-block rounded-full bg-primary px-6 py-3 text-center text-sm font-medium text-white transition-colors hover:bg-[#5a51f0]"
                  >
                    {pkg.ctaLabel}
                  </Link>
                ) : (
                  <a
                    href={pkg.ctaUrl ?? '#'}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-8 inline-block rounded-full bg-primary px-6 py-3 text-center text-sm font-medium text-white transition-colors hover:bg-[#5a51f0]"
                  >
                    {pkg.ctaLabel}
                  </a>
                ))}
            </motion.div>
          ))}
        </div>
      )}
    </Section>
  );
}
