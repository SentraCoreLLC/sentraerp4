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
  LinearProgress,
} from '@mui/material';
import { Search, Visibility, Edit, Add } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

export const EngagementList: React.FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');

  // Mock data
  const engagements = [
    {
      id: 1,
      clientName: 'TechCorp Solutions',
      title: 'Q1 2024 Security Assessment',
      type: 'assessment',
      status: 'active',
      lead: 'Alice Johnson',
      startDate: '2024-01-15',
      endDate: '2024-03-15',
      hoursEstimated: 120,
      hoursActual: 85,
      progress: 71,
    },
    {
      id: 2,
      clientName: 'FinSecure Banking',
      title: 'ISO 27001 Compliance Audit',
      type: 'audit',
      status: 'active',
      lead: 'Bob Smith',
      startDate: '2024-01-01',
      endDate: '2024-02-28',
      hoursEstimated: 200,
      hoursActual: 165,
      progress: 83,
    },
    {
      id: 3,
      clientName: 'HealthData Inc',
      title: 'Security Awareness Training Program',
      type: 'training',
      status: 'completed',
      lead: 'Carol Williams',
      startDate: '2023-12-01',
      endDate: '2024-01-15',
      hoursEstimated: 80,
      hoursActual: 75,
      progress: 100,
    },
  ];

  const getStatusColor = (status: string) => {
    const colors: Record<string, any> = {
      planning: 'info',
      active: 'primary',
      on_hold: 'warning',
      completed: 'success',
      cancelled: 'error',
    };
    return colors[status] || 'default';
  };

  const getTypeColor = (type: string) => {
    const colors: Record<string, any> = {
      assessment: 'primary',
      audit: 'secondary',
      consulting: 'info',
      training: 'success',
      managed_service: 'warning',
    };
    return colors[type] || 'default';
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Box>
          <Typography variant="h4" fontWeight={700} gutterBottom>
            Engagements
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Track client projects and service delivery
          </Typography>
        </Box>
        <Button variant="contained" startIcon={<Add />} onClick={() => navigate('/engagements/new')}>
          New Engagement
        </Button>
      </Box>

      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                placeholder="Search engagements..."
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
                  <MenuItem value="planning">Planning</MenuItem>
                  <MenuItem value="active">Active</MenuItem>
                  <MenuItem value="on_hold">On Hold</MenuItem>
                  <MenuItem value="completed">Completed</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={3}>
              <FormControl fullWidth>
                <InputLabel>Type</InputLabel>
                <Select
                  value={typeFilter}
                  label="Type"
                  onChange={(e) => setTypeFilter(e.target.value)}
                >
                  <MenuItem value="all">All Types</MenuItem>
                  <MenuItem value="assessment">Assessment</MenuItem>
                  <MenuItem value="audit">Audit</MenuItem>
                  <MenuItem value="consulting">Consulting</MenuItem>
                  <MenuItem value="training">Training</MenuItem>
                  <MenuItem value="managed_service">Managed Service</MenuItem>
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
                  <TableCell>Engagement</TableCell>
                  <TableCell>Client</TableCell>
                  <TableCell>Type</TableCell>
                  <TableCell>Lead</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Progress</TableCell>
                  <TableCell>Timeline</TableCell>
                  <TableCell align="right">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {engagements.map((engagement) => (
                  <TableRow key={engagement.id} hover>
                    <TableCell>
                      <Typography variant="body2" fontWeight={600}>
                        {engagement.title}
                      </Typography>
                    </TableCell>
                    <TableCell>{engagement.clientName}</TableCell>
                    <TableCell>
                      <Chip
                        label={engagement.type.replace('_', ' ').toUpperCase()}
                        color={getTypeColor(engagement.type)}
                        size="small"
                        variant="outlined"
                      />
                    </TableCell>
                    <TableCell>{engagement.lead}</TableCell>
                    <TableCell>
                      <Chip
                        label={engagement.status.replace('_', ' ').toUpperCase()}
                        color={getStatusColor(engagement.status)}
                        size="small"
                      />
                    </TableCell>
                    <TableCell>
                      <Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                          <Typography variant="caption">
                            {engagement.hoursActual}h / {engagement.hoursEstimated}h
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            ({engagement.progress}%)
                          </Typography>
                        </Box>
                        <LinearProgress
                          variant="determinate"
                          value={engagement.progress}
                          sx={{
                            height: 6,
                            borderRadius: 3,
                            bgcolor: 'action.hover',
                          }}
                        />
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Typography variant="caption" display="block">
                        {new Date(engagement.startDate).toLocaleDateString()}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        to {new Date(engagement.endDate).toLocaleDateString()}
                      </Typography>
                    </TableCell>
                    <TableCell align="right">
                      <IconButton
                        size="small"
                        onClick={() => navigate(`/engagements/${engagement.id}`)}
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
