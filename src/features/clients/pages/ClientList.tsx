import React, { useState } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  IconButton,
  Button,
  TextField,
  InputAdornment,
  Grid,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Avatar,
  LinearProgress,
} from '@mui/material';
import { Search, Visibility, Edit, Add, TrendingUp, Warning } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

export const ClientList: React.FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [industryFilter, setIndustryFilter] = useState('all');

  // Mock data - API will provide
  const clients = [
    {
      id: 1,
      name: 'TechCorp Solutions',
      industry: 'Technology',
      size: 'enterprise',
      status: 'active',
      accountManager: 'Alice Johnson',
      servicesActive: ['Managed Security', 'Compliance Audit'],
      complianceScore: 94,
      riskScore: 'low',
      lastAssessment: '2024-01-15',
    },
    {
      id: 2,
      name: 'FinSecure Banking',
      industry: 'Financial Services',
      size: 'large',
      status: 'active',
      accountManager: 'Bob Smith',
      servicesActive: ['SOC Monitoring', 'Risk Assessment'],
      complianceScore: 87,
      riskScore: 'medium',
      lastAssessment: '2024-01-10',
    },
    {
      id: 3,
      name: 'HealthData Inc',
      industry: 'Healthcare',
      size: 'medium',
      status: 'active',
      accountManager: 'Carol Williams',
      servicesActive: ['Compliance Audit', 'Training'],
      complianceScore: 76,
      riskScore: 'high',
      lastAssessment: '2023-12-20',
    },
  ];

  const getStatusColor = (status: string) => {
    const colors: Record<string, any> = {
      active: 'success',
      inactive: 'default',
      prospect: 'info',
    };
    return colors[status] || 'default';
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

  const getComplianceColor = (score: number) => {
    if (score >= 90) return 'success.main';
    if (score >= 75) return 'warning.main';
    return 'error.main';
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Box>
          <Typography variant="h4" fontWeight={700} gutterBottom>
            Clients
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Manage client portfolio and service delivery
          </Typography>
        </Box>
        <Button variant="contained" startIcon={<Add />} onClick={() => navigate('/clients/new')}>
          Add Client
        </Button>
      </Box>

      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                placeholder="Search clients..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Search />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <FormControl fullWidth>
                <InputLabel>Status</InputLabel>
                <Select
                  value={statusFilter}
                  label="Status"
                  onChange={(e) => setStatusFilter(e.target.value)}
                >
                  <MenuItem value="all">All Statuses</MenuItem>
                  <MenuItem value="active">Active</MenuItem>
                  <MenuItem value="inactive">Inactive</MenuItem>
                  <MenuItem value="prospect">Prospect</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={3}>
              <FormControl fullWidth>
                <InputLabel>Industry</InputLabel>
                <Select
                  value={industryFilter}
                  label="Industry"
                  onChange={(e) => setIndustryFilter(e.target.value)}
                >
                  <MenuItem value="all">All Industries</MenuItem>
                  <MenuItem value="technology">Technology</MenuItem>
                  <MenuItem value="financial">Financial Services</MenuItem>
                  <MenuItem value="healthcare">Healthcare</MenuItem>
                  <MenuItem value="retail">Retail</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      <Card>
        <CardContent>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Client</TableCell>
                  <TableCell>Industry</TableCell>
                  <TableCell>Account Manager</TableCell>
                  <TableCell>Services</TableCell>
                  <TableCell>Compliance</TableCell>
                  <TableCell>Risk Level</TableCell>
                  <TableCell>Last Assessment</TableCell>
                  <TableCell align="right">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {clients.map((client) => (
                  <TableRow key={client.id} hover>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <Avatar
                          sx={{
                            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                            width: 40,
                            height: 40,
                          }}
                        >
                          {client.name[0]}
                        </Avatar>
                        <Box>
                          <Typography variant="body2" fontWeight={600}>
                            {client.name}
                          </Typography>
                          <Chip
                            label={client.size.toUpperCase()}
                            size="small"
                            variant="outlined"
                            sx={{ mt: 0.5 }}
                          />
                        </Box>
                      </Box>
                    </TableCell>
                    <TableCell>{client.industry}</TableCell>
                    <TableCell>{client.accountManager}</TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                        {client.servicesActive.slice(0, 2).map((service, idx) => (
                          <Chip
                            key={idx}
                            label={service}
                            size="small"
                            variant="outlined"
                            sx={{ fontSize: '0.7rem' }}
                          />
                        ))}
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                          <Typography
                            variant="body2"
                            fontWeight={600}
                            sx={{ color: getComplianceColor(client.complianceScore) }}
                          >
                            {client.complianceScore}%
                          </Typography>
                          {client.complianceScore >= 90 && (
                            <TrendingUp sx={{ fontSize: 16, color: 'success.main' }} />
                          )}
                          {client.complianceScore < 80 && (
                            <Warning sx={{ fontSize: 16, color: 'warning.main' }} />
                          )}
                        </Box>
                        <LinearProgress
                          variant="determinate"
                          value={client.complianceScore}
                          sx={{
                            height: 6,
                            borderRadius: 3,
                            bgcolor: 'action.hover',
                            '& .MuiLinearProgress-bar': {
                              bgcolor: getComplianceColor(client.complianceScore),
                            },
                          }}
                        />
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={client.riskScore.toUpperCase()}
                        color={getRiskColor(client.riskScore)}
                        size="small"
                      />
                    </TableCell>
                    <TableCell>
                      <Typography variant="caption">
                        {new Date(client.lastAssessment).toLocaleDateString()}
                      </Typography>
                    </TableCell>
                    <TableCell align="right">
                      <IconButton
                        size="small"
                        onClick={() => navigate(`/clients/${client.id}`)}
                      >
                        <Visibility fontSize="small" />
                      </IconButton>
                      <IconButton size="small">
                        <Edit fontSize="small" />
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
