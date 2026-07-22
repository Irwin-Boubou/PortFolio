'use client';
/** Bilingual testimonial form — mirrors ProjectForm.tsx conventions. */
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useRouter } from '@/navigation';
import { api } from '@/lib/api';
import { ImageUpload } from '@/components/admin/ImageUpload';
import { StarRating } from '@/components/admin/StarRating';

export interface TestimonialFormValues {
  name: { en: string; fr: string };
  role: { en: string; fr: string };
  company: string;
  content: { en: string; fr: string };
  avatarUrl: string;
  rating: number;
  featured: boolean;
  order: number;
  published: boolean;
}

const empty: TestimonialFormValues = {
  name: { en: '', fr: '' }, role: { en: '', fr: '' }, company: '',
  content: { en: '', fr: '' }, avatarUrl: '', rating: 5, featured: false, order: 0, published: false,
};

const input = 'w-full rounded-lg border border-gray-300 px-3 py-2.5 focus:border-[#6C63FF] focus:outline-none';
const label = 'mb-1 block text-sm font-medium text-gray-700';
const orNull = (s: string) => (s.trim() ? s.trim() : null);

export function TestimonialForm({ initial, testimonialId }: { initial?: Partial<TestimonialFormValues>; testimonialId?: string }) {
  const router = useRouter();
  const [lang, setLang] = useState<'en' | 'fr'>('en');
  const { register, handleSubmit, watch, setValue, formState: { isSubmitting } } = useForm<TestimonialFormValues>({
    defaultValues: { ...empty, ...initial },
  });
  const avatarUrl = watch('avatarUrl');
  const rating = watch('rating');

  const onSubmit = async (v: TestimonialFormValues) => {
    const payload = {
      name: { en: v.name.en, fr: v.name.fr || undefined },
      role: { en: v.role.en, fr: v.role.fr || undefined },
      company: v.company,
      content: { en: v.content.en, fr: v.content.fr || undefined },
      avatarUrl: orNull(v.avatarUrl),
      rating: Number(v.rating),
      featured: v.featured,
      order: Number(v.order),
      published: v.published,
    };
    try {
      if (testimonialId) await api.put(`/testimonials/${testimonialId}`, payload);
      else await api.post('/testimonials', payload);
      toast.success('Saved');
      router.push('/admin/testimonials');
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
            <label className={label}>Name ({l.toUpperCase()}) {l === 'en' && '*'}</label>
            <input {...register(`name.${l}`, { required: l === 'en' })} className={input} />
          </div>
          <div>
            <label className={label}>Role ({l.toUpperCase()}) {l === 'en' && '*'}</label>
            <input {...register(`role.${l}`, { required: l === 'en' })} className={input} />
          </div>
          <div>
            <label className={label}>Quote / content ({l.toUpperCase()}) {l === 'en' && '*'}</label>
            <textarea rows={5} {...register(`content.${l}`, { required: l === 'en' })} className={input} />
          </div>
        </div>
      ))}

      <div className="grid gap-5 sm:grid-cols-2">
        <div><label className={label}>Company *</label><input {...register('company', { required: true })} className={input} /></div>
        <div>
          <label className={label}>Order</label>
          <input type="number" {...register('order', { valueAsNumber: true })} className={input} />
        </div>
        <div>
          <label className={label}>Rating</label>
          <StarRating value={Number(rating) || 5} onChange={(v) => setValue('rating', v)} />
        </div>
      </div>

      <ImageUpload
        label="Avatar photo"
        shape="square"
        value={avatarUrl ?? ''}
        onChange={(url) => setValue('avatarUrl', url)}
      />

      <div className="flex gap-8">
        <label className="flex items-center gap-2 text-sm"><input type="checkbox" {...register('featured')} /> Featured</label>
        <label className="flex items-center gap-2 text-sm"><input type="checkbox" {...register('published')} /> Published</label>
      </div>

      <button type="submit" disabled={isSubmitting}
              className="rounded-lg bg-[#6C63FF] px-6 py-2.5 font-medium text-white hover:bg-[#5a51f0] disabled:opacity-50">
        {isSubmitting ? 'Saving…' : 'Save'}
      </button>
    </form>
  );
}
