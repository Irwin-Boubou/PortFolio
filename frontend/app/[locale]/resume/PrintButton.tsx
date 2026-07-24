'use client';
import { useTranslations } from 'next-intl';

const cls =
  'rounded-full bg-gradient-to-r from-primary to-secondary px-6 py-2.5 text-sm font-medium text-white shadow-md transition-transform hover:scale-105';

/**
 * Downloads the CV uploaded in the admin (cv.url) when one is set,
 * otherwise falls back to printing the page.
 */
export function PrintButton({ cvUrl }: { cvUrl?: string }) {
  const t = useTranslations('resume');

  if (cvUrl) {
    return (
      <a href={cvUrl} target="_blank" rel="noreferrer" download className={cls} data-no-print>
        {t('download')}
      </a>
    );
  }

  return (
    <button onClick={() => window.print()} className={cls} data-no-print>
      {t('download')}
    </button>
  );
}
