import { apiClient } from '../client';
import { API_ENDPOINTS } from '../endpoints';
import { PaginatedResponse } from '@/types/api.types';

export interface Employee {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  department: string;
  role: string;
  status: 'active' | 'on_leave' | 'inactive';
  hireDate: string;
  reportingTo?: number;
  phone?: string;
  location?: string;
}

export interface Department {
  id: number;
  name: string;
  headCount: number;
  managerId?: number;
}

export interface LeaveRequest {
  id: number;
  employeeId: number;
  employeeName: string;
  startDate: string;
  endDate: string;
  type: 'vacation' | 'sick' | 'personal' | 'other';
  status: 'pending' | 'approved' | 'rejected';
  reason?: string;
}

export const hcmService = {
  getEmployees: async (params?: { 
    page?: number; 
    search?: string;
    department?: string;
    status?: string;
  }): Promise<PaginatedResponse<Employee>> => {
    return apiClient.get(API_ENDPOINTS.HCM.EMPLOYEES, { params });
  },

  getEmployeeById: async (id: number): Promise<Employee> => {
    return apiClient.get(API_ENDPOINTS.HCM.EMPLOYEE_DETAIL(id));
  },

  createEmployee: async (data: Partial<Employee>): Promise<Employee> => {
    return apiClient.post(API_ENDPOINTS.HCM.EMPLOYEES, data);
  },

  updateEmployee: async (id: number, data: Partial<Employee>): Promise<Employee> => {
    return apiClient.patch(API_ENDPOINTS.HCM.EMPLOYEE_DETAIL(id), data);
  },

  getDepartments: async (): Promise<Department[]> => {
    return apiClient.get(API_ENDPOINTS.HCM.DEPARTMENTS);
  },

  getLeaveRequests: async (params?: { 
    status?: string;
    employeeId?: number;
  }): Promise<PaginatedResponse<LeaveRequest>> => {
    return apiClient.get(API_ENDPOINTS.HCM.LEAVE_REQUESTS, { params });
  },

  getDashboard: async () => {
    return apiClient.get(API_ENDPOINTS.HCM.DASHBOARD);
  },
};
