import { apiClient } from '../client';
import { API_ENDPOINTS } from '../endpoints';
import { PaginatedResponse } from '@/types/api.types';

export interface ComplianceFramework {
  id: number;
  name: string;
  version: string;
  description?: string;
  status: 'active' | 'deprecated' | 'draft';
  category: 'cybersecurity' | 'privacy' | 'financial' | 'industry' | 'other';
  controlCount: number;
  lastAssessed?: string;
  complianceScore?: number;
}

export interface Assessment {
  id: number;
  frameworkId: number;
  frameworkName: string;
  title: string;
  status: 'planned' | 'in_progress' | 'review' | 'completed';
  assessor: string;
  startDate: string;
  completionDate?: string;
  score?: number;
  findingsCount: number;
  criticalFindings: number;
}

export interface Risk {
  id: number;
  title: string;
  description?: string;
  category: 'strategic' | 'operational' | 'financial' | 'compliance' | 'reputational' | 'technology';
  severity: 'low' | 'medium' | 'high' | 'critical';
  likelihood: 'rare' | 'unlikely' | 'possible' | 'likely' | 'almost_certain';
  status: 'identified' | 'assessed' | 'mitigating' | 'monitoring' | 'closed';
  owner: string;
  identifiedDate: string;
  reviewDate?: string;
  mitigationPlan?: string;
  residualRisk?: 'low' | 'medium' | 'high' | 'critical';
}

export interface Policy {
  id: number;
  title: string;
  version: string;
  category: string;
  status: 'draft' | 'review' | 'approved' | 'archived';
  approvedDate?: string;
  reviewDate?: string;
  owner: string;
}

export interface Evidence {
  id: number;
  assessmentId?: number;
  title: string;
  type: 'document' | 'screenshot' | 'report' | 'other';
  uploadDate: string;
  uploadedBy: string;
  status: 'pending_review' | 'approved' | 'rejected';
}

export const complianceRiskService = {
  // Compliance Frameworks
  getFrameworks: async (params?: { 
    page?: number;
    category?: string;
    status?: string;
  }): Promise<PaginatedResponse<ComplianceFramework>> => {
    return apiClient.get(API_ENDPOINTS.COMPLIANCE_RISK.FRAMEWORKS, { params });
  },

  getFrameworkById: async (id: number): Promise<ComplianceFramework> => {
    return apiClient.get(API_ENDPOINTS.COMPLIANCE_RISK.FRAMEWORK_DETAIL(id));
  },

  // Assessments
  getAssessments: async (params?: { 
    frameworkId?: number;
    status?: string;
  }): Promise<PaginatedResponse<Assessment>> => {
    return apiClient.get(API_ENDPOINTS.COMPLIANCE_RISK.ASSESSMENTS, { params });
  },

  getAssessmentById: async (id: number): Promise<Assessment> => {
    return apiClient.get(API_ENDPOINTS.COMPLIANCE_RISK.ASSESSMENT_DETAIL(id));
  },

  createAssessment: async (data: Partial<Assessment>): Promise<Assessment> => {
    return apiClient.post(API_ENDPOINTS.COMPLIANCE_RISK.ASSESSMENTS, data);
  },

  // Risk Register
  getRisks: async (params?: { 
    category?: string;
    severity?: string;
    status?: string;
  }): Promise<PaginatedResponse<Risk>> => {
    return apiClient.get(API_ENDPOINTS.COMPLIANCE_RISK.RISK_REGISTER, { params });
  },

  getRiskById: async (id: number): Promise<Risk> => {
    return apiClient.get(API_ENDPOINTS.COMPLIANCE_RISK.RISK_DETAIL(id));
  },

  createRisk: async (data: Partial<Risk>): Promise<Risk> => {
    return apiClient.post(API_ENDPOINTS.COMPLIANCE_RISK.RISK_REGISTER, data);
  },

  updateRisk: async (id: number, data: Partial<Risk>): Promise<Risk> => {
    return apiClient.patch(API_ENDPOINTS.COMPLIANCE_RISK.RISK_DETAIL(id), data);
  },

  // Policies
  getPolicies: async (params?: { 
    category?: string;
    status?: string;
  }): Promise<PaginatedResponse<Policy>> => {
    return apiClient.get(API_ENDPOINTS.COMPLIANCE_RISK.POLICIES, { params });
  },

  // Evidence
  getEvidence: async (params?: { 
    assessmentId?: number;
    status?: string;
  }): Promise<PaginatedResponse<Evidence>> => {
    return apiClient.get(API_ENDPOINTS.COMPLIANCE_RISK.EVIDENCE, { params });
  },

  uploadEvidence: async (data: FormData): Promise<Evidence> => {
    return apiClient.post(API_ENDPOINTS.COMPLIANCE_RISK.EVIDENCE, data, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  },

  // Dashboard
  getDashboard: async () => {
    return apiClient.get(API_ENDPOINTS.COMPLIANCE_RISK.DASHBOARD);
  },
};
