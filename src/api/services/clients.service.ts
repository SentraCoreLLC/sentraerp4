import { apiClient } from '../client';
import { API_ENDPOINTS } from '../endpoints';
import { PaginatedResponse } from '@/types/api.types';

export interface Client {
  id: number;
  name: string;
  industry: string;
  size: 'small' | 'medium' | 'large' | 'enterprise';
  status: 'active' | 'inactive' | 'prospect';
  contractStart?: string;
  contractEnd?: string;
  accountManager: string;
  accountManagerId: number;
  servicesActive: string[];
  complianceFrameworks: string[];
  riskScore?: number;
  lastAssessment?: string;
}

export interface ClientContact {
  id: number;
  clientId: number;
  name: string;
  email: string;
  phone?: string;
  role: string;
  isPrimary: boolean;
  department?: string;
}

export interface ClientService {
  id: number;
  clientId: number;
  serviceType: 'managed_security' | 'compliance_audit' | 'risk_assessment' | 'training' | 'consulting';
  status: 'active' | 'suspended' | 'completed';
  startDate: string;
  endDate?: string;
  sla?: string;
}

export const clientsService = {
  getClients: async (params?: { 
    page?: number;
    search?: string;
    status?: string;
    industry?: string;
  }): Promise<PaginatedResponse<Client>> => {
    return apiClient.get(API_ENDPOINTS.CLIENTS.LIST, { params });
  },

  getClientById: async (id: number): Promise<Client> => {
    return apiClient.get(API_ENDPOINTS.CLIENTS.DETAIL(id));
  },

  createClient: async (data: Partial<Client>): Promise<Client> => {
    return apiClient.post(API_ENDPOINTS.CLIENTS.LIST, data);
  },

  updateClient: async (id: number, data: Partial<Client>): Promise<Client> => {
    return apiClient.patch(API_ENDPOINTS.CLIENTS.DETAIL(id), data);
  },

  getClientContacts: async (clientId: number): Promise<ClientContact[]> => {
    return apiClient.get(API_ENDPOINTS.CLIENTS.CONTACTS(clientId));
  },

  getClientServices: async (clientId: number): Promise<ClientService[]> => {
    return apiClient.get(API_ENDPOINTS.CLIENTS.SERVICES(clientId));
  },

  getClientComplianceStatus: async (clientId: number) => {
    return apiClient.get(API_ENDPOINTS.CLIENTS.COMPLIANCE_STATUS(clientId));
  },

  getClientDashboard: async (clientId: number) => {
    return apiClient.get(API_ENDPOINTS.CLIENTS.DASHBOARD(clientId));
  },
};
