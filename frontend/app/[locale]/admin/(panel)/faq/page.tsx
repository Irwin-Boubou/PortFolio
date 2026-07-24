'use client';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { Link } from '@/navigation';
import { api } from '@/lib/api';

interface Row {
  id: string; question: { en: string }; category: string; published: boolean; order: number;
}

export default function AdminFaqPage() {
  const qc = useQueryClient();
  const { data } = useQuery({
    queryKey: ['admin-faq'],
    queryFn: async () => (await api.get('/faq?lang=all&limit=100')).data.faqs as Row[],
  });
  const rows = [...(data ?? [])].sort((a, b) => a.order - b.order);

  const invalidate = () => qc.invalidateQueries({ queryKey: ['admin-faq'] });
  const del = useMutation({
    mutationFn: (id: string) => api.delete(`/faq/${id}`),
    onSuccess: () => { toast.success('Deleted'); invalidate(); },
  });
  const reorder = useMutation({
    mutationFn: (order: { id: string; order: number }[]) => api.patch('/faq/reorder', { order }),
    onSuccess: invalidate,
  });

  const move = (i: number, dir: -1 | 1) => {
    const j = i + dir;
    if (j < 0 || j >= rows.length) return;
    const a = rows[i], b = rows[j];
    reorder.mutate([{ id: a.id, order: b.order }, { id: b.id, order: a.order }]);
  };

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <h1 className="font-display text-2xl font-bold">FAQ</h1>
        <Link href="/admin/faq/new" className="rounded-lg bg-[#6C63FF] px-4 py-2 text-sm font-medium text-white hover:bg-[#5a51f0]">
          + New question
        </Link>
      </div>
      <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white">
        <table className="w-full text-sm">
          <thead className="border-b border-gray-200 bg-gray-50 text-left text-gray-500">
            <tr>
              <th className="px-5 py-3 font-medium">Question</th>
              <th className="px-5 py-3 font-medium">Category</th>
              <th className="px-5 py-3 font-medium">Status</th>
              <th className="px-5 py-3 font-medium">Order</th>
              <th className="px-5 py-3" />
            </tr>
          </thead>
          <tbody>
            {rows.map((r, i) => (
              <tr key={r.id} className="border-b border-gray-100 last:border-0">
                <td className="px-5 py-3 font-medium">{r.question.en}</td>
                <td className="px-5 py-3 text-gray-500">{r.category}</td>
                <td className="px-5 py-3">
                  <span className={`rounded-full px-2.5 py-0.5 text-xs ${r.published ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                    {r.published ? 'Published' : 'Draft'}
                  </span>
                </td>
                <td className="px-5 py-3">
                  <div className="flex items-center gap-1">
                    <button onClick={() => move(i, -1)} disabled={i === 0} className="text-gray-400 hover:text-gray-600 disabled:opacity-30">↑</button>
                    <button onClick={() => move(i, 1)} disabled={i === rows.length - 1} className="text-gray-400 hover:text-gray-600 disabled:opacity-30">↓</button>
                  </div>
                </td>
                <td className="px-5 py-3 text-right">
                  <Link href={`/admin/faq/${r.id}/edit`} className="mr-4 text-[#6C63FF] hover:underline">Edit</Link>
                  <button onClick={() => { if (confirm('Delete this FAQ item? This cannot be undone.')) del.mutate(r.id); }}
                          className="text-red-500 hover:underline">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
