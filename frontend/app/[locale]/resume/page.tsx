import Image from 'next/image';
import { unstable_setRequestLocale, getTranslations } from 'next-intl/server';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { apiGet, type Experience, type Education, type Certification, type Skill } from '@/lib/serverApi';
import { PrintButton } from './PrintButton';
import './print.css';

export const revalidate = 60;

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }) {
  unstable_setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'resume' });
  return {
    title: `${t('title')} · Portfolio`,
    description: locale === 'fr' ? 'CV et parcours professionnel.' : 'Resume and professional background.',
  };
}

function initials(name: string) {
  return name
    .split(' ')
    .map((p) => p[0])
    .filter(Boolean)
    .slice(0, 2)
    .join('')
    .toUpperCase();
}

function LogoOrInitials({ src, name }: { src: string | null; name: string }) {
  return (
    <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full border border-muted/20 bg-surface">
      {src ? (
        <Image src={src} alt={name} fill sizes="48px" className="object-cover" />
      ) : (
        <div className="flex h-full w-full items-center justify-center font-display text-sm font-semibold text-primary">
          {initials(name)}
        </div>
      )}
    </div>
  );
}

function BulletList({ description }: { description: string }) {
  const lines = description.split('\n').map((l) => l.trim()).filter(Boolean);
  return (
    <ul className="mt-3 list-disc space-y-1.5 pl-5 text-sm leading-relaxed text-muted">
      {lines.map((line, i) => (
        <li key={i}>{line.replace(/^-\s*/, '')}</li>
      ))}
    </ul>
  );
}

export default async function ResumePage({ params: { locale } }: { params: { locale: string } }) {
  unstable_setRequestLocale(locale);
  const t = await getTranslations('resume');

  const [content, experienceRes, educationRes, certsRes, skillsRes] = await Promise.all([
    apiGet<{ content: Record<string, unknown> }>('/site-content?keys=hero.name', { lang: locale }),
    apiGet<{ experience: Experience[] }>('/experience', { lang: locale }),
    apiGet<{ education: Education[] }>('/education', { lang: locale }),
    apiGet<{ certifications: Certification[] }>('/certifications', { lang: locale }),
    apiGet<{ skills: Skill[]; grouped: Record<string, Skill[]> }>('/skills'),
  ]);

  const name = (content?.content?.['hero.name'] as string) ?? 'Your Name';
  const experience = experienceRes?.experience ?? [];
  const education = educationRes?.education ?? [];
  const certifications = certsRes?.certifications ?? [];
  const grouped = skillsRes?.grouped ?? {};

  return (
    <>
      <div data-no-print>
        <Navbar />
      </div>
      <main id="main" className="min-h-screen pt-28 print:pt-0">
        <div className="mx-auto max-w-content px-6 pb-24">
          {/* header */}
          <div className="mb-14 flex flex-wrap items-center justify-between gap-6 border-b border-muted/15 pb-8">
            <div>
              <h1 className="font-display text-4xl font-semibold md:text-6xl">{name}</h1>
              <p className="mt-2 text-muted">{t('title')}</p>
            </div>
            <PrintButton />
          </div>

          <div className="resume-grid grid gap-14 md:grid-cols-[1.4fr_1fr]">
            {/* left: experience timeline */}
            <section>
              <h2 className="mb-8 font-display text-2xl font-semibold">{t('experience')}</h2>
              <div className="relative pl-8">
                <div
                  className="absolute bottom-2 left-[7px] top-2 w-px bg-gradient-to-b from-primary to-secondary print:hidden"
                  aria-hidden="true"
                />
                <ol className="space-y-10">
                  {experience.map((e) => (
                    <li key={e.id} className="relative">
                      <span
                        className="absolute -left-8 top-1.5 h-3.5 w-3.5 rounded-full border-2 border-bg bg-primary print:hidden"
                        aria-hidden="true"
                      />
                      <div className="resume-card rounded-2xl border border-muted/15 bg-surface p-6">
                        <div className="flex items-start gap-4">
                          <LogoOrInitials src={e.logoUrl} name={e.company} />
                          <div className="min-w-0 flex-1">
                            <div className="flex flex-wrap items-center gap-2">
                              <h3 className="font-display text-lg font-semibold">{e.role}</h3>
                              {e.current && (
                                <span className="animate-pulse rounded-full bg-success/15 px-2.5 py-0.5 text-xs font-medium text-success print:hidden">
                                  {t('now')}
                                </span>
                              )}
                            </div>
                            <p className="text-sm text-muted">
                              {e.company}
                              {e.location ? ` · ${e.location}` : ''}
                            </p>
                            <p className="mt-1 font-mono text-xs text-secondary">{e.period}</p>
                          </div>
                        </div>
                        <BulletList description={e.description} />
                      </div>
                    </li>
                  ))}
                </ol>
              </div>
            </section>

            {/* right: education + certifications */}
            <section>
              <h2 className="mb-8 font-display text-2xl font-semibold">{t('education')}</h2>
              <div className="space-y-5">
                {education.map((ed) => (
                  <div key={ed.id} className="resume-card rounded-2xl border border-muted/15 bg-surface p-5">
                    <div className="flex items-start gap-4">
                      <LogoOrInitials src={ed.logoUrl} name={ed.institution} />
                      <div>
                        <h3 className="font-display text-base font-semibold">{ed.degree}</h3>
                        <p className="text-sm text-muted">{ed.institution}</p>
                        <p className="mt-1 font-mono text-xs text-secondary">{ed.period}</p>
                        {ed.description && <p className="mt-2 text-sm text-muted">{ed.description}</p>}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <h2 className="mb-6 mt-12 font-display text-2xl font-semibold">{t('certifications')}</h2>
              <div className="grid grid-cols-2 gap-4">
                {certifications.map((c) => (
                  <a
                    key={c.id}
                    href={c.url ?? undefined}
                    target={c.url ? '_blank' : undefined}
                    rel={c.url ? 'noreferrer' : undefined}
                    className="resume-card flex flex-col items-center gap-2 rounded-xl border border-muted/15 bg-surface p-4 text-center transition-colors hover:border-primary/50"
                  >
                    {c.badgeUrl ? (
                      <div className="relative h-12 w-12">
                        <Image src={c.badgeUrl} alt={c.name} fill sizes="48px" className="object-contain" />
                      </div>
                    ) : (
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 font-display text-sm font-semibold text-primary">
                        {initials(c.name)}
                      </div>
                    )}
                    <p className="text-xs font-medium leading-tight">{c.name}</p>
                    <p className="text-[11px] text-muted">{c.issuer}</p>
                  </a>
                ))}
              </div>
            </section>
          </div>

          {/* skills matrix */}
          <section className="mt-16">
            <h2 className="mb-8 font-display text-2xl font-semibold">{t('skills')}</h2>
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {Object.entries(grouped).map(([category, skills]) => (
                <div key={category}>
                  <h3 className="mb-3 text-sm font-medium uppercase tracking-wide text-muted">{category}</h3>
                  <ul className="space-y-3">
                    {skills.map((s) => (
                      <li key={s.id}>
                        <div className="mb-1 flex items-center justify-between text-sm">
                          <span>{s.name}</span>
                          <span className="font-mono text-xs text-muted">{s.level}%</span>
                        </div>
                        <div className="h-1.5 overflow-hidden rounded-full bg-muted/20">
                          <div
                            className="h-full bg-gradient-to-r from-primary to-secondary"
                            style={{ width: `${s.level}%` }}
                          />
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>
      <div data-no-print>
        <Footer />
      </div>
    </>
  );
}
