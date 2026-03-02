import React from 'react';
import { Box, Typography, Grid, Card, CardContent, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import {
  People as PeopleIcon,
  Business as DepartmentIcon,
  EventAvailable as LeaveIcon,
  PersonAdd as AddEmployeeIcon,
} from '@mui/icons-material';

export const HCMModule: React.FC = () => {
  const navigate = useNavigate();

  const quickActions = [
    {
      title: 'View All Employees',
      description: 'Browse and manage employee records',
      icon: <PeopleIcon sx={{ fontSize: 40 }} />,
      color: '#667eea',
      action: () => navigate('/hcm/employees'),
    },
    {
      title: 'Departments',
      description: 'Manage organizational structure',
      icon: <DepartmentIcon sx={{ fontSize: 40 }} />,
      color: '#10b981',
      action: () => navigate('/hcm/employees?view=departments'),
    },
    {
      title: 'Leave Requests',
      description: 'Review pending leave requests',
      icon: <LeaveIcon sx={{ fontSize: 40 }} />,
      color: '#f59e0b',
      action: () => navigate('/hcm/employees?view=leave'),
    },
    {
      title: 'Add Employee',
      description: 'Onboard new team member',
      icon: <AddEmployeeIcon sx={{ fontSize: 40 }} />,
      color: '#ec4899',
      action: () => navigate('/hcm/employees/new'),
    },
  ];

  return (
    <Box>
      <Typography variant="h3" fontWeight={700} gutterBottom>
        Human Capital Management
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        Manage employees, departments, and workforce operations
      </Typography>

      <Grid container spacing={3}>
        {quickActions.map((action, index) => (
          <Grid item xs={12} sm={6} lg={3} key={index}>
            <Card
              sx={{
                cursor: 'pointer',
                transition: 'all 0.3s',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: 6,
                },
              }}
              onClick={action.action}
            >
              <CardContent sx={{ textAlign: 'center', py: 4 }}>
                <Box
                  sx={{
                    width: 80,
                    height: 80,
                    margin: '0 auto 16px',
                    borderRadius: 3,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: `linear-gradient(135deg, ${action.color}20 0%, ${action.color}40 100%)`,
                    color: action.color,
                  }}
                >
                  {action.icon}
                </Box>
                <Typography variant="h6" fontWeight={600} gutterBottom>
                  {action.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {action.description}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}

        {/* Key Metrics */}
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6" fontWeight={700} gutterBottom>
                Workforce Overview
              </Typography>
              <Grid container spacing={3} sx={{ mt: 1 }}>
                <Grid item xs={6} md={3}>
                  <Box sx={{ textAlign: 'center' }}>
                    <Typography variant="h3" fontWeight={700} color="primary">
                      --
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Total Employees
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={6} md={3}>
                  <Box sx={{ textAlign: 'center' }}>
                    <Typography variant="h3" fontWeight={700} color="success.main">
                      --
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Active
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={6} md={3}>
                  <Box sx={{ textAlign: 'center' }}>
                    <Typography variant="h3" fontWeight={700} color="warning.main">
                      --
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      On Leave
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={6} md={3}>
                  <Box sx={{ textAlign: 'center' }}>
                    <Typography variant="h3" fontWeight={700} color="info.main">
                      --
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Departments
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};
