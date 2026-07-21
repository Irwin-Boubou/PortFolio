'use client';
import { useLocale } from 'next-intl';
import { usePathname, useRouter } from '@/navigation';

/** EN ⇄ FR pill switcher — keeps the current route, swaps the locale segment. */
export function LocaleSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  return (
    <div className="flex overflow-hidden rounded-full border border-muted/30 text-xs font-semibold uppercase" role="group" aria-label="Language">
      {(['en', 'fr'] as const).map((l) => (
        <button
          key={l}
          onClick={() => router.replace(pathname, { locale: l })}
          aria-pressed={locale === l}
          className={`px-3 py-1.5 transition-colors ${locale === l ? 'bg-primary text-white' : 'text-muted hover:text-body'}`}
        >
          {l}
        </button>
      ))}
    </div>
  );
}
