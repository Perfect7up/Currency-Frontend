import { authApiClient } from './auth.client';
import type { components } from '../../../api/services/auth/auth';

export const authApi = {
  register: (data: components['schemas']['RegisterRequest']) =>
    authApiClient.POST('/api/Auth/register', {
      body: data,
    }),

  login: (credentials: components['schemas']['LoginRequest']) =>
    authApiClient.POST('/api/Auth/login', {
      body: credentials,
    }),

  confirmEmail: (query: { email: string; token: string }) =>
    authApiClient.GET('/api/Auth/confirm-email', {
      params: {
        query: query,
      },
    }),

  forgotPassword: (data: components['schemas']['ForgotPasswordRequest']) =>
    authApiClient.POST('/api/Auth/forgot-password', {
      body: data,
    }),

  resetPassword: (data: components['schemas']['ResetPasswordRequest']) =>
    authApiClient.POST('/api/Auth/reset-password', {
      body: data,
    }),

  changePassword: (data: components['schemas']['ChangePasswordRequest']) =>
    authApiClient.PUT('/api/Auth/change-password', {
      body: data,
    }),

  refreshToken: (data: components['schemas']['RefreshTokenRequest']) =>
    authApiClient.POST('/api/Auth/refresh-token', {
      body: data,
    }),

  logout: () => authApiClient.POST('/api/Auth/logout'),

  me: () => authApiClient.GET('/api/Auth/me'),
};
