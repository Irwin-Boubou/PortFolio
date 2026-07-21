'use client';
/** Skills manager: inline add + edit level/category, delete. */
import { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { api } from '@/lib/api';

interface Skill { id: string; name: string; category: string; level: number; order: number }
const CATS = ['frontend', 'backend', 'design', 'tools'];
const input = 'rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-[#6C63FF] focus:outline-none';

export default function AdminSkillsPage() {
  const qc = useQueryClient();
  const [form, setForm] = useState({ name: '', category: 'frontend', level: 80 });
  const { data } = useQuery({
    queryKey: ['admin-skills'],
    queryFn: async () => (await api.get('/skills')).data.skills as Skill[],
  });
  const invalidate = () => qc.invalidateQueries({ queryKey: ['admin-skills'] });
  const create = useMutation({
    mutationFn: () => api.post('/skills', form),
    onSuccess: () => { toast.success('Added'); setForm({ name: '', category: 'frontend', level: 80 }); invalidate(); },
  });
  const update = useMutation({
    mutationFn: (s: Skill) => api.put(`/skills/${s.id}`, { name: s.name, category: s.category, level: s.level, order: s.order }),
    onSuccess: invalidate,
  });
  const del = useMutation({ mutationFn: (id: string) => api.delete(`/skills/${id}`), onSuccess: invalidate });

  return (
    <div>
      <h1 className="mb-8 font-display text-2xl font-bold">Skills</h1>
      <div className="mb-8 flex flex-wrap items-end gap-3 rounded-2xl border border-gray-200 bg-white p-5">
        <div><label className="mb-1 block text-xs text-gray-500">Name</label>
          <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className={input} /></div>
        <div><label className="mb-1 block text-xs text-gray-500">Category</label>
          <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className={input}>
            {CATS.map((c) => <option key={c}>{c}</option>)}
          </select></div>
        <div><label className="mb-1 block text-xs text-gray-500">Level (0–100)</label>
          <input type="number" min={0} max={100} value={form.level}
                 onChange={(e) => setForm({ ...form, level: Number(e.target.value) })} className={`${input} w-24`} /></div>
        <button onClick={() => form.name && create.mutate()}
                className="rounded-lg bg-[#6C63FF] px-4 py-2 text-sm font-medium text-white hover:bg-[#5a51f0]">Add skill</button>
      </div>
      <div className="grid gap-3 md:grid-cols-2">
        {(data ?? []).map((s) => (
          <div key={s.id} className="flex items-center gap-3 rounded-xl border border-gray-200 bg-white px-4 py-3">
            <p className="flex-1 text-sm font-medium">{s.name}</p>
            <select value={s.category} onChange={(e) => update.mutate({ ...s, category: e.target.value })} className={input}>
              {CATS.map((c) => <option key={c}>{c}</option>)}
            </select>
            <input type="number" min={0} max={100} defaultValue={s.level}
                   onBlur={(e) => update.mutate({ ...s, level: Number(e.target.value) })} className={`${input} w-20`} />
            <button onClick={() => del.mutate(s.id)} className="text-sm text-red-500 hover:underline">Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}
