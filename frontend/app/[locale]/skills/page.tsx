import { unstable_setRequestLocale } from 'next-intl/server';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Skills } from '@/components/sections/Skills';
import { apiGet, type Skill } from '@/lib/serverApi';

export const revalidate = 120;

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }) {
  unstable_setRequestLocale(locale);
  return {
    title: locale === 'fr' ? 'Compétences' : 'Skills',
    description:
      locale === 'fr'
        ? 'Les technologies et outils que je maîtrise.'
        : 'The technologies and tools I work with.',
  };
}

export default async function SkillsPage({ params: { locale } }: { params: { locale: string } }) {
  unstable_setRequestLocale(locale);
  const skillsRes = await apiGet<{ skills: Skill[] }>('/skills', { lang: locale, revalidate });
  return (
    <>
      <Navbar />
      <main id="main" className="min-h-screen pt-24">
        <Skills skills={skillsRes?.skills ?? []} />
      </main>
      <Footer />
    </>
  );
}
