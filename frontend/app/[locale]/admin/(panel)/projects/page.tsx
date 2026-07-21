'use client';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useTranslations } from 'next-intl';
import toast from 'react-hot-toast';
import { Link } from '@/navigation';
import { api } from '@/lib/api';
import type { Project } from '@/lib/serverApi';

export default function AdminProjectsPage() {
  const t = useTranslations('admin.projects');
  const qc = useQueryClient();
  const { data } = useQuery({
    queryKey: ['admin-projects'],
    // lang=all → both languages returned so the table shows raw locale maps
    queryFn: async () => (await api.get('/projects?lang=all&limit=100')).data.items as Array<Project & { title: { en: string } }>,
  });

  const del = useMutation({
    mutationFn: (id: string) => api.delete(`/projects/${id}`),
    onSuccess: () => { toast.success('Deleted'); qc.invalidateQueries({ queryKey: ['admin-projects'] }); },
  });
  const toggleFeatured = useMutation({
    mutationFn: (id: string) => api.patch(`/projects/${id}/featured`),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['admin-projects'] }),
  });

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <h1 className="font-display text-2xl font-bold">{t('title')}</h1>
        <Link href="/admin/projects/new" className="rounded-lg bg-[#6C63FF] px-4 py-2 text-sm font-medium text-white hover:bg-[#5a51f0]">
          + {t('new')}
        </Link>
      </div>
      <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white">
        <table className="w-full text-sm">
          <thead className="border-b border-gray-200 bg-gray-50 text-left text-gray-500">
            <tr>
              <th className="px-5 py-3 font-medium">Title</th>
              <th className="px-5 py-3 font-medium">Category</th>
              <th className="px-5 py-3 font-medium">Status</th>
              <th className="px-5 py-3 font-medium">{t('featured')}</th>
              <th className="px-5 py-3" />
            </tr>
          </thead>
          <tbody>
            {(data ?? []).map((p) => (
              <tr key={p.id} className="border-b border-gray-100 last:border-0">
                <td className="px-5 py-3 font-medium">{p.title.en}</td>
                <td className="px-5 py-3 text-gray-500">{p.category}</td>
                <td className="px-5 py-3">
                  <span className={`rounded-full px-2.5 py-0.5 text-xs ${p.published ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                    {p.published ? t('published') : t('draft')}
                  </span>
                </td>
                <td className="px-5 py-3">
                  <button onClick={() => toggleFeatured.mutate(p.id)} aria-label={t('featured')}
                          className={p.featured ? 'text-yellow-500' : 'text-gray-300 hover:text-gray-400'}>★</button>
                </td>
                <td className="px-5 py-3 text-right">
                  <Link href={`/admin/projects/${p.id}/edit`} className="mr-4 text-[#6C63FF] hover:underline">{t('edit')}</Link>
                  <button onClick={() => { if (confirm(t('confirmDelete'))) del.mutate(p.id); }}
                          className="text-red-500 hover:underline">{t('delete')}</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
