import { apiClient } from '../client';
import { API_ENDPOINTS } from '../endpoints';
import { User } from '@/types/user.types';
import { PaginatedResponse } from '@/types/api.types';

export const usersService = {
  list: async (params?: { page?: number; search?: string }): Promise<PaginatedResponse<User>> => {
    return apiClient.get(API_ENDPOINTS.USERS.LIST, { params });
  },

  getById: async (id: number): Promise<User> => {
    return apiClient.get(API_ENDPOINTS.USERS.DETAIL(id));
  },

  create: async (data: Partial<User>): Promise<User> => {
    return apiClient.post(API_ENDPOINTS.USERS.LIST, data);
  },

  update: async (id: number, data: Partial<User>): Promise<User> => {
    return apiClient.patch(API_ENDPOINTS.USERS.DETAIL(id), data);
  },

  delete: async (id: number): Promise<void> => {
    return apiClient.delete(API_ENDPOINTS.USERS.DETAIL(id));
  },
};
