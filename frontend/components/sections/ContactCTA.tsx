import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/Button';

export function ContactCTA() {
  const t = useTranslations('contactCta');
  return (
    <section className="relative overflow-hidden py-24">
      {/* animated gradient strip — pure CSS, no canvas needed (spec §7.1.6) */}
      <div className="absolute inset-0 animate-gradient-x bg-gradient-to-r from-primary/25 via-secondary/15 to-primary/25 bg-[length:200%_200%]" aria-hidden="true" />
      <div className="relative mx-auto max-w-content px-6 text-center">
        <h2 className="font-display text-4xl font-bold md:text-5xl">{t('title')}</h2>
        <p className="mx-auto mt-3 max-w-xl text-muted">{t('subtitle')}</p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Button href="/contact">{t('primary')}</Button>
          <Button href="/work/development" variant="outline">{t('secondary')}</Button>
        </div>
      </div>
    </section>
  );
}
