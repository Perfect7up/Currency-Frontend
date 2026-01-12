import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { AuthTokens, AuthUser } from '../types';

interface AuthState {
  user: AuthUser | null;
  tokens: AuthTokens | null;
  isAuthenticated: boolean;
  setTokens: (tokens: AuthTokens) => void;
  clearAuth: () => void;
  setUser: (user: AuthUser | null) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      tokens: null,
      isAuthenticated: false,

      setTokens: (tokens) =>
        set({
          tokens,
          isAuthenticated: true,
        }),

      setUser: (user) =>
        set({
          user,
        }),

      clearAuth: () =>
        set({
          user: null,
          tokens: null,
          isAuthenticated: false,
        }),
    }),
    {
      name: 'auth-storage', // Key name in localStorage
      storage: createJSONStorage(() => localStorage),
      // Optional: only persist tokens and isAuthenticated, or everything
    },
  ),
);
