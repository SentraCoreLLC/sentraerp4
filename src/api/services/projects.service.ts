import { apiClient } from '../client';
import { API_ENDPOINTS } from '../endpoints';
import { PaginatedResponse } from '@/types/api.types';

export interface Project {
  id: number;
  name: string;
  description?: string;
  status: 'planning' | 'active' | 'on_hold' | 'completed' | 'cancelled';
  priority: 'low' | 'medium' | 'high' | 'critical';
  startDate: string;
  endDate?: string;
  budget?: number;
  owner: string;
  ownerId: number;
  teamSize: number;
  progress: number;
  clientName?: string;
}

export interface Task {
  id: number;
  projectId: number;
  projectName: string;
  title: string;
  description?: string;
  status: 'todo' | 'in_progress' | 'review' | 'completed' | 'blocked';
  priority: 'low' | 'medium' | 'high' | 'critical';
  assigneeId?: number;
  assigneeName?: string;
  dueDate?: string;
  estimatedHours?: number;
  actualHours?: number;
}

export interface Milestone {
  id: number;
  projectId: number;
  name: string;
  description?: string;
  dueDate: string;
  status: 'pending' | 'in_progress' | 'completed' | 'delayed';
  completionPercentage: number;
}

export const projectsService = {
  getProjects: async (params?: { 
    page?: number; 
    search?: string;
    status?: string;
    priority?: string;
  }): Promise<PaginatedResponse<Project>> => {
    return apiClient.get(API_ENDPOINTS.PROJECTS.LIST, { params });
  },

  getProjectById: async (id: number): Promise<Project> => {
    return apiClient.get(API_ENDPOINTS.PROJECTS.DETAIL(id));
  },

  createProject: async (data: Partial<Project>): Promise<Project> => {
    return apiClient.post(API_ENDPOINTS.PROJECTS.LIST, data);
  },

  updateProject: async (id: number, data: Partial<Project>): Promise<Project> => {
    return apiClient.patch(API_ENDPOINTS.PROJECTS.DETAIL(id), data);
  },

  getTasks: async (params?: { 
    projectId?: number;
    status?: string;
    assigneeId?: number;
  }): Promise<PaginatedResponse<Task>> => {
    return apiClient.get(API_ENDPOINTS.PROJECTS.TASKS, { params });
  },

  getTaskById: async (id: number): Promise<Task> => {
    return apiClient.get(API_ENDPOINTS.PROJECTS.TASK_DETAIL(id));
  },

  createTask: async (data: Partial<Task>): Promise<Task> => {
    return apiClient.post(API_ENDPOINTS.PROJECTS.TASKS, data);
  },

  updateTask: async (id: number, data: Partial<Task>): Promise<Task> => {
    return apiClient.patch(API_ENDPOINTS.PROJECTS.TASK_DETAIL(id), data);
  },

  getMilestones: async (projectId?: number): Promise<Milestone[]> => {
    return apiClient.get(API_ENDPOINTS.PROJECTS.MILESTONES, { 
      params: { projectId } 
    });
  },

  getDashboard: async () => {
    return apiClient.get(API_ENDPOINTS.PROJECTS.DASHBOARD);
  },
};
