import Image from 'next/image';
import { useTranslations } from 'next-intl';
import type { Education, Certification } from '@/lib/serverApi';

function initials(name: string) {
  return name.split(' ').map((p) => p[0]).filter(Boolean).slice(0, 2).join('').toUpperCase();
}

export function EducationCerts({ education, certifications }: { education: Education[]; certifications: Certification[] }) {
  const t = useTranslations('about');

  return (
    <div className="grid gap-10 md:grid-cols-2">
      <div>
        <h3 className="mb-5 font-display text-xl font-semibold">{t('educationTitle')}</h3>
        <div className="space-y-4">
          {education.map((ed) => (
            <div key={ed.id} className="rounded-2xl border border-muted/15 bg-surface p-5">
              <div className="flex items-start gap-4">
                <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full border border-muted/20 bg-bg">
                  {ed.logoUrl ? (
                    <Image src={ed.logoUrl} alt={ed.institution} fill sizes="48px" className="object-cover" />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center font-display text-sm font-semibold text-primary">
                      {initials(ed.institution)}
                    </div>
                  )}
                </div>
                <div>
                  <h4 className="font-display text-base font-semibold">{ed.degree}</h4>
                  <p className="text-sm text-muted">{ed.institution}</p>
                  <p className="mt-1 font-mono text-xs text-secondary">{ed.period}</p>
                  {ed.description && <p className="mt-2 text-sm text-muted">{ed.description}</p>}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="mb-5 font-display text-xl font-semibold">{t('certificationsTitle')}</h3>
        <div className="grid grid-cols-2 gap-4">
          {certifications.map((c) => (
            <div
              key={c.id}
              className="flex flex-col items-center gap-2 rounded-xl border border-muted/15 bg-surface p-4 text-center transition-all hover:-translate-y-1 hover:border-primary/50 hover:shadow-[0_0_24px_rgba(108,99,255,0.2)]"
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
              {c.url && (
                <a href={c.url} target="_blank" rel="noreferrer" className="text-[11px] text-secondary hover:underline">
                  {t('viewCredential')}
                </a>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
