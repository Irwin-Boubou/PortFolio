'use client';
import { useEffect, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useTranslations } from 'next-intl';
import toast from 'react-hot-toast';
import { api } from '@/lib/api';

interface Admin { id: string; email: string; name: string; avatarUrl: string | null }

const input = 'w-full rounded-lg border border-gray-300 px-3 py-2.5 focus:border-[#6C63FF] focus:outline-none';
const label = 'mb-1 block text-sm font-medium text-gray-700';

export default function ProfilePage() {
  const t = useTranslations('admin.profile');
  const qc = useQueryClient();
  const { data: admin } = useQuery({
    queryKey: ['admin-me'],
    queryFn: async () => (await api.get('/auth/me')).data.admin as Admin,
  });

  const [name, setName] = useState('');
  const [avatarUrl, setAvatarUrl] = useState('');
  useEffect(() => {
    if (admin) { setName(admin.name); setAvatarUrl(admin.avatarUrl ?? ''); }
  }, [admin]);

  const saveProfile = useMutation({
    mutationFn: () => api.put('/auth/me', { name, avatarUrl: avatarUrl || null }),
    onSuccess: () => { toast.success(t('saved')); qc.invalidateQueries({ queryKey: ['admin-me'] }); },
    onError: () => toast.error('Save failed'),
  });

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const changePassword = useMutation({
    mutationFn: () => api.put('/auth/password', { currentPassword, newPassword }),
    onSuccess: () => {
      toast.success(t('passwordChanged'));
      setCurrentPassword(''); setNewPassword(''); setConfirmPassword('');
    },
    onError: (e: unknown) => {
      const status = (e as { response?: { status?: number } })?.response?.status;
      toast.error(status === 401 ? t('wrongPassword') : 'Failed to change password');
    },
  });

  const onChangePassword = () => {
    if (newPassword !== confirmPassword) { toast.error(t('passwordMismatch')); return; }
    changePassword.mutate();
  };

  return (
    <div className="max-w-2xl space-y-8">
      <h1 className="font-display text-2xl font-bold">{t('title')}</h1>

      <div className="rounded-2xl border border-gray-200 bg-white p-6">
        <div className="mb-5 flex items-center gap-4">
          {avatarUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={avatarUrl} alt={name} className="h-16 w-16 rounded-full object-cover" />
          ) : (
            <div className="grid h-16 w-16 place-items-center rounded-full bg-[#6C63FF]/15 font-display text-xl font-bold text-[#6C63FF]">
              {name.charAt(0).toUpperCase() || '?'}
            </div>
          )}
        </div>
        <div className="space-y-4">
          <div>
            <label className={label}>{t('name')}</label>
            <input value={name} onChange={(e) => setName(e.target.value)} className={input} />
          </div>
          <div>
            <label className={label}>{t('email')}</label>
            <input value={admin?.email ?? ''} disabled className={`${input} bg-gray-50 text-gray-400`} />
          </div>
          <div>
            <label className={label}>{t('avatarUrl')}</label>
            <input value={avatarUrl} onChange={(e) => setAvatarUrl(e.target.value)} className={input} placeholder="https://…" />
          </div>
          <button
            onClick={() => name && saveProfile.mutate()}
            disabled={saveProfile.isPending}
            className="rounded-lg bg-[#6C63FF] px-5 py-2.5 text-sm font-medium text-white hover:bg-[#5a51f0] disabled:opacity-50"
          >
            {t('saveProfile')}
          </button>
        </div>
      </div>

      <div className="rounded-2xl border border-gray-200 bg-white p-6">
        <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-gray-500">{t('changePassword')}</h2>
        <div className="space-y-4">
          <div>
            <label className={label}>{t('currentPassword')}</label>
            <input type="password" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} className={input} />
          </div>
          <div>
            <label className={label}>{t('newPassword')}</label>
            <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} className={input} />
          </div>
          <div>
            <label className={label}>{t('confirmPassword')}</label>
            <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className={input} />
          </div>
          <button
            onClick={onChangePassword}
            disabled={changePassword.isPending || !currentPassword || !newPassword}
            className="rounded-lg bg-[#6C63FF] px-5 py-2.5 text-sm font-medium text-white hover:bg-[#5a51f0] disabled:opacity-50"
          >
            {t('changePassword')}
          </button>
        </div>
      </div>
    </div>
  );
}
