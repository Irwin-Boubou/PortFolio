'use client';
import { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { api } from '@/lib/api';

interface ValueRow {
  id: string; icon: string; title: { en: string; fr: string }; description: { en: string; fr: string };
  order: number; published: boolean;
}

const input = 'w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-[#6C63FF] focus:outline-none';
const label = 'mb-1 block text-xs font-medium text-gray-500';

const emptyForm = { icon: '💡', titleEn: '', titleFr: '', descEn: '', descFr: '', order: 0, published: true };

export default function ValuesTab() {
  const qc = useQueryClient();
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState<string | null>(null);

  const { data } = useQuery({
    queryKey: ['admin-about-values'],
    queryFn: async () => (await api.get('/values?lang=all&limit=100')).data.values as ValueRow[],
  });
  const rows = [...(data ?? [])].sort((a, b) => a.order - b.order);

  const invalidate = () => qc.invalidateQueries({ queryKey: ['admin-about-values'] });
  const toPayload = () => ({
    icon: form.icon,
    title: { en: form.titleEn, fr: form.titleFr || undefined },
    description: { en: form.descEn, fr: form.descFr || undefined },
    order: Number(form.order),
    published: form.published,
  });
  const create = useMutation({
    mutationFn: () => api.post('/values', toPayload()),
    onSuccess: () => { toast.success('Added'); setForm(emptyForm); invalidate(); },
    onError: () => toast.error('Save failed — check required fields'),
  });
  const update = useMutation({
    mutationFn: (id: string) => api.put(`/values/${id}`, toPayload()),
    onSuccess: () => { toast.success('Saved'); setEditingId(null); setForm(emptyForm); invalidate(); },
    onError: () => toast.error('Save failed — check required fields'),
  });
  const del = useMutation({
    mutationFn: (id: string) => api.delete(`/values/${id}`),
    onSuccess: () => { toast.success('Deleted'); invalidate(); },
  });
  const reorder = useMutation({
    mutationFn: (order: { id: string; order: number }[]) => api.patch('/values/reorder', { order }),
    onSuccess: invalidate,
  });

  const move = (i: number, dir: -1 | 1) => {
    const j = i + dir;
    if (j < 0 || j >= rows.length) return;
    const a = rows[i], b = rows[j];
    reorder.mutate([{ id: a.id, order: b.order }, { id: b.id, order: a.order }]);
  };

  const startEdit = (v: ValueRow) => {
    setEditingId(v.id);
    setForm({
      icon: v.icon, titleEn: v.title.en, titleFr: v.title.fr, descEn: v.description.en, descFr: v.description.fr,
      order: v.order, published: v.published,
    });
  };
  const cancelEdit = () => { setEditingId(null); setForm(emptyForm); };

  return (
    <div>
      <div className="mb-8 rounded-2xl border border-gray-200 bg-white p-5">
        <p className="mb-4 text-sm font-medium text-gray-700">{editingId ? 'Edit value' : 'Add value'}</p>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className={label}>Icon (emoji)</label>
            <input value={form.icon} onChange={(e) => setForm({ ...form, icon: e.target.value })} className={input} />
          </div>
          <div>
            <label className={label}>Order</label>
            <input type="number" value={form.order} onChange={(e) => setForm({ ...form, order: Number(e.target.value) })} className={input} />
          </div>
          <div>
            <label className={label}>Title (EN) *</label>
            <input value={form.titleEn} onChange={(e) => setForm({ ...form, titleEn: e.target.value })} className={input} />
          </div>
          <div>
            <label className={label}>Title (FR)</label>
            <input value={form.titleFr} onChange={(e) => setForm({ ...form, titleFr: e.target.value })} className={input} />
          </div>
          <div>
            <label className={label}>Description (EN) *</label>
            <textarea rows={3} value={form.descEn} onChange={(e) => setForm({ ...form, descEn: e.target.value })} className={input} />
          </div>
          <div>
            <label className={label}>Description (FR)</label>
            <textarea rows={3} value={form.descFr} onChange={(e) => setForm({ ...form, descFr: e.target.value })} className={input} />
          </div>
        </div>
        <label className="mt-3 flex items-center gap-2 text-sm text-gray-600">
          <input type="checkbox" checked={form.published} onChange={(e) => setForm({ ...form, published: e.target.checked })} />
          Published
        </label>
        <div className="mt-4 flex gap-3">
          <button
            onClick={() => (editingId ? update.mutate(editingId) : create.mutate())}
            disabled={!form.titleEn || !form.descEn}
            className="rounded-lg bg-[#6C63FF] px-4 py-2 text-sm font-medium text-white hover:bg-[#5a51f0] disabled:opacity-50"
          >
            {editingId ? 'Save changes' : 'Add value'}
          </button>
          {editingId && <button onClick={cancelEdit} className="rounded-lg border border-gray-300 px-4 py-2 text-sm text-gray-600">Cancel</button>}
        </div>
      </div>

      <div className="grid gap-3">
        {rows.map((v, i) => (
          <div key={v.id} className="flex items-center gap-4 rounded-xl border border-gray-200 bg-white px-4 py-3">
            <span className="text-2xl">{v.icon}</span>
            <div className="flex-1">
              <p className="text-sm font-medium">{v.title.en}</p>
              <p className="text-xs text-gray-500">{v.description.en}</p>
            </div>
            <span className={`rounded-full px-2.5 py-0.5 text-xs ${v.published ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
              {v.published ? 'Published' : 'Draft'}
            </span>
            <div className="flex items-center gap-1">
              <button onClick={() => move(i, -1)} disabled={i === 0} className="text-gray-400 hover:text-gray-600 disabled:opacity-30">↑</button>
              <button onClick={() => move(i, 1)} disabled={i === rows.length - 1} className="text-gray-400 hover:text-gray-600 disabled:opacity-30">↓</button>
            </div>
            <button onClick={() => startEdit(v)} className="text-sm text-[#6C63FF] hover:underline">Edit</button>
            <button
              onClick={() => { if (confirm('Delete this value? This cannot be undone.')) del.mutate(v.id); }}
              className="text-sm text-red-500 hover:underline"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
