'use client';
import { useQuery } from '@tanstack/react-query';
import { useTranslations } from 'next-intl';
import { api } from '@/lib/api';

export default function DashboardPage() {
  const t = useTranslations('admin.dashboard');
  const { data } = useQuery({
    queryKey: ['dashboard'],
    queryFn: async () => (await api.get('/dashboard/stats')).data.stats as
      { projects: number; posts: number; messages: number; unread: number },
  });
  const cards = [
    { label: t('projects'), value: data?.projects },
    { label: t('posts'), value: data?.posts },
    { label: t('messages'), value: data?.messages },
    { label: t('unread'), value: data?.unread, accent: true },
  ];
  return (
    <div>
      <h1 className="mb-8 font-display text-2xl font-bold">{t('title')}</h1>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map((c) => (
          <div key={c.label} className="rounded-2xl border border-gray-200 bg-white p-6">
            <p className={`font-display text-4xl font-bold ${c.accent ? 'text-[#FF4D6A]' : 'text-[#6C63FF]'}`}>{c.value ?? '—'}</p>
            <p className="mt-1 text-sm text-gray-500">{c.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
