import { unstable_setRequestLocale, getTranslations } from 'next-intl/server';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { ProjectGrid } from '@/components/sections/ProjectGrid';
import { apiGet, type Project, type Tag } from '@/lib/serverApi';

export const revalidate = 120;

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }) {
  unstable_setRequestLocale(locale);
  return {
    title: locale === 'fr' ? 'Projets Design' : 'Design Work',
    description: locale === 'fr' ? 'Projets de design graphique et UI.' : 'Graphic and UI design projects.',
  };
}

export default async function DesignWorkPage({ params: { locale } }: { params: { locale: string } }) {
  unstable_setRequestLocale(locale);
  const t = await getTranslations('work');
  const [projects, tags] = await Promise.all([
    apiGet<{ items: Project[] }>('/projects?category=DESIGN', { lang: locale, revalidate }),
    apiGet<{ tags: Tag[] }>('/tags?category=DESIGN', { lang: locale, revalidate }),
  ]);
  return (
    <>
      <Navbar />
      <main id="main" className="min-h-screen pt-28">
        <div className="mx-auto max-w-content px-6 pb-24">
          <h1 className="mb-12 font-display text-4xl font-semibold md:text-6xl">{t('designTitle')}</h1>
          <ProjectGrid projects={projects?.items ?? []} tags={tags?.tags ?? []} variant="gallery" />
        </div>
      </main>
      <Footer />
    </>
  );
}
