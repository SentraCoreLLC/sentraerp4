import { apiClient } from '../client';
import { API_ENDPOINTS } from '../endpoints';
import { LoginCredentials, AuthTokens, AuthUser } from '@/types/auth.types';

export const authService = {
  login: async (credentials: LoginCredentials): Promise<{ tokens: AuthTokens; user: AuthUser }> => {
    return apiClient.post(API_ENDPOINTS.AUTH.LOGIN, credentials);
  },

  logout: async (): Promise<void> => {
    return apiClient.post(API_ENDPOINTS.AUTH.LOGOUT);
  },

  getCurrentUser: async (): Promise<AuthUser> => {
    return apiClient.get(API_ENDPOINTS.AUTH.ME);
  },

  refreshToken: async (refreshToken: string): Promise<AuthTokens> => {
    return apiClient.post(API_ENDPOINTS.AUTH.REFRESH, { refresh: refreshToken });
  },
};
