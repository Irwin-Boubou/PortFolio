import { unstable_setRequestLocale, getTranslations } from 'next-intl/server';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { apiGet, type Testimonial } from '@/lib/serverApi';
import { TestimonialsFilterGrid } from '@/components/sections/TestimonialsFilterGrid';

export const revalidate = 60;

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }) {
  const t = await getTranslations({ locale, namespace: 'testimonials' });
  return { title: locale === 'fr' ? 'Témoignages' : 'Testimonials', description: t('subtitle') };
}

export default async function TestimonialsPage({ params: { locale } }: { params: { locale: string } }) {
  unstable_setRequestLocale(locale);
  const t = await getTranslations('testimonials');
  const data = await apiGet<{ testimonials: Testimonial[] }>('/testimonials', { lang: locale });
  const testimonials = data?.testimonials ?? [];

  return (
    <>
      <Navbar />
      <main id="main" className="min-h-screen pt-28">
        <div className="mx-auto max-w-content px-6 pb-24">
          <h1 className="mb-4 font-display text-4xl font-semibold md:text-6xl">{t('title')}</h1>
          <p className="mb-12 text-muted">{t('subtitle')}</p>
          <TestimonialsFilterGrid testimonials={testimonials} />
        </div>
      </main>
      <Footer />
    </>
  );
}
