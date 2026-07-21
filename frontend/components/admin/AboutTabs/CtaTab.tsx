'use client';
import { useEffect, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { api } from '@/lib/api';

const input = 'w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-[#6C63FF] focus:outline-none';
const label = 'mb-1 block text-xs font-medium text-gray-500';

export default function CtaTab() {
  const qc = useQueryClient();
  const [subtitle, setSubtitle] = useState({ en: '', fr: '' });

  const { data, isSuccess } = useQuery({
    queryKey: ['admin-about-cta'],
    queryFn: async () =>
      (await api.get('/site-content?keys=about.cta.subtitle&lang=all')).data.content['about.cta.subtitle'] as
        | { en?: string; fr?: string }
        | undefined,
  });

  useEffect(() => {
    if (!isSuccess) return;
    setSubtitle({ en: data?.en ?? '', fr: data?.fr ?? '' });
  }, [isSuccess, data]);

  const save = useMutation({
    mutationFn: () => api.put('/site-content/about.cta.subtitle', { value: subtitle }),
    onSuccess: () => { toast.success('Saved'); qc.invalidateQueries({ queryKey: ['admin-about-cta'] }); },
    onError: () => toast.error('Save failed'),
  });

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6">
      <p className="mb-4 text-sm font-semibold text-gray-700">CTA subtitle</p>
      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label className={label}>EN</label>
          <textarea rows={3} value={subtitle.en} onChange={(e) => setSubtitle({ ...subtitle, en: e.target.value })} className={input} />
        </div>
        <div>
          <label className={label}>FR</label>
          <textarea rows={3} value={subtitle.fr} onChange={(e) => setSubtitle({ ...subtitle, fr: e.target.value })} className={input} />
        </div>
      </div>
      <button
        onClick={() => save.mutate()}
        disabled={save.isPending}
        className="mt-4 rounded-lg bg-[#6C63FF] px-5 py-2.5 text-sm font-medium text-white hover:bg-[#5a51f0] disabled:opacity-50"
      >
        Save
      </button>
    </div>
  );
}
