import React from 'react';
import { Box, Typography, Grid, Card, CardContent } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import {
  Assignment as EngagementIcon,
  ConfirmationNumber as TicketIcon,
  AccessTime as TimeIcon,
  Description as DeliverableIcon,
} from '@mui/icons-material';

export const EngagementsModule: React.FC = () => {
  const navigate = useNavigate();

  const quickActions = [
    {
      title: 'All Engagements',
      description: 'Active client projects & services',
      icon: <EngagementIcon sx={{ fontSize: 40 }} />,
      color: '#667eea',
      action: () => navigate('/engagements/list'),
    },
    {
      title: 'Service Tickets',
      description: 'Client requests & incidents',
      icon: <TicketIcon sx={{ fontSize: 40 }} />,
      color: '#ef4444',
      action: () => navigate('/engagements/tickets'),
    },
    {
      title: 'Time Tracking',
      description: 'Log billable hours',
      icon: <TimeIcon sx={{ fontSize: 40 }} />,
      color: '#10b981',
      action: () => navigate('/engagements/time-entries'),
    },
    {
      title: 'Deliverables',
      description: 'Reports & assessment documents',
      icon: <DeliverableIcon sx={{ fontSize: 40 }} />,
      color: '#f59e0b',
      action: () => navigate('/engagements/deliverables'),
    },
  ];

  return (
    <Box>
      <Typography variant="h3" fontWeight={700} gutterBottom>
        Engagement Management
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        Track client engagements, service delivery, and project execution
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
                Engagement Overview
              </Typography>
              <Grid container spacing={3} sx={{ mt: 1 }}>
                <Grid item xs={6} md={3}>
                  <Box sx={{ textAlign: 'center' }}>
                    <Typography variant="h3" fontWeight={700} color="primary">
                      --
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Active Engagements
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={6} md={3}>
                  <Box sx={{ textAlign: 'center' }}>
                    <Typography variant="h3" fontWeight={700} color="error.main">
                      --
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Open Tickets
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={6} md={3}>
                  <Box sx={{ textAlign: 'center' }}>
                    <Typography variant="h3" fontWeight={700} color="success.main">
                      --
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Hours This Month
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={6} md={3}>
                  <Box sx={{ textAlign: 'center' }}>
                    <Typography variant="h3" fontWeight={700} color="warning.main">
                      --
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Pending Deliverables
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
