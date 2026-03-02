import { apiClient } from '../client';
import { API_ENDPOINTS } from '../endpoints';

export interface KPIMetric {
  id: string;
  name: string;
  value: number | string;
  change?: number;
  trend?: 'up' | 'down' | 'stable';
  unit?: string;
  category: string;
}

export interface ChartData {
  id: string;
  type: 'line' | 'bar' | 'pie' | 'area';
  title: string;
  data: any;
  xAxis?: string;
  yAxis?: string;
}

export interface AnalyticsFilter {
  dateRange?: {
    start: string;
    end: string;
  };
  department?: string;
  category?: string;
  metric?: string;
}

export const analyticsService = {
  getExecutiveDashboard: async (filters?: AnalyticsFilter) => {
    return apiClient.get(API_ENDPOINTS.ANALYTICS.EXECUTIVE, { params: filters });
  },

  getKPIMetrics: async (filters?: AnalyticsFilter): Promise<KPIMetric[]> => {
    return apiClient.get(API_ENDPOINTS.ANALYTICS.KPI, { params: filters });
  },

  getChartData: async (chartId: string, filters?: AnalyticsFilter): Promise<ChartData> => {
    return apiClient.get(`${API_ENDPOINTS.ANALYTICS.CHARTS}/${chartId}`, { 
      params: filters 
    });
  },

  getReports: async (filters?: AnalyticsFilter) => {
    return apiClient.get(API_ENDPOINTS.ANALYTICS.REPORTS, { params: filters });
  },

  exportReport: async (reportId: string, format: 'pdf' | 'xlsx' | 'csv') => {
    return apiClient.get(`${API_ENDPOINTS.ANALYTICS.REPORTS}/${reportId}/export`, {
      params: { format },
      responseType: 'blob',
    });
  },
};
