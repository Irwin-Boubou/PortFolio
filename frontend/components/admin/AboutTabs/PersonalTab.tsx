'use client';
import { useEffect, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { api } from '@/lib/api';

const input = 'w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-[#6C63FF] focus:outline-none';
const label = 'mb-1 block text-xs font-medium text-gray-500';
const LEVELS = ['Native', 'Fluent', 'Intermediate', 'Basic'];

interface InterestRow { iconEn: string; labelEn: string; labelFr: string }
interface LanguageRow { name: string; level: string }

const emptyInterest: InterestRow = { iconEn: '🎮', labelEn: '', labelFr: '' };
const emptyLanguage: LanguageRow = { name: '', level: 'Fluent' };

export default function PersonalTab() {
  const qc = useQueryClient();
  const [interests, setInterests] = useState<InterestRow[]>([]);
  const [languages, setLanguages] = useState<LanguageRow[]>([]);
  const [learning, setLearning] = useState({ en: '', fr: '' });
  const [funFact, setFunFact] = useState({ en: '', fr: '' });

  const { data, isSuccess } = useQuery({
    queryKey: ['admin-about-personal'],
    queryFn: async () =>
      (await api.get('/site-content?keys=about.interests,about.currentlyLearning,about.funFact,about.languages&lang=all'))
        .data.content as Record<string, { en?: unknown; fr?: unknown }>,
  });

  useEffect(() => {
    if (!isSuccess || !data) return;
    const iEn = (data['about.interests']?.en as { icon: string; label: string }[]) ?? [];
    const iFr = (data['about.interests']?.fr as { label: string }[]) ?? [];
    setInterests(
      iEn.length ? iEn.map((it, i) => ({ iconEn: it.icon, labelEn: it.label, labelFr: iFr[i]?.label ?? '' })) : [{ ...emptyInterest }],
    );
    const lEn = (data['about.languages']?.en as { name: string; level: string }[]) ?? [];
    setLanguages(lEn.length ? lEn : [{ ...emptyLanguage }]);
    setLearning({ en: (data['about.currentlyLearning']?.en as string) ?? '', fr: (data['about.currentlyLearning']?.fr as string) ?? '' });
    setFunFact({ en: (data['about.funFact']?.en as string) ?? '', fr: (data['about.funFact']?.fr as string) ?? '' });
  }, [isSuccess, data]);

  const updateInterest = (i: number, patch: Partial<InterestRow>) =>
    setInterests((r) => r.map((row, idx) => (idx === i ? { ...row, ...patch } : row)));
  const updateLanguage = (i: number, patch: Partial<LanguageRow>) =>
    setLanguages((r) => r.map((row, idx) => (idx === i ? { ...row, ...patch } : row)));

  const invalidate = () => qc.invalidateQueries({ queryKey: ['admin-about-personal'] });

  const saveInterests = useMutation({
    mutationFn: () =>
      api.put('/site-content/about.interests', {
        value: {
          en: interests.map((it) => ({ icon: it.iconEn, label: it.labelEn })),
          fr: interests.map((it) => ({ icon: it.iconEn, label: it.labelFr })),
        },
      }),
    onSuccess: () => { toast.success('Interests saved'); invalidate(); },
    onError: () => toast.error('Save failed'),
  });

  const saveLanguages = useMutation({
    mutationFn: () => api.put('/site-content/about.languages', { value: { en: languages, fr: languages } }),
    onSuccess: () => { toast.success('Languages saved'); invalidate(); },
    onError: () => toast.error('Save failed'),
  });

  const saveLearning = useMutation({
    mutationFn: () => api.put('/site-content/about.currentlyLearning', { value: learning }),
    onSuccess: () => { toast.success('Saved'); invalidate(); },
    onError: () => toast.error('Save failed'),
  });

  const saveFunFact = useMutation({
    mutationFn: () => api.put('/site-content/about.funFact', { value: funFact }),
    onSuccess: () => { toast.success('Saved'); invalidate(); },
    onError: () => toast.error('Save failed'),
  });

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-gray-200 bg-white p-6">
        <p className="mb-4 text-sm font-semibold text-gray-700">Interests</p>
        <div className="space-y-3">
          {interests.map((it, i) => (
            <div key={i} className="grid gap-3 sm:grid-cols-4">
              <input value={it.iconEn} onChange={(e) => updateInterest(i, { iconEn: e.target.value })} className={input} placeholder="icon" />
              <input value={it.labelEn} onChange={(e) => updateInterest(i, { labelEn: e.target.value })} className={input} placeholder="Label (EN)" />
              <input value={it.labelFr} onChange={(e) => updateInterest(i, { labelFr: e.target.value })} className={input} placeholder="Label (FR)" />
              <button onClick={() => setInterests((r) => r.filter((_, idx) => idx !== i))} className="text-sm text-red-500 hover:underline">Remove</button>
            </div>
          ))}
        </div>
        <div className="mt-4 flex gap-3">
          <button onClick={() => setInterests((r) => [...r, { ...emptyInterest }])} className="rounded-lg border border-gray-300 px-4 py-2 text-sm text-gray-600 hover:bg-gray-50">+ Add interest</button>
          <button onClick={() => saveInterests.mutate()} disabled={saveInterests.isPending} className="rounded-lg bg-[#6C63FF] px-4 py-2 text-sm font-medium text-white hover:bg-[#5a51f0] disabled:opacity-50">Save interests</button>
        </div>
      </div>

      <div className="rounded-2xl border border-gray-200 bg-white p-6">
        <p className="mb-4 text-sm font-semibold text-gray-700">Currently learning</p>
        <div className="grid gap-4 md:grid-cols-2">
          <div><label className={label}>EN</label><textarea rows={2} value={learning.en} onChange={(e) => setLearning({ ...learning, en: e.target.value })} className={input} /></div>
          <div><label className={label}>FR</label><textarea rows={2} value={learning.fr} onChange={(e) => setLearning({ ...learning, fr: e.target.value })} className={input} /></div>
        </div>
        <button onClick={() => saveLearning.mutate()} disabled={saveLearning.isPending} className="mt-4 rounded-lg bg-[#6C63FF] px-4 py-2 text-sm font-medium text-white hover:bg-[#5a51f0] disabled:opacity-50">Save</button>
      </div>

      <div className="rounded-2xl border border-gray-200 bg-white p-6">
        <p className="mb-4 text-sm font-semibold text-gray-700">Fun fact</p>
        <div className="grid gap-4 md:grid-cols-2">
          <div><label className={label}>EN</label><textarea rows={2} value={funFact.en} onChange={(e) => setFunFact({ ...funFact, en: e.target.value })} className={input} /></div>
          <div><label className={label}>FR</label><textarea rows={2} value={funFact.fr} onChange={(e) => setFunFact({ ...funFact, fr: e.target.value })} className={input} /></div>
        </div>
        <button onClick={() => saveFunFact.mutate()} disabled={saveFunFact.isPending} className="mt-4 rounded-lg bg-[#6C63FF] px-4 py-2 text-sm font-medium text-white hover:bg-[#5a51f0] disabled:opacity-50">Save</button>
      </div>

      <div className="rounded-2xl border border-gray-200 bg-white p-6">
        <p className="mb-4 text-sm font-semibold text-gray-700">Languages</p>
        <div className="space-y-3">
          {languages.map((l, i) => (
            <div key={i} className="grid gap-3 sm:grid-cols-3">
              <input value={l.name} onChange={(e) => updateLanguage(i, { name: e.target.value })} className={input} placeholder="Name" />
              <select value={l.level} onChange={(e) => updateLanguage(i, { level: e.target.value })} className={input}>
                {LEVELS.map((lv) => <option key={lv} value={lv}>{lv}</option>)}
              </select>
              <button onClick={() => setLanguages((r) => r.filter((_, idx) => idx !== i))} className="text-sm text-red-500 hover:underline">Remove</button>
            </div>
          ))}
        </div>
        <div className="mt-4 flex gap-3">
          <button onClick={() => setLanguages((r) => [...r, { ...emptyLanguage }])} className="rounded-lg border border-gray-300 px-4 py-2 text-sm text-gray-600 hover:bg-gray-50">+ Add language</button>
          <button onClick={() => saveLanguages.mutate()} disabled={saveLanguages.isPending} className="rounded-lg bg-[#6C63FF] px-4 py-2 text-sm font-medium text-white hover:bg-[#5a51f0] disabled:opacity-50">Save languages</button>
        </div>
      </div>
    </div>
  );
}
