import { apiClient } from '../client';
import { API_ENDPOINTS } from '../endpoints';
import { PaginatedResponse } from '@/types/api.types';

export interface SecurityIncident {
  id: number;
  clientId?: number;
  clientName?: string;
  title: string;
  description: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  status: 'new' | 'investigating' | 'contained' | 'eradicated' | 'recovered' | 'closed';
  category: 'malware' | 'phishing' | 'data_breach' | 'dos' | 'unauthorized_access' | 'other';
  detectedDate: string;
  assignedTo?: string;
  resolvedDate?: string;
  affectedAssets: string[];
  indicators: string[];
}

export interface SecurityAlert {
  id: number;
  clientId?: number;
  source: string;
  severity: 'info' | 'low' | 'medium' | 'high' | 'critical';
  title: string;
  description: string;
  timestamp: string;
  status: 'new' | 'investigating' | 'false_positive' | 'escalated' | 'resolved';
  assignedTo?: string;
  relatedIncidentId?: number;
}

export interface Vulnerability {
  id: number;
  clientId?: number;
  assetName: string;
  cveId?: string;
  title: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  cvssScore?: number;
  status: 'open' | 'acknowledged' | 'patching' | 'mitigated' | 'closed';
  discoveredDate: string;
  dueDate?: string;
  remediationPlan?: string;
}

export const socService = {
  getIncidents: async (params?: { 
    clientId?: number;
    severity?: string;
    status?: string;
    startDate?: string;
    endDate?: string;
  }): Promise<PaginatedResponse<SecurityIncident>> => {
    return apiClient.get(API_ENDPOINTS.SOC.INCIDENTS, { params });
  },

  getIncidentById: async (id: number): Promise<SecurityIncident> => {
    return apiClient.get(API_ENDPOINTS.SOC.INCIDENT_DETAIL(id));
  },

  createIncident: async (data: Partial<SecurityIncident>): Promise<SecurityIncident> => {
    return apiClient.post(API_ENDPOINTS.SOC.INCIDENTS, data);
  },

  updateIncident: async (id: number, data: Partial<SecurityIncident>): Promise<SecurityIncident> => {
    return apiClient.patch(API_ENDPOINTS.SOC.INCIDENT_DETAIL(id), data);
  },

  getAlerts: async (params?: { 
    clientId?: number;
    severity?: string;
    status?: string;
  }): Promise<PaginatedResponse<SecurityAlert>> => {
    return apiClient.get(API_ENDPOINTS.SOC.ALERTS, { params });
  },

  getVulnerabilities: async (params?: { 
    clientId?: number;
    severity?: string;
    status?: string;
  }): Promise<PaginatedResponse<Vulnerability>> => {
    return apiClient.get(API_ENDPOINTS.SOC.VULNERABILITIES, { params });
  },

  getDashboard: async (clientId?: number) => {
    return apiClient.get(API_ENDPOINTS.SOC.DASHBOARD, { 
      params: clientId ? { clientId } : undefined 
    });
  },

  getMetrics: async (params?: { 
    clientId?: number;
    startDate?: string;
    endDate?: string;
  }) => {
    return apiClient.get(API_ENDPOINTS.SOC.METRICS, { params });
  },
};
