# SentraERP Module Documentation

## New Modules Overview

This document provides detailed information about the four new enterprise modules added to SentraERP.

---

## 1. Human Capital Management (HCM)

**Path**: `/hcm`  
**Access Roles**: `ADMIN`, `HR`

### Purpose
Manage employees, departments, organizational structure, and workforce operations.

### Features

#### Employee Management (`/hcm/employees`)
- **Employee List View**: Searchable, filterable table of all employees
- **Filters**: Status (Active, On Leave, Inactive), Department
- **Employee Profile** (`/hcm/employees/:id`): Detailed employee information
  - Personal details and contact information
  - Employment details (hire date, department, role)
  - Reporting structure
  - Activity history

#### Core Data Structures
```typescript
Employee {
  id, firstName, lastName, email, phone
  department, role, status, hireDate
  reportingTo, location
}
```

### API Endpoints
- `GET /api/hcm/employees` - List employees
- `GET /api/hcm/employees/:id` - Employee details
- `POST /api/hcm/employees` - Create employee
- `PATCH /api/hcm/employees/:id` - Update employee
- `GET /api/hcm/departments` - List departments
- `GET /api/hcm/leave-requests` - Leave requests

---

## 2. Project Management

**Path**: `/projects`  
**Access Roles**: `ADMIN`, `OPERATIONS`, `PROJECT_MANAGER`

### Purpose
Plan, track, and deliver projects with task management and milestone tracking.

### Features

#### Project Portfolio (`/projects/list`)
- **Project List**: Table view with filters
- **Filters**: Status, Priority, Search
- **Columns**: Name, Owner, Status, Priority, Progress, Timeline
- **Progress Indicators**: Visual progress bars for each project

#### Project Detail View (`/projects/:id`)
- Project overview and metadata
- Tasks and milestones
- Team members
- Timeline and deliverables

#### Core Data Structures
```typescript
Project {
  id, name, description, status, priority
  startDate, endDate, budget, owner
  progress, teamSize
}

Task {
  id, projectId, title, status, priority
  assigneeId, dueDate, estimatedHours
}

Milestone {
  id, projectId, name, dueDate
  status, completionPercentage
}
```

### Status Values
- **Project**: planning, active, on_hold, completed, cancelled
- **Task**: todo, in_progress, review, completed, blocked
- **Priority**: low, medium, high, critical

### API Endpoints
- `GET /api/projects` - List projects
- `GET /api/projects/:id` - Project details
- `POST /api/projects` - Create project
- `PATCH /api/projects/:id` - Update project
- `GET /api/projects/tasks` - List tasks
- `GET /api/projects/milestones` - List milestones

---

## 3. Analytics & Business Intelligence

**Path**: `/analytics`  
**Access Roles**: `ADMIN`, `ANALYST`

### Purpose
Executive dashboard with KPI metrics, charts, and business intelligence insights.

### Features

#### Executive Dashboard
- **KPI Cards**: Real-time key performance indicators
- **Chart Placeholders**: Line, Bar, Pie chart areas ready for data visualization
- **Date Range Filters**: 7 days, 30 days, 90 days, YTD
- **Export Functionality**: Download reports in PDF, XLSX, CSV

#### Key Metrics Displayed
- Total Revenue with trend
- Project Completion Rate
- Employee Satisfaction
- Compliance Score

#### Chart Types Supported
- **Line Charts**: Revenue trends, time-series data
- **Pie Charts**: Department distribution, category breakdown
- **Bar Charts**: Project performance comparison, metrics by category

### Core Data Structures
```typescript
KPIMetric {
  id, name, value, change, trend
  unit, category
}

ChartData {
  id, type, title, data
  xAxis, yAxis
}
```

### API Endpoints
- `GET /api/analytics/executive` - Executive dashboard data
- `GET /api/analytics/kpi` - KPI metrics
- `GET /api/analytics/charts/:id` - Chart data
- `GET /api/analytics/reports/:id/export` - Export report

---

## 4. Compliance, Risk & Trust

**Path**: `/compliance-risk`  
**Access Roles**: `ADMIN`, `COMPLIANCE`

### Purpose
Enterprise-grade compliance management, risk assessment, and audit tracking for cybersecurity and regulatory requirements.

### Features

#### Compliance Frameworks (`/compliance-risk/frameworks`)
- Framework catalog (NIST, ISO 27001, GDPR, SOC 2, etc.)
- Compliance status tracking
- Control mapping and assessment

#### Risk Register (`/compliance-risk/risk-register`)
- **Risk Identification**: Comprehensive risk catalog
- **Risk Assessment**: Severity and likelihood matrix
- **Filters**: Category, Severity, Status
- **Risk Tracking**: From identification through mitigation
- **Columns**: Title, Category, Severity, Likelihood, Status, Owner, Dates

#### Assessments & Audits (`/compliance-risk/assessments`)
- Assessment scheduling and tracking
- Finding management
- Evidence collection
- Assessment scoring

#### Policies & Evidence (`/compliance-risk/policies`)
- Policy document management
- Version control
- Evidence repository
- Document approval workflow

### Core Data Structures
```typescript
ComplianceFramework {
  id, name, version, status, category
  controlCount, lastAssessed, complianceScore
}

Risk {
  id, title, category, severity, likelihood
  status, owner, identifiedDate
  mitigationPlan, residualRisk
}

Assessment {
  id, frameworkId, title, status
  assessor, startDate, completionDate
  score, findingsCount
}
```

### Risk Categories
- strategic, operational, financial, compliance, reputational, technology

### Severity Levels
- low, medium, high, critical

### Likelihood Levels
- rare, unlikely, possible, likely, almost_certain

### API Endpoints
- `GET /api/compliance-risk/frameworks` - List frameworks
- `GET /api/compliance-risk/frameworks/:id` - Framework details
- `GET /api/compliance-risk/assessments` - List assessments
- `GET /api/compliance-risk/risk-register` - Risk register
- `GET /api/compliance-risk/risk-register/:id` - Risk details
- `POST /api/compliance-risk/risk-register` - Create risk
- `PATCH /api/compliance-risk/risk-register/:id` - Update risk
- `GET /api/compliance-risk/policies` - List policies
- `GET /api/compliance-risk/evidence` - List evidence
- `POST /api/compliance-risk/evidence` - Upload evidence

---

## Access Control Matrix

| Module | Admin | Finance | HR | Operations | Compliance | Project Manager | Analyst |
|--------|-------|---------|----|-----------|-----------| --------------- |---------|
| Dashboard | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| Finance | ✓ | ✓ | - | - | - | - | - |
| Operations | ✓ | - | - | ✓ | - | - | - |
| HCM | ✓ | - | ✓ | - | - | - | - |
| Projects | ✓ | - | - | ✓ | - | ✓ | - |
| Analytics | ✓ | - | - | - | - | - | ✓ |
| Compliance & Risk | ✓ | - | - | - | ✓ | - | - |
| Users | ✓ | - | - | - | - | - | - |

---

## Development Notes

### Module Structure
Each module follows this structure:
```
features/[module-name]/
├── [ModuleName]Module.tsx       # Landing page
├── pages/                        # Sub-pages
│   ├── [Feature]List.tsx
│   └── [Feature]Detail.tsx
└── components/                   # Reusable components
    └── [SharedComponent].tsx
```

### API Integration
- All API services are located in `/src/api/services/`
- Services use the centralized API client with automatic token refresh
- No mock data logic in services - only API call definitions

### Routing Pattern
- Module landing: `/[module]`
- List views: `/[module]/[feature-plural]`
- Detail views: `/[module]/[feature-plural]/:id`
- Action pages: `/[module]/[feature-plural]/new`

### UI/UX Standards
- Consistent card-based layouts
- Table views with search and filters
- Status chips with color coding
- Breadcrumb navigation (to be implemented)
- Loading states (to be implemented)
- Error boundaries already in place

---

## Next Steps for Backend Integration

1. **Implement Django REST endpoints** matching the API service definitions
2. **Set up Django models** for each module's data structures
3. **Configure permissions** based on user roles
4. **Add pagination** to all list endpoints
5. **Implement filtering** on backend for search/filter functionality
6. **Add validation** for all POST/PATCH requests
7. **Set up audit logging** for compliance-critical operations

---

## Testing Recommendations

### Manual Testing
- Test role-based access for each module
- Verify navigation between list and detail views
- Test filters and search functionality
- Validate responsive design on mobile/tablet

### Automated Testing (Future)
- Unit tests for API services
- Integration tests for routing
- E2E tests for critical workflows
- Component tests for reusable components

---

## Performance Considerations

- Implement pagination for large datasets
- Add debouncing to search inputs
- Lazy load module components
- Optimize table rendering for 100+ rows
- Consider virtual scrolling for very large lists

---

## Security Notes

- All routes are protected by authentication
- Role-based access control enforced at routing level
- Backend MUST validate all permissions
- Frontend role checks are UI-only - never trust frontend for security
- Sensitive data should be filtered on backend before sending to frontend
