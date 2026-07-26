import { unstable_setRequestLocale, getTranslations } from 'next-intl/server';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { getSkills, getProjects, type Locale } from '@/lib/content';
import { ToolsPageContent } from '@/components/sections/skills/ToolsPageContent';

export const revalidate = false;

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }) {
  const t = await getTranslations({ locale, namespace: 'toolsPage' });
  return { title: t('title'), description: t('subtitle') };
}

export default async function ToolsPage({ params: { locale } }: { params: { locale: string } }) {
  unstable_setRequestLocale(locale);

  const l = locale as Locale;
  const skills = getSkills(l).skills;
  const projects = getProjects(l, { limit: 100 });

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
