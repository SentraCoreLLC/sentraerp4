import React from 'react';
import { Box, Typography, Grid, Card, CardContent } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import {
  Business as ClientIcon,
  Assessment as AssessmentIcon,
  Shield as SecurityIcon,
  Add as AddIcon,
} from '@mui/icons-material';

export const ClientsModule: React.FC = () => {
  const navigate = useNavigate();

  const quickActions = [
    {
      title: 'All Clients',
      description: 'View and manage client portfolio',
      icon: <ClientIcon sx={{ fontSize: 40 }} />,
      color: '#667eea',
      action: () => navigate('/clients/list'),
    },
    {
      title: 'Client Dashboards',
      description: 'Security posture & compliance',
      icon: <AssessmentIcon sx={{ fontSize: 40 }} />,
      color: '#10b981',
      action: () => navigate('/clients/list'),
    },
    {
      title: 'Active Services',
      description: 'Ongoing client engagements',
      icon: <SecurityIcon sx={{ fontSize: 40 }} />,
      color: '#f59e0b',
      action: () => navigate('/engagements/list'),
    },
    {
      title: 'New Client',
      description: 'Onboard new client',
      icon: <AddIcon sx={{ fontSize: 40 }} />,
      color: '#ec4899',
      action: () => navigate('/clients/new'),
    },
  ];

  return (
    <Box>
      <Typography variant="h3" fontWeight={700} gutterBottom>
        Client Management
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        Manage client portfolio, services, and security posture
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

        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6" fontWeight={700} gutterBottom>
                Client Portfolio Overview
              </Typography>
              <Grid container spacing={3} sx={{ mt: 1 }}>
                <Grid item xs={6} md={3}>
                  <Box sx={{ textAlign: 'center' }}>
                    <Typography variant="h3" fontWeight={700} color="primary">
                      --
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Active Clients
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={6} md={3}>
                  <Box sx={{ textAlign: 'center' }}>
                    <Typography variant="h3" fontWeight={700} color="success.main">
                      --
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Compliant
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={6} md={3}>
                  <Box sx={{ textAlign: 'center' }}>
                    <Typography variant="h3" fontWeight={700} color="warning.main">
                      --
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      At Risk
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={6} md={3}>
                  <Box sx={{ textAlign: 'center' }}>
                    <Typography variant="h3" fontWeight={700} color="info.main">
                      --
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      New This Month
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
