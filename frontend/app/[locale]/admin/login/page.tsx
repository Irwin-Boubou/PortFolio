'use client';
import { useForm } from 'react-hook-form';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { useRouter } from '@/navigation';
import { api } from '@/lib/api';
import { useAuthStore } from '@/store/auth';

export default function AdminLoginPage() {
  const t = useTranslations('admin.login');
  const router = useRouter();
  const { setAccessToken, setAdmin } = useAuthStore();
  const [error, setError] = useState(false);
  const { register, handleSubmit, formState: { isSubmitting } } = useForm<{ email: string; password: string }>();

  const onSubmit = async (data: { email: string; password: string }) => {
    setError(false);
    try {
      const res = await api.post('/auth/login', data);
      setAccessToken(res.data.accessToken);
      setAdmin(res.data.admin);
      router.push('/admin/dashboard');
    } catch {
      setError(true);
    }
  };

  return (
    <main className="grid min-h-screen place-items-center bg-[#F5F7FA] px-6 text-[#1a1a2e]">
      <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-sm rounded-2xl bg-white p-8 shadow-xl">
        <h1 className="mb-6 font-display text-2xl font-bold text-[#6C63FF]">{t('title')}</h1>
        {error && <p className="mb-4 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600" role="alert">{t('error')}</p>}
        <label htmlFor="email" className="mb-1 block text-sm font-medium">{t('email')}</label>
        <input id="email" type="email" {...register('email', { required: true })}
               className="mb-4 w-full rounded-lg border border-gray-300 px-3 py-2.5 focus:border-[#6C63FF] focus:outline-none" />
        <label htmlFor="password" className="mb-1 block text-sm font-medium">{t('password')}</label>
        <input id="password" type="password" {...register('password', { required: true })}
               className="mb-6 w-full rounded-lg border border-gray-300 px-3 py-2.5 focus:border-[#6C63FF] focus:outline-none" />
        <button type="submit" disabled={isSubmitting}
                className="w-full rounded-lg bg-[#6C63FF] py-2.5 font-medium text-white transition-colors hover:bg-[#5a51f0] disabled:opacity-50">
          {t('submit')}
        </button>
      </form>
    </main>
  );
}
