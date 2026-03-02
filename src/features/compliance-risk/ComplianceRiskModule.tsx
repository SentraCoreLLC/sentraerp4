import React from 'react';
import { Box, Typography, Grid, Card, CardContent } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import {
  Gavel as FrameworkIcon,
  Assessment as AuditIcon,
  Warning as RiskIcon,
  Description as PolicyIcon,
} from '@mui/icons-material';

export const ComplianceRiskModule: React.FC = () => {
  const navigate = useNavigate();

  const quickActions = [
    {
      title: 'Compliance Frameworks',
      description: 'Manage regulatory frameworks',
      icon: <FrameworkIcon sx={{ fontSize: 40 }} />,
      color: '#667eea',
      action: () => navigate('/compliance-risk/frameworks'),
    },
    {
      title: 'Assessments & Audits',
      description: 'Track compliance assessments',
      icon: <AuditIcon sx={{ fontSize: 40 }} />,
      color: '#10b981',
      action: () => navigate('/compliance-risk/assessments'),
    },
    {
      title: 'Risk Register',
      description: 'Identify and mitigate risks',
      icon: <RiskIcon sx={{ fontSize: 40 }} />,
      color: '#ef4444',
      action: () => navigate('/compliance-risk/risk-register'),
    },
    {
      title: 'Policies & Evidence',
      description: 'Document policies and evidence',
      icon: <PolicyIcon sx={{ fontSize: 40 }} />,
      color: '#f59e0b',
      action: () => navigate('/compliance-risk/policies'),
    },
  ];

  return (
    <Box>
      <Typography variant="h3" fontWeight={700} gutterBottom>
        Compliance, Risk & Trust
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        Enterprise compliance management and risk mitigation
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
                Compliance & Risk Overview
              </Typography>
              <Grid container spacing={3} sx={{ mt: 1 }}>
                <Grid item xs={6} md={3}>
                  <Box sx={{ textAlign: 'center' }}>
                    <Typography variant="h3" fontWeight={700} color="primary">
                      --
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Active Frameworks
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={6} md={3}>
                  <Box sx={{ textAlign: 'center' }}>
                    <Typography variant="h3" fontWeight={700} color="success.main">
                      --
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Compliance Score
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={6} md={3}>
                  <Box sx={{ textAlign: 'center' }}>
                    <Typography variant="h3" fontWeight={700} color="error.main">
                      --
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Open Risks
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={6} md={3}>
                  <Box sx={{ textAlign: 'center' }}>
                    <Typography variant="h3" fontWeight={700} color="info.main">
                      --
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Pending Audits
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
