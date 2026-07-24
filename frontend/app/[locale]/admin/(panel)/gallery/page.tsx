'use client';
import { useState } from 'react';
import Image from 'next/image';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { FiArrowUp, FiArrowDown, FiTrash2, FiImage } from 'react-icons/fi';
import { api } from '@/lib/api';
import { ImageUpload } from '@/components/admin/ImageUpload';
import { AdminEmpty } from '@/components/admin/AdminEmpty';

interface GalleryRow {
  id: string;
  url: string;
  caption: { en?: string; fr?: string } | null;
  order: number;
}

const input = 'w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-[#6C63FF] focus:outline-none';

export default function AdminGalleryPage() {
  const qc = useQueryClient();
  const invalidate = () => qc.invalidateQueries({ queryKey: ['admin-gallery'] });

  const { data } = useQuery({
    queryKey: ['admin-gallery'],
    queryFn: async () => (await api.get('/gallery?lang=all')).data.photos as GalleryRow[],
  });
  const photos = (data ?? []).slice().sort((a, b) => a.order - b.order);

  const [newUrl, setNewUrl] = useState('');
  const [newEn, setNewEn] = useState('');
  const [newFr, setNewFr] = useState('');

  const create = useMutation({
    mutationFn: () =>
      api.post('/gallery', {
        url: newUrl,
        caption: newEn || newFr ? { en: newEn || undefined, fr: newFr || undefined } : null,
        order: photos.length,
      }),
    onSuccess: () => {
      toast.success('Photo added');
      setNewUrl(''); setNewEn(''); setNewFr('');
      invalidate();
    },
    onError: () => toast.error('Add failed'),
  });

  const update = useMutation({
    mutationFn: (p: { id: string; body: Partial<GalleryRow> }) => api.put(`/gallery/${p.id}`, p.body),
    onSuccess: invalidate,
  });
  const del = useMutation({
    mutationFn: (id: string) => api.delete(`/gallery/${id}`),
    onSuccess: () => { toast.success('Deleted'); invalidate(); },
  });

  const swap = (i: number, dir: -1 | 1) => {
    const a = photos[i];
    const b = photos[i + dir];
    if (!a || !b) return;
    api.patch('/gallery/reorder', { order: [{ id: a.id, order: b.order }, { id: b.id, order: a.order }] }).then(invalidate);
  };

  return (
    <div className="max-w-4xl">
      <h1 className="mb-6 font-display text-2xl font-bold">Gallery</h1>

      {/* add form */}
      <div className="mb-8 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
        <ImageUpload label="New photo" shape="wide" value={newUrl} onChange={setNewUrl} />
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <div><label className="mb-1 block text-xs font-medium text-gray-500">Caption (EN)</label><input value={newEn} onChange={(e) => setNewEn(e.target.value)} className={input} /></div>
          <div><label className="mb-1 block text-xs font-medium text-gray-500">Caption (FR)</label><input value={newFr} onChange={(e) => setNewFr(e.target.value)} className={input} /></div>
        </div>
        <button
          onClick={() => newUrl && create.mutate()}
          disabled={!newUrl || create.isPending}
          className="mt-4 rounded-lg bg-[#6C63FF] px-5 py-2.5 text-sm font-medium text-white hover:bg-[#5a51f0] disabled:opacity-50"
        >
          {create.isPending ? 'Adding…' : 'Add photo'}
        </button>
      </div>

      {/* list */}
      <div className="grid gap-4 sm:grid-cols-2">
        {photos.map((p, i) => (
          <div key={p.id} className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
            <div className="relative aspect-video bg-gray-100">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <Image src={p.url} alt={p.caption?.en ?? ''} fill sizes="400px" className="object-cover" />
            </div>
            <div className="space-y-3 p-4">
              <div className="grid gap-3 sm:grid-cols-2">
                <input defaultValue={p.caption?.en ?? ''} placeholder="Caption EN" onBlur={(e) => update.mutate({ id: p.id, body: { caption: { ...p.caption, en: e.target.value } } })} className={input} />
                <input defaultValue={p.caption?.fr ?? ''} placeholder="Caption FR" onBlur={(e) => update.mutate({ id: p.id, body: { caption: { ...p.caption, fr: e.target.value } } })} className={input} />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex gap-1">
                  <button onClick={() => swap(i, -1)} disabled={i === 0} aria-label="Move up" className="grid h-8 w-8 place-items-center rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-100 disabled:opacity-40"><FiArrowUp size={14} /></button>
                  <button onClick={() => swap(i, 1)} disabled={i === photos.length - 1} aria-label="Move down" className="grid h-8 w-8 place-items-center rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-100 disabled:opacity-40"><FiArrowDown size={14} /></button>
                </div>
                <button onClick={() => { if (confirm('Delete this photo?')) del.mutate(p.id); }} className="inline-flex items-center gap-1.5 rounded-lg px-2 py-1.5 text-sm text-red-500 hover:bg-red-50"><FiTrash2 size={14} /> Delete</button>
              </div>
            </div>
          </div>
        ))}
        {photos.length === 0 && (
          <div className="sm:col-span-2">
            <AdminEmpty
              icon={<FiImage size={30} />}
              title="No photos yet"
              hint="Upload a photo above to start building your About page gallery."
            />
          </div>
        )}
      </div>
    </div>
  );
}
