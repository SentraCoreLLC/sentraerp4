import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  Chip,
  Button,
  IconButton,
  Tabs,
  Tab,
  Divider,
  List,
  ListItem,
  ListItemText,
  TextField,
} from '@mui/material';
import {
  Timeline,
  TimelineItem,
  TimelineSeparator,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
} from '@mui/lab';
import {
  ArrowBack,
  Edit,
  CheckCircle,
  Warning,
  Error as ErrorIcon,
  Info,
} from '@mui/icons-material';

export const IncidentDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(0);

  const incident = {
    id: parseInt(id || '1'),
    clientName: 'TechCorp Solutions',
    title: 'Suspicious login attempt detected',
    description: 'Multiple failed login attempts from unusual IP address followed by successful login.',
    severity: 'high',
    status: 'investigating',
    category: 'unauthorized_access',
    detectedDate: '2024-01-27 14:23:15',
    assignedTo: 'SOC Analyst 1',
    affectedAssets: ['Web Server 01', 'User Account: jsmith@techcorp.com'],
    indicators: ['IP: 185.220.101.45', 'User-Agent: Suspicious', '15 failed attempts in 2 minutes'],
  };

  const timeline = [
    { date: '2024-01-27 14:23:15', event: 'Incident detected by SIEM', icon: <Info />, color: 'info' },
    { date: '2024-01-27 14:25:00', event: 'Assigned to SOC Analyst 1', icon: <Info />, color: 'info' },
    { date: '2024-01-27 14:30:00', event: 'Investigation started', icon: <Warning />, color: 'warning' },
    { date: '2024-01-27 15:00:00', event: 'User account temporarily locked', icon: <ErrorIcon />, color: 'error' },
  ];

  const getSeverityColor = (severity: string) => {
    const colors: Record<string, any> = {
      low: 'info',
      medium: 'warning',
      high: 'error',
      critical: 'error',
    };
    return colors[severity] || 'default';
  };

  const getStatusColor = (status: string) => {
    const colors: Record<string, any> = {
      new: 'default',
      investigating: 'info',
      contained: 'warning',
      eradicated: 'success',
      recovered: 'success',
      closed: 'default',
    };
    return colors[status] || 'default';
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
        <IconButton onClick={() => navigate('/soc')} sx={{ mr: 2 }}>
          <ArrowBack />
        </IconButton>
        <Box sx={{ flexGrow: 1 }}>
          <Typography variant="h4" fontWeight={700}>
            Incident #{incident.id.toString().padStart(4, '0')}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {incident.clientName}
          </Typography>
        </Box>
        <Button variant="contained" startIcon={<Edit />}>
          Update Status
        </Button>
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Card>
            <Tabs
              value={activeTab}
              onChange={(_, v) => setActiveTab(v)}
              sx={{ borderBottom: 1, borderColor: 'divider' }}
            >
              <Tab label="Details" />
              <Tab label="Timeline" />
              <Tab label="Notes" />
            </Tabs>

            <CardContent>
              {activeTab === 0 && (
                <Box>
                  <Typography variant="h6" fontWeight={700} gutterBottom>
                    {incident.title}
                  </Typography>
                  <Typography variant="body1" color="text.secondary" paragraph>
                    {incident.description}
                  </Typography>

                  <Divider sx={{ my: 3 }} />

                  <Typography variant="subtitle2" fontWeight={700} gutterBottom>
                    Affected Assets
                  </Typography>
                  <List>
                    {incident.affectedAssets.map((asset, idx) => (
                      <ListItem key={idx}>
                        <ListItemText primary={asset} />
                      </ListItem>
                    ))}
                  </List>

                  <Divider sx={{ my: 3 }} />

                  <Typography variant="subtitle2" fontWeight={700} gutterBottom>
                    Indicators of Compromise
                  </Typography>
                  <List>
                    {incident.indicators.map((indicator, idx) => (
                      <ListItem key={idx}>
                        <ListItemText primary={indicator} />
                      </ListItem>
                    ))}
                  </List>
                </Box>
              )}

              {activeTab === 1 && (
                <Box>
                  <Typography variant="h6" fontWeight={700} gutterBottom>
                    Incident Timeline
                  </Typography>
                  <Timeline sx={{ mt: 2 }}>
                    {timeline.map((item, idx) => (
                      <TimelineItem key={idx}>
                        <TimelineSeparator>
                          <TimelineDot color={item.color as any}>
                            {item.icon}
                          </TimelineDot>
                          {idx < timeline.length - 1 && <TimelineConnector />}
                        </TimelineSeparator>
                        <TimelineContent>
                          <Typography variant="body2" fontWeight={600}>
                            {item.event}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            {item.date}
                          </Typography>
                        </TimelineContent>
                      </TimelineItem>
                    ))}
                  </Timeline>
                </Box>
              )}

              {activeTab === 2 && (
                <Box>
                  <Typography variant="h6" fontWeight={700} gutterBottom>
                    Investigation Notes
                  </Typography>
                  <TextField
                    fullWidth
                    multiline
                    rows={8}
                    placeholder="Add investigation notes..."
                    sx={{ mt: 2 }}
                  />
                  <Button variant="contained" sx={{ mt: 2 }}>
                    Save Notes
                  </Button>
                </Box>
              )}
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" fontWeight={700} gutterBottom>
                Incident Information
              </Typography>

              <Box sx={{ mt: 2 }}>
                <Typography variant="caption" color="text.secondary">
                  Severity
                </Typography>
                <Box sx={{ mt: 0.5 }}>
                  <Chip
                    label={incident.severity.toUpperCase()}
                    color={getSeverityColor(incident.severity)}
                  />
                </Box>
              </Box>

              <Box sx={{ mt: 2 }}>
                <Typography variant="caption" color="text.secondary">
                  Status
                </Typography>
                <Box sx={{ mt: 0.5 }}>
                  <Chip
                    label={incident.status.replace('_', ' ').toUpperCase()}
                    color={getStatusColor(incident.status)}
                  />
                </Box>
              </Box>

              <Box sx={{ mt: 2 }}>
                <Typography variant="caption" color="text.secondary">
                  Category
                </Typography>
                <Typography variant="body2" fontWeight={600}>
                  {incident.category.replace('_', ' ').toUpperCase()}
                </Typography>
              </Box>

              <Box sx={{ mt: 2 }}>
                <Typography variant="caption" color="text.secondary">
                  Detected
                </Typography>
                <Typography variant="body2" fontWeight={600}>
                  {incident.detectedDate}
                </Typography>
              </Box>

              <Box sx={{ mt: 2 }}>
                <Typography variant="caption" color="text.secondary">
                  Assigned To
                </Typography>
                <Typography variant="body2" fontWeight={600}>
                  {incident.assignedTo}
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};
