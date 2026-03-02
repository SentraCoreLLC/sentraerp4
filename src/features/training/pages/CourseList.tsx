import React, { useState } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  Chip,
  IconButton,
  Button,
  TextField,
  InputAdornment,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from '@mui/material';
import { Search, Visibility, Edit, Add, AccessTime, People } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

export const CourseList: React.FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');

  const courses = [
    {
      id: 1,
      title: 'AI Literacy Fundamentals',
      category: 'ai_literacy',
      duration: 120,
      enrollments: 145,
      completionRate: 87,
      isActive: true,
      passingScore: 80,
    },
    {
      id: 2,
      title: 'Cybersecurity Awareness Training',
      category: 'cybersecurity',
      duration: 90,
      enrollments: 230,
      completionRate: 92,
      isActive: true,
      passingScore: 75,
    },
    {
      id: 3,
      title: 'Phishing Recognition & Response',
      category: 'phishing',
      duration: 45,
      enrollments: 198,
      completionRate: 95,
      isActive: true,
      passingScore: 85,
    },
    {
      id: 4,
      title: 'Building a Human Firewall',
      category: 'human_firewall',
      duration: 60,
      enrollments: 112,
      completionRate: 88,
      isActive: true,
      passingScore: 80,
    },
  ];

  const getCategoryColor = (category: string) => {
    const colors: Record<string, any> = {
      cybersecurity: 'error',
      ai_literacy: 'primary',
      compliance: 'secondary',
      phishing: 'warning',
      human_firewall: 'success',
    };
    return colors[category] || 'default';
  };

  const getCategoryLabel = (category: string) => {
    return category.replace('_', ' ').toUpperCase();
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Box>
          <Typography variant="h4" fontWeight={700} gutterBottom>
            Training Courses
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Manage course catalog and content
          </Typography>
        </Box>
        <Button variant="contained" startIcon={<Add />}>
          New Course
        </Button>
      </Box>

      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={12} md={9}>
              <TextField
                fullWidth
                placeholder="Search courses..."
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
                  <MenuItem value="ai_literacy">AI Literacy</MenuItem>
                  <MenuItem value="compliance">Compliance</MenuItem>
                  <MenuItem value="phishing">Phishing</MenuItem>
                  <MenuItem value="human_firewall">Human Firewall</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      <Grid container spacing={3}>
        {courses.map((course) => (
          <Grid item xs={12} md={6} lg={4} key={course.id}>
            <Card
              sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                transition: 'all 0.3s',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: 6,
                },
              }}
            >
              <CardContent sx={{ flexGrow: 1 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                  <Chip
                    label={getCategoryLabel(course.category)}
                    color={getCategoryColor(course.category)}
                    size="small"
                  />
                  <Chip
                    label={course.isActive ? 'ACTIVE' : 'INACTIVE'}
                    color={course.isActive ? 'success' : 'default'}
                    size="small"
                    variant="outlined"
                  />
                </Box>

                <Typography variant="h6" fontWeight={700} gutterBottom>
                  {course.title}
                </Typography>

                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mt: 2 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                    <AccessTime sx={{ fontSize: 18, color: 'text.secondary' }} />
                    <Typography variant="caption" color="text.secondary">
                      {course.duration} min
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                    <People sx={{ fontSize: 18, color: 'text.secondary' }} />
                    <Typography variant="caption" color="text.secondary">
                      {course.enrollments} enrolled
                    </Typography>
                  </Box>
                </Box>

                <Box sx={{ mt: 2 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                    <Typography variant="caption" color="text.secondary">
                      Completion Rate
                    </Typography>
                    <Typography variant="caption" fontWeight={600}>
                      {course.completionRate}%
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      width: '100%',
                      height: 6,
                      bgcolor: 'action.hover',
                      borderRadius: 3,
                      overflow: 'hidden',
                    }}
                  >
                    <Box
                      sx={{
                        width: `${course.completionRate}%`,
                        height: '100%',
                        bgcolor: 'success.main',
                      }}
                    />
                  </Box>
                </Box>

                <Box sx={{ display: 'flex', gap: 1, mt: 3 }}>
                  <Button
                    variant="outlined"
                    size="small"
                    fullWidth
                    startIcon={<Visibility />}
                    onClick={() => navigate(`/training/courses/${course.id}`)}
                  >
                    View
                  </Button>
                  <Button variant="outlined" size="small" fullWidth startIcon={<Edit />}>
                    Edit
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};
