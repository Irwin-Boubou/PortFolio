'use client';
import { useQuery } from '@tanstack/react-query';
import { FormShell } from '@/components/admin/FormShell';
import { useParams } from 'next/navigation';
import { api } from '@/lib/api';
import { TestimonialForm, type TestimonialFormValues } from '@/components/admin/TestimonialForm';

export default function EditTestimonialPage() {
  const { id } = useParams<{ id: string }>();
  const { data } = useQuery({
    queryKey: ['admin-testimonial', id],
    queryFn: async () => {
      const items = (await api.get('/testimonials?lang=all&limit=100')).data.testimonials as Array<Record<string, unknown>>;
      return items.find((p) => p.id === id) ?? null;
    },
  });
  if (!data) return <p className="text-sm text-gray-400">Loading…</p>;

  const lm = (v: unknown) => {
    const m = (v ?? {}) as { en?: string; fr?: string };
    return { en: m.en ?? '', fr: m.fr ?? '' };
  };
  const p = data as Record<string, unknown>;
  const initial: Partial<TestimonialFormValues> = {
    name: lm(p.name), role: lm(p.role), company: (p.company as string) ?? '',
    content: lm(p.content), avatarUrl: (p.avatarUrl as string) ?? '',
    rating: Number(p.rating) || 5, featured: Boolean(p.featured),
    order: Number(p.order) || 0, published: Boolean(p.published),
  };
  return (
    <FormShell title="Edit testimonial" backHref="/admin/testimonials">
      <TestimonialForm initial={initial} testimonialId={id} />
    </FormShell>
  );
}
