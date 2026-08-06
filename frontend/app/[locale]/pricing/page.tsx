import { unstable_setRequestLocale, getTranslations } from 'next-intl/server';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { getPricing, getPricingBundles, type Locale } from '@/lib/content';
import { PricingSection } from '@/components/sections/PricingSection';

export const revalidate = false;

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }) {
  const t = await getTranslations({ locale, namespace: 'pricing' });
  return { title: t('pageTitle'), description: t('subtitle') };
}

export default async function PricingPage({ params: { locale } }: { params: { locale: string } }) {
  unstable_setRequestLocale(locale);
  const packages = getPricing(locale as Locale);
  const bundles = getPricingBundles(locale as Locale);

  return (
    <>
      <Navbar />
      <main id="main" className="min-h-screen pt-28">
        <PricingSection packages={packages} bundles={bundles} />
      </main>
      <Footer />
    </>
  );
}
