import { unstable_setRequestLocale, getTranslations } from 'next-intl/server';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { ProjectGrid } from '@/components/sections/ProjectGrid';
import { apiGet, type Project, type Tag } from '@/lib/serverApi';

export const revalidate = 120; // spec §2.2.2

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }) {
  unstable_setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'work' });
  return {
    title: `${t('devTitle')} · Portfolio`,
    description: locale === 'fr' ? 'Projets de développement logiciel.' : 'Software development projects.',
  };
}

export default async function DevWorkPage({ params: { locale } }: { params: { locale: string } }) {
  unstable_setRequestLocale(locale);
  const t = await getTranslations('work');
  const [projects, tags] = await Promise.all([
    apiGet<{ items: Project[] }>('/projects?category=DEVELOPMENT', { lang: locale, revalidate }),
    apiGet<{ tags: Tag[] }>('/tags?category=DEVELOPMENT', { lang: locale, revalidate }),
  ]);
  return (
    <>
      <Navbar />
      <main id="main" className="dot-grid min-h-screen pt-28">
        <div className="mx-auto max-w-content px-6 pb-24">
          <h1 className="mb-12 font-mono text-2xl text-success md:text-4xl">{t('devTitle')}</h1>
          <ProjectGrid projects={projects?.items ?? []} tags={tags?.tags ?? []} variant="terminal" />
        </div>
      </main>
      <Footer />
    </>
  );
}
