'use client';
/** Bilingual pricing package form. `features` is a per-language string array with add/remove rows. */
import { useState } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useRouter } from '@/navigation';
import { api } from '@/lib/api';

export interface PricingFormValues {
  name: { en: string; fr: string };
  tagline: { en: string; fr: string };
  price: string;
  currency: string;
  period: string;
  features: { en: { value: string }[]; fr: { value: string }[] };
  highlighted: boolean;
  order: number;
  published: boolean;
  ctaLabel: { en: string; fr: string };
  ctaUrl: string;
}

const empty: PricingFormValues = {
  name: { en: '', fr: '' }, tagline: { en: '', fr: '' },
  price: '', currency: 'USD', period: '',
  features: { en: [{ value: '' }], fr: [{ value: '' }] },
  highlighted: false, order: 0, published: false,
  ctaLabel: { en: '', fr: '' }, ctaUrl: '',
};

const input = 'w-full rounded-lg border border-gray-300 px-3 py-2.5 focus:border-[#6C63FF] focus:outline-none';
const label = 'mb-1 block text-sm font-medium text-gray-700';
const orNull = (s: string) => (s.trim() ? s.trim() : null);

export function PricingForm({ initial, pricingId }: { initial?: Partial<PricingFormValues>; pricingId?: string }) {
  const router = useRouter();
  const [lang, setLang] = useState<'en' | 'fr'>('en');
  const { register, control, handleSubmit, formState: { isSubmitting } } = useForm<PricingFormValues>({
    defaultValues: { ...empty, ...initial },
  });
  const featuresEn = useFieldArray({ control, name: 'features.en' });
  const featuresFr = useFieldArray({ control, name: 'features.fr' });
  const featureArrays = { en: featuresEn, fr: featuresFr };

  const onSubmit = async (v: PricingFormValues) => {
    const payload = {
      name: { en: v.name.en, fr: v.name.fr || undefined },
      tagline: { en: v.tagline.en, fr: v.tagline.fr || undefined },
      price: v.price,
      currency: v.currency || 'USD',
      period: orNull(v.period),
      features: {
        en: v.features.en.map((f) => f.value).filter(Boolean),
        fr: v.features.fr.map((f) => f.value).filter(Boolean),
      },
      highlighted: v.highlighted,
      order: Number(v.order),
      published: v.published,
      ctaLabel: v.ctaLabel.en ? { en: v.ctaLabel.en, fr: v.ctaLabel.fr || undefined } : null,
      ctaUrl: orNull(v.ctaUrl),
    };
    try {
      if (pricingId) await api.put(`/pricing/${pricingId}`, payload);
      else await api.post('/pricing', payload);
      toast.success('Saved');
      router.push('/admin/pricing');
    } catch (e) {
      toast.error('Save failed, check required fields');
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
        <p className="text-xs text-gray-400">Both languages are stored together, French falls back to English if left empty.</p>
      </div>

      {(['en', 'fr'] as const).map((l) => (
        <div key={l} className={lang === l ? 'space-y-5' : 'hidden'}>
          <div>
            <label className={label}>Name ({l.toUpperCase()}) {l === 'en' && '*'}</label>
            <input {...register(`name.${l}`, { required: l === 'en' })} className={input} />
          </div>
          <div>
            <label className={label}>Tagline ({l.toUpperCase()}) {l === 'en' && '*'}</label>
            <input {...register(`tagline.${l}`, { required: l === 'en' })} className={input} />
          </div>
          <div>
            <label className={label}>CTA label ({l.toUpperCase()})</label>
            <input {...register(`ctaLabel.${l}`)} className={input} />
          </div>
          <div>
            <label className={label}>Features ({l.toUpperCase()})</label>
            <div className="space-y-2">
              {featureArrays[l].fields.map((f, idx) => (
                <div key={f.id} className="flex gap-2">
                  <input {...register(`features.${l}.${idx}.value` as const)} className={input} placeholder="e.g. 2 revision rounds" />
                  <button type="button" onClick={() => featureArrays[l].remove(idx)}
                          className="rounded-lg border border-gray-300 px-3 text-sm text-red-500 hover:bg-gray-50">✕</button>
                </div>
              ))}
            </div>
            <button type="button" onClick={() => featureArrays[l].append({ value: '' })}
                    className="mt-2 text-sm text-[#6C63FF] hover:underline">+ Add feature</button>
          </div>
        </div>
      ))}

      <div className="grid gap-5 sm:grid-cols-2">
        <div><label className={label}>Price *</label><input {...register('price', { required: true })} className={input} placeholder="500 or On request" /></div>
        <div><label className={label}>Currency</label><input {...register('currency')} className={input} placeholder="USD" /></div>
        <div><label className={label}>Period</label><input {...register('period')} className={input} placeholder="/mo" /></div>
        <div><label className={label}>CTA URL</label><input {...register('ctaUrl')} className={input} /></div>
        <div><label className={label}>Order</label><input type="number" {...register('order', { valueAsNumber: true })} className={input} /></div>
      </div>

      <div className="flex gap-8">
        <label className="flex items-center gap-2 text-sm"><input type="checkbox" {...register('highlighted')} /> Highlighted</label>
        <label className="flex items-center gap-2 text-sm"><input type="checkbox" {...register('published')} /> Published</label>
      </div>

      <button type="submit" disabled={isSubmitting}
              className="rounded-lg bg-[#6C63FF] px-6 py-2.5 font-medium text-white hover:bg-[#5a51f0] disabled:opacity-50">
        {isSubmitting ? 'Saving…' : 'Save'}
      </button>
    </form>
  );
}
