'use client';
import { useEffect, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import ReactMarkdown from 'react-markdown';
import { api } from '@/lib/api';

const input = 'w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-[#6C63FF] focus:outline-none';
const label = 'mb-1 block text-xs font-medium text-gray-500';

const SOCIAL_KEYS = ['github', 'linkedin', 'dribbble', 'behance', 'instagram', 'twitter', 'youtube'] as const;

const KEYS = [
  'about.photoUrl', 'about.intro', 'about.bio.full', 'cv.url',
  ...SOCIAL_KEYS.map((k) => `social.${k}`),
];

interface Bilingual { en: string; fr: string }

function empty(): Record<string, Bilingual> {
  return Object.fromEntries(KEYS.map((k) => [k, { en: '', fr: '' }]));
}

export default function IdentityTab() {
  const qc = useQueryClient();
  const [form, setForm] = useState<Record<string, Bilingual>>(empty());
  const [preview, setPreview] = useState(false);

  const { data, isSuccess } = useQuery({
    queryKey: ['admin-about-identity'],
    queryFn: async () =>
      (await api.get(`/site-content?keys=${KEYS.join(',')}&lang=all`)).data.content as Record<
        string,
        { en?: unknown; fr?: unknown }
      >,
  });

  useEffect(() => {
    if (!isSuccess || !data) return;
    const next = empty();
    for (const key of KEYS) {
      const v = data[key];
      next[key] = { en: (v?.en as string) ?? '', fr: (v?.fr as string) ?? '' };
    }
    setForm(next);
  }, [isSuccess, data]);

  const set = (key: string, lang: 'en' | 'fr', value: string) =>
    setForm((f) => ({ ...f, [key]: { ...f[key], [lang]: value } }));

  const save = useMutation({
    mutationFn: async () => {
      await Promise.all(
        KEYS.map((key) => api.put(`/site-content/${key}`, { value: { en: form[key].en, fr: form[key].fr } })),
      );
    },
    onSuccess: () => { toast.success('Saved'); qc.invalidateQueries({ queryKey: ['admin-about-identity'] }); },
    onError: () => toast.error('Save failed'),
  });

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-gray-200 bg-white p-6">
        <label className={label}>Photo URL</label>
        <input value={form['about.photoUrl'].en} onChange={(e) => set('about.photoUrl', 'en', e.target.value)} className={input} />
      </div>

      <div className="rounded-2xl border border-gray-200 bg-white p-6">
        <p className="mb-3 text-sm font-semibold text-gray-700">Intro (2-3 sentences)</p>
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label className={label}>EN</label>
            <textarea rows={3} value={form['about.intro'].en} onChange={(e) => set('about.intro', 'en', e.target.value)} className={input} />
          </div>
          <div>
            <label className={label}>FR</label>
            <textarea rows={3} value={form['about.intro'].fr} onChange={(e) => set('about.intro', 'fr', e.target.value)} className={input} />
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-gray-200 bg-white p-6">
        <div className="mb-3 flex items-center justify-between">
          <p className="text-sm font-semibold text-gray-700">Full bio (Markdown, ## headings)</p>
          <button onClick={() => setPreview((p) => !p)} className="text-sm text-[#6C63FF] hover:underline">
            {preview ? 'Hide preview' : 'Show preview'}
          </button>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label className={label}>EN</label>
            <textarea rows={10} value={form['about.bio.full'].en} onChange={(e) => set('about.bio.full', 'en', e.target.value)} className={`${input} font-mono`} />
          </div>
          <div>
            <label className={label}>FR</label>
            <textarea rows={10} value={form['about.bio.full'].fr} onChange={(e) => set('about.bio.full', 'fr', e.target.value)} className={`${input} font-mono`} />
          </div>
        </div>
        {preview && (
          <div className="prose mt-4 max-w-none rounded-lg border border-gray-200 bg-gray-50 p-4">
            <ReactMarkdown>{form['about.bio.full'].en}</ReactMarkdown>
          </div>
        )}
      </div>

      <div className="rounded-2xl border border-gray-200 bg-white p-6">
        <label className={label}>CV URL</label>
        <input value={form['cv.url'].en} onChange={(e) => set('cv.url', 'en', e.target.value)} className={input} />
      </div>

      <div className="rounded-2xl border border-gray-200 bg-white p-6">
        <p className="mb-3 text-sm font-semibold text-gray-700">Social links</p>
        <div className="grid gap-4 sm:grid-cols-2">
          {SOCIAL_KEYS.map((k) => (
            <div key={k}>
              <label className={label}>{k}</label>
              <input value={form[`social.${k}`].en} onChange={(e) => set(`social.${k}`, 'en', e.target.value)} className={input} />
            </div>
          ))}
        </div>
      </div>

      <button
        onClick={() => save.mutate()}
        disabled={save.isPending}
        className="rounded-lg bg-[#6C63FF] px-5 py-2.5 text-sm font-medium text-white hover:bg-[#5a51f0] disabled:opacity-50"
      >
        Save all
      </button>
    </div>
  );
}
