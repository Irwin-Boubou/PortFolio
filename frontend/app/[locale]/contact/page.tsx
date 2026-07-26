import { unstable_setRequestLocale } from 'next-intl/server';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { getSiteContent, type Locale } from '@/lib/content';
import { ContactForm } from './ContactForm';

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }) {
  unstable_setRequestLocale(locale);
  return {
    title: 'Contact',
    description: locale === 'fr' ? 'Contactez-moi pour discuter de votre projet.' : 'Get in touch to discuss your project.',
  };
}

export default async function ContactPage({ params: { locale } }: { params: { locale: string } }) {
  unstable_setRequestLocale(locale);
  const content = getSiteContent(locale as Locale, ['about.photoUrl', 'contact.photoUrl', 'contact.cardMessage', 'hero.name']);
  const photoUrl =
    (content['contact.photoUrl'] as string | undefined) ??
    (content['about.photoUrl'] as string | undefined) ??
    undefined;
  const name = (content['hero.name'] as string | undefined) ?? '';
  const cardMessage = content['contact.cardMessage'] as string | undefined;
  return (
    <>
      <Navbar />
      <main id="main" className="min-h-screen pt-28">
        <ContactForm photoUrl={photoUrl} name={name} cardMessage={cardMessage} />
      </main>
      <Footer />
    </>
  );
}
