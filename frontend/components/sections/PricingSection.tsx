'use client';
import { motion, useReducedMotion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { FiCheck, FiClock, FiDollarSign, FiRefreshCw, FiEdit2 } from 'react-icons/fi';
import { Link } from '@/navigation';
import { Section } from '@/components/layout/Section';
import type { PricingPackage, PricingBundle } from '@/lib/serverApi';

const STAGGER = 0.09;

function formatPrice(pkg: PricingPackage): { main: string; suffix?: string } {
  if (pkg.priceLabel) return { main: pkg.priceLabel };
  if (pkg.priceMin == null) return { main: '' };
  const symbol = pkg.currency === 'EUR' ? '€' : pkg.currency === 'USD' ? '$' : `${pkg.currency} `;
  const main =
    pkg.priceMax != null && pkg.priceMax !== pkg.priceMin
      ? `${symbol}${pkg.priceMin.toLocaleString()} – ${symbol}${pkg.priceMax.toLocaleString()}`
      : `${symbol}${pkg.priceMin.toLocaleString()}`;
  return { main, suffix: pkg.priceSuffix ?? undefined };
}

function PackageCard({ pkg, popular, i, reduce }: { pkg: PricingPackage; popular: string; i: number; reduce: boolean | null }) {
  const price = formatPrice(pkg);
  return (
    <motion.div
      initial={reduce ? { opacity: 0 } : { opacity: 0, y: 40, scale: 0.97 }}
      whileInView={reduce ? { opacity: 1 } : { opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1], delay: i * STAGGER }}
      className={`relative flex flex-col gap-2.5 rounded-2xl border bg-surface p-6 transition-transform hover:-translate-y-1 ${
        pkg.highlighted ? 'ring-2 ring-primary shadow-[0_0_40px_rgba(108,99,255,0.3)]' : 'border-muted/15'
      }`}
    >
      {pkg.highlighted && (
        <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-primary px-4 py-1 text-xs font-semibold text-white">
          {popular}
        </span>
      )}
      <div>
        <h3 className="font-display text-lg font-semibold">{pkg.name}</h3>
        <p className="text-sm text-muted">{pkg.tagline}</p>
      </div>
      <p className="mt-1 font-display text-2xl font-semibold">
        {price.main}
        {price.suffix && <span className="ml-1 text-sm font-normal text-muted">{price.suffix}</span>}
      </p>
      <hr className="my-1 border-muted/15" />

      <div className="space-y-3 text-sm">
        {pkg.delivery && (
          <div>
            <span className="flex items-center gap-1.5 text-xs font-medium uppercase tracking-wide text-muted"><FiClock size={12} />Delivery</span>
            <p className="mt-0.5 text-body">{pkg.delivery}</p>
          </div>
        )}
        {pkg.deposit && (
          <div>
            <span className="flex items-center gap-1.5 text-xs font-medium uppercase tracking-wide text-muted"><FiDollarSign size={12} />Deposit</span>
            <p className="mt-0.5 text-body">{pkg.deposit}</p>
          </div>
        )}
        {pkg.revisions && (
          <div>
            <span className="flex items-center gap-1.5 text-xs font-medium uppercase tracking-wide text-muted"><FiRefreshCw size={12} />Revisions</span>
            <p className="mt-0.5 text-body">{pkg.revisions}</p>
          </div>
        )}
        {pkg.changesNote && (
          <div>
            <span className="flex items-center gap-1.5 text-xs font-medium uppercase tracking-wide text-muted"><FiEdit2 size={12} />Changes</span>
            <p className="mt-0.5 text-body">{pkg.changesNote}</p>
          </div>
        )}
      </div>

      {pkg.features.length > 0 && (
        <ul className="mt-2 space-y-1.5">
          {pkg.features.map((f, fi) => (
            <li key={fi} className="flex items-start gap-2 text-sm text-body">
              <FiCheck className="mt-0.5 flex-shrink-0 text-primary" size={14} />
              {f}
            </li>
          ))}
        </ul>
      )}

      {(pkg.extras.length > 0 || pkg.volumeDiscount) && (
        <div className="mt-1 space-y-0.5 text-xs text-muted">
          {pkg.extras.map((e, ei) => <p key={ei}>+ {e}</p>)}
          {pkg.volumeDiscount && <p>{pkg.volumeDiscount}</p>}
        </div>
      )}

      {pkg.ctaLabel && (
        <div className="mt-auto pt-4">
          {pkg.ctaUrl?.startsWith('/') ? (
            <Link
              href={pkg.ctaUrl}
              className="block rounded-full bg-primary px-6 py-3 text-center text-sm font-medium text-white transition-colors hover:bg-[#5a51f0]"
            >
              {pkg.ctaLabel}
            </Link>
          ) : (
            <a
              href={pkg.ctaUrl ?? '#'}
              target="_blank"
              rel="noreferrer"
              className="block rounded-full bg-primary px-6 py-3 text-center text-sm font-medium text-white transition-colors hover:bg-[#5a51f0]"
            >
              {pkg.ctaLabel}
            </a>
          )}
        </div>
      )}
    </motion.div>
  );
}

export function PricingSection({
  packages, bundles = [], title, subtitle,
}: {
  packages: PricingPackage[];
  bundles?: PricingBundle[];
  title?: string;
  subtitle?: string;
}) {
  const t = useTranslations('pricing');
  const reduce = useReducedMotion();
  const web = packages.filter((p) => p.category === 'web');
  const design = packages.filter((p) => p.category === 'design');

  return (
    <Section id="pricing">
      <h2 className="font-display text-4xl font-semibold md:text-5xl">{title || t('title')}</h2>
      <p className="mt-2 text-muted">{subtitle || t('subtitle')}</p>

      {packages.length === 0 ? (
        <p className="mt-8 font-mono text-muted">{t('empty')}</p>
      ) : (
        <>
          {web.length > 0 && (
            <div className="mt-10">
              <p className="mb-4 text-xs font-medium uppercase tracking-wide text-muted/70">{t('categoryWeb')}</p>
              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                {web.map((pkg, i) => <PackageCard key={pkg.id} pkg={pkg} popular={t('popular')} i={i} reduce={reduce} />)}
              </div>
            </div>
          )}

          {design.length > 0 && (
            <div className="mt-14">
              <p className="mb-4 text-xs font-medium uppercase tracking-wide text-muted/70">{t('categoryDesign')}</p>
              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                {design.map((pkg, i) => <PackageCard key={pkg.id} pkg={pkg} popular={t('popular')} i={i} reduce={reduce} />)}
              </div>
            </div>
          )}

          {bundles.length > 0 && (
            <div className="mt-14">
              <p className="mb-4 text-xs font-medium uppercase tracking-wide text-muted/70">{t('bundles')}</p>
              <div className="grid gap-4 sm:grid-cols-3">
                {bundles.map((b) => (
                  <div key={b.id} className="rounded-xl border border-muted/15 bg-surface p-5">
                    <p className="font-medium text-body">{b.name}</p>
                    <p className="mt-1 font-display text-lg font-semibold text-secondary">
                      €{b.priceMin.toLocaleString()} – €{b.priceMax.toLocaleString()}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </Section>
  );
}
