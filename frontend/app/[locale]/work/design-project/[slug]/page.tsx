import { notFound } from 'next/navigation';
import { unstable_setRequestLocale } from 'next-intl/server';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { ProjectDetail } from '@/components/sections/ProjectDetail';
import { apiGet, type Project } from '@/lib/serverApi';

export const revalidate = 300;
export const dynamicParams = true;

export default async function DesignProjectPage({ params }: { params: { locale: string; slug: string } }) {
  unstable_setRequestLocale(params.locale);
  const data = await apiGet<{ project: Project }>(`/projects/${params.slug}`, { lang: params.locale });
  if (!data?.project) notFound();
  const rel = await apiGet<{ items: Project[] }>(
    `/projects?category=DESIGN&exclude=${data.project.id}&limit=3`, { lang: params.locale },
  );
  return (
    <>
      <Navbar />
      <main id="main"><ProjectDetail project={data.project} related={rel?.items ?? []} /></main>
      <Footer />
    </>
  );
}
