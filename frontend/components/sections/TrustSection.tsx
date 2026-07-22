'use client';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Section } from '@/components/layout/Section';
import type { TrustCompany } from '@/lib/serverApi';

export function TrustSection({ companies }: { companies: TrustCompany[] }) {
  const t = useTranslations('clients');
  const looped = companies.length > 0 ? [...companies, ...companies] : [];

  return (
    <Section id="clients">
      <h2 className="font-display text-4xl font-semibold md:text-5xl">{t('title')}</h2>
      <p className="mt-2 text-muted">{t('subtitle')}</p>

      {companies.length === 0 ? (
        <p className="mt-8 font-mono text-muted">{t('empty')}</p>
      ) : (
        <div
          className="group relative mt-10 overflow-hidden"
          style={{ maskImage: 'linear-gradient(90deg, transparent, black 8%, black 92%, transparent)', WebkitMaskImage: 'linear-gradient(90deg, transparent, black 8%, black 92%, transparent)' }}
        >
          <div className="flex w-max animate-trust-marquee items-center gap-6 group-hover:[animation-play-state:paused]">
            {looped.map((c, i) => (
              <a
                key={`${c.id}-${i}`}
                href={c.websiteUrl}
                target="_blank"
                rel="noreferrer"
                title={c.name}
                className="relative flex h-20 w-40 flex-shrink-0 items-center justify-center rounded-2xl border border-muted/10 bg-surface/60 px-6 py-4 opacity-70 grayscale transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/30 hover:bg-surface hover:opacity-100 hover:grayscale-0 hover:shadow-[0_8px_24px_rgba(108,99,255,0.12)]"
              >
                <Image src={c.logoUrl} alt={c.name} fill sizes="160px" className="object-contain p-3" />
              </a>
            ))}
          </div>
          <style jsx>{`
            @keyframes trust-marquee {
              from { transform: translateX(0); }
              to { transform: translateX(-50%); }
            }
            .animate-trust-marquee {
              animation: trust-marquee 32s linear infinite;
            }
          `}</style>
        </div>
      )}
    </Section>
  );
}
