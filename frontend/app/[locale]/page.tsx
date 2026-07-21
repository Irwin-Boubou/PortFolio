import { unstable_setRequestLocale } from 'next-intl/server';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Hero } from '@/components/sections/Hero';
import { About } from '@/components/sections/About';
import { Services } from '@/components/sections/Services';
import { FeaturedWork } from '@/components/sections/FeaturedWork';
import { Skills } from '@/components/sections/Skills';
import { ContactCTA } from '@/components/sections/ContactCTA';
import { apiGet, type Project, type Skill } from '@/lib/serverApi';

// ISR: homepage revalidates every 60s (spec §2.2.2)
export const revalidate = 60;

export default async function HomePage({ params: { locale } }: { params: { locale: string } }) {
  unstable_setRequestLocale(locale);

  // fetch homepage data server-side, localized by the API
  const [content, featured, skillsRes] = await Promise.all([
    apiGet<{ content: Record<string, unknown> }>(
      '/site-content?keys=hero.name,hero.taglines,about.bio,about.stats', { lang: locale },
    ),
    apiGet<{ items: Project[] }>('/projects?featured=true&limit=6', { lang: locale }),
    apiGet<{ skills: Skill[] }>('/skills'),
  ]);

  const c = content?.content ?? {};
  const name = (c['hero.name'] as string) ?? 'Your Name';
  const taglines = (c['hero.taglines'] as string[]) ?? ['Engineer × Designer'];
  const bio = (c['about.bio'] as string) ?? '';
  const stats = (c['about.stats'] as { label: string; value: number }[]) ?? [];

  return (
    <>
      <Navbar />
      <main id="main">
        <Hero name={name} taglines={taglines} />
        <About bio={bio} stats={stats} />
        <Services />
        <FeaturedWork projects={featured?.items ?? []} />
        <Skills skills={skillsRes?.skills ?? []} />
        <ContactCTA />
      </main>
      <Footer />
    </>
  );
}
