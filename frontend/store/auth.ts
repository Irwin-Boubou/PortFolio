'use client';
import { create } from 'zustand';

interface Admin { id: string; email: string; name: string; avatarUrl: string | null }
interface AuthState {
  accessToken: string | null;
  admin: Admin | null;
  setAccessToken: (t: string | null) => void;
  setAdmin: (a: Admin | null) => void;
  clear: () => void;
}

/** Access token lives ONLY in memory (spec §3.2), a refresh re-hydrates it via the RT cookie. */
export const useAuthStore = create<AuthState>((set) => ({
  accessToken: null,
  admin: null,
  setAccessToken: (accessToken) => set({ accessToken }),
  setAdmin: (admin) => set({ admin }),
  clear: () => set({ accessToken: null, admin: null }),
}));
