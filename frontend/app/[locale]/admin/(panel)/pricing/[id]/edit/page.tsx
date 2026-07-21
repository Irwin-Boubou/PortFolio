'use client';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import { api } from '@/lib/api';
import { PricingForm, type PricingFormValues } from '@/components/admin/PricingForm';

export default function EditPricingPage() {
  const { id } = useParams<{ id: string }>();
  const { data } = useQuery({
    queryKey: ['admin-pricing-item', id],
    queryFn: async () => {
      const items = (await api.get('/pricing?lang=all&limit=100')).data.items as Array<Record<string, unknown>>;
      return items.find((p) => p.id === id) ?? null;
    },
  });
  if (!data) return <p className="text-gray-400">Loading…</p>;

  const lm = (v: unknown) => {
    const m = (v ?? {}) as { en?: string; fr?: string };
    return { en: m.en ?? '', fr: m.fr ?? '' };
  };
  const p = data as Record<string, unknown>;
  const featuresRaw = (p.features ?? {}) as { en?: string[]; fr?: string[] };
  const toRows = (arr?: string[]) => (arr && arr.length ? arr.map((v) => ({ value: v })) : [{ value: '' }]);

  const initial: Partial<PricingFormValues> = {
    name: lm(p.name), tagline: lm(p.tagline),
    price: (p.price as string) ?? '', currency: (p.currency as string) ?? 'USD', period: (p.period as string) ?? '',
    features: { en: toRows(featuresRaw.en), fr: toRows(featuresRaw.fr) },
    highlighted: Boolean(p.highlighted), order: Number(p.order) || 0, published: Boolean(p.published),
    ctaLabel: lm(p.ctaLabel), ctaUrl: (p.ctaUrl as string) ?? '',
  };
  return (
    <div>
      <h1 className="mb-8 font-display text-2xl font-bold">Edit pricing package</h1>
      <PricingForm initial={initial} pricingId={id} />
    </div>
  );
}
