'use client';
import { useEffect, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { api } from '@/lib/api';

const input = 'w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-[#6C63FF] focus:outline-none';
const label = 'mb-1 block text-xs font-medium text-gray-500';

interface Row { value: number; suffix: string; labelEn: string; labelFr: string }

const emptyRow: Row = { value: 0, suffix: '+', labelEn: '', labelFr: '' };

export default function StatsTab() {
  const qc = useQueryClient();
  const [rows, setRows] = useState<Row[]>([]);

  const { data, isSuccess } = useQuery({
    queryKey: ['admin-about-stats'],
    queryFn: async () =>
      (await api.get('/site-content?keys=about.stats&lang=all')).data.content['about.stats'] as
        | { en?: { value: number; suffix: string; label: string }[]; fr?: { label: string }[] }
        | undefined,
  });

  useEffect(() => {
    if (!isSuccess) return;
    const en = data?.en ?? [];
    const fr = data?.fr ?? [];
    setRows(
      en.length
        ? en.map((s, i) => ({ value: s.value, suffix: s.suffix, labelEn: s.label, labelFr: fr[i]?.label ?? '' }))
        : [{ ...emptyRow }],
    );
  }, [isSuccess, data]);

  const update = (i: number, patch: Partial<Row>) =>
    setRows((r) => r.map((row, idx) => (idx === i ? { ...row, ...patch } : row)));
  const add = () => setRows((r) => [...r, { ...emptyRow }]);
  const remove = (i: number) => setRows((r) => r.filter((_, idx) => idx !== i));

  const save = useMutation({
    mutationFn: () =>
      api.put('/site-content/about.stats', {
        value: {
          en: rows.map((r) => ({ value: Number(r.value), suffix: r.suffix, label: r.labelEn })),
          fr: rows.map((r) => ({ value: Number(r.value), suffix: r.suffix, label: r.labelFr })),
        },
      }),
    onSuccess: () => { toast.success('Saved'); qc.invalidateQueries({ queryKey: ['admin-about-stats'] }); },
    onError: () => toast.error('Save failed'),
  });

  return (
    <div className="space-y-4">
      {rows.map((row, i) => (
        <div key={i} className="rounded-2xl border border-gray-200 bg-white p-5">
          <div className="grid gap-4 sm:grid-cols-4">
            <div>
              <label className={label}>Value</label>
              <input type="number" value={row.value} onChange={(e) => update(i, { value: Number(e.target.value) })} className={input} />
            </div>
            <div>
              <label className={label}>Suffix</label>
              <input value={row.suffix} onChange={(e) => update(i, { suffix: e.target.value })} className={input} />
            </div>
            <div>
              <label className={label}>Label (EN)</label>
              <input value={row.labelEn} onChange={(e) => update(i, { labelEn: e.target.value })} className={input} />
            </div>
            <div>
              <label className={label}>Label (FR)</label>
              <input value={row.labelFr} onChange={(e) => update(i, { labelFr: e.target.value })} className={input} />
            </div>
          </div>
          <button onClick={() => remove(i)} className="mt-3 text-sm text-red-500 hover:underline">Remove</button>
        </div>
      ))}
      <div className="flex gap-3">
        <button onClick={add} className="rounded-lg border border-gray-300 px-4 py-2 text-sm text-gray-600 hover:bg-gray-50">+ Add stat</button>
        <button
          onClick={() => save.mutate()}
          disabled={save.isPending}
          className="rounded-lg bg-[#6C63FF] px-5 py-2.5 text-sm font-medium text-white hover:bg-[#5a51f0] disabled:opacity-50"
        >
          Save
        </button>
      </div>
    </div>
  );
}
