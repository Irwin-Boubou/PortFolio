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
  FiMessageSquare, FiUsers, FiAward, FiList, FiDollarSign, FiHelpCircle, FiBriefcase, FiUser, FiUserCheck,
  FiMenu, FiX, FiImage,
} from 'react-icons/fi';
import axios from 'axios';
import { api, API_URL } from '@/lib/api';
import { useAuthStore } from '@/store/auth';
import { Logo } from '@/components/layout/Logo';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const t = useTranslations('admin.nav');
  const router = useRouter();
  const pathname = usePathname();
  const { accessToken, setAccessToken, clear } = useAuthStore();
  const [ready, setReady] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // close the mobile drawer whenever the route changes
  useEffect(() => setSidebarOpen(false), [pathname]);

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

  const groups: { items: { href: string; label: string; icon: typeof FiGrid }[] }[] = [
    { items: [{ href: '/admin/dashboard', label: t('dashboard'), icon: FiGrid }] },
    {
      items: [
        { href: '/admin/projects', label: t('projects'), icon: FiFolder },
        { href: '/admin/blog', label: t('blog'), icon: FiFileText },
        { href: '/admin/testimonials', label: t('testimonials'), icon: FiMessageSquare },
        { href: '/admin/clients', label: t('clients'), icon: FiUsers },
        { href: '/admin/awards', label: t('awards'), icon: FiAward },
      ],
    },
    {
      items: [
        { href: '/admin/skills', label: t('skills'), icon: FiStar },
        { href: '/admin/process', label: t('process'), icon: FiList },
        { href: '/admin/pricing', label: t('pricing'), icon: FiDollarSign },
        { href: '/admin/faq', label: t('faq'), icon: FiHelpCircle },
        { href: '/admin/resume', label: t('resume'), icon: FiBriefcase },
      ],
    },
    {
      items: [
        { href: '/admin/about', label: t('about'), icon: FiUser },
        { href: '/admin/gallery', label: t('gallery'), icon: FiImage },
        { href: '/admin/site-content', label: t('content'), icon: FiSettings },
      ],
    },
    {
      items: [
        { href: '/admin/messages', label: t('messages'), icon: FiMail },
        { href: '/admin/profile', label: t('profile'), icon: FiUserCheck },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-[#F5F7FA] text-[#1a1a2e] [color-scheme:light] lg:flex">
      {/* mobile top bar */}
      <header className="sticky top-0 z-30 flex items-center justify-between border-b border-gray-200 bg-white px-4 py-3 lg:hidden">
        <Logo size={24} showWordmark wordmarkColor="#1A1A2E" />
        <button
          onClick={() => setSidebarOpen(true)}
          aria-label="Open menu"
          className="grid h-10 w-10 place-items-center rounded-lg text-gray-600 hover:bg-gray-100"
        >
          <FiMenu size={20} />
        </button>
      </header>

      {/* backdrop */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 bg-black/40 lg:hidden" onClick={() => setSidebarOpen(false)} aria-hidden="true" />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-64 flex-col overflow-y-auto border-r border-gray-200 bg-white p-4 transition-transform duration-300 lg:sticky lg:top-0 lg:z-auto lg:h-screen lg:w-60 lg:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="mb-8 flex items-center justify-between px-2">
          <Logo size={26} showWordmark wordmarkColor="#1A1A2E" />
          <button
            onClick={() => setSidebarOpen(false)}
            aria-label="Close menu"
            className="grid h-8 w-8 place-items-center rounded-lg text-gray-500 hover:bg-gray-100 lg:hidden"
          >
            <FiX size={18} />
          </button>
        </div>
        <nav className="flex-1 space-y-4">
          {groups.map((group, i) => (
            <div key={i} className={i > 0 ? 'space-y-1 border-t border-gray-100 pt-4' : 'space-y-1'}>
              {group.items.map(({ href, label, icon: Icon }) => (
                <Link key={href} href={href} onClick={() => setSidebarOpen(false)}
                      className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors ${
                        pathname.startsWith(href) ? 'bg-[#6C63FF]/10 font-medium text-[#6C63FF]' : 'text-gray-600 hover:bg-gray-100'
                      }`}>
                  <Icon size={16} /> {label}
                </Link>
              ))}
            </div>
          ))}
        </nav>
        <button onClick={logout} className="mt-4 flex items-center gap-3 rounded-lg border-t border-gray-100 px-3 py-2.5 pt-5 text-sm text-gray-600 hover:bg-gray-100">
          <FiLogOut size={16} /> {t('logout')}
        </button>
      </aside>

      <main className="min-w-0 flex-1 p-5 sm:p-8">{children}</main>
    </div>
  );
}
