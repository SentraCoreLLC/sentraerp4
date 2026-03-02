import React, { useState } from 'react';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  TextField,
  MenuItem,
} from '@mui/material';
import {
  TrendingUp,
  Assessment,
  PieChart,
  ShowChart,
  Download,
  DateRange,
} from '@mui/icons-material';

export const AnalyticsDashboard: React.FC = () => {
  const [dateRange, setDateRange] = useState('30days');

  const kpiMetrics = [
    { title: 'Total Revenue', value: '$2.4M', change: '+12.5%', trend: 'up', color: '#667eea' },
    { title: 'Project Completion Rate', value: '87%', change: '+5%', trend: 'up', color: '#10b981' },
    { title: 'Employee Satisfaction', value: '4.2/5', change: '+0.3', trend: 'up', color: '#f59e0b' },
    { title: 'Compliance Score', value: '94%', change: '+2%', trend: 'up', color: '#ec4899' },
  ];

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Box>
          <Typography variant="h3" fontWeight={700} gutterBottom>
            Analytics & BI Dashboard
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Executive insights and business intelligence
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <TextField
            select
            size="small"
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            sx={{ minWidth: 150 }}
            InputProps={{
              startAdornment: <DateRange sx={{ mr: 1, color: 'text.secondary' }} />,
            }}
          >
            <MenuItem value="7days">Last 7 days</MenuItem>
            <MenuItem value="30days">Last 30 days</MenuItem>
            <MenuItem value="90days">Last 90 days</MenuItem>
            <MenuItem value="ytd">Year to date</MenuItem>
          </TextField>
          <Button variant="outlined" startIcon={<Download />}>
            Export
          </Button>
        </Box>
      </Box>

      {/* KPI Cards */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        {kpiMetrics.map((metric, index) => (
          <Grid item xs={12} sm={6} lg={3} key={index}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                  <Typography variant="caption" color="text.secondary">
                    {metric.title}
                  </Typography>
                  <TrendingUp sx={{ color: metric.color, fontSize: 20 }} />
                </Box>
                <Typography variant="h4" fontWeight={700} sx={{ mb: 1 }}>
                  {metric.value}
                </Typography>
                <Typography variant="body2" color="success.main" fontWeight={600}>
                  {metric.change} from last period
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Chart Placeholders */}
      <Grid container spacing={3}>
        <Grid item xs={12} lg={8}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                <ShowChart color="primary" />
                <Typography variant="h6" fontWeight={700}>
                  Revenue Trends
                </Typography>
              </Box>
              <Box
                sx={{
                  height: 300,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  bgcolor: 'action.hover',
                  borderRadius: 2,
                }}
              >
                <Typography variant="body2" color="text.secondary">
                  Chart visualization placeholder (Line Chart)
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} lg={4}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                <PieChart color="primary" />
                <Typography variant="h6" fontWeight={700}>
                  Department Distribution
                </Typography>
              </Box>
              <Box
                sx={{
                  height: 300,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  bgcolor: 'action.hover',
                  borderRadius: 2,
                }}
              >
                <Typography variant="body2" color="text.secondary">
                  Chart visualization placeholder (Pie Chart)
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                <Assessment color="primary" />
                <Typography variant="h6" fontWeight={700}>
                  Project Performance Matrix
                </Typography>
              </Box>
              <Box
                sx={{
                  height: 250,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  bgcolor: 'action.hover',
                  borderRadius: 2,
                }}
              >
                <Typography variant="body2" color="text.secondary">
                  Chart visualization placeholder (Bar Chart - Project comparison)
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};
