'use client';
/** Client / partner (trust company) form. Description is bilingual; name is a plain string. */
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useRouter } from '@/navigation';
import { api } from '@/lib/api';

export interface ClientFormValues {
  name: string;
  logoUrl: string;
  websiteUrl: string;
  description: { en: string; fr: string };
  category: 'client' | 'partner' | 'worked-at';
  order: number;
  published: boolean;
}

const empty: ClientFormValues = {
  name: '', logoUrl: '', websiteUrl: '', description: { en: '', fr: '' },
  category: 'client', order: 0, published: false,
};

const input = 'w-full rounded-lg border border-gray-300 px-3 py-2.5 focus:border-[#6C63FF] focus:outline-none';
const label = 'mb-1 block text-sm font-medium text-gray-700';
const orNull = (s: string) => (s.trim() ? s.trim() : null);

export function ClientForm({ initial, clientId }: { initial?: Partial<ClientFormValues>; clientId?: string }) {
  const router = useRouter();
  const [lang, setLang] = useState<'en' | 'fr'>('en');
  const { register, handleSubmit, formState: { isSubmitting } } = useForm<ClientFormValues>({
    defaultValues: { ...empty, ...initial },
  });

  const onSubmit = async (v: ClientFormValues) => {
    const payload = {
      name: v.name,
      logoUrl: v.logoUrl,
      websiteUrl: v.websiteUrl,
      description: v.description.en ? { en: v.description.en, fr: v.description.fr || undefined } : null,
      category: v.category,
      order: Number(v.order),
      published: v.published,
    };
    try {
      if (clientId) await api.put(`/trust-companies/${clientId}`, payload);
      else await api.post('/trust-companies', payload);
      toast.success('Saved');
      router.push('/admin/clients');
    } catch (e) {
      toast.error('Save failed — check required fields');
      console.error(e);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-3xl space-y-6">
      <div className="grid gap-5 sm:grid-cols-2">
        <div><label className={label}>Name *</label><input {...register('name', { required: true })} className={input} /></div>
        <div>
          <label className={label}>Category</label>
          <select {...register('category')} className={input}>
            <option value="client">Client</option>
            <option value="partner">Partner</option>
            <option value="worked-at">Worked at</option>
          </select>
        </div>
        <div><label className={label}>Logo URL *</label><input {...register('logoUrl', { required: true })} className={input} placeholder="https://res.cloudinary.com/…" /></div>
        <div><label className={label}>Website URL *</label><input {...register('websiteUrl', { required: true })} className={input} /></div>
        <div><label className={label}>Order</label><input type="number" {...register('order', { valueAsNumber: true })} className={input} /></div>
      </div>

      <div className="flex items-center gap-3">
        <div className="flex overflow-hidden rounded-lg border border-gray-300">
          {(['en', 'fr'] as const).map((l) => (
            <button key={l} type="button" onClick={() => setLang(l)}
                    className={`px-4 py-2 text-sm font-semibold uppercase ${lang === l ? 'bg-[#6C63FF] text-white' : 'bg-white text-gray-500'}`}>
              {l}
            </button>
          ))}
        </div>
        <p className="text-xs text-gray-400">Description is optional; both languages stored together.</p>
      </div>
      {(['en', 'fr'] as const).map((l) => (
        <div key={l} className={lang === l ? 'space-y-5' : 'hidden'}>
          <div>
            <label className={label}>Description ({l.toUpperCase()})</label>
            <textarea rows={4} {...register(`description.${l}`)} className={input} />
          </div>
        </div>
      ))}

      <label className="flex items-center gap-2 text-sm"><input type="checkbox" {...register('published')} /> Published</label>

      <button type="submit" disabled={isSubmitting}
              className="rounded-lg bg-[#6C63FF] px-6 py-2.5 font-medium text-white hover:bg-[#5a51f0] disabled:opacity-50">
        {isSubmitting ? 'Saving…' : 'Save'}
      </button>
    </form>
  );
}
