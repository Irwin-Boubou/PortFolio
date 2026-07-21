import { useTranslations } from 'next-intl';

interface Interest { icon: string; label: string }
interface Language { name: string; level: string }

interface Props {
  interests: Interest[];
  currentlyLearning: string;
  funFact: string;
  languages: Language[];
}

export function BeyondTheCode({ interests, currentlyLearning, funFact, languages }: Props) {
  const t = useTranslations('about');

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
      {/* interests — spans 2 cols */}
      <div className="rounded-2xl border border-muted/15 bg-surface p-6 md:col-span-2">
        <h3 className="mb-4 font-display text-lg font-semibold">{t('interests')}</h3>
        <div className="flex flex-wrap gap-2">
          {interests.map((it, i) => (
            <span
              key={i}
              className="inline-flex items-center gap-2 rounded-full border border-muted/20 bg-bg px-4 py-2 text-sm"
            >
              <span>{it.icon}</span>
              {it.label}
            </span>
          ))}
        </div>
      </div>

      {/* currently learning — gradient border */}
      <div className="rounded-2xl bg-gradient-to-r from-primary to-secondary p-[1px]">
        <div className="h-full rounded-2xl bg-surface p-6">
          <p className="mb-2 text-2xl">📚</p>
          <h3 className="mb-2 font-display text-lg font-semibold">{t('currentlyLearning')}</h3>
          <p className="text-sm text-muted">{currentlyLearning}</p>
        </div>
      </div>

      {/* languages */}
      <div className="rounded-2xl border border-muted/15 bg-surface p-6">
        <h3 className="mb-4 font-display text-lg font-semibold">{t('languages')}</h3>
        <div className="space-y-2">
          {languages.map((l, i) => (
            <div key={i} className="flex items-center justify-between text-sm">
              <span>{l.name}</span>
              <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-xs text-primary">{l.level}</span>
            </div>
          ))}
        </div>
      </div>

      {/* fun fact — spans 2 cols */}
      <div className="relative overflow-hidden rounded-2xl bg-primary/10 p-6 md:col-span-2">
        <span className="absolute -top-4 left-2 font-display text-8xl text-primary/20" aria-hidden="true">
          &ldquo;
        </span>
        <h3 className="relative mb-2 font-display text-lg font-semibold">{t('funFact')}</h3>
        <p className="relative text-sm leading-relaxed text-muted">{funFact}</p>
      </div>
    </div>
  );
}
