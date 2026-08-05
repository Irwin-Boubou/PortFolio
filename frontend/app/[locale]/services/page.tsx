import { unstable_setRequestLocale, getTranslations } from 'next-intl/server';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Link } from '@/navigation';
import { getServices, getSiteContent, type Locale } from '@/lib/content';
import { BrandIcon, type BrandIconName } from '@/components/ui/BrandIcon';
import { FiCheck } from 'react-icons/fi';

export const revalidate = false;

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }) {
  const t = await getTranslations({ locale, namespace: 'services' });
  return { title: t('pageTitle'), description: t('pageSubtitle') };
}

export default async function ServicesPage({ params: { locale } }: { params: { locale: string } }) {
  unstable_setRequestLocale(locale);
  const t = await getTranslations('services');
  const tContact = await getTranslations('contactCta');
  const tWhy = await getTranslations('servicesWhy');
  const services = getServices(locale as Locale);
  const c = getSiteContent(locale as Locale, ['about.stats']);
  const stats = (c['about.stats'] as { label: string; value: number; suffix: string }[]) ?? [];

  return (
    <>
      <Navbar />
      <main id="main" className="min-h-screen pt-28">
        <div className="mx-auto max-w-content px-6 pb-24">
          <h1 className="font-display text-4xl font-semibold md:text-5xl">{t('pageTitle')}</h1>
          <p className="mt-2 max-w-xl text-muted">{t('pageSubtitle')}</p>

          {/* why work with me */}
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((s) => (
              <div key={s.label} className="rounded-xl border border-muted/15 bg-surface p-5 text-center">
                <p className="font-display text-2xl font-bold text-primary">{s.value}{s.suffix}</p>
                <p className="mt-1 text-xs text-muted">{s.label}</p>
              </div>
            ))}
            <div className="rounded-xl border border-muted/15 bg-surface p-5 text-center">
              <p className="font-display text-lg font-bold text-primary">{tWhy('remote')}</p>
              <p className="mt-1 text-xs text-muted">{tWhy('remoteDesc')}</p>
            </div>
            <div className="rounded-xl border border-muted/15 bg-surface p-5 text-center">
              <p className="font-display text-lg font-bold text-primary">FR / EN</p>
              <p className="mt-1 text-xs text-muted">{tWhy('bilingual')}</p>
            </div>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {services.map((s) => (
              <div key={s.id} id={s.id} className="scroll-mt-28 rounded-2xl border border-muted/15 bg-surface p-8">
                <div className="grid h-14 w-14 place-items-center rounded-2xl bg-primary/15">
                  <BrandIcon name={s.icon as BrandIconName} size={30} />
                </div>
                <h2 className="mt-5 font-display text-xl font-semibold">{s.title}</h2>
                <p className="mt-2 text-justify text-sm leading-relaxed text-muted">{s.description}</p>
                {s.highlights.length > 0 && (
                  <ul className="mt-4 space-y-1.5">
                    {s.highlights.map((h) => (
                      <li key={h} className="flex items-center gap-2 text-sm text-body">
                        <FiCheck className="shrink-0 text-secondary" size={14} />
                        {h}
                      </li>
                    ))}
                  </ul>
                )}
                {s.proof.length > 0 && (
                  <div className="mt-5 flex flex-wrap items-center gap-2">
                    <span className="text-xs uppercase tracking-wide text-muted/70">{t('provenOn')}:</span>
                    {s.proof.map((name) => (
                      <span key={name} className="rounded-full border border-muted/20 px-3 py-1 text-xs text-body">{name}</span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="mt-16 rounded-2xl border border-primary/25 bg-gradient-to-br from-primary/10 to-secondary/5 p-10 text-center">
            <h2 className="font-display text-2xl font-semibold md:text-3xl">{tContact('title')}</h2>
            <p className="mt-2 text-muted">{tContact('subtitle')}</p>
            <Link
              href="/contact"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white transition-all hover:scale-[1.02] hover:brightness-110"
            >
              {tContact('primary')}
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
