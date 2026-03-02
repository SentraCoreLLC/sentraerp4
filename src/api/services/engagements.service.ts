import { apiClient } from '../client';
import { API_ENDPOINTS } from '../endpoints';
import { PaginatedResponse } from '@/types/api.types';

export interface Engagement {
  id: number;
  clientId: number;
  clientName: string;
  title: string;
  type: 'assessment' | 'audit' | 'consulting' | 'training' | 'managed_service';
  status: 'planning' | 'active' | 'on_hold' | 'completed' | 'cancelled';
  startDate: string;
  endDate?: string;
  lead: string;
  leadId: number;
  scope?: string;
  deliverables: string[];
  hoursEstimated?: number;
  hoursActual?: number;
}

export interface ServiceTicket {
  id: number;
  clientId: number;
  clientName: string;
  engagementId?: number;
  title: string;
  description: string;
  type: 'incident' | 'service_request' | 'change_request' | 'question';
  priority: 'low' | 'medium' | 'high' | 'critical';
  status: 'open' | 'in_progress' | 'pending_client' | 'resolved' | 'closed';
  assignedTo?: string;
  createdDate: string;
  resolvedDate?: string;
  slaDeadline?: string;
}

export interface TimeEntry {
  id: number;
  engagementId: number;
  userId: number;
  userName: string;
  date: string;
  hours: number;
  description: string;
  billable: boolean;
  approved: boolean;
}

export const engagementsService = {
  getEngagements: async (params?: { 
    clientId?: number;
    status?: string;
    type?: string;
  }): Promise<PaginatedResponse<Engagement>> => {
    return apiClient.get(API_ENDPOINTS.ENGAGEMENTS.LIST, { params });
  },

  getEngagementById: async (id: number): Promise<Engagement> => {
    return apiClient.get(API_ENDPOINTS.ENGAGEMENTS.DETAIL(id));
  },

  createEngagement: async (data: Partial<Engagement>): Promise<Engagement> => {
    return apiClient.post(API_ENDPOINTS.ENGAGEMENTS.LIST, data);
  },

  updateEngagement: async (id: number, data: Partial<Engagement>): Promise<Engagement> => {
    return apiClient.patch(API_ENDPOINTS.ENGAGEMENTS.DETAIL(id), data);
  },

  getTickets: async (params?: { 
    clientId?: number;
    status?: string;
    priority?: string;
  }): Promise<PaginatedResponse<ServiceTicket>> => {
    return apiClient.get(API_ENDPOINTS.ENGAGEMENTS.TICKETS, { params });
  },

  getTicketById: async (id: number): Promise<ServiceTicket> => {
    return apiClient.get(API_ENDPOINTS.ENGAGEMENTS.TICKET_DETAIL(id));
  },

  createTicket: async (data: Partial<ServiceTicket>): Promise<ServiceTicket> => {
    return apiClient.post(API_ENDPOINTS.ENGAGEMENTS.TICKETS, data);
  },

  updateTicket: async (id: number, data: Partial<ServiceTicket>): Promise<ServiceTicket> => {
    return apiClient.patch(API_ENDPOINTS.ENGAGEMENTS.TICKET_DETAIL(id), data);
  },

  getTimeEntries: async (params?: { 
    engagementId?: number;
    userId?: number;
    startDate?: string;
    endDate?: string;
  }): Promise<PaginatedResponse<TimeEntry>> => {
    return apiClient.get(API_ENDPOINTS.ENGAGEMENTS.TIME_ENTRIES, { params });
  },

  logTime: async (data: Partial<TimeEntry>): Promise<TimeEntry> => {
    return apiClient.post(API_ENDPOINTS.ENGAGEMENTS.TIME_ENTRIES, data);
  },
};
