import React, { useState } from 'react';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from '@mui/material';
import {
  Shield,
  Warning,
  Error as ErrorIcon,
  CheckCircle,
  Visibility,
  TrendingUp,
  BugReport,
  Security,
} from '@mui/icons-material';

export const SOCDashboard: React.FC = () => {
  const [clientFilter, setClientFilter] = useState('all');
  const [timeRange, setTimeRange] = useState('24h');

  // Mock data - will come from API
  const kpiMetrics = [
    { title: 'Active Alerts', value: '12', severity: 'warning', icon: <Warning />, color: '#f59e0b', change: '+3' },
    { title: 'Open Incidents', value: '4', severity: 'error', icon: <ErrorIcon />, color: '#ef4444', change: '-1' },
    { title: 'Vulnerabilities', value: '28', severity: 'info', icon: <BugReport />, color: '#667eea', change: '+5' },
    { title: 'Compliance Score', value: '94%', severity: 'success', icon: <CheckCircle />, color: '#10b981', change: '+2%' },
  ];

  const recentIncidents = [
    {
      id: 1,
      title: 'Suspicious login attempt detected',
      client: 'TechCorp Solutions',
      severity: 'high',
      status: 'investigating',
      timestamp: '2024-01-27 14:23:15',
      assignee: 'SOC Analyst 1',
    },
    {
      id: 2,
      title: 'Malware detected in email attachment',
      client: 'FinSecure Banking',
      severity: 'critical',
      status: 'contained',
      timestamp: '2024-01-27 13:45:00',
      assignee: 'SOC Analyst 2',
    },
    {
      id: 3,
      title: 'Port scan detected from external IP',
      client: 'HealthData Inc',
      severity: 'medium',
      status: 'investigating',
      timestamp: '2024-01-27 12:10:33',
      assignee: 'SOC Analyst 3',
    },
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
      closed: 'success',
    };
    return colors[status] || 'default';
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Box>
          <Typography variant="h3" fontWeight={700} gutterBottom>
            Security Operations Center
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Real-time threat monitoring and incident response
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <FormControl size="small" sx={{ minWidth: 150 }}>
            <InputLabel>Time Range</InputLabel>
            <Select
              value={timeRange}
              label="Time Range"
              onChange={(e) => setTimeRange(e.target.value)}
            >
              <MenuItem value="1h">Last Hour</MenuItem>
              <MenuItem value="24h">Last 24 Hours</MenuItem>
              <MenuItem value="7d">Last 7 Days</MenuItem>
              <MenuItem value="30d">Last 30 Days</MenuItem>
            </Select>
          </FormControl>
          <FormControl size="small" sx={{ minWidth: 150 }}>
            <InputLabel>Client</InputLabel>
            <Select
              value={clientFilter}
              label="Client"
              onChange={(e) => setClientFilter(e.target.value)}
            >
              <MenuItem value="all">All Clients</MenuItem>
              <MenuItem value="1">TechCorp Solutions</MenuItem>
              <MenuItem value="2">FinSecure Banking</MenuItem>
              <MenuItem value="3">HealthData Inc</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </Box>

      {/* KPI Metrics */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        {kpiMetrics.map((metric, index) => (
          <Grid item xs={12} sm={6} lg={3} key={index}>
            <Card
              sx={{
                position: 'relative',
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  height: '4px',
                  background: `linear-gradient(90deg, ${metric.color} 0%, ${metric.color}80 100%)`,
                  borderRadius: '16px 16px 0 0',
                },
              }}
            >
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="caption" color="text.secondary" fontWeight={500}>
                      {metric.title}
                    </Typography>
                    <Typography variant="h3" fontWeight={700} sx={{ my: 1 }}>
                      {metric.value}
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                      <TrendingUp sx={{ fontSize: 16, color: 'success.main' }} />
                      <Typography variant="caption" color="text.secondary">
                        {metric.change} from last period
                      </Typography>
                    </Box>
                  </Box>
                  <Box
                    sx={{
                      background: `linear-gradient(135deg, ${metric.color}20 0%, ${metric.color}40 100%)`,
                      p: 1.5,
                      borderRadius: 2,
                      color: metric.color,
                    }}
                  >
                    {metric.icon}
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Threat Level Indicator */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
            <Security color="primary" />
            <Typography variant="h6" fontWeight={700}>
              Current Threat Level
            </Typography>
          </Box>
          <Grid container spacing={2}>
            <Grid item xs={12} md={8}>
              <Box sx={{ display: 'flex', gap: 1 }}>
                {['LOW', 'GUARDED', 'ELEVATED', 'HIGH', 'SEVERE'].map((level, idx) => (
                  <Box
                    key={level}
                    sx={{
                      flex: 1,
                      height: 60,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderRadius: 2,
                      bgcolor: idx === 1 ? 'warning.light' : 'action.hover',
                      border: idx === 1 ? '2px solid' : 'none',
                      borderColor: 'warning.main',
                      transition: 'all 0.3s',
                    }}
                  >
                    <Typography
                      variant="caption"
                      fontWeight={idx === 1 ? 700 : 500}
                      color={idx === 1 ? 'warning.main' : 'text.secondary'}
                    >
                      {level}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </Grid>
            <Grid item xs={12} md={4}>
              <Box sx={{ textAlign: 'center', py: 1 }}>
                <Typography variant="caption" color="text.secondary">
                  Based on 24h activity analysis
                </Typography>
                <Typography variant="h6" fontWeight={700} color="warning.main" sx={{ mt: 0.5 }}>
                  GUARDED
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Recent Incidents */}
      <Card>
        <CardContent>
          <Typography variant="h6" fontWeight={700} gutterBottom>
            Recent Security Incidents
          </Typography>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Incident</TableCell>
                  <TableCell>Client</TableCell>
                  <TableCell>Severity</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Timestamp</TableCell>
                  <TableCell>Assignee</TableCell>
                  <TableCell align="right">Actions</TableCell>
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
                    <TableCell>{incident.client}</TableCell>
                    <TableCell>
                      <Chip
                        label={incident.severity.toUpperCase()}
                        color={getSeverityColor(incident.severity)}
                        size="small"
                      />
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={incident.status.replace('_', ' ').toUpperCase()}
                        color={getStatusColor(incident.status)}
                        size="small"
                        variant="outlined"
                      />
                    </TableCell>
                    <TableCell>
                      <Typography variant="caption">{incident.timestamp}</Typography>
                    </TableCell>
                    <TableCell>{incident.assignee}</TableCell>
                    <TableCell align="right">
                      <IconButton size="small">
                        <Visibility fontSize="small" />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>
    </Box>
  );
};
