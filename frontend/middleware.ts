import createMiddleware from 'next-intl/middleware';
import { locales, defaultLocale } from './i18n';

/** Locale routing: / → /en, /fr/... served natively. Admin API auth is handled client-side + API-side. */
export default createMiddleware({ locales, defaultLocale, localePrefix: 'always' });

export const config = {
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)'],
};
