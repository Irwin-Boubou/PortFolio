'use client';
import { useQuery } from '@tanstack/react-query';
import { useTranslations } from 'next-intl';
import { Link } from '@/navigation';
import { FiFolder, FiFileText, FiMessageSquare, FiUsers, FiClock } from 'react-icons/fi';
import { api } from '@/lib/api';

interface Stats { projects: number; posts: number; messages: number; unread: number; testimonials: number }
interface ContactMessage { id: string; name: string; email: string; subject: string | null; message: string; createdAt: string }
interface Activity { id: string; action: string; label: string; createdAt: string }

const timeAgo = (iso: string) => {
  const diffMs = Date.now() - new Date(iso).getTime();
  const mins = Math.round(diffMs / 60000);
  if (mins < 1) return 'just now';
  if (mins < 60) return `${mins}m ago`;
  const hours = Math.round(mins / 60);
  if (hours < 24) return `${hours}h ago`;
  return `${Math.round(hours / 24)}d ago`;
};

export default function DashboardPage() {
  const t = useTranslations('admin.dashboard');
  const { data: stats } = useQuery({
    queryKey: ['dashboard-stats'],
    queryFn: async () => (await api.get('/dashboard/stats')).data.stats as Stats,
  });
  const { data: recentMessages } = useQuery({
    queryKey: ['dashboard-recent-messages'],
    queryFn: async () => (await api.get('/dashboard/recent-messages')).data.messages as ContactMessage[],
  });
  const { data: activity } = useQuery({
    queryKey: ['dashboard-recent-activity'],
    queryFn: async () => (await api.get('/dashboard/recent-activity')).data.activity as Activity[],
  });

  const cards = [
    { label: t('projects'), value: stats?.projects, icon: FiFolder },
    { label: t('posts'), value: stats?.posts, icon: FiFileText },
    { label: t('unread'), value: stats?.unread, icon: FiMessageSquare, accent: true },
    { label: t('testimonials'), value: stats?.testimonials, icon: FiUsers },
  ];

  const quickActions = [
    { href: '/admin/projects/new', label: t('newProject') },
    { href: '/admin/blog/new', label: t('newPost') },
    { href: '/admin/testimonials/new', label: t('newTestimonial') },
    { href: '/admin/clients/new', label: t('newClient') },
  ];

  return (
    <div>
      <h1 className="mb-8 font-display text-2xl font-bold">{t('title')}</h1>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map((c) => (
          <div key={c.label} className="flex items-center justify-between rounded-2xl border border-gray-200 bg-white p-6">
            <div>
              <p className={`font-display text-4xl font-bold ${c.accent ? 'text-[#FF4D6A]' : 'text-[#6C63FF]'}`}>{c.value ?? ', '}</p>
              <p className="mt-1 text-sm text-gray-500">{c.label}</p>
            </div>
            <c.icon size={28} className="text-gray-300" />
          </div>
        ))}
      </div>

      <div className="mt-8">
        <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-gray-500">{t('quickActions')}</h2>
        <div className="flex flex-wrap gap-3">
          {quickActions.map((a) => (
            <Link key={a.href} href={a.href}
                  className="rounded-lg bg-[#6C63FF] px-4 py-2 text-sm font-medium text-white hover:bg-[#5a51f0]">
              + {a.label}
            </Link>
          ))}
        </div>
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border border-gray-200 bg-white p-6">
          <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-gray-500">{t('recentMessages')}</h2>
          {!recentMessages?.length ? (
            <p className="text-sm text-gray-400">{t('noMessages')}</p>
          ) : (
            <ul className="space-y-4">
              {recentMessages.map((m) => (
                <li key={m.id} className="border-b border-gray-100 pb-3 last:border-0 last:pb-0">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium">{m.name}</p>
                    <span className="text-xs text-gray-400">{timeAgo(m.createdAt)}</span>
                  </div>
                  <p className="mt-1 line-clamp-1 text-sm text-gray-500">{m.subject || m.message}</p>
                </li>
              ))}
            </ul>
          )}
          <Link href="/admin/messages" className="mt-4 inline-block text-sm text-[#6C63FF] hover:underline">
            {t('messages')} →
          </Link>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white p-6">
          <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-gray-500">{t('recentActivity')}</h2>
          {!activity?.length ? (
            <p className="text-sm text-gray-400">{t('noActivity')}</p>
          ) : (
            <ul className="space-y-3">
              {activity.map((a) => (
                <li key={a.id} className="flex items-start gap-3 text-sm">
                  <FiClock size={14} className="mt-0.5 shrink-0 text-gray-300" />
                  <div>
                    <p className="text-gray-700">{a.label}</p>
                    <p className="text-xs text-gray-400">{timeAgo(a.createdAt)}</p>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
