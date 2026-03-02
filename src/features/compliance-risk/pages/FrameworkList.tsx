import React, { useState } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  Chip,
  Button,
  TextField,
  InputAdornment,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  LinearProgress,
  IconButton,
} from '@mui/material';
import { Search, Visibility, Add, Assessment, TrendingUp } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

export const FrameworkList: React.FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');

  const frameworks = [
    {
      id: 1,
      name: 'ISO 27001:2022',
      version: '2022',
      category: 'cybersecurity',
      status: 'active',
      controlCount: 93,
      complianceScore: 94,
      lastAssessed: '2024-01-15',
    },
    {
      id: 2,
      name: 'NIST Cybersecurity Framework',
      version: '2.0',
      category: 'cybersecurity',
      status: 'active',
      controlCount: 108,
      complianceScore: 89,
      lastAssessed: '2024-01-10',
    },
    {
      id: 3,
      name: 'GDPR',
      version: '2018',
      category: 'privacy',
      status: 'active',
      controlCount: 47,
      complianceScore: 96,
      lastAssessed: '2024-01-20',
    },
    {
      id: 4,
      name: 'SOC 2 Type II',
      version: '2023',
      category: 'industry',
      status: 'active',
      controlCount: 64,
      complianceScore: 92,
      lastAssessed: '2023-12-15',
    },
    {
      id: 5,
      name: 'POPIA',
      version: '2020',
      category: 'privacy',
      status: 'active',
      controlCount: 38,
      complianceScore: 88,
      lastAssessed: '2024-01-05',
    },
  ];

  const getCategoryColor = (category: string) => {
    const colors: Record<string, any> = {
      cybersecurity: 'error',
      privacy: 'primary',
      financial: 'success',
      industry: 'warning',
      other: 'info',
    };
    return colors[category] || 'default';
  };

  const getComplianceColor = (score: number) => {
    if (score >= 90) return 'success.main';
    if (score >= 75) return 'warning.main';
    return 'error.main';
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Box>
          <Typography variant="h4" fontWeight={700} gutterBottom>
            Compliance Frameworks
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Manage regulatory and compliance standards
          </Typography>
        </Box>
        <Button variant="contained" startIcon={<Add />}>
          Add Framework
        </Button>
      </Box>

      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={12} md={9}>
              <TextField
                fullWidth
                placeholder="Search frameworks..."
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
                <InputLabel>Category</InputLabel>
                <Select
                  value={categoryFilter}
                  label="Category"
                  onChange={(e) => setCategoryFilter(e.target.value)}
                >
                  <MenuItem value="all">All Categories</MenuItem>
                  <MenuItem value="cybersecurity">Cybersecurity</MenuItem>
                  <MenuItem value="privacy">Privacy</MenuItem>
                  <MenuItem value="financial">Financial</MenuItem>
                  <MenuItem value="industry">Industry</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      <Grid container spacing={3}>
        {frameworks.map((framework) => (
          <Grid item xs={12} md={6} lg={4} key={framework.id}>
            <Card
              sx={{
                height: '100%',
                transition: 'all 0.3s',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: 6,
                },
                cursor: 'pointer',
              }}
              onClick={() => navigate(`/compliance-risk/frameworks/${framework.id}`)}
            >
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                  <Chip
                    label={framework.category.toUpperCase()}
                    color={getCategoryColor(framework.category)}
                    size="small"
                  />
                  <Chip
                    label={framework.status.toUpperCase()}
                    color="success"
                    size="small"
                    variant="outlined"
                  />
                </Box>

                <Typography variant="h6" fontWeight={700} gutterBottom>
                  {framework.name}
                </Typography>
                <Typography variant="caption" color="text.secondary" display="block" sx={{ mb: 2 }}>
                  Version {framework.version} • {framework.controlCount} controls
                </Typography>

                <Box sx={{ mb: 2 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 0.5 }}>
                    <Typography variant="caption" color="text.secondary">
                      Compliance Score
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                      <Typography
                        variant="body2"
                        fontWeight={700}
                        sx={{ color: getComplianceColor(framework.complianceScore) }}
                      >
                        {framework.complianceScore}%
                      </Typography>
                      <TrendingUp sx={{ fontSize: 16, color: 'success.main' }} />
                    </Box>
                  </Box>
                  <LinearProgress
                    variant="determinate"
                    value={framework.complianceScore}
                    sx={{
                      height: 8,
                      borderRadius: 4,
                      bgcolor: 'action.hover',
                      '& .MuiLinearProgress-bar': {
                        bgcolor: getComplianceColor(framework.complianceScore),
                      },
                    }}
                  />
                </Box>

                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2 }}>
                  <Typography variant="caption" color="text.secondary">
                    Last assessed: {new Date(framework.lastAssessed).toLocaleDateString()}
                  </Typography>
                  <IconButton size="small" color="primary">
                    <Visibility fontSize="small" />
                  </IconButton>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};
