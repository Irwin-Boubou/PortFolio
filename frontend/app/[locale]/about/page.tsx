import { unstable_setRequestLocale, getTranslations } from 'next-intl/server';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Section } from '@/components/layout/Section';
import {
  apiGet,
  type Value,
  type Experience,
  type Education,
  type Certification,
  type Skill,
} from '@/lib/serverApi';
import { IdentityHero } from '@/components/sections/about/IdentityHero';
import { StatsCounters, type Stat } from '@/components/sections/about/StatsCounters';
import { StoryBio } from '@/components/sections/about/StoryBio';
import { ValuesGrid } from '@/components/sections/about/ValuesGrid';
import { ExperienceTimeline } from '@/components/sections/about/ExperienceTimeline';
import { EducationCerts } from '@/components/sections/about/EducationCerts';
import { SkillsTabs } from '@/components/sections/about/SkillsTabs';
import { BeyondTheCode } from '@/components/sections/about/BeyondTheCode';
import { AboutCta } from '@/components/sections/about/AboutCta';

export const revalidate = 60;

const CONTENT_KEYS = [
  'about.photoUrl', 'about.intro', 'about.bio.full', 'about.interests',
  'about.currentlyLearning', 'about.funFact', 'about.languages', 'about.cta.subtitle', 'about.stats',
  'hero.name', 'hero.location', 'hero.timezone',
  'availability.status', 'availability.label',
  'booking.url', 'booking.label', 'booking.enabled',
  'cv.url',
  'social.github', 'social.linkedin', 'social.dribbble', 'social.behance',
  'social.instagram', 'social.twitter', 'social.youtube',
].join(',');

const SOCIAL_KEYS = ['github', 'linkedin', 'dribbble', 'behance', 'instagram', 'twitter', 'youtube'];

interface Interest { icon: string; label: string }
interface Language { name: string; level: string }

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }) {
  const t = await getTranslations({ locale, namespace: 'about' });
  return { title: t('pageTitle'), description: t('pageDescription') };
}

export default async function AboutPage({ params: { locale } }: { params: { locale: string } }) {
  unstable_setRequestLocale(locale);
  const t = await getTranslations('about');
  const tResume = await getTranslations('resume');

  const [contentRes, valuesRes, experienceRes, educationRes, certsRes, skillsRes] = await Promise.all([
    apiGet<{ content: Record<string, unknown> }>(`/site-content?keys=${CONTENT_KEYS}`, { lang: locale }),
    apiGet<{ values: Value[] }>('/values', { lang: locale }),
    apiGet<{ experience: Experience[] }>('/experience', { lang: locale }),
    apiGet<{ education: Education[] }>('/education', { lang: locale }),
    apiGet<{ certifications: Certification[] }>('/certifications', { lang: locale }),
    apiGet<{ skills: Skill[]; grouped: Record<string, Skill[]> }>('/skills'),
  ]);

  const content = contentRes?.content ?? {};
  const name = (content['hero.name'] as string) ?? 'Your Name';
  const location = (content['hero.location'] as string) ?? '';
  const timezone = (content['hero.timezone'] as string) ?? 'UTC';
  const availabilityStatus = ((content['availability.status'] as string) ?? 'available') as 'available' | 'busy' | 'open';
  const availabilityLabel = (content['availability.label'] as string) ?? '';
  const bookingUrl = (content['booking.url'] as string) ?? null;
  const bookingLabel = (content['booking.label'] as string) ?? '';
  const bookingEnabled = Boolean(content['booking.enabled']);
  const cvUrl = (content['cv.url'] as string) ?? null;
  const photoUrl = (content['about.photoUrl'] as string) ?? null;
  const intro = (content['about.intro'] as string) ?? '';
  const bio = (content['about.bio.full'] as string) ?? '';
  const stats = (content['about.stats'] as Stat[]) ?? [];
  const interests = (content['about.interests'] as Interest[]) ?? [];
  const currentlyLearning = (content['about.currentlyLearning'] as string) ?? '';
  const funFact = (content['about.funFact'] as string) ?? '';
  const languages = (content['about.languages'] as Language[]) ?? [];
  const ctaSubtitle = (content['about.cta.subtitle'] as string) ?? '';

  const socials = SOCIAL_KEYS
    .map((key) => ({ key, url: content[`social.${key}`] as string | undefined }))
    .filter((s): s is { key: string; url: string } => Boolean(s.url));

  const values = valuesRes?.values ?? [];
  const experience = experienceRes?.experience ?? [];
  const education = educationRes?.education ?? [];
  const certifications = certsRes?.certifications ?? [];
  const skills = skillsRes?.skills ?? [];

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name,
    jobTitle: tResume('title'),
    description: intro,
    image: photoUrl ?? undefined,
    alumniOf: education.map((ed) => ({ '@type': 'CollegeOrUniversity', name: ed.institution })),
    knowsAbout: skills.map((s) => s.name),
    sameAs: socials.map((s) => s.url),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Navbar />
      <main id="main" className="min-h-screen">
        <IdentityHero
          name={name}
          intro={intro}
          photoUrl={photoUrl}
          location={location}
          timezone={timezone}
          availabilityStatus={availabilityStatus}
          availabilityLabel={availabilityLabel}
          cvUrl={cvUrl}
          bookingUrl={bookingUrl}
          bookingLabel={bookingLabel}
          bookingEnabled={bookingEnabled}
          socials={socials}
          title={tResume('title')}
        />

        {stats.length > 0 && (
          <Section id="stats">
            <h2 className="mb-8 text-center font-display text-3xl font-semibold md:text-4xl">{t('statsTitle')}</h2>
            <StatsCounters stats={stats} />
          </Section>
        )}

        {bio && (
          <Section id="story" className="max-w-[800px]">
            <h2 className="mb-8 font-display text-3xl font-semibold md:text-4xl">{t('storyTitle')}</h2>
            <StoryBio bio={bio} />
          </Section>
        )}

        {values.length > 0 && (
          <Section id="values">
            <h2 className="mb-2 text-center font-display text-3xl font-semibold md:text-4xl">{t('valuesTitle')}</h2>
            <p className="mx-auto mb-10 max-w-xl text-center text-muted">{t('valuesSubtitle')}</p>
            <ValuesGrid values={values} />
          </Section>
        )}

        {experience.length > 0 && (
          <Section id="experience">
            <h2 className="mb-10 text-center font-display text-3xl font-semibold md:text-4xl">{t('experienceTitle')}</h2>
            <ExperienceTimeline experience={experience} />
          </Section>
        )}

        {(education.length > 0 || certifications.length > 0) && (
          <Section id="education">
            <EducationCerts education={education} certifications={certifications} />
          </Section>
        )}

        {skills.length > 0 && (
          <Section id="skills">
            <h2 className="mb-8 font-display text-3xl font-semibold md:text-4xl">{t('skillsTitle')}</h2>
            <SkillsTabs skills={skills} />
          </Section>
        )}

        <Section id="personal">
          <h2 className="mb-8 font-display text-3xl font-semibold md:text-4xl">{t('personalTitle')}</h2>
          <BeyondTheCode
            interests={interests}
            currentlyLearning={currentlyLearning}
            funFact={funFact}
            languages={languages}
          />
        </Section>

        <AboutCta subtitle={ctaSubtitle} />
      </main>
      <Footer />
    </>
  );
}
