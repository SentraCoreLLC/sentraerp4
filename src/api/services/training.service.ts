import { apiClient } from '../client';
import { API_ENDPOINTS } from '../endpoints';
import { PaginatedResponse } from '@/types/api.types';

export interface TrainingCourse {
  id: number;
  title: string;
  description?: string;
  category: 'cybersecurity' | 'ai_literacy' | 'compliance' | 'phishing' | 'human_firewall';
  duration: number; // minutes
  passingScore: number;
  certificateTemplate?: string;
  isActive: boolean;
  content?: string;
  version: string;
}

export interface TrainingAssignment {
  id: number;
  courseId: number;
  courseTitle: string;
  assigneeId: number;
  assigneeName: string;
  clientId?: number;
  dueDate: string;
  assignedDate: string;
  status: 'assigned' | 'in_progress' | 'completed' | 'failed' | 'expired';
  score?: number;
  completedDate?: string;
  attempts: number;
}

export interface PhishingCampaign {
  id: number;
  name: string;
  clientId?: number;
  clientName?: string;
  status: 'draft' | 'scheduled' | 'active' | 'completed';
  startDate: string;
  endDate?: string;
  targetCount: number;
  clickedCount: number;
  reportedCount: number;
  compromisedCount: number;
  successRate: number;
}

export interface Certificate {
  id: number;
  userId: number;
  userName: string;
  courseId: number;
  courseTitle: string;
  issueDate: string;
  expiryDate?: string;
  certificateNumber: string;
  score: number;
}

export const trainingService = {
  getCourses: async (params?: { 
    category?: string;
    isActive?: boolean;
  }): Promise<PaginatedResponse<TrainingCourse>> => {
    return apiClient.get(API_ENDPOINTS.TRAINING.COURSES, { params });
  },

  getCourseById: async (id: number): Promise<TrainingCourse> => {
    return apiClient.get(API_ENDPOINTS.TRAINING.COURSE_DETAIL(id));
  },

  createCourse: async (data: Partial<TrainingCourse>): Promise<TrainingCourse> => {
    return apiClient.post(API_ENDPOINTS.TRAINING.COURSES, data);
  },

  getAssignments: async (params?: { 
    userId?: number;
    clientId?: number;
    status?: string;
  }): Promise<PaginatedResponse<TrainingAssignment>> => {
    return apiClient.get(API_ENDPOINTS.TRAINING.ASSIGNMENTS, { params });
  },

  createAssignment: async (data: Partial<TrainingAssignment>): Promise<TrainingAssignment> => {
    return apiClient.post(API_ENDPOINTS.TRAINING.ASSIGNMENTS, data);
  },

  updateAssignment: async (id: number, data: Partial<TrainingAssignment>): Promise<TrainingAssignment> => {
    return apiClient.patch(API_ENDPOINTS.TRAINING.ASSIGNMENT_DETAIL(id), data);
  },

  getPhishingCampaigns: async (params?: { 
    clientId?: number;
    status?: string;
  }): Promise<PaginatedResponse<PhishingCampaign>> => {
    return apiClient.get(API_ENDPOINTS.TRAINING.PHISHING_CAMPAIGNS, { params });
  },

  getCampaignById: async (id: number): Promise<PhishingCampaign> => {
    return apiClient.get(API_ENDPOINTS.TRAINING.CAMPAIGN_DETAIL(id));
  },

  createCampaign: async (data: Partial<PhishingCampaign>): Promise<PhishingCampaign> => {
    return apiClient.post(API_ENDPOINTS.TRAINING.PHISHING_CAMPAIGNS, data);
  },

  getCertificates: async (params?: { 
    userId?: number;
    courseId?: number;
  }): Promise<PaginatedResponse<Certificate>> => {
    return apiClient.get(API_ENDPOINTS.TRAINING.CERTIFICATES, { params });
  },
};
