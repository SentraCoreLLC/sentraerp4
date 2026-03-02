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
  LinearProgress,
  Tabs,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Avatar,
  AvatarGroup,
} from '@mui/material';
import {
  ArrowBack,
  Edit,
  People,
  AttachMoney,
  CalendarToday,
  Flag,
} from '@mui/icons-material';

export const ProjectDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(0);

  const project = {
    id: parseInt(id || '1'),
    name: 'Security Audit Platform Upgrade',
    description: 'Comprehensive security assessment and platform modernization',
    status: 'active',
    priority: 'high',
    owner: 'Alice Johnson',
    startDate: '2024-01-15',
    endDate: '2024-06-30',
    progress: 65,
    budget: 150000,
    spent: 97500,
    teamSize: 8,
  };

  const tasks = [
    { id: 1, title: 'Requirements gathering', status: 'completed', assignee: 'Bob Smith', dueDate: '2024-02-15', progress: 100 },
    { id: 2, title: 'Security framework design', status: 'in_progress', assignee: 'Carol White', dueDate: '2024-03-01', progress: 75 },
    { id: 3, title: 'Implementation Phase 1', status: 'in_progress', assignee: 'David Lee', dueDate: '2024-04-15', progress: 45 },
    { id: 4, title: 'Testing & QA', status: 'todo', assignee: 'Emma Davis', dueDate: '2024-05-30', progress: 0 },
  ];

  const milestones = [
    { id: 1, name: 'Project Kickoff', date: '2024-01-15', status: 'completed' },
    { id: 2, name: 'Design Approval', date: '2024-03-01', status: 'in_progress' },
    { id: 3, name: 'Phase 1 Delivery', date: '2024-04-30', status: 'pending' },
    { id: 4, name: 'Final Delivery', date: '2024-06-30', status: 'pending' },
  ];

  const getStatusColor = (status: string) => {
    const colors: Record<string, any> = {
      completed: 'success',
      in_progress: 'primary',
      todo: 'default',
      blocked: 'error',
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
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
        <IconButton onClick={() => navigate('/projects/list')} sx={{ mr: 2 }}>
          <ArrowBack />
        </IconButton>
        <Box sx={{ flexGrow: 1 }}>
          <Typography variant="h4" fontWeight={700}>
            {project.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Project ID: {project.id} • Owner: {project.owner}
          </Typography>
        </Box>
        <Button variant="contained" startIcon={<Edit />}>
          Edit Project
        </Button>
      </Box>

      <Grid container spacing={3}>
        {/* KPI Cards */}
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                <CalendarToday color="primary" sx={{ fontSize: 20 }} />
                <Typography variant="caption" color="text.secondary">
                  Timeline
                </Typography>
              </Box>
              <Typography variant="h5" fontWeight={700}>
                {Math.ceil((new Date(project.endDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))} days
              </Typography>
              <Typography variant="caption" color="text.secondary">
                Until deadline
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                <AttachMoney color="success" sx={{ fontSize: 20 }} />
                <Typography variant="caption" color="text.secondary">
                  Budget
                </Typography>
              </Box>
              <Typography variant="h5" fontWeight={700}>
                ${(project.spent / 1000).toFixed(0)}K / ${(project.budget / 1000).toFixed(0)}K
              </Typography>
              <LinearProgress
                variant="determinate"
                value={(project.spent / project.budget) * 100}
                sx={{ mt: 1, height: 6, borderRadius: 3 }}
              />
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                <Flag color="warning" sx={{ fontSize: 20 }} />
                <Typography variant="caption" color="text.secondary">
                  Progress
                </Typography>
              </Box>
              <Typography variant="h5" fontWeight={700}>
                {project.progress}%
              </Typography>
              <LinearProgress
                variant="determinate"
                value={project.progress}
                sx={{ mt: 1, height: 6, borderRadius: 3 }}
              />
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                <People color="info" sx={{ fontSize: 20 }} />
                <Typography variant="caption" color="text.secondary">
                  Team
                </Typography>
              </Box>
              <Typography variant="h5" fontWeight={700}>
                {project.teamSize} members
              </Typography>
              <AvatarGroup max={4} sx={{ mt: 1, justifyContent: 'flex-start' }}>
                {[...Array(project.teamSize)].map((_, idx) => (
                  <Avatar key={idx} sx={{ width: 28, height: 28 }}>
                    {String.fromCharCode(65 + idx)}
                  </Avatar>
                ))}
              </AvatarGroup>
            </CardContent>
          </Card>
        </Grid>

        {/* Main Content */}
        <Grid item xs={12}>
          <Card>
            <Tabs
              value={activeTab}
              onChange={(_, v) => setActiveTab(v)}
              sx={{ borderBottom: 1, borderColor: 'divider' }}
            >
              <Tab label="Overview" />
              <Tab label="Tasks" />
              <Tab label="Milestones" />
            </Tabs>

            <CardContent>
              {activeTab === 0 && (
                <Box>
                  <Box sx={{ mb: 3 }}>
                    <Typography variant="h6" fontWeight={700} gutterBottom>
                      Project Details
                    </Typography>
                    <Typography variant="body1" color="text.secondary" paragraph>
                      {project.description}
                    </Typography>
                  </Box>

                  <Grid container spacing={3}>
                    <Grid item xs={12} sm={6}>
                      <Typography variant="caption" color="text.secondary">
                        Status
                      </Typography>
                      <Box sx={{ mt: 0.5 }}>
                        <Chip
                          label={project.status.replace('_', ' ').toUpperCase()}
                          color={getStatusColor(project.status)}
                        />
                      </Box>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Typography variant="caption" color="text.secondary">
                        Priority
                      </Typography>
                      <Box sx={{ mt: 0.5 }}>
                        <Chip
                          label={project.priority.toUpperCase()}
                          color={getPriorityColor(project.priority)}
                        />
                      </Box>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Typography variant="caption" color="text.secondary">
                        Start Date
                      </Typography>
                      <Typography variant="body1" fontWeight={600}>
                        {new Date(project.startDate).toLocaleDateString()}
                      </Typography>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Typography variant="caption" color="text.secondary">
                        End Date
                      </Typography>
                      <Typography variant="body1" fontWeight={600}>
                        {new Date(project.endDate).toLocaleDateString()}
                      </Typography>
                    </Grid>
                  </Grid>
                </Box>
              )}

              {activeTab === 1 && (
                <Box>
                  <Typography variant="h6" fontWeight={700} gutterBottom>
                    Project Tasks
                  </Typography>
                  <TableContainer>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell>Task</TableCell>
                          <TableCell>Assignee</TableCell>
                          <TableCell>Status</TableCell>
                          <TableCell>Due Date</TableCell>
                          <TableCell>Progress</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {tasks.map((task) => (
                          <TableRow key={task.id} hover>
                            <TableCell>
                              <Typography variant="body2" fontWeight={600}>
                                {task.title}
                              </Typography>
                            </TableCell>
                            <TableCell>{task.assignee}</TableCell>
                            <TableCell>
                              <Chip
                                label={task.status.replace('_', ' ').toUpperCase()}
                                color={getStatusColor(task.status)}
                                size="small"
                              />
                            </TableCell>
                            <TableCell>
                              {new Date(task.dueDate).toLocaleDateString()}
                            </TableCell>
                            <TableCell>
                              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <LinearProgress
                                  variant="determinate"
                                  value={task.progress}
                                  sx={{ flexGrow: 1, height: 6, borderRadius: 3 }}
                                />
                                <Typography variant="caption">{task.progress}%</Typography>
                              </Box>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Box>
              )}

              {activeTab === 2 && (
                <Box>
                  <Typography variant="h6" fontWeight={700} gutterBottom>
                    Project Milestones
                  </Typography>
                  <TableContainer>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell>Milestone</TableCell>
                          <TableCell>Date</TableCell>
                          <TableCell>Status</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {milestones.map((milestone) => (
                          <TableRow key={milestone.id} hover>
                            <TableCell>
                              <Typography variant="body2" fontWeight={600}>
                                {milestone.name}
                              </Typography>
                            </TableCell>
                            <TableCell>
                              {new Date(milestone.date).toLocaleDateString()}
                            </TableCell>
                            <TableCell>
                              <Chip
                                label={milestone.status.replace('_', ' ').toUpperCase()}
                                color={getStatusColor(milestone.status)}
                                size="small"
                              />
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
