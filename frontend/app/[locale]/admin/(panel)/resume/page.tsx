'use client';
/**
 * Resume manager: one entry point with three tabs (Experience / Education / Certifications).
 * Each tab is an inline add+edit+delete list, mirroring the skills page pattern,
 * no separate new/edit routes needed since none of these models are complex enough to warrant it.
 * None of the three models have a `published` flag.
 */
import { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { api } from '@/lib/api';
import { ImageUpload } from '@/components/admin/ImageUpload';

const input = 'w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-[#6C63FF] focus:outline-none';
const label = 'mb-1 block text-xs font-medium text-gray-500';
const TABS = ['experience', 'education', 'certifications'] as const;
type Tab = (typeof TABS)[number];

interface LocaleMap { en: string; fr: string }
/** Multi-image field: upload several protected preview images. */
function ImagesField({ images, onChange }: { images: string[]; onChange: (v: string[]) => void }) {
  return (
    <div className="sm:col-span-2">
      <label className="mb-1 block text-xs text-gray-500">Preview images (certificates, photos)</label>
      {images.length > 0 && (
        <div className="mb-2 flex flex-wrap gap-2">
          {images.map((url, i) => (
            <div key={url + i} className="relative h-14 w-20 overflow-hidden rounded-lg border border-gray-200">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={url} alt="" className="h-full w-full object-cover" />
              <button
                type="button"
                onClick={() => onChange(images.filter((_, j) => j !== i))}
                aria-label="Remove"
                className="absolute right-0.5 top-0.5 grid h-5 w-5 place-items-center rounded-full bg-black/60 text-xs text-white"
              >
                ×
              </button>
            </div>
          ))}
        </div>
      )}
      <ImageUpload label="" shape="wide" value="" onChange={(url) => url && onChange([...images, url])} />
    </div>
  );
}

interface Experience {
  id: string; company: LocaleMap; role: LocaleMap; period: string; description: LocaleMap;
  location: LocaleMap | null; logoUrl: string | null; images: string[]; current: boolean; order: number;
}
interface Education {
  id: string; institution: LocaleMap; degree: LocaleMap; period: string; description: LocaleMap | null;
  logoUrl: string | null; images: string[]; order: number;
}
interface Certification {
  id: string; name: LocaleMap; issuer: string; date: string; url: string | null; badgeUrl: string | null; images: string[]; order: number;
}

export default function AdminResumePage() {
  const [tab, setTab] = useState<Tab>('experience');
  return (
    <div>
      <h1 className="mb-8 font-display text-2xl font-bold">Resume</h1>
      <div className="mb-8 flex overflow-hidden rounded-lg border border-gray-300 w-fit">
        {TABS.map((t) => (
          <button key={t} onClick={() => setTab(t)}
                  className={`px-4 py-2 text-sm font-semibold capitalize ${tab === t ? 'bg-[#6C63FF] text-white' : 'bg-white text-gray-500'}`}>
            {t}
          </button>
        ))}
      </div>
      {tab === 'experience' && <ExperienceTab />}
      {tab === 'education' && <EducationTab />}
      {tab === 'certifications' && <CertificationsTab />}
    </div>
  );
}

const lm = (v: unknown): LocaleMap => {
  const m = (v ?? {}) as { en?: string; fr?: string };
  return { en: m.en ?? '', fr: m.fr ?? '' };
};

function ExperienceTab() {
  const qc = useQueryClient();
  const emptyForm = { company: '', role: '', period: '', descriptionEn: '', descriptionFr: '', companyFr: '', roleFr: '', location: '', locationFr: '', logoUrl: '', images: [] as string[], current: false };
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState<string | null>(null);

  const { data } = useQuery({
    queryKey: ['admin-experience'],
    queryFn: async () => (await api.get('/experience?lang=all&limit=100')).data.experience as Experience[],
  });
  const rows = [...(data ?? [])].sort((a, b) => a.order - b.order);
  const invalidate = () => qc.invalidateQueries({ queryKey: ['admin-experience'] });

  const toPayload = () => ({
    company: { en: form.company, fr: form.companyFr || undefined },
    role: { en: form.role, fr: form.roleFr || undefined },
    period: form.period,
    description: { en: form.descriptionEn, fr: form.descriptionFr || undefined },
    location: form.location ? { en: form.location, fr: form.locationFr || undefined } : null,
    logoUrl: form.logoUrl || null,
    images: form.images ?? [],
    current: form.current,
  });
  const create = useMutation({
    mutationFn: () => api.post('/experience', toPayload()),
    onSuccess: () => { toast.success('Added'); setForm(emptyForm); invalidate(); },
    onError: () => toast.error('Save failed'),
  });
  const update = useMutation({
    mutationFn: (id: string) => api.put(`/experience/${id}`, toPayload()),
    onSuccess: () => { toast.success('Saved'); setEditingId(null); setForm(emptyForm); invalidate(); },
    onError: () => toast.error('Save failed'),
  });
  const del = useMutation({ mutationFn: (id: string) => api.delete(`/experience/${id}`), onSuccess: () => { toast.success('Deleted'); invalidate(); } });

  const startEdit = (e: Experience) => {
    setEditingId(e.id);
    setForm({
      company: e.company.en, companyFr: e.company.fr, role: e.role.en, roleFr: e.role.fr,
      period: e.period, descriptionEn: e.description.en, descriptionFr: e.description.fr,
      location: e.location?.en ?? '', locationFr: e.location?.fr ?? '', logoUrl: e.logoUrl ?? '', images: e.images ?? [], current: e.current,
    });
  };
  const cancelEdit = () => { setEditingId(null); setForm(emptyForm); };

  return (
    <div>
      <div className="mb-8 rounded-2xl border border-gray-200 bg-white p-5">
        <p className="mb-4 text-sm font-medium text-gray-700">{editingId ? 'Edit experience' : 'Add experience'}</p>
        <div className="grid gap-4 sm:grid-cols-2">
          <div><label className={label}>Company (EN) *</label><input value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} className={input} /></div>
          <div><label className={label}>Company (FR)</label><input value={form.companyFr} onChange={(e) => setForm({ ...form, companyFr: e.target.value })} className={input} /></div>
          <div><label className={label}>Role (EN) *</label><input value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })} className={input} /></div>
          <div><label className={label}>Role (FR)</label><input value={form.roleFr} onChange={(e) => setForm({ ...form, roleFr: e.target.value })} className={input} /></div>
          <div><label className={label}>Period *</label><input value={form.period} onChange={(e) => setForm({ ...form, period: e.target.value })} className={input} placeholder="2022 – Present" /></div>
          <div><label className={label}>Logo URL</label><input value={form.logoUrl} onChange={(e) => setForm({ ...form, logoUrl: e.target.value })} className={input} /></div>
          <ImagesField images={form.images} onChange={(v) => setForm({ ...form, images: v })} />
          <div><label className={label}>Location (EN)</label><input value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} className={input} /></div>
          <div><label className={label}>Location (FR)</label><input value={form.locationFr} onChange={(e) => setForm({ ...form, locationFr: e.target.value })} className={input} /></div>
          <div className="sm:col-span-2"><label className={label}>Description (EN) *, Markdown bullets</label><textarea rows={4} value={form.descriptionEn} onChange={(e) => setForm({ ...form, descriptionEn: e.target.value })} className={`${input} font-mono`} /></div>
          <div className="sm:col-span-2"><label className={label}>Description (FR)</label><textarea rows={4} value={form.descriptionFr} onChange={(e) => setForm({ ...form, descriptionFr: e.target.value })} className={`${input} font-mono`} /></div>
        </div>
        <label className="mt-4 flex items-center gap-2 text-sm"><input type="checkbox" checked={form.current} onChange={(e) => setForm({ ...form, current: e.target.checked })} /> Current position</label>
        <div className="mt-4 flex gap-3">
          <button onClick={() => (editingId ? update.mutate(editingId) : create.mutate())}
                  disabled={!form.company || !form.role || !form.period || !form.descriptionEn}
                  className="rounded-lg bg-[#6C63FF] px-4 py-2 text-sm font-medium text-white hover:bg-[#5a51f0] disabled:opacity-50">
            {editingId ? 'Save changes' : 'Add experience'}
          </button>
          {editingId && <button onClick={cancelEdit} className="rounded-lg border border-gray-300 px-4 py-2 text-sm text-gray-600">Cancel</button>}
        </div>
      </div>
      <div className="grid gap-3">
        {rows.map((e) => (
          <div key={e.id} className="flex items-center gap-4 rounded-xl border border-gray-200 bg-white px-4 py-3">
            <div className="flex-1">
              <p className="text-sm font-medium">{e.role.en} · {e.company.en} {e.current && <span className="ml-2 rounded-full bg-green-100 px-2 py-0.5 text-xs text-green-700">Current</span>}</p>
              <p className="text-xs text-gray-500">{e.period}</p>
            </div>
            <button onClick={() => startEdit(e)} className="text-sm text-[#6C63FF] hover:underline">Edit</button>
            <button onClick={() => { if (confirm('Delete this experience entry?')) del.mutate(e.id); }} className="text-sm text-red-500 hover:underline">Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}

function EducationTab() {
  const qc = useQueryClient();
  const emptyForm = { institution: '', institutionFr: '', degree: '', degreeFr: '', period: '', descriptionEn: '', descriptionFr: '', logoUrl: '', images: [] as string[] };
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState<string | null>(null);

  const { data } = useQuery({
    queryKey: ['admin-education'],
    queryFn: async () => (await api.get('/education?lang=all&limit=100')).data.education as Education[],
  });
  const rows = [...(data ?? [])].sort((a, b) => a.order - b.order);
  const invalidate = () => qc.invalidateQueries({ queryKey: ['admin-education'] });

  const toPayload = () => ({
    institution: { en: form.institution, fr: form.institutionFr || undefined },
    degree: { en: form.degree, fr: form.degreeFr || undefined },
    period: form.period,
    description: form.descriptionEn ? { en: form.descriptionEn, fr: form.descriptionFr || undefined } : null,
    logoUrl: form.logoUrl || null,
    images: form.images ?? [],
  });
  const create = useMutation({
    mutationFn: () => api.post('/education', toPayload()),
    onSuccess: () => { toast.success('Added'); setForm(emptyForm); invalidate(); },
    onError: () => toast.error('Save failed'),
  });
  const update = useMutation({
    mutationFn: (id: string) => api.put(`/education/${id}`, toPayload()),
    onSuccess: () => { toast.success('Saved'); setEditingId(null); setForm(emptyForm); invalidate(); },
    onError: () => toast.error('Save failed'),
  });
  const del = useMutation({ mutationFn: (id: string) => api.delete(`/education/${id}`), onSuccess: () => { toast.success('Deleted'); invalidate(); } });

  const startEdit = (e: Education) => {
    setEditingId(e.id);
    setForm({
      institution: e.institution.en, institutionFr: e.institution.fr, degree: e.degree.en, degreeFr: e.degree.fr,
      period: e.period, descriptionEn: e.description?.en ?? '', descriptionFr: e.description?.fr ?? '', logoUrl: e.logoUrl ?? '', images: e.images ?? [],
    });
  };
  const cancelEdit = () => { setEditingId(null); setForm(emptyForm); };

  return (
    <div>
      <div className="mb-8 rounded-2xl border border-gray-200 bg-white p-5">
        <p className="mb-4 text-sm font-medium text-gray-700">{editingId ? 'Edit education' : 'Add education'}</p>
        <div className="grid gap-4 sm:grid-cols-2">
          <div><label className={label}>Institution (EN) *</label><input value={form.institution} onChange={(e) => setForm({ ...form, institution: e.target.value })} className={input} /></div>
          <div><label className={label}>Institution (FR)</label><input value={form.institutionFr} onChange={(e) => setForm({ ...form, institutionFr: e.target.value })} className={input} /></div>
          <div><label className={label}>Degree (EN) *</label><input value={form.degree} onChange={(e) => setForm({ ...form, degree: e.target.value })} className={input} /></div>
          <div><label className={label}>Degree (FR)</label><input value={form.degreeFr} onChange={(e) => setForm({ ...form, degreeFr: e.target.value })} className={input} /></div>
          <div><label className={label}>Period *</label><input value={form.period} onChange={(e) => setForm({ ...form, period: e.target.value })} className={input} placeholder="2018 – 2022" /></div>
          <div><label className={label}>Logo URL</label><input value={form.logoUrl} onChange={(e) => setForm({ ...form, logoUrl: e.target.value })} className={input} /></div>
          <ImagesField images={form.images} onChange={(v) => setForm({ ...form, images: v })} />
          <div className="sm:col-span-2"><label className={label}>Description (EN)</label><textarea rows={3} value={form.descriptionEn} onChange={(e) => setForm({ ...form, descriptionEn: e.target.value })} className={input} /></div>
          <div className="sm:col-span-2"><label className={label}>Description (FR)</label><textarea rows={3} value={form.descriptionFr} onChange={(e) => setForm({ ...form, descriptionFr: e.target.value })} className={input} /></div>
        </div>
        <div className="mt-4 flex gap-3">
          <button onClick={() => (editingId ? update.mutate(editingId) : create.mutate())}
                  disabled={!form.institution || !form.degree || !form.period}
                  className="rounded-lg bg-[#6C63FF] px-4 py-2 text-sm font-medium text-white hover:bg-[#5a51f0] disabled:opacity-50">
            {editingId ? 'Save changes' : 'Add education'}
          </button>
          {editingId && <button onClick={cancelEdit} className="rounded-lg border border-gray-300 px-4 py-2 text-sm text-gray-600">Cancel</button>}
        </div>
      </div>
      <div className="grid gap-3">
        {rows.map((e) => (
          <div key={e.id} className="flex items-center gap-4 rounded-xl border border-gray-200 bg-white px-4 py-3">
            <div className="flex-1">
              <p className="text-sm font-medium">{e.degree.en} · {e.institution.en}</p>
              <p className="text-xs text-gray-500">{e.period}</p>
            </div>
            <button onClick={() => startEdit(e)} className="text-sm text-[#6C63FF] hover:underline">Edit</button>
            <button onClick={() => { if (confirm('Delete this education entry?')) del.mutate(e.id); }} className="text-sm text-red-500 hover:underline">Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}

function CertificationsTab() {
  const qc = useQueryClient();
  const emptyForm = { name: '', nameFr: '', issuer: '', date: '', url: '', badgeUrl: '', images: [] as string[] };
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState<string | null>(null);

  const { data } = useQuery({
    queryKey: ['admin-certifications'],
    queryFn: async () => (await api.get('/certifications?lang=all&limit=100')).data.certifications as Certification[],
  });
  const rows = [...(data ?? [])].sort((a, b) => a.order - b.order);
  const invalidate = () => qc.invalidateQueries({ queryKey: ['admin-certifications'] });

  const toPayload = () => ({
    name: { en: form.name, fr: form.nameFr || undefined },
    issuer: form.issuer,
    date: form.date ? new Date(form.date).toISOString() : undefined,
    url: form.url || null,
    badgeUrl: form.badgeUrl || null,
    images: form.images ?? [],
  });
  const create = useMutation({
    mutationFn: () => api.post('/certifications', toPayload()),
    onSuccess: () => { toast.success('Added'); setForm(emptyForm); invalidate(); },
    onError: () => toast.error('Save failed'),
  });
  const update = useMutation({
    mutationFn: (id: string) => api.put(`/certifications/${id}`, toPayload()),
    onSuccess: () => { toast.success('Saved'); setEditingId(null); setForm(emptyForm); invalidate(); },
    onError: () => toast.error('Save failed'),
  });
  const del = useMutation({ mutationFn: (id: string) => api.delete(`/certifications/${id}`), onSuccess: () => { toast.success('Deleted'); invalidate(); } });

  const startEdit = (c: Certification) => {
    setEditingId(c.id);
    setForm({
      name: c.name.en, nameFr: c.name.fr, issuer: c.issuer,
      date: c.date ? new Date(c.date).toISOString().slice(0, 10) : '', url: c.url ?? '', badgeUrl: c.badgeUrl ?? '', images: c.images ?? [],
    });
  };
  const cancelEdit = () => { setEditingId(null); setForm(emptyForm); };

  return (
    <div>
      <div className="mb-8 rounded-2xl border border-gray-200 bg-white p-5">
        <p className="mb-4 text-sm font-medium text-gray-700">{editingId ? 'Edit certification' : 'Add certification'}</p>
        <div className="grid gap-4 sm:grid-cols-2">
          <div><label className={label}>Name (EN) *</label><input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className={input} /></div>
          <div><label className={label}>Name (FR)</label><input value={form.nameFr} onChange={(e) => setForm({ ...form, nameFr: e.target.value })} className={input} /></div>
          <div><label className={label}>Issuer *</label><input value={form.issuer} onChange={(e) => setForm({ ...form, issuer: e.target.value })} className={input} /></div>
          <div><label className={label}>Date *</label><input type="date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} className={input} /></div>
          <div><label className={label}>URL</label><input value={form.url} onChange={(e) => setForm({ ...form, url: e.target.value })} className={input} /></div>
          <div><label className={label}>Badge URL</label><input value={form.badgeUrl} onChange={(e) => setForm({ ...form, badgeUrl: e.target.value })} className={input} /></div>
          <ImagesField images={form.images} onChange={(v) => setForm({ ...form, images: v })} />
        </div>
        <div className="mt-4 flex gap-3">
          <button onClick={() => (editingId ? update.mutate(editingId) : create.mutate())}
                  disabled={!form.name || !form.issuer || !form.date}
                  className="rounded-lg bg-[#6C63FF] px-4 py-2 text-sm font-medium text-white hover:bg-[#5a51f0] disabled:opacity-50">
            {editingId ? 'Save changes' : 'Add certification'}
          </button>
          {editingId && <button onClick={cancelEdit} className="rounded-lg border border-gray-300 px-4 py-2 text-sm text-gray-600">Cancel</button>}
        </div>
      </div>
      <div className="grid gap-3">
        {rows.map((c) => (
          <div key={c.id} className="flex items-center gap-4 rounded-xl border border-gray-200 bg-white px-4 py-3">
            <div className="flex-1">
              <p className="text-sm font-medium">{c.name.en} · {c.issuer}</p>
              <p className="text-xs text-gray-500">{new Date(c.date).toLocaleDateString()}</p>
            </div>
            <button onClick={() => startEdit(c)} className="text-sm text-[#6C63FF] hover:underline">Edit</button>
            <button onClick={() => { if (confirm('Delete this certification?')) del.mutate(c.id); }} className="text-sm text-red-500 hover:underline">Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}
