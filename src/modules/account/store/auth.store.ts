import { create } from 'zustand';
import type { AuthTokens, AuthUser } from '../types';

interface AuthState {
  user: AuthUser | null;
  tokens: AuthTokens | null;
  isAuthenticated: boolean;

  setTokens: (tokens: AuthTokens) => void;
  clearAuth: () => void;
  setUser: (user: AuthUser | null) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
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
}));
