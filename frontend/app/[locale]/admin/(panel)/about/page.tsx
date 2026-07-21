'use client';
import { useState } from 'react';
import IdentityTab from '@/components/admin/AboutTabs/IdentityTab';
import StatsTab from '@/components/admin/AboutTabs/StatsTab';
import ValuesTab from '@/components/admin/AboutTabs/ValuesTab';
import PersonalTab from '@/components/admin/AboutTabs/PersonalTab';
import CtaTab from '@/components/admin/AboutTabs/CtaTab';

const TABS = [
  { key: 'identity', label: 'Identity' },
  { key: 'stats', label: 'Stats' },
  { key: 'values', label: 'Values' },
  { key: 'personal', label: 'Personal' },
  { key: 'cta', label: 'CTA' },
] as const;

type TabKey = (typeof TABS)[number]['key'];

export default function AdminAboutPage() {
  const [tab, setTab] = useState<TabKey>('identity');

  return (
    <div>
      <h1 className="mb-8 font-display text-2xl font-bold">About Page</h1>

      <div className="mb-6 flex flex-wrap gap-2 border-b border-gray-200">
        {TABS.map((t) => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            className={`-mb-px border-b-2 px-4 py-2.5 text-sm font-medium transition-colors ${
              tab === t.key ? 'border-[#6C63FF] text-[#6C63FF]' : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {tab === 'identity' && <IdentityTab />}
      {tab === 'stats' && <StatsTab />}
      {tab === 'values' && <ValuesTab />}
      {tab === 'personal' && <PersonalTab />}
      {tab === 'cta' && <CtaTab />}
    </div>
  );
}
