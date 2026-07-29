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

const SOCIAL_KEYS = [
  { key: 'social.whatsapp', label: 'WhatsApp' },
  { key: 'social.instagram', label: 'Instagram' },
  { key: 'social.facebook', label: 'Facebook' },
  { key: 'social.linkedin', label: 'LinkedIn' },
  { key: 'social.github', label: 'GitHub' },
  { key: 'social.dribbble', label: 'Dribbble' },
  { key: 'social.behance', label: 'Behance' },
];

export default async function ContactPage({ params: { locale } }: { params: { locale: string } }) {
  unstable_setRequestLocale(locale);
  const content = getSiteContent(locale as Locale, [
    'about.photoUrl', 'contact.photoUrl', 'contact.cardMessage', 'hero.name',
    ...SOCIAL_KEYS.map((s) => s.key),
  ]);
  const photoUrl =
    (content['contact.photoUrl'] as string | undefined) ??
    (content['about.photoUrl'] as string | undefined) ??
    undefined;
  const name = (content['hero.name'] as string | undefined) ?? '';
  const cardMessage = content['contact.cardMessage'] as string | undefined;
  const socials = SOCIAL_KEYS
    .map((s) => ({ label: s.label, href: content[s.key] as string | undefined }))
    .filter((s): s is { label: string; href: string } => !!s.href);
  return (
    <>
      <Navbar />
      <main id="main" className="min-h-screen pt-28">
        <ContactForm photoUrl={photoUrl} name={name} cardMessage={cardMessage} socials={socials} />
      </main>
      <Footer />
    </>
  );
}
