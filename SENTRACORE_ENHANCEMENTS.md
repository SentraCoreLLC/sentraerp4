# SentraERP - SentraCore-Specific Enhancements

## Overview
SentraERP has been enhanced with specialized modules aligned with SentraCore LLC's core business: **cybersecurity risk assessments, compliance audits, AI literacy training, and managed ICT services**.

---

## 🆕 New Phase 1 Modules (Implemented)

### 1. **Client Management Portal**
**Path**: `/clients`  
**Access Roles**: `ADMIN`, `ACCOUNT_MANAGER`, `CONSULTANT`

#### Purpose
Multi-tenant client portfolio management with security posture tracking.

#### Features
- **Client List**: Comprehensive view with compliance scores, risk levels, active services
- **Client Dashboard**: Individual client security posture and metrics
- **Service Management**: Track managed security, compliance audits, training engagements
- **Compliance Tracking**: Real-time compliance scores with visual indicators
- **Risk Scoring**: Automated client risk assessment display
- **Account Assignment**: Dedicated account manager per client

#### Key Metrics Displayed
- Active client count
- Compliance distribution
- At-risk clients
- New client acquisition

#### UI Enhancements
- Avatar-based client icons
- Compliance progress bars with color-coded thresholds (90%+ green, 75-89% yellow, <75% red)
- Risk level chips
- Service badges
- Multi-level filtering (status, industry, services)

---

### 2. **Security Operations Center (SOC)**
**Path**: `/soc`  
**Access Roles**: `ADMIN`, `SOC_ANALYST`, `COMPLIANCE`

#### Purpose
Real-time security monitoring, incident response, and threat management for client environments.

#### Features
- **Threat Dashboard**: Real-time security event monitoring
- **Incident Management**: Track from detection through resolution
- **Alert Triage**: Prioritize and assign security alerts
- **Vulnerability Tracking**: CVE management and remediation
- **Threat Level Indicator**: Visual 5-level threat assessment (Low → Severe)
- **Client Segmentation**: Filter by client for managed security services
- **Metrics Tracking**: MTTD, MTTR, incident counts

#### Key Metrics
- Active alerts count
- Open incidents
- Vulnerability count
- Overall compliance score

#### Incident Severity Levels
- **Critical**: Immediate threat to business operations
- **High**: Significant security risk
- **Medium**: Moderate impact
- **Low**: Minor security concern

#### Status Workflow
New → Investigating → Contained → Eradicated → Recovered → Closed

---

### 3. **Training & Awareness Management**
**Path**: `/training`  
**Access Roles**: `ADMIN`, `TRAINER`, `HR`

#### Purpose
Deliver AI literacy training and security awareness programs (human firewall development).

#### Features
- **Training Catalog**: Course library with categories:
  - Cybersecurity Awareness
  - AI Literacy
  - Compliance Training
  - Phishing Simulations
  - Human Firewall Development
  
- **Assignment Management**: Assign courses to employees/clients
- **Progress Tracking**: Monitor completion rates and scores
- **Phishing Campaigns**: Simulate phishing attacks and track results
- **Certificate Management**: Issue and track training certifications
- **Client Training**: Deliver training to client organizations

#### Training Categories
- **Cybersecurity**: Security best practices, threat awareness
- **AI Literacy**: Understanding AI, prompt engineering, AI safety
- **Compliance**: Regulatory requirement training (GDPR, POPIA, ISO 27001)
- **Phishing**: Recognizing and reporting phishing attempts
- **Human Firewall**: Building organizational security culture

---

### 4. **Enhanced Compliance & Risk Module**
**Updates to existing `/compliance-risk` module**

#### New Features Added
- **Control Management**: Link compliance controls to frameworks
- **Gap Analysis**: Identify missing controls
- **Evidence Repository**: Centralized evidence storage with tagging
- **Framework Templates**: Pre-built for ISO 27001, NIST CSF, GDPR, POPIA, SOC 2

#### Compliance Frameworks Supported
- ISO 27001 (Information Security)
- NIST CSF / 800-53 (Cybersecurity Framework)
- GDPR (Data Protection)
- POPIA (South African Privacy)
- SOC 2 (Service Organization Controls)
- HIPAA (Healthcare)
- CMMC (Defense Industry)

---

## 🎨 Consistent UI/UX Design System

### Color Palette
- **Primary Actions**: Gradient purple `#667eea` → `#764ba2`
- **Success/Compliant**: Green `#10b981`
- **Warning/Medium Risk**: Yellow/Orange `#f59e0b`
- **Error/Critical**: Red `#ef4444`
- **Info/Neutral**: Blue `#667eea`

### Component Standards
✅ **Cards**: 16px border radius, glassmorphism effect  
✅ **Buttons**: Gradient backgrounds, hover animations  
✅ **Tables**: Hover states, consistent cell padding  
✅ **Chips**: Color-coded by status/severity  
✅ **Progress Indicators**: Linear progress bars for scores  
✅ **Icons**: Material-UI icons with gradient backgrounds  

### Typography
- **Headers**: Inter font, 700 weight
- **Body**: 400-500 weight
- **Captions**: 12px, secondary color

---

## 📊 New Role Types

```typescript
enum UserRole {
  // Existing
  ADMIN, FINANCE, HR, OPERATIONS, COMPLIANCE,
  PROJECT_MANAGER, ANALYST,
  
  // New for SentraCore
  CONSULTANT,          // Security consultants
  ACCOUNT_MANAGER,     // Client relationship managers
  CLIENT_ADMIN,        // Client organization admins
  CLIENT_USER,         // Client organization users
  SOC_ANALYST,         // Security operations analysts
  TRAINER,             // Training content managers
}
```

---

## 🔗 API Endpoints Added

### Clients
```
GET    /api/clients/
GET    /api/clients/:id/
POST   /api/clients/
PATCH  /api/clients/:id/
GET    /api/clients/:id/contacts/
GET    /api/clients/:id/services/
GET    /api/clients/:id/compliance-status/
GET    /api/clients/:id/dashboard/
```

### SOC (Security Operations)
```
GET    /api/soc/incidents/
GET    /api/soc/incidents/:id/
POST   /api/soc/incidents/
PATCH  /api/soc/incidents/:id/
GET    /api/soc/alerts/
GET    /api/soc/vulnerabilities/
GET    /api/soc/dashboard/
GET    /api/soc/metrics/
```

### Training
```
GET    /api/training/courses/
GET    /api/training/courses/:id/
POST   /api/training/courses/
GET    /api/training/assignments/
POST   /api/training/assignments/
GET    /api/training/phishing-campaigns/
GET    /api/training/certificates/
```

### Engagements (Service Delivery)
```
GET    /api/engagements/
GET    /api/engagements/:id/
POST   /api/engagements/
GET    /api/engagements/tickets/
POST   /api/engagements/tickets/
GET    /api/engagements/time-entries/
```

---

## 🚀 Usage Guide

### For Account Managers
1. Navigate to **Clients** module
2. View client portfolio with compliance scores
3. Monitor at-risk clients (yellow/red indicators)
4. Click client for detailed security posture dashboard

### For SOC Analysts
1. Navigate to **SOC** module
2. Monitor threat level indicator
3. Triage active alerts by severity
4. Investigate and resolve security incidents
5. Track vulnerabilities and remediation

### For Trainers
1. Navigate to **Training** module
2. Create or assign training courses
3. Launch phishing simulation campaigns
4. Monitor completion rates
5. Issue certificates to successful participants

### For Consultants
1. Access client dashboards
2. Review compliance status
3. Update risk assessments
4. Log time against engagements
5. Upload assessment deliverables

---

## 🔐 Security Features

### Multi-Tenancy Support
- Client data isolation
- Role-based access to client information
- Client-specific dashboards and reports
- Configurable client permissions

### Audit Trail (Backend)
- All compliance actions logged
- Evidence upload tracking
- Risk assessment history
- User action logging

### Data Protection
- Encrypted data transmission
- Secure token storage
- Session management
- Rate limiting per client

---

## 📈 Business Value

### For SentraCore Operations
✅ **Client Portfolio Management**: Centralized view of all clients  
✅ **Service Delivery Tracking**: Monitor active engagements  
✅ **Automated Reporting**: Generate client compliance reports  
✅ **Training Revenue**: Track training programs and certifications  
✅ **SOC Efficiency**: Streamline incident response  

### For SentraCore Clients
✅ **Self-Service Portal**: View security posture anytime  
✅ **Transparency**: Real-time compliance scores  
✅ **Training Access**: Complete mandatory security training  
✅ **Incident Visibility**: Track security incident resolution  
✅ **Compliance Evidence**: Access audit-ready documentation  

---

## 🎯 Recommended Implementation Priority

### Immediate (Week 1-2)
1. Client Management - Core portfolio view
2. SOC Dashboard - Real-time monitoring
3. Training Catalog - Course library

### Short-term (Week 3-4)
4. Engagement Management - Service tracking
5. Enhanced Compliance Controls
6. Phishing Simulation Features

### Medium-term (Month 2)
7. Client Portal - Self-service access
8. Automated Reporting
9. Integration with SIEM tools

---

## 🔄 Next Steps for Full Deployment

### Backend Development
1. Build Django REST endpoints for new modules
2. Implement multi-tenant data models
3. Set up role-based permissions
4. Create database migrations

### Integration
5. Connect to existing SIEM platforms
6. Integrate with phishing simulation tools
7. Set up training content delivery
8. Configure client email notifications

### Testing
9. User acceptance testing with account managers
10. SOC analyst workflow testing
11. Client portal beta testing
12. Security penetration testing

---

## 📞 Support & Training

For questions about SentraERP modules:
- **Technical Issues**: Contact development team
- **Feature Requests**: Submit via enhancement request process
- **Training**: Schedule demo sessions for each module
- **Documentation**: Full API documentation available

---

**SentraERP Version**: 2.0  
**Enhancement Date**: January 2026  
**Module Status**: Phase 1 Complete ✅
