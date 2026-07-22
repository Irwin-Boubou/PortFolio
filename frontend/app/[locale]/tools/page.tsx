import { unstable_setRequestLocale, getTranslations } from 'next-intl/server';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { apiGet, type Skill, type Project } from '@/lib/serverApi';
import { ToolsPageContent } from '@/components/sections/skills/ToolsPageContent';

export const revalidate = 3600;

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }) {
  const t = await getTranslations({ locale, namespace: 'toolsPage' });
  return { title: t('title'), description: t('subtitle') };
}

export default async function ToolsPage({ params: { locale } }: { params: { locale: string } }) {
  unstable_setRequestLocale(locale);

  const [skillsRes, projectsRes] = await Promise.all([
    apiGet<{ skills: Skill[] }>('/tools', { lang: locale, revalidate: 3600 }),
    apiGet<{ items: Project[] }>('/projects?limit=100', { revalidate: 3600 }),
  ]);

  const skills = skillsRes?.skills ?? [];
  const projects = projectsRes?.items ?? [];

  return (
    <>
      <Navbar />
      <main id="main" className="min-h-screen">
        <ToolsPageContent skills={skills} projects={projects} />
      </main>
      <Footer />
    </>
  );
}
