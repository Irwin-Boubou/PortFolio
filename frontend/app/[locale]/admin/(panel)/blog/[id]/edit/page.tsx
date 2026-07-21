'use client';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import { api } from '@/lib/api';
import { BlogForm, type BlogFormValues } from '@/components/admin/BlogForm';

export default function EditPostPage() {
  const { id } = useParams<{ id: string }>();
  const { data } = useQuery({
    queryKey: ['admin-post', id],
    queryFn: async () => {
      const items = (await api.get('/blog?lang=all&limit=100')).data.items as Array<Record<string, unknown>>;
      return items.find((p) => p.id === id) ?? null;
    },
  });
  if (!data) return <p className="text-gray-400">Loading…</p>;
  const lm = (v: unknown) => { const m = (v ?? {}) as { en?: string; fr?: string }; return { en: m.en ?? '', fr: m.fr ?? '' }; };
  const initial: Partial<BlogFormValues> = {
    slug: data.slug as string,
    title: lm(data.title), excerpt: lm(data.excerpt), content: lm(data.content),
    coverUrl: (data.coverUrl as string) ?? '',
    tags: ((data.tags as Array<{ name: string }>) ?? []).map((t) => t.name).join(', '),
    published: Boolean(data.published),
  };
  return (<div><h1 className="mb-8 font-display text-2xl font-bold">Edit post</h1><BlogForm initial={initial} postId={id} /></div>);
}
