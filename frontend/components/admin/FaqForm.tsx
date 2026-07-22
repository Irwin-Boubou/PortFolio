'use client';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useRouter } from '@/navigation';
import { api } from '@/lib/api';

export interface FaqFormValues {
  question: { en: string; fr: string };
  answer: { en: string; fr: string };
  category: string;
  order: number;
  published: boolean;
}

const empty: FaqFormValues = {
  question: { en: '', fr: '' }, answer: { en: '', fr: '' }, category: 'general', order: 0, published: false,
};

const input = 'w-full rounded-lg border border-gray-300 px-3 py-2.5 focus:border-[#6C63FF] focus:outline-none';
const label = 'mb-1 block text-sm font-medium text-gray-700';

export function FaqForm({ initial, faqId }: { initial?: Partial<FaqFormValues>; faqId?: string }) {
  const router = useRouter();
  const [lang, setLang] = useState<'en' | 'fr'>('en');
  const { register, handleSubmit, formState: { isSubmitting } } = useForm<FaqFormValues>({
    defaultValues: { ...empty, ...initial },
  });

  const onSubmit = async (v: FaqFormValues) => {
    const payload = {
      question: { en: v.question.en, fr: v.question.fr || undefined },
      answer: { en: v.answer.en, fr: v.answer.fr || undefined },
      category: v.category || 'general',
      order: Number(v.order),
      published: v.published,
    };
    try {
      if (faqId) await api.put(`/faq/${faqId}`, payload);
      else await api.post('/faq', payload);
      toast.success('Saved');
      router.push('/admin/faq');
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
            <label className={label}>Question ({l.toUpperCase()}) {l === 'en' && '*'}</label>
            <input {...register(`question.${l}`, { required: l === 'en' })} className={input} />
          </div>
          <div>
            <label className={label}>Answer ({l.toUpperCase()}) {l === 'en' && '*'}, Markdown</label>
            <textarea rows={6} {...register(`answer.${l}`, { required: l === 'en' })} className={`${input} font-mono text-sm`} />
          </div>
        </div>
      ))}

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className={label}>Category</label>
          <select {...register('category')} className={input}>
            <option value="general">General</option>
            <option value="process">Process</option>
            <option value="pricing">Pricing</option>
            <option value="technical">Technical</option>
          </select>
        </div>
        <div><label className={label}>Order</label><input type="number" {...register('order', { valueAsNumber: true })} className={input} /></div>
      </div>

      <label className="flex items-center gap-2 text-sm"><input type="checkbox" {...register('published')} /> Published</label>

      <button type="submit" disabled={isSubmitting}
              className="rounded-lg bg-[#6C63FF] px-6 py-2.5 font-medium text-white hover:bg-[#5a51f0] disabled:opacity-50">
        {isSubmitting ? 'Saving…' : 'Save'}
      </button>
    </form>
  );
}
