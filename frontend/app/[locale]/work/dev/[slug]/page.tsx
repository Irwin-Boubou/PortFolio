import { notFound } from 'next/navigation';
import { unstable_setRequestLocale, getTranslations } from 'next-intl/server';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { ProjectDetail } from '@/components/sections/ProjectDetail';
import { CaseStudyModeProvider, CaseStudyChrome, CaseStudyContent } from '@/components/ui/CaseStudyToggle';
import { getProjectBySlug, getProjects, getAllProjectSlugs, type Locale } from '@/lib/content';
import { locales } from '@/i18n';

export const revalidate = false;

export function generateStaticParams() {
  const devSlugs = getAllProjectSlugs().filter((p) => p.category === 'DEVELOPMENT');
  return locales.flatMap((locale) => devSlugs.map(({ slug }) => ({ locale, slug })));
}

export async function generateMetadata({ params }: { params: { locale: string; slug: string } }) {
  unstable_setRequestLocale(params.locale);
  const p = getProjectBySlug(params.slug, params.locale as Locale);
  if (!p) return {};
  return {
    title: p.title,
    description: p.subtitle ?? p.description?.slice(0, 160),
    openGraph: {
      title: p.title,
      description: p.subtitle ?? undefined,
      images: p.thumbnailUrl ? [p.thumbnailUrl] : undefined,
    },
  };
}

export default async function DevProjectPage({ params }: { params: { locale: string; slug: string } }) {
  unstable_setRequestLocale(params.locale);
  const project = getProjectBySlug(params.slug, params.locale as Locale);
  if (!project) notFound();
  const related = getProjects(params.locale as Locale, { category: 'DEVELOPMENT', exclude: project.id, limit: 3 });
  return (
    <CaseStudyModeProvider>
      <CaseStudyChrome>
        <Navbar />
      </CaseStudyChrome>
      <CaseStudyContent>
        <main id="main"><ProjectDetail project={project} related={related} /></main>
      </CaseStudyContent>
      <CaseStudyChrome>
        <Footer />
      </CaseStudyChrome>
    </CaseStudyModeProvider>
  );
}
