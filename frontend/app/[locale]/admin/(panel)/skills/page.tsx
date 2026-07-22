'use client';
/** Skills manager: inline add + edit (name/category/level/icon/description/brandColor/featured), delete. */
import { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { api } from '@/lib/api';

interface Skill {
  id: string;
  name: string;
  iconUrl: string | null;
  category: string;
  level: number;
  order: number;
  description: string | null;
  brandColor: string | null;
  featured: boolean;
}

const CATS = ['frontend', 'backend', 'design', 'ai', 'tools'];
const input = 'rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-[#6C63FF] focus:outline-none';
const textarea = `${input} w-full`;

const emptyForm = {
  name: '',
  iconUrl: '',
  category: 'frontend',
  level: 80,
  descriptionEn: '',
  descriptionFr: '',
  brandColor: '#6C63FF',
  featured: false,
};

export default function AdminSkillsPage() {
  const qc = useQueryClient();
  const [form, setForm] = useState(emptyForm);
  const { data } = useQuery({
    queryKey: ['admin-skills'],
    queryFn: async () => (await api.get('/skills')).data.skills as Skill[],
  });
  const invalidate = () => qc.invalidateQueries({ queryKey: ['admin-skills'] });

  const buildBody = (f: typeof emptyForm) => ({
    name: f.name,
    iconUrl: f.iconUrl || undefined,
    category: f.category,
    level: f.level,
    description: f.descriptionEn || f.descriptionFr ? { en: f.descriptionEn, fr: f.descriptionFr } : undefined,
    brandColor: f.brandColor || undefined,
    featured: f.featured,
  });

  const create = useMutation({
    mutationFn: () => api.post('/skills', buildBody(form)),
    onSuccess: () => { toast.success('Added'); setForm(emptyForm); invalidate(); },
  });
  const update = useMutation({
    mutationFn: (s: Skill) =>
      api.put(`/skills/${s.id}`, {
        name: s.name,
        iconUrl: s.iconUrl || undefined,
        category: s.category,
        level: s.level,
        order: s.order,
        description: s.description ? { en: s.description, fr: s.description } : undefined,
        brandColor: s.brandColor || undefined,
        featured: s.featured,
      }),
    onSuccess: invalidate,
  });
  const del = useMutation({ mutationFn: (id: string) => api.delete(`/skills/${id}`), onSuccess: invalidate });

  return (
    <div>
      <h1 className="mb-8 font-display text-2xl font-bold">Skills</h1>

      <div className="mb-8 space-y-4 rounded-2xl border border-gray-200 bg-white p-5">
        <div className="flex flex-wrap items-end gap-3">
          <div>
            <label className="mb-1 block text-xs text-gray-500">Name</label>
            <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className={input} />
          </div>
          <div>
            <label className="mb-1 block text-xs text-gray-500">Category</label>
            <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className={input}>
              {CATS.map((c) => <option key={c}>{c}</option>)}
            </select>
          </div>
          <div>
            <label className="mb-1 block text-xs text-gray-500">Level (0–100)</label>
            <input
              type="number"
              min={0}
              max={100}
              value={form.level}
              onChange={(e) => setForm({ ...form, level: Number(e.target.value) })}
              className={`${input} w-24`}
            />
          </div>
          <div>
            <label className="mb-1 block text-xs text-gray-500">Brand color</label>
            <div className="flex items-center gap-2">
              <input
                type="color"
                value={form.brandColor}
                onChange={(e) => setForm({ ...form, brandColor: e.target.value })}
                className="h-9 w-10 rounded border border-gray-300 p-0.5"
              />
              <input
                value={form.brandColor}
                onChange={(e) => setForm({ ...form, brandColor: e.target.value })}
                className={`${input} w-24`}
              />
            </div>
          </div>
          <label className="flex items-center gap-2 pb-2 text-sm text-gray-600">
            <input
              type="checkbox"
              checked={form.featured}
              onChange={(e) => setForm({ ...form, featured: e.target.checked })}
            />
            ★ Featured
          </label>
        </div>

        <div>
          <label className="mb-1 block text-xs text-gray-500">Icon URL</label>
          <input
            value={form.iconUrl}
            onChange={(e) => setForm({ ...form, iconUrl: e.target.value })}
            placeholder="https://cdn.simpleicons.org/react"
            className={textarea}
          />
          <p className="mt-1 text-[11px] text-gray-400">
            Tip: use https://cdn.simpleicons.org/[toolname] e.g. https://cdn.simpleicons.org/react
          </p>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          <div>
            <label className="mb-1 block text-xs text-gray-500">Description (EN)</label>
            <textarea
              rows={2}
              value={form.descriptionEn}
              onChange={(e) => setForm({ ...form, descriptionEn: e.target.value })}
              className={textarea}
            />
          </div>
          <div>
            <label className="mb-1 block text-xs text-gray-500">Description (FR)</label>
            <textarea
              rows={2}
              value={form.descriptionFr}
              onChange={(e) => setForm({ ...form, descriptionFr: e.target.value })}
              className={textarea}
            />
          </div>
        </div>

        <button
          onClick={() => form.name && create.mutate()}
          className="rounded-lg bg-[#6C63FF] px-4 py-2 text-sm font-medium text-white hover:bg-[#5a51f0]"
        >
          Add skill
        </button>
      </div>

      <div className="grid gap-3 md:grid-cols-2">
        {(data ?? []).map((s) => (
          <div key={s.id} className="flex items-center gap-3 rounded-xl border border-gray-200 bg-white px-4 py-3">
            {s.iconUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={s.iconUrl} alt={s.name} width={24} height={24} className="shrink-0 rounded" />
            ) : (
              <div
                className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[10px] font-semibold text-white"
                style={{ backgroundColor: s.brandColor ?? '#6C63FF' }}
              >
                {s.name.charAt(0).toUpperCase()}
              </div>
            )}
            <p className="flex-1 truncate text-sm font-medium">
              {s.name}
              {s.featured && <span className="ml-1 text-amber-500" title="Featured">★</span>}
            </p>
            <select value={s.category} onChange={(e) => update.mutate({ ...s, category: e.target.value })} className={input}>
              {CATS.map((c) => <option key={c}>{c}</option>)}
            </select>
            <input
              type="number"
              min={0}
              max={100}
              defaultValue={s.level}
              onBlur={(e) => update.mutate({ ...s, level: Number(e.target.value) })}
              className={`${input} w-20`}
            />
            <label className="flex items-center gap-1 text-xs text-gray-500">
              <input
                type="checkbox"
                defaultChecked={s.featured}
                onChange={(e) => update.mutate({ ...s, featured: e.target.checked })}
              />
              Featured
            </label>
            <button onClick={() => del.mutate(s.id)} className="text-sm text-red-500 hover:underline">
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
