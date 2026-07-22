import type { Metadata } from 'next';
import { Inter, Space_Grotesk, JetBrains_Mono } from 'next/font/google';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, unstable_setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { locales } from '@/i18n';
import { Providers } from '@/components/providers/Providers';
import '../globals.css';

// Typography per spec §5.3, loaded via next/font for zero-CLS
const display = Space_Grotesk({ subsets: ['latin'], variable: '--font-display', weight: ['500', '600', '700'] });
const body = Inter({ subsets: ['latin'], variable: '--font-body' });
const mono = JetBrains_Mono({ subsets: ['latin'], variable: '--font-mono', weight: ['400', '500'] });

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'),
  title: { default: 'Benison · Computer Engineer', template: '%s · Benison' },
  description: 'Computer Engineer specialising in Software Engineering, Full-Stack Development & Graphic Design.',
  robots: { index: true, follow: true },
  icons: { icon: [{ url: '/favicon.svg', type: 'image/svg+xml' }], apple: '/favicon.svg' },
  manifest: '/site.webmanifest',
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children, params: { locale },
}: { children: React.ReactNode; params: { locale: string } }) {
  if (!locales.includes(locale as never)) notFound();
  unstable_setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <html lang={locale} data-theme="dark" suppressHydrationWarning>
      <body className={`${display.variable} ${body.variable} ${mono.variable} font-sans antialiased`}>
        <a href="#main" className="skip-link">Skip to main content</a>
        <NextIntlClientProvider messages={messages}>
          <Providers>{children}</Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
