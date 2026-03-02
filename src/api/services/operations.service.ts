import { apiClient } from '../client';
import { API_ENDPOINTS } from '../endpoints';

export const operationsService = {
  getProjects: async () => {
    return apiClient.get(API_ENDPOINTS.OPERATIONS.PROJECTS);
  },

  getTasks: async () => {
    return apiClient.get(API_ENDPOINTS.OPERATIONS.TASKS);
  },

  getDashboard: async () => {
    return apiClient.get(API_ENDPOINTS.OPERATIONS.DASHBOARD);
  },
};
