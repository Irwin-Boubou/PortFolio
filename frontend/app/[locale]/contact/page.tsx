import { unstable_setRequestLocale, getTranslations } from 'next-intl/server';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { apiGet } from '@/lib/serverApi';
import { ContactForm } from './ContactForm';

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }) {
  unstable_setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'contact' });
  return {
    title: `${t('title')} · Portfolio`,
    description: locale === 'fr' ? 'Contactez-moi pour discuter de votre projet.' : 'Get in touch to discuss your project.',
  };
}

export default async function ContactPage({ params: { locale } }: { params: { locale: string } }) {
  unstable_setRequestLocale(locale);
  const content = await apiGet<{ content: Record<string, unknown> }>(
    '/site-content?keys=about.photoUrl,contact.photoUrl,hero.name',
    { lang: locale },
  );
  const photoUrl =
    (content?.content?.['contact.photoUrl'] as string | undefined) ??
    (content?.content?.['about.photoUrl'] as string | undefined) ??
    undefined;
  const name = (content?.content?.['hero.name'] as string | undefined) ?? '';
  return (
    <>
      <Navbar />
      <main id="main" className="min-h-screen pt-28">
        <ContactForm photoUrl={photoUrl} name={name} />
      </main>
      <Footer />
    </>
  );
}
