import { apiClient } from '../client';
import { API_ENDPOINTS } from '../endpoints';

export const complianceService = {
  getAudits: async () => {
    return apiClient.get(API_ENDPOINTS.COMPLIANCE.AUDITS);
  },

  getRisks: async () => {
    return apiClient.get(API_ENDPOINTS.COMPLIANCE.RISKS);
  },

  getDashboard: async () => {
    return apiClient.get(API_ENDPOINTS.COMPLIANCE.DASHBOARD);
  },
};
