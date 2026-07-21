'use client';
import { useTranslations } from 'next-intl';

export function PrintButton() {
  const t = useTranslations('resume');
  return (
    <button
      onClick={() => window.print()}
      className="rounded-full bg-gradient-to-r from-primary to-secondary px-6 py-2.5 text-sm font-medium text-white shadow-md transition-transform hover:scale-105"
      data-no-print
    >
      {t('download')}
    </button>
  );
}
