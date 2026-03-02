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
  LinearProgress,
  Grid,
} from '@mui/material';
import { Visibility, Add, TrendingUp, TrendingDown } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

export const PhishingCampaigns: React.FC = () => {
  const navigate = useNavigate();

  const campaigns = [
    {
      id: 1,
      name: 'Q1 2024 Phishing Test - TechCorp',
      clientName: 'TechCorp Solutions',
      status: 'completed',
      startDate: '2024-01-15',
      targetCount: 450,
      clickedCount: 45,
      reportedCount: 398,
      compromisedCount: 7,
      successRate: 88,
    },
    {
      id: 2,
      name: 'Finance Department Targeted Test',
      clientName: 'FinSecure Banking',
      status: 'active',
      startDate: '2024-01-25',
      targetCount: 85,
      clickedCount: 12,
      reportedCount: 68,
      compromisedCount: 5,
      successRate: 80,
    },
  ];

  const getStatusColor = (status: string) => {
    const colors: Record<string, any> = {
      draft: 'default',
      scheduled: 'info',
      active: 'primary',
      completed: 'success',
    };
    return colors[status] || 'default';
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Box>
          <Typography variant="h4" fontWeight={700} gutterBottom>
            Phishing Simulations
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Test and improve human firewall readiness
          </Typography>
        </Box>
        <Button variant="contained" startIcon={<Add />}>
          New Campaign
        </Button>
      </Box>

      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography variant="caption" color="text.secondary">
                Active Campaigns
              </Typography>
              <Typography variant="h3" fontWeight={700}>1</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography variant="caption" color="text.secondary">
                Avg Success Rate
              </Typography>
              <Typography variant="h3" fontWeight={700} color="success.main">84%</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography variant="caption" color="text.secondary">
                Total Targets
              </Typography>
              <Typography variant="h3" fontWeight={700}>535</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography variant="caption" color="text.secondary">
                Reported Rate
              </Typography>
              <Typography variant="h3" fontWeight={700} color="success.main">87%</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Card>
        <CardContent>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Campaign</TableCell>
                  <TableCell>Client</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Targets</TableCell>
                  <TableCell>Clicked</TableCell>
                  <TableCell>Reported</TableCell>
                  <TableCell>Success Rate</TableCell>
                  <TableCell align="right">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {campaigns.map((campaign) => (
                  <TableRow key={campaign.id} hover>
                    <TableCell>
                      <Typography variant="body2" fontWeight={600}>
                        {campaign.name}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        Started: {new Date(campaign.startDate).toLocaleDateString()}
                      </Typography>
                    </TableCell>
                    <TableCell>{campaign.clientName}</TableCell>
                    <TableCell>
                      <Chip
                        label={campaign.status.toUpperCase()}
                        color={getStatusColor(campaign.status)}
                        size="small"
                      />
                    </TableCell>
                    <TableCell>{campaign.targetCount}</TableCell>
                    <TableCell>
                      <Box>
                        <Typography variant="body2" fontWeight={600} color="error.main">
                          {campaign.clickedCount} ({Math.round((campaign.clickedCount / campaign.targetCount) * 100)}%)
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Box>
                        <Typography variant="body2" fontWeight={600} color="success.main">
                          {campaign.reportedCount} ({Math.round((campaign.reportedCount / campaign.targetCount) * 100)}%)
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mb: 0.5 }}>
                          <Typography variant="body2" fontWeight={600}>
                            {campaign.successRate}%
                          </Typography>
                          {campaign.successRate >= 85 ? (
                            <TrendingUp sx={{ fontSize: 16, color: 'success.main' }} />
                          ) : (
                            <TrendingDown sx={{ fontSize: 16, color: 'warning.main' }} />
                          )}
                        </Box>
                        <LinearProgress
                          variant="determinate"
                          value={campaign.successRate}
                          sx={{
                            height: 6,
                            borderRadius: 3,
                            bgcolor: 'action.hover',
                            '& .MuiLinearProgress-bar': {
                              bgcolor: campaign.successRate >= 85 ? 'success.main' : 'warning.main',
                            },
                          }}
                        />
                      </Box>
                    </TableCell>
                    <TableCell align="right">
                      <IconButton
                        size="small"
                        onClick={() => navigate(`/training/phishing/${campaign.id}`)}
                      >
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
