import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  Avatar,
  Chip,
  Button,
  IconButton,
  Tabs,
  Tab,
  LinearProgress,
  Divider,
  List,
  ListItem,
  ListItemText,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import {
  ArrowBack,
  Edit,
  Business,
  Person,
  Security,
  Assessment,
  TrendingUp,
  Warning,
} from '@mui/icons-material';

export const ClientDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(0);

  // Mock data - will come from API
  const client = {
    id: parseInt(id || '1'),
    name: 'TechCorp Solutions',
    industry: 'Technology',
    size: 'enterprise',
    status: 'active',
    accountManager: 'Alice Johnson',
    accountManagerId: 1,
    servicesActive: ['Managed Security', 'Compliance Audit', 'SOC Monitoring'],
    complianceScore: 94,
    riskScore: 'low',
    lastAssessment: '2024-01-15',
    contractStart: '2023-01-01',
    contractEnd: '2025-12-31',
    employees: 450,
    locations: ['New York', 'San Francisco', 'Austin'],
  };

  const contacts = [
    { id: 1, name: 'John Smith', role: 'CISO', email: 'john.smith@techcorp.com', phone: '+1 555-0101', isPrimary: true },
    { id: 2, name: 'Sarah Johnson', role: 'IT Manager', email: 'sarah.j@techcorp.com', phone: '+1 555-0102', isPrimary: false },
  ];

  const recentIncidents = [
    { id: 1, title: 'Suspicious login detected', severity: 'medium', status: 'resolved', date: '2024-01-25' },
    { id: 2, title: 'Malware quarantined', severity: 'high', status: 'closed', date: '2024-01-20' },
  ];

  const complianceFrameworks = [
    { name: 'ISO 27001', score: 96, status: 'compliant', lastAudit: '2024-01-10' },
    { name: 'SOC 2 Type II', score: 92, status: 'compliant', lastAudit: '2023-12-15' },
    { name: 'GDPR', score: 94, status: 'compliant', lastAudit: '2024-01-05' },
  ];

  const getComplianceColor = (score: number) => {
    if (score >= 90) return 'success.main';
    if (score >= 75) return 'warning.main';
    return 'error.main';
  };

  const getRiskColor = (risk: string) => {
    const colors: Record<string, any> = {
      low: 'success',
      medium: 'warning',
      high: 'error',
      critical: 'error',
    };
    return colors[risk] || 'default';
  };

  const getSeverityColor = (severity: string) => {
    const colors: Record<string, any> = {
      low: 'info',
      medium: 'warning',
      high: 'error',
      critical: 'error',
    };
    return colors[severity] || 'default';
  };

  return (
    <Box>
      {/* Header */}
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
        <IconButton onClick={() => navigate('/clients/list')} sx={{ mr: 2 }}>
          <ArrowBack />
        </IconButton>
        <Box sx={{ flexGrow: 1 }}>
          <Typography variant="h4" fontWeight={700}>
            {client.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Client ID: {client.id} • {client.industry}
          </Typography>
        </Box>
        <Button variant="contained" startIcon={<Edit />}>
          Edit Client
        </Button>
      </Box>

      <Grid container spacing={3}>
        {/* Client Overview Card */}
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Box sx={{ textAlign: 'center', mb: 3 }}>
                <Avatar
                  sx={{
                    width: 100,
                    height: 100,
                    margin: '0 auto 16px',
                    fontSize: '2.5rem',
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  }}
                >
                  {client.name[0]}
                </Avatar>
                <Typography variant="h5" fontWeight={700} gutterBottom>
                  {client.name}
                </Typography>
                <Chip
                  label={client.status.toUpperCase()}
                  color="success"
                  sx={{ mb: 1 }}
                />
                <Chip
                  label={client.size.toUpperCase()}
                  variant="outlined"
                  sx={{ ml: 1 }}
                />
              </Box>

              <Divider sx={{ my: 2 }} />

              <Box sx={{ mb: 3 }}>
                <Typography variant="caption" color="text.secondary">
                  Overall Security Posture
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 1 }}>
                  <Typography variant="h4" fontWeight={700} sx={{ color: getComplianceColor(client.complianceScore) }}>
                    {client.complianceScore}%
                  </Typography>
                  <TrendingUp sx={{ color: 'success.main' }} />
                </Box>
                <LinearProgress
                  variant="determinate"
                  value={client.complianceScore}
                  sx={{
                    mt: 1,
                    height: 8,
                    borderRadius: 4,
                    bgcolor: 'action.hover',
                    '& .MuiLinearProgress-bar': {
                      bgcolor: getComplianceColor(client.complianceScore),
                    },
                  }}
                />
              </Box>

              <Box sx={{ mb: 2 }}>
                <Typography variant="caption" color="text.secondary">
                  Risk Level
                </Typography>
                <Box sx={{ mt: 1 }}>
                  <Chip
                    label={client.riskScore.toUpperCase()}
                    color={getRiskColor(client.riskScore)}
                    sx={{ width: '100%' }}
                  />
                </Box>
              </Box>

              <Divider sx={{ my: 2 }} />

              <Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                  <Business sx={{ color: 'text.secondary', fontSize: 20 }} />
                  <Box>
                    <Typography variant="caption" color="text.secondary">
                      Account Manager
                    </Typography>
                    <Typography variant="body2" fontWeight={600}>
                      {client.accountManager}
                    </Typography>
                  </Box>
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                  <Person sx={{ color: 'text.secondary', fontSize: 20 }} />
                  <Box>
                    <Typography variant="caption" color="text.secondary">
                      Employees
                    </Typography>
                    <Typography variant="body2" fontWeight={600}>
                      {client.employees}
                    </Typography>
                  </Box>
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Security sx={{ color: 'text.secondary', fontSize: 20 }} />
                  <Box>
                    <Typography variant="caption" color="text.secondary">
                      Last Assessment
                    </Typography>
                    <Typography variant="body2" fontWeight={600}>
                      {new Date(client.lastAssessment).toLocaleDateString()}
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </CardContent>
          </Card>

          {/* Active Services */}
          <Card sx={{ mt: 2 }}>
            <CardContent>
              <Typography variant="h6" fontWeight={700} gutterBottom>
                Active Services
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, mt: 2 }}>
                {client.servicesActive.map((service, idx) => (
                  <Chip
                    key={idx}
                    label={service}
                    variant="outlined"
                    color="primary"
                  />
                ))}
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Detailed Information Tabs */}
        <Grid item xs={12} md={8}>
          <Card>
            <Tabs
              value={activeTab}
              onChange={(_, v) => setActiveTab(v)}
              sx={{ borderBottom: 1, borderColor: 'divider' }}
            >
              <Tab label="Overview" />
              <Tab label="Compliance" />
              <Tab label="Security Incidents" />
              <Tab label="Contacts" />
            </Tabs>

            <CardContent>
              {/* Overview Tab */}
              {activeTab === 0 && (
                <Box>
                  <Typography variant="h6" fontWeight={700} gutterBottom>
                    Client Information
                  </Typography>
                  <Grid container spacing={3} sx={{ mt: 1 }}>
                    <Grid item xs={12} sm={6}>
                      <Typography variant="caption" color="text.secondary">
                        Industry
                      </Typography>
                      <Typography variant="body1" fontWeight={600}>
                        {client.industry}
                      </Typography>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Typography variant="caption" color="text.secondary">
                        Organization Size
                      </Typography>
                      <Typography variant="body1" fontWeight={600}>
                        {client.size} ({client.employees} employees)
                      </Typography>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Typography variant="caption" color="text.secondary">
                        Contract Period
                      </Typography>
                      <Typography variant="body1" fontWeight={600}>
                        {new Date(client.contractStart).toLocaleDateString()} - {new Date(client.contractEnd).toLocaleDateString()}
                      </Typography>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Typography variant="caption" color="text.secondary">
                        Locations
                      </Typography>
                      <Typography variant="body1" fontWeight={600}>
                        {client.locations.join(', ')}
                      </Typography>
                    </Grid>
                  </Grid>

                  <Divider sx={{ my: 3 }} />

                  <Typography variant="h6" fontWeight={700} gutterBottom>
                    Recent Activity
                  </Typography>
                  <List>
                    <ListItem>
                      <ListItemText
                        primary="Quarterly security assessment completed"
                        secondary="2 days ago"
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemText
                        primary="ISO 27001 audit passed"
                        secondary="1 week ago"
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemText
                        primary="Security awareness training completed by 95% of staff"
                        secondary="2 weeks ago"
                      />
                    </ListItem>
                  </List>
                </Box>
              )}

              {/* Compliance Tab */}
              {activeTab === 1 && (
                <Box>
                  <Typography variant="h6" fontWeight={700} gutterBottom>
                    Compliance Frameworks
                  </Typography>
                  <TableContainer sx={{ mt: 2 }}>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell>Framework</TableCell>
                          <TableCell>Score</TableCell>
                          <TableCell>Status</TableCell>
                          <TableCell>Last Audit</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {complianceFrameworks.map((framework, idx) => (
                          <TableRow key={idx} hover>
                            <TableCell>
                              <Typography variant="body2" fontWeight={600}>
                                {framework.name}
                              </Typography>
                            </TableCell>
                            <TableCell>
                              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <Typography
                                  variant="body2"
                                  fontWeight={600}
                                  sx={{ color: getComplianceColor(framework.score) }}
                                >
                                  {framework.score}%
                                </Typography>
                                <LinearProgress
                                  variant="determinate"
                                  value={framework.score}
                                  sx={{
                                    width: 100,
                                    height: 6,
                                    borderRadius: 3,
                                    bgcolor: 'action.hover',
                                    '& .MuiLinearProgress-bar': {
                                      bgcolor: getComplianceColor(framework.score),
                                    },
                                  }}
                                />
                              </Box>
                            </TableCell>
                            <TableCell>
                              <Chip
                                label={framework.status.toUpperCase()}
                                color="success"
                                size="small"
                              />
                            </TableCell>
                            <TableCell>
                              {new Date(framework.lastAudit).toLocaleDateString()}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Box>
              )}

              {/* Security Incidents Tab */}
              {activeTab === 2 && (
                <Box>
                  <Typography variant="h6" fontWeight={700} gutterBottom>
                    Recent Security Incidents
                  </Typography>
                  <TableContainer sx={{ mt: 2 }}>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell>Incident</TableCell>
                          <TableCell>Severity</TableCell>
                          <TableCell>Status</TableCell>
                          <TableCell>Date</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {recentIncidents.map((incident) => (
                          <TableRow key={incident.id} hover>
                            <TableCell>
                              <Typography variant="body2" fontWeight={600}>
                                {incident.title}
                              </Typography>
                            </TableCell>
                            <TableCell>
                              <Chip
                                label={incident.severity.toUpperCase()}
                                color={getSeverityColor(incident.severity)}
                                size="small"
                              />
                            </TableCell>
                            <TableCell>
                              <Chip
                                label={incident.status.toUpperCase()}
                                color="success"
                                size="small"
                                variant="outlined"
                              />
                            </TableCell>
                            <TableCell>
                              {new Date(incident.date).toLocaleDateString()}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                  {recentIncidents.length === 0 && (
                    <Box sx={{ textAlign: 'center', py: 4 }}>
                      <Typography variant="body2" color="text.secondary">
                        No recent security incidents
                      </Typography>
                    </Box>
                  )}
                </Box>
              )}

              {/* Contacts Tab */}
              {activeTab === 3 && (
                <Box>
                  <Typography variant="h6" fontWeight={700} gutterBottom>
                    Client Contacts
                  </Typography>
                  <TableContainer sx={{ mt: 2 }}>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell>Name</TableCell>
                          <TableCell>Role</TableCell>
                          <TableCell>Email</TableCell>
                          <TableCell>Phone</TableCell>
                          <TableCell>Primary</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {contacts.map((contact) => (
                          <TableRow key={contact.id} hover>
                            <TableCell>
                              <Typography variant="body2" fontWeight={600}>
                                {contact.name}
                              </Typography>
                            </TableCell>
                            <TableCell>{contact.role}</TableCell>
                            <TableCell>{contact.email}</TableCell>
                            <TableCell>{contact.phone}</TableCell>
                            <TableCell>
                              {contact.isPrimary && (
                                <Chip label="PRIMARY" color="primary" size="small" />
                              )}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Box>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};
