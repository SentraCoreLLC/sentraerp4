import { createBrowserRouter, Navigate } from 'react-router-dom';
import { MainLayout } from '@/components/layout/MainLayout';
import { ProtectedRoute } from '@/components/common/ProtectedRoute';
import { RouteErrorBoundary } from '@/components/common/RouteErrorBoundary';
import { NotFound } from '@/components/common/NotFound';
import { Login } from '@/features/auth/Login';
import { Dashboard } from '@/features/dashboard/Dashboard';
import { FinanceModule } from '@/features/finance/FinanceModule';
import { InvoiceList } from '@/features/finance/pages/InvoiceList';
import { OperationsModule } from '@/features/operations/OperationsModule';
import { ComplianceModule } from '@/features/compliance/ComplianceModule';
import { UserManagement } from '@/features/users/UserManagement';
import { HCMModule } from '@/features/hcm/HCMModule';
import { EmployeeList } from '@/features/hcm/pages/EmployeeList';
import { EmployeeDetail } from '@/features/hcm/pages/EmployeeDetail';
import { ProjectsModule } from '@/features/projects/ProjectsModule';
import { ProjectList } from '@/features/projects/pages/ProjectList';
import { ProjectDetail } from '@/features/projects/pages/ProjectDetail';
import { AnalyticsDashboard } from '@/features/analytics/AnalyticsDashboard';
import { ComplianceRiskModule } from '@/features/compliance-risk/ComplianceRiskModule';
import { RiskRegister } from '@/features/compliance-risk/pages/RiskRegister';
import { FrameworkList } from '@/features/compliance-risk/pages/FrameworkList';
import { ClientsModule } from '@/features/clients/ClientsModule';
import { ClientList } from '@/features/clients/pages/ClientList';
import { ClientDetail } from '@/features/clients/pages/ClientDetail';
import { SOCDashboard } from '@/features/soc/SOCDashboard';
import { IncidentDetail } from '@/features/soc/pages/IncidentDetail';
import { TrainingModule } from '@/features/training/TrainingModule';
import { CourseList } from '@/features/training/pages/CourseList';
import { PhishingCampaigns } from '@/features/training/pages/PhishingCampaigns';
import { EngagementsModule } from '@/features/engagements/EngagementsModule';
import { EngagementList } from '@/features/engagements/pages/EngagementList';
import { ServiceTickets } from '@/features/engagements/pages/ServiceTickets';
import { UserRole } from '@/types/auth.types';

export const router = createBrowserRouter([
  {
    path: '/login',
    element: <Login />,
    errorElement: <RouteErrorBoundary />,
  },
  {
    path: '/',
    element: (
      <ProtectedRoute>
        <MainLayout />
      </ProtectedRoute>
    ),
    errorElement: <RouteErrorBoundary />,
    children: [
      {
        index: true,
        element: <Navigate to="/dashboard" replace />,
      },
      {
        path: 'dashboard',
        element: <Dashboard />,
        errorElement: <RouteErrorBoundary />,
      },
      // Client Management Routes
      {
        path: 'clients',
        errorElement: <RouteErrorBoundary />,
        children: [
          {
            index: true,
            element: (
              <ProtectedRoute allowedRoles={[UserRole.ADMIN, UserRole.ACCOUNT_MANAGER, UserRole.CONSULTANT]}>
                <ClientsModule />
              </ProtectedRoute>
            ),
          },
          {
            path: 'list',
            element: (
              <ProtectedRoute allowedRoles={[UserRole.ADMIN, UserRole.ACCOUNT_MANAGER, UserRole.CONSULTANT]}>
                <ClientList />
              </ProtectedRoute>
            ),
          },
          {
            path: ':id',
            element: (
              <ProtectedRoute allowedRoles={[UserRole.ADMIN, UserRole.ACCOUNT_MANAGER, UserRole.CONSULTANT]}>
                <ClientDetail />
              </ProtectedRoute>
            ),
          },
        ],
      },
      // SOC Routes
      {
        path: 'soc',
        errorElement: <RouteErrorBoundary />,
        children: [
          {
            index: true,
            element: (
              <ProtectedRoute allowedRoles={[UserRole.ADMIN, UserRole.SOC_ANALYST, UserRole.COMPLIANCE]}>
                <SOCDashboard />
              </ProtectedRoute>
            ),
          },
          {
            path: 'incidents/:id',
            element: (
              <ProtectedRoute allowedRoles={[UserRole.ADMIN, UserRole.SOC_ANALYST, UserRole.COMPLIANCE]}>
                <IncidentDetail />
              </ProtectedRoute>
            ),
          },
        ],
      },
      // Engagement Routes
      {
        path: 'engagements',
        errorElement: <RouteErrorBoundary />,
        children: [
          {
            index: true,
            element: (
              <ProtectedRoute allowedRoles={[UserRole.ADMIN, UserRole.CONSULTANT, UserRole.ACCOUNT_MANAGER]}>
                <EngagementsModule />
              </ProtectedRoute>
            ),
          },
          {
            path: 'list',
            element: (
              <ProtectedRoute allowedRoles={[UserRole.ADMIN, UserRole.CONSULTANT, UserRole.ACCOUNT_MANAGER]}>
                <EngagementList />
              </ProtectedRoute>
            ),
          },
          {
            path: 'tickets',
            element: (
              <ProtectedRoute allowedRoles={[UserRole.ADMIN, UserRole.CONSULTANT, UserRole.ACCOUNT_MANAGER]}>
                <ServiceTickets />
              </ProtectedRoute>
            ),
          },
        ],
      },
      // Training Routes
      {
        path: 'training',
        errorElement: <RouteErrorBoundary />,
        children: [
          {
            index: true,
            element: (
              <ProtectedRoute allowedRoles={[UserRole.ADMIN, UserRole.TRAINER, UserRole.HR]}>
                <TrainingModule />
              </ProtectedRoute>
            ),
          },
          {
            path: 'courses',
            element: (
              <ProtectedRoute allowedRoles={[UserRole.ADMIN, UserRole.TRAINER, UserRole.HR]}>
                <CourseList />
              </ProtectedRoute>
            ),
          },
          {
            path: 'phishing',
            element: (
              <ProtectedRoute allowedRoles={[UserRole.ADMIN, UserRole.TRAINER, UserRole.HR]}>
                <PhishingCampaigns />
              </ProtectedRoute>
            ),
          },
        ],
      },
      // Finance Routes
      {
        path: 'finance',
        errorElement: <RouteErrorBoundary />,
        children: [
          {
            index: true,
            element: (
              <ProtectedRoute allowedRoles={[UserRole.ADMIN, UserRole.FINANCE]}>
                <FinanceModule />
              </ProtectedRoute>
            ),
          },
          {
            path: 'invoices',
            element: (
              <ProtectedRoute allowedRoles={[UserRole.ADMIN, UserRole.FINANCE]}>
                <InvoiceList />
              </ProtectedRoute>
            ),
          },
        ],
      },
      {
        path: 'operations',
        element: (
          <ProtectedRoute allowedRoles={[UserRole.ADMIN, UserRole.OPERATIONS]}>
            <OperationsModule />
          </ProtectedRoute>
        ),
        errorElement: <RouteErrorBoundary />,
      },
      {
        path: 'compliance',
        element: (
          <ProtectedRoute allowedRoles={[UserRole.ADMIN, UserRole.COMPLIANCE]}>
            <ComplianceModule />
          </ProtectedRoute>
        ),
        errorElement: <RouteErrorBoundary />,
      },
      {
        path: 'users',
        element: (
          <ProtectedRoute allowedRoles={[UserRole.ADMIN]}>
            <UserManagement />
          </ProtectedRoute>
        ),
        errorElement: <RouteErrorBoundary />,
      },
      // HCM Routes
      {
        path: 'hcm',
        errorElement: <RouteErrorBoundary />,
        children: [
          {
            index: true,
            element: (
              <ProtectedRoute allowedRoles={[UserRole.ADMIN, UserRole.HR]}>
                <HCMModule />
              </ProtectedRoute>
            ),
          },
          {
            path: 'employees',
            element: (
              <ProtectedRoute allowedRoles={[UserRole.ADMIN, UserRole.HR]}>
                <EmployeeList />
              </ProtectedRoute>
            ),
          },
          {
            path: 'employees/:id',
            element: (
              <ProtectedRoute allowedRoles={[UserRole.ADMIN, UserRole.HR]}>
                <EmployeeDetail />
              </ProtectedRoute>
            ),
          },
        ],
      },
      // Project Management Routes
      {
        path: 'projects',
        errorElement: <RouteErrorBoundary />,
        children: [
          {
            index: true,
            element: (
              <ProtectedRoute allowedRoles={[UserRole.ADMIN, UserRole.OPERATIONS, UserRole.PROJECT_MANAGER]}>
                <ProjectsModule />
              </ProtectedRoute>
            ),
          },
          {
            path: 'list',
            element: (
              <ProtectedRoute allowedRoles={[UserRole.ADMIN, UserRole.OPERATIONS, UserRole.PROJECT_MANAGER]}>
                <ProjectList />
              </ProtectedRoute>
            ),
          },
          {
            path: ':id',
            element: (
              <ProtectedRoute allowedRoles={[UserRole.ADMIN, UserRole.OPERATIONS, UserRole.PROJECT_MANAGER]}>
                <ProjectDetail />
              </ProtectedRoute>
            ),
          },
        ],
      },
      // Analytics Routes
      {
        path: 'analytics',
        element: (
          <ProtectedRoute allowedRoles={[UserRole.ADMIN, UserRole.ANALYST]}>
            <AnalyticsDashboard />
          </ProtectedRoute>
        ),
        errorElement: <RouteErrorBoundary />,
      },
      // Compliance & Risk Routes
      {
        path: 'compliance-risk',
        errorElement: <RouteErrorBoundary />,
        children: [
          {
            index: true,
            element: (
              <ProtectedRoute allowedRoles={[UserRole.ADMIN, UserRole.COMPLIANCE]}>
                <ComplianceRiskModule />
              </ProtectedRoute>
            ),
          },
          {
            path: 'frameworks',
            element: (
              <ProtectedRoute allowedRoles={[UserRole.ADMIN, UserRole.COMPLIANCE]}>
                <FrameworkList />
              </ProtectedRoute>
            ),
          },
          {
            path: 'risk-register',
            element: (
              <ProtectedRoute allowedRoles={[UserRole.ADMIN, UserRole.COMPLIANCE]}>
                <RiskRegister />
              </ProtectedRoute>
            ),
          },
        ],
      },
      // Catch-all 404 route
      {
        path: '*',
        element: <NotFound />,
      },
    ],
  },
  // Top-level catch-all for completely invalid routes
  {
    path: '*',
    element: <NotFound />,
  },
]);
