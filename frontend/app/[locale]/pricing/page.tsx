import { unstable_setRequestLocale, getTranslations } from 'next-intl/server';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { apiGet, type PricingPackage } from '@/lib/serverApi';
import { PricingSection } from '@/components/sections/PricingSection';

export const revalidate = 60;

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }) {
  const t = await getTranslations({ locale, namespace: 'pricing' });
  return { title: t('pageTitle'), description: t('subtitle') };
}

export default async function PricingPage({ params: { locale } }: { params: { locale: string } }) {
  unstable_setRequestLocale(locale);
  const data = await apiGet<{ packages: PricingPackage[] }>('/pricing', { lang: locale });
  const packages = data?.packages ?? [];

  return (
    <>
      <Navbar />
      <main id="main" className="min-h-screen pt-28">
        <PricingSection packages={packages} />
      </main>
      <Footer />
    </>
  );
}
