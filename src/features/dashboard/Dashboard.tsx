import React, { useState, useEffect } from 'react';
import { Grid, Card, CardContent, Typography, Box, Chip } from '@mui/material';
import {
  TrendingUp,
  TrendingDown,
  AccountBalance,
  Warning,
  CheckCircle,
  CalendarToday,
  Schedule,
} from '@mui/icons-material';
import { useAuthStore } from '@/store/authStore';

interface KPICardProps {
  title: string;
  value: string;
  trend?: 'up' | 'down';
  trendValue?: string;
  icon: React.ReactNode;
  color: string;
  gradientFrom: string;
  gradientTo: string;
}

const KPICard: React.FC<KPICardProps> = ({ 
  title, 
  value, 
  trend, 
  trendValue, 
  icon, 
  color,
  gradientFrom,
  gradientTo,
}) => (
  <Card 
    sx={{
      position: 'relative',
      overflow: 'visible',
      '&::before': {
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: '4px',
        background: `linear-gradient(90deg, ${gradientFrom} 0%, ${gradientTo} 100%)`,
        borderRadius: '16px 16px 0 0',
      }
    }}
  >
    <CardContent sx={{ pt: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <Box sx={{ flex: 1 }}>
          <Typography variant="body2" color="text.secondary" fontWeight={500} gutterBottom>
            {title}
          </Typography>
          <Typography variant="h3" fontWeight={700} sx={{ mb: 1 }}>
            {value}
          </Typography>
          {trend && trendValue && (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              {trend === 'up' ? (
                <TrendingUp fontSize="small" sx={{ color: '#10b981' }} />
              ) : (
                <TrendingDown fontSize="small" sx={{ color: '#ef4444' }} />
              )}
              <Typography 
                variant="body2" 
                fontWeight={600}
                sx={{ color: trend === 'up' ? '#10b981' : '#ef4444' }}
              >
                {trendValue}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                vs last month
              </Typography>
            </Box>
          )}
        </Box>
        <Box
          sx={{
            background: `linear-gradient(135deg, ${gradientFrom} 0%, ${gradientTo} 100%)`,
            p: 2,
            borderRadius: 3,
            color: 'white',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: `0 8px 16px ${color}40`,
          }}
        >
          {icon}
        </Box>
      </Box>
    </CardContent>
  </Card>
);

export const Dashboard: React.FC = () => {
  const { user } = useAuthStore();
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-GB', { 
      day: 'numeric', 
      month: 'short', 
      year: 'numeric' 
    });
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      second: '2-digit',
      hour12: true 
    });
  };

  const getGreeting = () => {
    const hour = currentTime.getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  };

  return (
    <Box>
      {/* Header Section */}
      <Box sx={{ mb: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
          <Box>
            <Typography variant="h3" fontWeight={700} gutterBottom>
              {getGreeting()}, {user?.firstName}! 👋
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
              Here's what's happening with your business today
            </Typography>
            <Chip 
              label={user?.role || 'User'} 
              size="small" 
              sx={{ 
                fontWeight: 600,
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                color: 'white',
              }}
            />
          </Box>
          <Box sx={{ textAlign: 'right' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
              <CalendarToday sx={{ fontSize: 18, color: 'text.secondary' }} />
              <Typography variant="body1" fontWeight={600}>
                {formatDate(currentTime)}
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Schedule sx={{ fontSize: 18, color: 'text.secondary' }} />
              <Typography variant="h6" fontWeight={700} sx={{
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}>
                {formatTime(currentTime)}
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>

      {/* KPI Cards */}
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} lg={3}>
          <KPICard
            title="Total Revenue"
            value="$2.4M"
            trend="up"
            trendValue="+12.5%"
            icon={<AccountBalance sx={{ fontSize: 28 }} />}
            color="#667eea"
            gradientFrom="#667eea"
            gradientTo="#764ba2"
          />
        </Grid>
        <Grid item xs={12} sm={6} lg={3}>
          <KPICard
            title="Active Projects"
            value="24"
            trend="up"
            trendValue="+3"
            icon={<CheckCircle sx={{ fontSize: 28 }} />}
            color="#10b981"
            gradientFrom="#10b981"
            gradientTo="#059669"
          />
        </Grid>
        <Grid item xs={12} sm={6} lg={3}>
          <KPICard
            title="Pending Audits"
            value="7"
            icon={<Warning sx={{ fontSize: 28 }} />}
            color="#f59e0b"
            gradientFrom="#f59e0b"
            gradientTo="#d97706"
          />
        </Grid>
        <Grid item xs={12} sm={6} lg={3}>
          <KPICard
            title="Compliance Score"
            value="94%"
            trend="up"
            trendValue="+2%"
            icon={<CheckCircle sx={{ fontSize: 28 }} />}
            color="#10b981"
            gradientFrom="#10b981"
            gradientTo="#059669"
          />
        </Grid>

        {/* Activity & Quick Actions */}
        <Grid item xs={12} lg={8}>
          <Card>
            <CardContent>
              <Typography variant="h6" fontWeight={700} gutterBottom>
                Recent Activity
              </Typography>
              <Box sx={{ 
                mt: 3,
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
              }}>
                {[1, 2, 3, 4].map((item) => (
                  <Box 
                    key={item}
                    sx={{ 
                      display: 'flex', 
                      alignItems: 'center',
                      gap: 2,
                      p: 2,
                      borderRadius: 2,
                      bgcolor: 'action.hover',
                      transition: 'all 0.2s',
                      '&:hover': {
                        bgcolor: 'action.selected',
                        transform: 'translateX(4px)',
                      }
                    }}
                  >
                    <Box
                      sx={{
                        width: 8,
                        height: 8,
                        borderRadius: '50%',
                        bgcolor: item === 1 ? 'success.main' : 'primary.main',
                      }}
                    />
                    <Typography variant="body2" color="text.secondary">
                      Activity item {item} - Placeholder for real activity data
                    </Typography>
                  </Box>
                ))}
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} lg={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" fontWeight={700} gutterBottom>
                Quick Actions
              </Typography>
              <Box sx={{ mt: 3, display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                {['New Invoice', 'Add Project', 'Schedule Audit', 'Generate Report'].map((action) => (
                  <Box
                    key={action}
                    sx={{
                      p: 2,
                      borderRadius: 2,
                      border: '2px solid',
                      borderColor: 'divider',
                      cursor: 'pointer',
                      transition: 'all 0.2s',
                      '&:hover': {
                        borderColor: 'primary.main',
                        background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%)',
                        transform: 'translateY(-2px)',
                      }
                    }}
                  >
                    <Typography variant="body2" fontWeight={600}>
                      {action}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};
