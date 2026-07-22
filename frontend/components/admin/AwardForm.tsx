'use client';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useRouter } from '@/navigation';
import { api } from '@/lib/api';
import { ImageUpload } from '@/components/admin/ImageUpload';

export interface AwardFormValues {
  title: { en: string; fr: string };
  issuer: { en: string; fr: string };
  category: { en: string; fr: string };
  date: string;
  badgeUrl: string;
  url: string;
  order: number;
  published: boolean;
}

const empty: AwardFormValues = {
  title: { en: '', fr: '' }, issuer: { en: '', fr: '' }, category: { en: '', fr: '' },
  date: '', badgeUrl: '', url: '', order: 0, published: false,
};

const input = 'w-full rounded-lg border border-gray-300 px-3 py-2.5 focus:border-[#6C63FF] focus:outline-none';
const label = 'mb-1 block text-sm font-medium text-gray-700';
const orNull = (s: string) => (s.trim() ? s.trim() : null);

export function AwardForm({ initial, awardId }: { initial?: Partial<AwardFormValues>; awardId?: string }) {
  const router = useRouter();
  const [lang, setLang] = useState<'en' | 'fr'>('en');
  const { register, handleSubmit, watch, setValue, formState: { isSubmitting } } = useForm<AwardFormValues>({
    defaultValues: { ...empty, ...initial },
  });
  const badgeUrl = watch('badgeUrl');

  const onSubmit = async (v: AwardFormValues) => {
    const payload = {
      title: { en: v.title.en, fr: v.title.fr || undefined },
      issuer: { en: v.issuer.en, fr: v.issuer.fr || undefined },
      category: v.category.en ? { en: v.category.en, fr: v.category.fr || undefined } : null,
      date: v.date ? new Date(v.date).toISOString() : undefined,
      badgeUrl: orNull(v.badgeUrl),
      url: orNull(v.url),
      order: Number(v.order),
      published: v.published,
    };
    try {
      if (awardId) await api.put(`/awards/${awardId}`, payload);
      else await api.post('/awards', payload);
      toast.success('Saved');
      router.push('/admin/awards');
    } catch (e) {
      toast.error('Save failed — check required fields');
      console.error(e);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-3xl space-y-6">
      <div className="flex items-center gap-3">
        <div className="flex overflow-hidden rounded-lg border border-gray-300">
          {(['en', 'fr'] as const).map((l) => (
            <button key={l} type="button" onClick={() => setLang(l)}
                    className={`px-4 py-2 text-sm font-semibold uppercase ${lang === l ? 'bg-[#6C63FF] text-white' : 'bg-white text-gray-500'}`}>
              {l}
            </button>
          ))}
        </div>
        <p className="text-xs text-gray-400">Both languages are stored together — French falls back to English if left empty.</p>
      </div>

      {(['en', 'fr'] as const).map((l) => (
        <div key={l} className={lang === l ? 'space-y-5' : 'hidden'}>
          <div>
            <label className={label}>Title ({l.toUpperCase()}) {l === 'en' && '*'}</label>
            <input {...register(`title.${l}`, { required: l === 'en' })} className={input} />
          </div>
          <div>
            <label className={label}>Issuer ({l.toUpperCase()}) {l === 'en' && '*'}</label>
            <input {...register(`issuer.${l}`, { required: l === 'en' })} className={input} />
          </div>
          <div>
            <label className={label}>Category ({l.toUpperCase()})</label>
            <input {...register(`category.${l}`)} className={input} />
          </div>
        </div>
      ))}

      <div className="grid gap-5 sm:grid-cols-2">
        <div><label className={label}>Date *</label><input type="date" {...register('date', { required: true })} className={input} /></div>
        <div><label className={label}>Order</label><input type="number" {...register('order', { valueAsNumber: true })} className={input} /></div>
        <div className="sm:col-span-2"><label className={label}>Link URL</label><input {...register('url')} className={input} placeholder="https://…" /></div>
      </div>

      <ImageUpload label="Badge / logo" shape="square" value={badgeUrl ?? ''} onChange={(url) => setValue('badgeUrl', url)} />

      <label className="flex items-center gap-2 text-sm"><input type="checkbox" {...register('published')} /> Published</label>

      <button type="submit" disabled={isSubmitting}
              className="rounded-lg bg-[#6C63FF] px-6 py-2.5 font-medium text-white hover:bg-[#5a51f0] disabled:opacity-50">
        {isSubmitting ? 'Saving…' : 'Save'}
      </button>
    </form>
  );
}
