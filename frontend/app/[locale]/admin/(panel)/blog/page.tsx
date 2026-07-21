'use client';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { Link } from '@/navigation';
import { api } from '@/lib/api';

interface Row { id: string; slug: string; title: { en: string }; published: boolean; publishedAt: string | null }

export default function AdminBlogPage() {
  const qc = useQueryClient();
  const { data } = useQuery({
    queryKey: ['admin-blog'],
    queryFn: async () => (await api.get('/blog?lang=all&limit=100')).data.items as Row[],
  });
  const toggle = useMutation({
    mutationFn: (id: string) => api.patch(`/blog/${id}/publish`),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['admin-blog'] }),
  });
  const del = useMutation({
    mutationFn: (id: string) => api.delete(`/blog/${id}`),
    onSuccess: () => { toast.success('Deleted'); qc.invalidateQueries({ queryKey: ['admin-blog'] }); },
  });

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <h1 className="font-display text-2xl font-bold">Blog</h1>
        <Link href="/admin/blog/new" className="rounded-lg bg-[#6C63FF] px-4 py-2 text-sm font-medium text-white hover:bg-[#5a51f0]">+ New post</Link>
      </div>
      <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white">
        <table className="w-full text-sm">
          <thead className="border-b border-gray-200 bg-gray-50 text-left text-gray-500">
            <tr><th className="px-5 py-3 font-medium">Title</th><th className="px-5 py-3 font-medium">Status</th><th className="px-5 py-3" /></tr>
          </thead>
          <tbody>
            {(data ?? []).map((p) => (
              <tr key={p.id} className="border-b border-gray-100 last:border-0">
                <td className="px-5 py-3 font-medium">{p.title.en}</td>
                <td className="px-5 py-3">
                  <button onClick={() => toggle.mutate(p.id)}
                          className={`rounded-full px-2.5 py-0.5 text-xs ${p.published ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                    {p.published ? 'Published' : 'Draft'}
                  </button>
                </td>
                <td className="px-5 py-3 text-right">
                  <Link href={`/admin/blog/${p.id}/edit`} className="mr-4 text-[#6C63FF] hover:underline">Edit</Link>
                  <button onClick={() => { if (confirm('Delete this post?')) del.mutate(p.id); }} className="text-red-500 hover:underline">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
