import { unstable_setRequestLocale, getTranslations } from 'next-intl/server';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { apiGet, type ProcessStep } from '@/lib/serverApi';
import { ProcessSection } from '@/components/sections/ProcessSection';

export const revalidate = 60;

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }) {
  const t = await getTranslations({ locale, namespace: 'process' });
  return { title: t('pageTitle'), description: t('subtitle') };
}

export default async function ProcessPage({ params: { locale } }: { params: { locale: string } }) {
  unstable_setRequestLocale(locale);
  const data = await apiGet<{ steps: ProcessStep[] }>('/process-steps', { lang: locale });
  const steps = data?.steps ?? [];

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
