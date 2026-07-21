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
        <div className="group relative mt-10 overflow-hidden">
          <div className="flex w-max animate-trust-marquee gap-12 group-hover:[animation-play-state:paused]">
            {looped.map((c, i) => (
              <a
                key={`${c.id}-${i}`}
                href={c.websiteUrl}
                target="_blank"
                rel="noreferrer"
                title={c.name}
                className="relative flex h-14 w-32 flex-shrink-0 items-center justify-center grayscale transition-all hover:scale-105 hover:grayscale-0"
              >
                <Image src={c.logoUrl} alt={c.name} fill sizes="128px" className="object-contain" />
              </a>
            ))}
          </div>
          <style jsx>{`
            @keyframes trust-marquee {
              from { transform: translateX(0); }
              to { transform: translateX(-50%); }
            }
            .animate-trust-marquee {
              animation: trust-marquee 30s linear infinite;
            }
          `}</style>
        </div>
      )}
    </Section>
  );
}
