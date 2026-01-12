import { useMutation } from '@tanstack/react-query';
import { authApi } from '../api/auth.api';
import type { components } from '../../../api/services/auth/auth';
import type { AuthTokens, AuthUser } from '../types';

/**
 * Interface to map the flat response from .NET
 * into the nested structure used by the Frontend Store
 */
interface BackendLoginResponse {
  accessToken?: string;
  token?: string;
  refreshToken?: string;
  email?: string;
  username?: string;
}

export interface RegisterResponse {
  tokens: AuthTokens;
  user: AuthUser;
}

/**
 * Login: Standard JWT acquisition
 */
export const useLogin = () =>
  useMutation<RegisterResponse, Error, components['schemas']['LoginRequest']>({
    mutationFn: async (credentials) => {
      const { data, error } = await authApi.login(credentials);
      if (error) throw error;
      if (!data) throw new Error('No data received from terminal');

      const rawData = data as BackendLoginResponse;
      return {
        tokens: {
          accessToken: rawData.accessToken || rawData.token || '',
          refreshToken: rawData.refreshToken || '',
        },
        user: {
          email: rawData.email || '',
          username: rawData.username || '',
        },
      };
    },
  });

/**
 * Register: Creates account and triggers verification email
 * Note: Returns void/message because user cannot login until email is confirmed
 */
export const useRegister = () =>
  useMutation<{ message?: string }, Error, components['schemas']['RegisterRequest']>({
    mutationFn: async (registrationData) => {
      const { data, error } = await authApi.register(registrationData);

      if (error) throw error;

      // 1. Cast to 'unknown' first to satisfy the compiler
      // 2. Use '??' to provide a fallback if the body is truly empty
      return (
        (data as unknown as { message?: string }) ?? {
          message: 'Registration successful. Please check your email.',
        }
      );
    },
  });

/**
 * Confirm Email: Verifies the token sent to the user's email
 */
export const useConfirmEmail = () =>
  useMutation<void, Error, { email: string; token: string }>({
    mutationFn: async (params) => {
      const { error } = await authApi.confirmEmail(params);
      if (error) throw error;
    },
  });

/**
 * Forgot Password: Initiates the recovery process
 */
export const useForgotPassword = () =>
  useMutation<{ message?: string }, Error, components['schemas']['ForgotPasswordRequest']>({
    mutationFn: async (payload) => {
      const { data, error } = await authApi.forgotPassword(payload);
      if (error) throw error;
      return data as unknown as { message?: string };
    },
  });

export const useResetPassword = () =>
  useMutation<{ message?: string }, Error, components['schemas']['ResetPasswordRequest']>({
    mutationFn: async (payload) => {
      const { data, error } = await authApi.resetPassword(payload);
      if (error) throw error;
      return data as unknown as { message?: string };
    },
  });

/**
 * Change Password: Functional for logged-in users via [HttpPut]
 */
export const useChangePassword = () =>
  useMutation<void, Error, components['schemas']['ChangePasswordRequest']>({
    mutationFn: async (data) => {
      const { error } = await authApi.changePassword(data);
      if (error) throw error;
    },
  });

/**
 * Refresh Token: Rotates expired JWTs
 */
export const useRefreshToken = () =>
  useMutation<void, Error, components['schemas']['RefreshTokenRequest']>({
    mutationFn: async (data) => {
      const { error } = await authApi.refreshToken(data);
      if (error) throw error;
    },
  });

/**
 * Logout: Revokes session on server
 */
export const useLogout = () =>
  useMutation<void, Error, void>({
    mutationFn: async () => {
      const { error } = await authApi.logout();
      if (error) throw error;
    },
  });

/**
 * Me: Retrieves current user profile details
 */
export const useMe = () =>
  useMutation<AuthUser, Error, void>({
    mutationFn: async () => {
      const { data, error } = await authApi.me();
      if (error) throw error;
      if (!data) throw new Error('Unauthorized: No user session found.');
      return data as AuthUser;
    },
  });
