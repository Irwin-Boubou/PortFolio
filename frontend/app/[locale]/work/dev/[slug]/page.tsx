import { notFound } from 'next/navigation';
import { unstable_setRequestLocale, getTranslations } from 'next-intl/server';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { ProjectDetail } from '@/components/sections/ProjectDetail';
import { CaseStudyModeProvider, CaseStudyChrome, CaseStudyContent } from '@/components/ui/CaseStudyToggle';
import { apiGet, type Project } from '@/lib/serverApi';

export const revalidate = 300;
export const dynamicParams = true; // SSG + fallback (spec §2.2.2)

export async function generateMetadata({ params }: { params: { locale: string; slug: string } }) {
  unstable_setRequestLocale(params.locale);
  const data = await apiGet<{ project: Project }>(`/projects/${params.slug}`, { lang: params.locale });
  if (!data?.project) return {};
  const p = data.project;
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
  const data = await apiGet<{ project: Project }>(`/projects/${params.slug}`, { lang: params.locale });
  if (!data?.project) notFound();
  const rel = await apiGet<{ items: Project[] }>(
    `/projects?category=DEVELOPMENT&exclude=${data.project.id}&limit=3`, { lang: params.locale },
  );
  return (
    <CaseStudyModeProvider>
      <CaseStudyChrome>
        <Navbar />
      </CaseStudyChrome>
      <CaseStudyContent>
        <main id="main"><ProjectDetail project={data.project} related={rel?.items ?? []} /></main>
      </CaseStudyContent>
      <CaseStudyChrome>
        <Footer />
      </CaseStudyChrome>
    </CaseStudyModeProvider>
  );
}
