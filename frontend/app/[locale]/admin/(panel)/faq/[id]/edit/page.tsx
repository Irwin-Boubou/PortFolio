'use client';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import { api } from '@/lib/api';
import { FaqForm, type FaqFormValues } from '@/components/admin/FaqForm';

export default function EditFaqPage() {
  const { id } = useParams<{ id: string }>();
  const { data } = useQuery({
    queryKey: ['admin-faq-item', id],
    queryFn: async () => {
      const items = (await api.get('/faq?lang=all&limit=100')).data.items as Array<Record<string, unknown>>;
      return items.find((p) => p.id === id) ?? null;
    },
  });
  if (!data) return <p className="text-gray-400">Loading…</p>;

  const lm = (v: unknown) => {
    const m = (v ?? {}) as { en?: string; fr?: string };
    return { en: m.en ?? '', fr: m.fr ?? '' };
  };
  const p = data as Record<string, unknown>;
  const initial: Partial<FaqFormValues> = {
    question: lm(p.question), answer: lm(p.answer),
    category: (p.category as string) ?? 'general', order: Number(p.order) || 0, published: Boolean(p.published),
  };
  return (
    <div>
      <h1 className="mb-8 font-display text-2xl font-bold">Edit FAQ item</h1>
      <FaqForm initial={initial} faqId={id} />
    </div>
  );
}
