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
  LinearProgress,
  Grid,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from '@mui/material';
import { Search, Visibility, Edit, Add } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

export const ProjectList: React.FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  // Mock projects - API will provide
  const projects = [
    {
      id: 1,
      name: 'Security Audit Platform',
      status: 'active',
      priority: 'high',
      owner: 'Alice Johnson',
      progress: 65,
      startDate: '2024-01-15',
      endDate: '2024-06-30',
    },
    {
      id: 2,
      name: 'Compliance Framework Implementation',
      status: 'active',
      priority: 'critical',
      owner: 'Bob Smith',
      progress: 40,
      startDate: '2024-02-01',
      endDate: '2024-08-15',
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

  const getPriorityColor = (priority: string) => {
    const colors: Record<string, any> = {
      low: 'info',
      medium: 'primary',
      high: 'warning',
      critical: 'error',
    };
    return colors[priority] || 'default';
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Box>
          <Typography variant="h4" fontWeight={700} gutterBottom>
            Projects
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Manage and track all organizational projects
          </Typography>
        </Box>
        <Button variant="contained" startIcon={<Add />} onClick={() => navigate('/projects/new')}>
          New Project
        </Button>
      </Box>

      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={12} md={8}>
              <TextField
                fullWidth
                placeholder="Search projects..."
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
            <Grid item xs={12} md={4}>
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
          </Grid>
        </CardContent>
      </Card>

      <Card>
        <CardContent>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Project Name</TableCell>
                  <TableCell>Owner</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Priority</TableCell>
                  <TableCell>Progress</TableCell>
                  <TableCell>Timeline</TableCell>
                  <TableCell align="right">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {projects.map((project) => (
                  <TableRow key={project.id} hover>
                    <TableCell>
                      <Typography variant="body2" fontWeight={600}>
                        {project.name}
                      </Typography>
                    </TableCell>
                    <TableCell>{project.owner}</TableCell>
                    <TableCell>
                      <Chip
                        label={project.status.replace('_', ' ').toUpperCase()}
                        color={getStatusColor(project.status)}
                        size="small"
                      />
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={project.priority.toUpperCase()}
                        color={getPriorityColor(project.priority)}
                        size="small"
                      />
                    </TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <LinearProgress
                          variant="determinate"
                          value={project.progress}
                          sx={{ flexGrow: 1, height: 8, borderRadius: 4 }}
                        />
                        <Typography variant="caption">{project.progress}%</Typography>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Typography variant="caption" display="block">
                        {new Date(project.startDate).toLocaleDateString()}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        to {new Date(project.endDate).toLocaleDateString()}
                      </Typography>
                    </TableCell>
                    <TableCell align="right">
                      <IconButton size="small" onClick={() => navigate(`/projects/${project.id}`)}>
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
