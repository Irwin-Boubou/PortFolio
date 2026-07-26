import { unstable_setRequestLocale, getTranslations } from 'next-intl/server';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { getProcessSteps, type Locale } from '@/lib/content';
import { ProcessSection } from '@/components/sections/ProcessSection';

export const revalidate = false;

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }) {
  const t = await getTranslations({ locale, namespace: 'process' });
  return { title: locale === 'fr' ? 'Notre Processus' : 'Our Process', description: t('subtitle') };
}

export default async function ProcessPage({ params: { locale } }: { params: { locale: string } }) {
  unstable_setRequestLocale(locale);
  const steps = getProcessSteps(locale as Locale);

  return (
    <>
      <Navbar />
      <main id="main" className="min-h-screen pt-28">
        <ProcessSection steps={steps} />
      </main>
      <Footer />
    </>
  );
}
