'use client';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import { api } from '@/lib/api';
import { AwardForm, type AwardFormValues } from '@/components/admin/AwardForm';

export default function EditAwardPage() {
  const { id } = useParams<{ id: string }>();
  const { data } = useQuery({
    queryKey: ['admin-award', id],
    queryFn: async () => {
      const items = (await api.get('/awards?lang=all&limit=100')).data.items as Array<Record<string, unknown>>;
      return items.find((p) => p.id === id) ?? null;
    },
  });
  if (!data) return <p className="text-gray-400">Loading…</p>;

  const lm = (v: unknown) => {
    const m = (v ?? {}) as { en?: string; fr?: string };
    return { en: m.en ?? '', fr: m.fr ?? '' };
  };
  const p = data as Record<string, unknown>;
  const initial: Partial<AwardFormValues> = {
    title: lm(p.title), issuer: lm(p.issuer), category: lm(p.category),
    date: p.date ? new Date(p.date as string).toISOString().slice(0, 10) : '',
    badgeUrl: (p.badgeUrl as string) ?? '', url: (p.url as string) ?? '',
    order: Number(p.order) || 0, published: Boolean(p.published),
  };
  return (
    <div>
      <h1 className="mb-8 font-display text-2xl font-bold">Edit award</h1>
      <AwardForm initial={initial} awardId={id} />
    </div>
  );
}
