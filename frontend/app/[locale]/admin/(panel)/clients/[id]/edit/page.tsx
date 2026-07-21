'use client';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import { api } from '@/lib/api';
import { ClientForm, type ClientFormValues } from '@/components/admin/ClientForm';

export default function EditClientPage() {
  const { id } = useParams<{ id: string }>();
  const { data } = useQuery({
    queryKey: ['admin-client', id],
    queryFn: async () => {
      const items = (await api.get('/trust-companies?lang=all&limit=100')).data.items as Array<Record<string, unknown>>;
      return items.find((p) => p.id === id) ?? null;
    },
  });
  if (!data) return <p className="text-gray-400">Loading…</p>;

  const lm = (v: unknown) => {
    const m = (v ?? {}) as { en?: string; fr?: string };
    return { en: m.en ?? '', fr: m.fr ?? '' };
  };
  const p = data as Record<string, unknown>;
  const initial: Partial<ClientFormValues> = {
    name: (p.name as string) ?? '', logoUrl: (p.logoUrl as string) ?? '', websiteUrl: (p.websiteUrl as string) ?? '',
    description: lm(p.description), category: (p.category as ClientFormValues['category']) ?? 'client',
    order: Number(p.order) || 0, published: Boolean(p.published),
  };
  return (
    <div>
      <h1 className="mb-8 font-display text-2xl font-bold">Edit client</h1>
      <ClientForm initial={initial} clientId={id} />
    </div>
  );
}
