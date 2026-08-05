import { getTranslations } from 'next-intl/server';
import { Link } from '@/navigation';
import { Section } from '@/components/layout/Section';
import { IconIllustration } from '@/components/sections/IconIllustration';
import { BrandIcon, type BrandIconName } from '@/components/ui/BrandIcon';
import { FiArrowRight } from 'react-icons/fi';
import type { Service } from '@/lib/serverApi';

/** Homepage Services teaser — same illustrated-card pattern as the Work index's
 * Dev/Design cards, showing a handful of services (not all, that's what /services is for). */
export async function ServicesTeaser({ services, title }: { services: Service[]; title?: string }) {
  const t = await getTranslations('servicesTeaser');
  const featured = services.slice(0, 3);
  if (featured.length === 0) return null;

  return (
    <Section>
      <h2 className="font-display text-4xl font-semibold md:text-5xl">{title || t('title')}</h2>
      <p className="mt-2 max-w-xl text-muted">{t('subtitle')}</p>

      <div className="mt-10 grid gap-6 md:grid-cols-3">
        {featured.map((s) => (
          <Link
            key={s.id}
            href={`/services#${s.id}`}
            className="group relative flex flex-col overflow-hidden rounded-3xl border border-muted/15 bg-surface transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-[0_20px_50px_-20px_rgba(108,99,255,0.35)]"
          >
            <div className="relative aspect-[16/10] overflow-hidden bg-bg">
              <div className="absolute inset-0 transition-transform duration-500 group-hover:scale-105">
                <IconIllustration icon={s.icon as BrandIconName} gradId={`svc-${s.id}`} />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/40 to-transparent" />
              <div className="absolute left-6 top-6 grid h-12 w-12 place-items-center rounded-2xl bg-primary/15 backdrop-blur">
                <BrandIcon name={s.icon as BrandIconName} size={22} />
              </div>
            </div>
            <div className="flex flex-1 flex-col p-6">
              <h3 className="font-display text-lg font-semibold">{s.title}</h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{s.description}</p>
              <span className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-secondary">
                {t('learnMore')}
                <FiArrowRight className="transition-transform group-hover:translate-x-1" />
              </span>
            </div>
          </Link>
        ))}
      </div>

      <div className="mt-8">
        <Link href="/services" className="text-sm font-medium text-secondary underline-offset-4 hover:underline">
          {t('viewAll')} →
        </Link>
      </div>
    </Section>
  );
}
