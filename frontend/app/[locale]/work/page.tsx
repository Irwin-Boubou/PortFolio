import Image from 'next/image';
import { unstable_setRequestLocale, getTranslations } from 'next-intl/server';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Link } from '@/navigation';
import { FiCode, FiPenTool, FiArrowRight } from 'react-icons/fi';
import { apiGet, type Project } from '@/lib/serverApi';

export const revalidate = 120;

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }) {
  unstable_setRequestLocale(locale);
  return {
    title: locale === 'fr' ? 'Projets' : 'Work',
    description: locale === 'fr' ? 'Projets de développement et de design.' : 'Development and design projects.',
  };
}

export default async function WorkIndexPage({ params: { locale } }: { params: { locale: string } }) {
  unstable_setRequestLocale(locale);
  const t = await getTranslations('work');

  const [dev, design] = await Promise.all([
    apiGet<{ items: Project[] }>('/projects?category=DEVELOPMENT&limit=4', { lang: locale, revalidate }),
    apiGet<{ items: Project[] }>('/projects?category=DESIGN&limit=4', { lang: locale, revalidate }),
  ]);

  const categories = [
    {
      href: '/work/development',
      icon: FiCode,
      label: t('devTab'),
      desc: t('devDesc'),
      count: dev?.items?.length ?? 0,
      preview: dev?.items?.[0]?.thumbnailUrl,
    },
    {
      href: '/work/design',
      icon: FiPenTool,
      label: t('designTab'),
      desc: t('designDesc'),
      count: design?.items?.length ?? 0,
      preview: design?.items?.[0]?.thumbnailUrl,
    },
  ] as const;

  return (
    <>
      <Navbar />
      <main id="main" className="min-h-screen pt-28">
        <div className="mx-auto max-w-content px-6 pb-24">
          <h1 className="font-display text-4xl font-semibold md:text-5xl">{t('indexTitle')}</h1>
          <p className="mt-2 max-w-xl text-muted">{t('indexSubtitle')}</p>

          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {categories.map((c) => (
              <Link
                key={c.href}
                href={c.href}
                className="group relative flex flex-col overflow-hidden rounded-3xl border border-muted/15 bg-surface transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-[0_20px_50px_-20px_rgba(108,99,255,0.35)]"
              >
                <div className="relative aspect-[16/10] overflow-hidden bg-bg">
                  {c.preview ? (
                    <Image
                      src={c.preview}
                      alt={c.label}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover opacity-80 transition-transform duration-500 group-hover:scale-105 group-hover:opacity-100"
                    />
                  ) : (
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/10" />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/40 to-transparent" />
                  <div className="absolute left-6 top-6 grid h-12 w-12 place-items-center rounded-2xl bg-primary/15 text-2xl text-primary backdrop-blur">
                    <c.icon />
                  </div>
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <div className="flex items-center justify-between">
                    <h2 className="font-display text-2xl font-semibold">{c.label}</h2>
                    <span className="rounded-full bg-muted/10 px-3 py-1 text-xs font-medium text-muted">
                      {c.count}
                    </span>
                  </div>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{c.desc}</p>
                  <span className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-secondary">
                    {t('viewCategory')}
                    <FiArrowRight className="transition-transform group-hover:translate-x-1" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
