'use client';
/** Key-value CMS editor, edits EN + FR side by side for each content key, grouped into tabs. */
import { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useTranslations } from 'next-intl';
import toast from 'react-hot-toast';
import { api } from '@/lib/api';

interface Row { key: string; value: { en?: unknown; fr?: unknown } }
const asText = (v: unknown) => (typeof v === 'string' ? v : JSON.stringify(v ?? '', null, 2));

const TABS = ['heroGeneral', 'aboutPage', 'navbarBooking', 'marqueeFooter'] as const;
type Tab = (typeof TABS)[number];

const ABOUT_PAGE_KEYS = new Set([
  'about.photoUrl', 'about.intro', 'about.bio.full', 'about.interests',
  'about.currentlyLearning', 'about.funFact', 'about.languages', 'about.cta.subtitle',
]);
const NAVBAR_BOOKING_KEYS = new Set(['booking.url', 'booking.label', 'booking.enabled']);
const MARQUEE_FOOTER_KEYS = new Set([
  'marquee.text', 'social.github', 'social.linkedin', 'social.behance',
  'social.dribbble', 'social.instagram', 'social.twitter', 'social.youtube',
]);

/** Everything else (hero.*, availability.*, section titles/subtitles, cv.url…) lands in Hero & General. */
function categoryOf(key: string): Tab {
  if (ABOUT_PAGE_KEYS.has(key)) return 'aboutPage';
  if (NAVBAR_BOOKING_KEYS.has(key)) return 'navbarBooking';
  if (MARQUEE_FOOTER_KEYS.has(key)) return 'marqueeFooter';
  return 'heroGeneral';
}

function ContentEditor({ row }: { row: Row }) {
  const qc = useQueryClient();
  const [en, setEn] = useState(asText(row.value?.en));
  const [fr, setFr] = useState(asText(row.value?.fr));
  const isJson = typeof row.value?.en !== 'string';

  const save = useMutation({
    mutationFn: () => {
      const parse = (s: string) => (isJson ? JSON.parse(s) : s);
      return api.put(`/site-content/${row.key}`, { value: { en: parse(en), fr: parse(fr) } });
    },
    onSuccess: () => { toast.success('Saved'); qc.invalidateQueries({ queryKey: ['site-content'] }); },
    onError: () => toast.error(isJson ? 'Invalid JSON' : 'Save failed'),
  });

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6">
      <p className="mb-4 font-mono text-sm font-semibold text-[#6C63FF]">{row.key}</p>
      <div className="grid gap-4 md:grid-cols-2">
        {[{ l: 'EN', v: en, set: setEn }, { l: 'FR', v: fr, set: setFr }].map(({ l, v, set }) => (
          <div key={l}>
            <label className="mb-1 block text-xs font-semibold text-gray-500">{l}</label>
            <textarea rows={4} value={v} onChange={(e) => set(e.target.value)}
                      className="w-full rounded-lg border border-gray-300 px-3 py-2 font-mono text-sm focus:border-[#6C63FF] focus:outline-none" />
          </div>
        ))}
      </div>
      <button onClick={() => save.mutate()} disabled={save.isPending}
              className="mt-4 rounded-lg bg-[#6C63FF] px-4 py-2 text-sm font-medium text-white hover:bg-[#5a51f0] disabled:opacity-50">
        Save
      </button>
    </div>
  );
}

export default function SiteContentPage() {
  const t = useTranslations('admin.content');
  const [tab, setTab] = useState<Tab>('heroGeneral');
  const { data } = useQuery({
    queryKey: ['site-content'],
    queryFn: async () => {
      const content = (await api.get('/site-content?lang=all')).data.content as Record<string, Row['value']>;
      return Object.entries(content).map(([key, value]) => ({ key, value }));
    },
  });

  const rows = (data ?? []).filter((row) => categoryOf(row.key) === tab);

  return (
    <div>
      <h1 className="mb-6 font-display text-2xl font-bold">Site Content</h1>
      <div className="mb-8 flex flex-wrap gap-2 border-b border-gray-200 pb-4">
        {TABS.map((tb) => (
          <button
            key={tb}
            onClick={() => setTab(tb)}
            className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
              tab === tb ? 'bg-[#6C63FF] text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {t(tb)}
          </button>
        ))}
      </div>
      <div className="space-y-6">
        {rows.map((row) => <ContentEditor key={row.key} row={row} />)}
        {rows.length === 0 && <p className="text-sm text-gray-400">No keys in this category yet.</p>}
      </div>
    </div>
  );
}
