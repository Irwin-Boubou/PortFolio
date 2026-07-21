'use client';
/**
 * Admin panel shell (spec §4): light-grey theme, sidebar nav, auth guard.
 * On mount, tries a silent refresh (RT cookie) → redirects to /admin/login if it fails.
 */
import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { Link, usePathname, useRouter } from '@/navigation';
import {
  FiGrid, FiFolder, FiFileText, FiMail, FiSettings, FiLogOut, FiStar,
  FiMessageSquare, FiUsers, FiAward, FiList, FiDollarSign, FiHelpCircle, FiBriefcase, FiUser,
} from 'react-icons/fi';
import axios from 'axios';
import { api, API_URL } from '@/lib/api';
import { useAuthStore } from '@/store/auth';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const t = useTranslations('admin.nav');
  const router = useRouter();
  const pathname = usePathname();
  const { accessToken, setAccessToken, clear } = useAuthStore();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (accessToken) { setReady(true); return; }
    // silent session restore from the HttpOnly refresh cookie
    axios.post(`${API_URL}/auth/refresh`, {}, { withCredentials: true })
      .then((r) => { setAccessToken(r.data.accessToken); setReady(true); })
      .catch(() => router.replace('/admin/login'));
  }, [accessToken, router, setAccessToken]);

  const logout = async () => {
    await api.delete('/auth/logout').catch(() => null);
    clear();
    router.replace('/admin/login');
  };

  if (!ready) return <main className="grid min-h-screen place-items-center bg-[#F5F7FA] text-gray-500">…</main>;

  const nav = [
    { href: '/admin/dashboard', label: t('dashboard'), icon: FiGrid },
    { href: '/admin/projects', label: t('projects'), icon: FiFolder },
    { href: '/admin/blog', label: t('blog'), icon: FiFileText },
    { href: '/admin/about', label: t('about'), icon: FiUser },
    { href: '/admin/testimonials', label: t('testimonials'), icon: FiMessageSquare },
    { href: '/admin/clients', label: t('clients'), icon: FiUsers },
    { href: '/admin/awards', label: t('awards'), icon: FiAward },
    { href: '/admin/process', label: t('process'), icon: FiList },
    { href: '/admin/pricing', label: t('pricing'), icon: FiDollarSign },
    { href: '/admin/faq', label: t('faq'), icon: FiHelpCircle },
    { href: '/admin/resume', label: t('resume'), icon: FiBriefcase },
    { href: '/admin/skills', label: t('skills'), icon: FiStar },
    { href: '/admin/site-content', label: t('content'), icon: FiSettings },
    { href: '/admin/messages', label: t('messages'), icon: FiMail },
  ];

  return (
    <div className="flex min-h-screen bg-[#F5F7FA] text-[#1a1a2e]">
      <aside className="flex w-60 shrink-0 flex-col overflow-y-auto border-r border-gray-200 bg-white p-4 md:sticky md:top-0 md:h-screen">
        <p className="mb-8 px-2 font-display text-lg font-bold text-[#6C63FF]">Admin</p>
        <nav className="flex-1 space-y-1">
          {nav.map(({ href, label, icon: Icon }) => (
            <Link key={href} href={href}
                  className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors ${
                    pathname.startsWith(href) ? 'bg-[#6C63FF]/10 font-medium text-[#6C63FF]' : 'text-gray-600 hover:bg-gray-100'
                  }`}>
              <Icon size={16} /> {label}
            </Link>
          ))}
        </nav>
        <button onClick={logout} className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-gray-600 hover:bg-gray-100">
          <FiLogOut size={16} /> {t('logout')}
        </button>
      </aside>
      <main className="min-w-0 flex-1 p-8">{children}</main>
    </div>
  );
}
