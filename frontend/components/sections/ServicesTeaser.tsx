import { getTranslations } from 'next-intl/server';
import { Link } from '@/navigation';
import { Section } from '@/components/layout/Section';
import { IconIllustration } from '@/components/sections/IconIllustration';
import type { BrandIconName } from '@/components/ui/BrandIcon';
import type { Service } from '@/lib/serverApi';

/** Homepage Services teaser — same illustrated-card pattern as the Work index's
 * Dev/Design cards, showing a handful of services (not all, that's what /services is for).
 * Cards are static previews, not links — the single "View all services" link below is the
 * only way through, so there's one clear path instead of every card repeating it. */
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
          <div
            key={s.id}
            className="flex flex-col overflow-hidden rounded-3xl border border-muted/15 bg-surface"
          >
            <div className="relative aspect-[16/10] overflow-hidden bg-bg">
              <IconIllustration icon={s.icon as BrandIconName} gradId={`svc-${s.id}`} />
              <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/40 to-transparent" />
            </div>
            <div className="flex flex-1 flex-col p-6">
              <h3 className="font-display text-lg font-semibold">{s.title}</h3>
              <p className="mt-2 text-justify text-sm leading-relaxed text-muted">{s.description}</p>
            </div>
          </div>
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
