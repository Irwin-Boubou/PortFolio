'use client';
/**
 * Axios client for browser-side calls (forms, admin panel).
 * - Attaches the in-memory access token (never localStorage — spec §3.2).
 * - On 401, transparently calls /auth/refresh once and retries.
 */
import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';
import { useAuthStore } from '@/store/auth';

export const API_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3001/api/v1';

export const api = axios.create({ baseURL: API_URL, withCredentials: true });

api.interceptors.request.use((config) => {
  const token = useAuthStore.getState().accessToken;
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

let refreshing: Promise<string | null> | null = null;

api.interceptors.response.use(undefined, async (error: AxiosError) => {
  const original = error.config as InternalAxiosRequestConfig & { _retried?: boolean };
  if (error.response?.status === 401 && !original._retried && !original.url?.includes('/auth/')) {
    original._retried = true;
    refreshing ??= axios
      .post<{ accessToken: string }>(`${API_URL}/auth/refresh`, {}, { withCredentials: true })
      .then((r) => {
        useAuthStore.getState().setAccessToken(r.data.accessToken);
        return r.data.accessToken;
      })
      .catch(() => {
        useAuthStore.getState().clear();
        return null;
      })
      .finally(() => { refreshing = null; });
    const token = await refreshing;
    if (token) {
      original.headers.Authorization = `Bearer ${token}`;
      return api(original);
    }
  }
  throw error;
});
