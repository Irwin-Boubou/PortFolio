'use client';
/** Process steps manager: inline add + edit, bilingual title/description, up/down reorder. No published flag on this model. */
import { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { api } from '@/lib/api';

interface Step {
  id: string; stepNumber: number; title: { en: string; fr: string }; description: { en: string; fr: string };
  icon: string; order: number;
}

const input = 'w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-[#6C63FF] focus:outline-none';
const label = 'mb-1 block text-xs font-medium text-gray-500';

const emptyForm = {
  stepNumber: 1, icon: '🚀',
  titleEn: '', titleFr: '', descEn: '', descFr: '',
};

export default function AdminProcessPage() {
  const qc = useQueryClient();
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState<string | null>(null);

  const { data } = useQuery({
    queryKey: ['admin-process'],
    queryFn: async () => (await api.get('/process-steps?lang=all&limit=100')).data.items as Step[],
  });
  const rows = [...(data ?? [])].sort((a, b) => a.order - b.order);

  const invalidate = () => qc.invalidateQueries({ queryKey: ['admin-process'] });
  const toPayload = () => ({
    stepNumber: Number(form.stepNumber),
    icon: form.icon,
    title: { en: form.titleEn, fr: form.titleFr || undefined },
    description: { en: form.descEn, fr: form.descFr || undefined },
  });
  const create = useMutation({
    mutationFn: () => api.post('/process-steps', toPayload()),
    onSuccess: () => { toast.success('Added'); setForm(emptyForm); invalidate(); },
    onError: () => toast.error('Save failed — check required fields'),
  });
  const update = useMutation({
    mutationFn: (id: string) => api.put(`/process-steps/${id}`, toPayload()),
    onSuccess: () => { toast.success('Saved'); setEditingId(null); setForm(emptyForm); invalidate(); },
    onError: () => toast.error('Save failed — check required fields'),
  });
  const del = useMutation({
    mutationFn: (id: string) => api.delete(`/process-steps/${id}`),
    onSuccess: () => { toast.success('Deleted'); invalidate(); },
  });
  const reorder = useMutation({
    mutationFn: (order: { id: string; order: number }[]) => api.patch('/process-steps/reorder', { order }),
    onSuccess: invalidate,
  });

  const move = (i: number, dir: -1 | 1) => {
    const j = i + dir;
    if (j < 0 || j >= rows.length) return;
    const a = rows[i], b = rows[j];
    reorder.mutate([{ id: a.id, order: b.order }, { id: b.id, order: a.order }]);
  };

  const startEdit = (s: Step) => {
    setEditingId(s.id);
    setForm({
      stepNumber: s.stepNumber, icon: s.icon,
      titleEn: s.title.en, titleFr: s.title.fr, descEn: s.description.en, descFr: s.description.fr,
    });
  };
  const cancelEdit = () => { setEditingId(null); setForm(emptyForm); };

  return (
    <div>
      <h1 className="mb-8 font-display text-2xl font-bold">Process Steps</h1>

      <div className="mb-8 rounded-2xl border border-gray-200 bg-white p-5">
        <p className="mb-4 text-sm font-medium text-gray-700">{editingId ? 'Edit step' : 'Add step'}</p>
        <div className="grid gap-4 sm:grid-cols-2">
          <div><label className={label}>Step number</label>
            <input type="number" value={form.stepNumber} onChange={(e) => setForm({ ...form, stepNumber: Number(e.target.value) })} className={input} /></div>
          <div><label className={label}>Icon (emoji)</label>
            <input value={form.icon} onChange={(e) => setForm({ ...form, icon: e.target.value })} className={input} /></div>
          <div><label className={label}>Title (EN) *</label>
            <input value={form.titleEn} onChange={(e) => setForm({ ...form, titleEn: e.target.value })} className={input} /></div>
          <div><label className={label}>Title (FR)</label>
            <input value={form.titleFr} onChange={(e) => setForm({ ...form, titleFr: e.target.value })} className={input} /></div>
          <div><label className={label}>Description (EN) *</label>
            <textarea rows={3} value={form.descEn} onChange={(e) => setForm({ ...form, descEn: e.target.value })} className={input} /></div>
          <div><label className={label}>Description (FR)</label>
            <textarea rows={3} value={form.descFr} onChange={(e) => setForm({ ...form, descFr: e.target.value })} className={input} /></div>
        </div>
        <div className="mt-4 flex gap-3">
          <button
            onClick={() => (editingId ? update.mutate(editingId) : create.mutate())}
            disabled={!form.titleEn || !form.descEn}
            className="rounded-lg bg-[#6C63FF] px-4 py-2 text-sm font-medium text-white hover:bg-[#5a51f0] disabled:opacity-50">
            {editingId ? 'Save changes' : 'Add step'}
          </button>
          {editingId && <button onClick={cancelEdit} className="rounded-lg border border-gray-300 px-4 py-2 text-sm text-gray-600">Cancel</button>}
        </div>
      </div>

      <div className="grid gap-3">
        {rows.map((s, i) => (
          <div key={s.id} className="flex items-center gap-4 rounded-xl border border-gray-200 bg-white px-4 py-3">
            <span className="text-2xl">{s.icon}</span>
            <div className="flex-1">
              <p className="text-sm font-medium">{s.stepNumber}. {s.title.en}</p>
              <p className="text-xs text-gray-500">{s.description.en}</p>
            </div>
            <div className="flex items-center gap-1">
              <button onClick={() => move(i, -1)} disabled={i === 0} className="text-gray-400 hover:text-gray-600 disabled:opacity-30">↑</button>
              <button onClick={() => move(i, 1)} disabled={i === rows.length - 1} className="text-gray-400 hover:text-gray-600 disabled:opacity-30">↓</button>
            </div>
            <button onClick={() => startEdit(s)} className="text-sm text-[#6C63FF] hover:underline">Edit</button>
            <button onClick={() => { if (confirm('Delete this step? This cannot be undone.')) del.mutate(s.id); }}
                    className="text-sm text-red-500 hover:underline">Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}
