'use client';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useTranslations } from 'next-intl';
import { api } from '@/lib/api';
import { AdminEmpty } from '@/components/admin/AdminEmpty';
import { FiInbox } from 'react-icons/fi';

interface Msg { id: string; name: string; email: string; subject: string | null; message: string; read: boolean; locale: string; createdAt: string }

export default function MessagesPage() {
  const t = useTranslations('admin.messages');
  const qc = useQueryClient();
  const { data } = useQuery({
    queryKey: ['messages'],
    queryFn: async () => (await api.get('/contact/messages')).data.messages as Msg[],
  });
  const markRead = useMutation({
    mutationFn: (id: string) => api.patch(`/contact/${id}/read`),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['messages'] }),
  });

  return (
    <div>
      <h1 className="mb-8 font-display text-2xl font-bold">{t('title')}</h1>
      {(!data || data.length === 0) && (
        <AdminEmpty
          icon={<FiInbox size={30} />}
          title={t('empty')}
          hint="Messages sent through the contact form will appear here."
        />
      )}
      <div className="space-y-4">
        {(data ?? []).map((m) => (
          <div key={m.id} className={`rounded-2xl border bg-white p-6 ${m.read ? 'border-gray-200' : 'border-[#6C63FF]/50 shadow-sm'}`}>
            <div className="flex flex-wrap items-center gap-3">
              {!m.read && <span className="h-2 w-2 rounded-full bg-[#6C63FF]" aria-label="unread" />}
              <p className="font-medium">{m.name}</p>
              <a href={`mailto:${m.email}`} className="text-sm text-[#6C63FF] hover:underline">{m.email}</a>
              <span className="rounded bg-gray-100 px-1.5 text-xs uppercase text-gray-500">{m.locale}</span>
              <span className="ml-auto text-xs text-gray-400">{new Date(m.createdAt).toLocaleString()}</span>
            </div>
            {m.subject && <p className="mt-2 text-sm font-medium text-gray-700">{m.subject}</p>}
            <p className="mt-2 whitespace-pre-wrap text-sm text-gray-600">{m.message}</p>
            {!m.read && (
              <button onClick={() => markRead.mutate(m.id)} className="mt-3 text-sm text-[#6C63FF] hover:underline">
                {t('markRead')}
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
