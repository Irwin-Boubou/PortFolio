import { unstable_setRequestLocale, getTranslations } from 'next-intl/server';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { apiGet, type TrustCompany } from '@/lib/serverApi';
import { ClientsFilterGrid } from '@/components/sections/ClientsFilterGrid';

export const revalidate = 60;

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }) {
  const t = await getTranslations({ locale, namespace: 'clients' });
  return { title: t('pageTitle'), description: t('subtitle') };
}

export default async function ClientsPage({ params: { locale } }: { params: { locale: string } }) {
  unstable_setRequestLocale(locale);
  const t = await getTranslations('clients');
  const data = await apiGet<{ companies: TrustCompany[] }>('/trust-companies', { lang: locale });
  const companies = data?.companies ?? [];

  return (
    <>
      <Navbar />
      <main id="main" className="min-h-screen pt-28">
        <div className="mx-auto max-w-content px-6 pb-24">
          <h1 className="mb-4 font-display text-4xl font-semibold md:text-6xl">{t('pageTitle')}</h1>
          <p className="mb-12 text-muted">{t('subtitle')}</p>
          <ClientsFilterGrid companies={companies} />
        </div>
      </main>
      <Footer />
    </>
  );
}
