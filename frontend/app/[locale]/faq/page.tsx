import { unstable_setRequestLocale, getTranslations } from 'next-intl/server';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { apiGet, type FaqItem } from '@/lib/serverApi';
import { FaqSearchGrid } from '@/components/sections/FaqSearchGrid';

export const revalidate = 60;

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }) {
  const t = await getTranslations({ locale, namespace: 'faq' });
  return { title: t('pageTitle'), description: t('subtitle') };
}

export default async function FaqPage({ params: { locale } }: { params: { locale: string } }) {
  unstable_setRequestLocale(locale);
  const t = await getTranslations('faq');
  const data = await apiGet<{ faqs: FaqItem[] }>('/faq', { lang: locale });
  const faqs = data?.faqs ?? [];

  return (
    <>
      <Navbar />
      <main id="main" className="min-h-screen pt-28">
        <div className="mx-auto max-w-content px-6 pb-24">
          <h1 className="mb-4 font-display text-4xl font-semibold md:text-6xl">{t('pageTitle')}</h1>
          <p className="mb-12 text-muted">{t('subtitle')}</p>
          <FaqSearchGrid faqs={faqs} />
        </div>
      </main>
      <Footer />
    </>
  );
}
