import { createSharedPathnamesNavigation } from 'next-intl/navigation';
import { locales } from './i18n';

/** Locale-aware Link / router, always use these instead of next/link. */
export const { Link, redirect, usePathname, useRouter } = createSharedPathnamesNavigation({ locales });
