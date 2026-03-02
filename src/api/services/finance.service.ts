import { apiClient } from '../client';
import { API_ENDPOINTS } from '../endpoints';

export const financeService = {
  getInvoices: async () => {
    return apiClient.get(API_ENDPOINTS.FINANCE.INVOICES);
  },

  getPayments: async () => {
    return apiClient.get(API_ENDPOINTS.FINANCE.PAYMENTS);
  },

  getDashboard: async () => {
    return apiClient.get(API_ENDPOINTS.FINANCE.DASHBOARD);
  },
};
