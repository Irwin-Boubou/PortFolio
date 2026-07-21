import { unstable_setRequestLocale, getTranslations } from 'next-intl/server';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { ContactForm } from './ContactForm';

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }) {
  unstable_setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'contact' });
  return {
    title: `${t('title')} · Portfolio`,
    description: locale === 'fr' ? 'Contactez-moi pour discuter de votre projet.' : 'Get in touch to discuss your project.',
  };
}

export default function ContactPage({ params: { locale } }: { params: { locale: string } }) {
  unstable_setRequestLocale(locale);
  return (
    <>
      <Navbar />
      <main id="main" className="min-h-screen pt-28">
        <ContactForm />
      </main>
      <Footer />
    </>
  );
}
