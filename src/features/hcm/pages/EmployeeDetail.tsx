import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  Avatar,
  Chip,
  Button,
  Divider,
  List,
  ListItem,
  ListItemText,
  IconButton,
} from '@mui/material';
import {
  ArrowBack,
  Edit,
  Email,
  Phone,
  LocationOn,
  CalendarToday,
  Business,
} from '@mui/icons-material';

export const EmployeeDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  // Mock employee data - will come from API
  const employee = {
    id: parseInt(id || '1'),
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@sentracore.com',
    phone: '+1 (555) 123-4567',
    department: 'Engineering',
    role: 'Senior Developer',
    status: 'active',
    hireDate: '2022-03-15',
    location: 'New York, USA',
    reportingTo: 'Jane Manager',
    teamSize: 5,
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'success';
      case 'on_leave':
        return 'warning';
      case 'inactive':
        return 'default';
      default:
        return 'default';
    }
  };

  const getInitials = (firstName: string, lastName: string) => {
    return `${firstName[0]}${lastName[0]}`.toUpperCase();
  };

  return (
    <Box>
      {/* Header */}
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
        <IconButton onClick={() => navigate('/hcm/employees')} sx={{ mr: 2 }}>
          <ArrowBack />
        </IconButton>
        <Box sx={{ flexGrow: 1 }}>
          <Typography variant="h4" fontWeight={700}>
            Employee Profile
          </Typography>
        </Box>
        <Button variant="contained" startIcon={<Edit />}>
          Edit Profile
        </Button>
      </Box>

      <Grid container spacing={3}>
        {/* Profile Card */}
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent sx={{ textAlign: 'center', py: 4 }}>
              <Avatar
                sx={{
                  width: 120,
                  height: 120,
                  margin: '0 auto 16px',
                  fontSize: '2.5rem',
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                }}
              >
                {getInitials(employee.firstName, employee.lastName)}
              </Avatar>
              <Typography variant="h5" fontWeight={700} gutterBottom>
                {employee.firstName} {employee.lastName}
              </Typography>
              <Typography variant="body1" color="text.secondary" gutterBottom>
                {employee.role}
              </Typography>
              <Chip
                label={employee.status.replace('_', ' ').toUpperCase()}
                color={getStatusColor(employee.status) as any}
                sx={{ mt: 1 }}
              />

              <Divider sx={{ my: 3 }} />

              <Box sx={{ textAlign: 'left' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Email sx={{ mr: 2, color: 'text.secondary' }} />
                  <Typography variant="body2">{employee.email}</Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Phone sx={{ mr: 2, color: 'text.secondary' }} />
                  <Typography variant="body2">{employee.phone}</Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Business sx={{ mr: 2, color: 'text.secondary' }} />
                  <Typography variant="body2">{employee.department}</Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <LocationOn sx={{ mr: 2, color: 'text.secondary' }} />
                  <Typography variant="body2">{employee.location}</Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Details Tabs */}
        <Grid item xs={12} md={8}>
          <Card>
            <CardContent>
              <Typography variant="h6" fontWeight={700} gutterBottom>
                Employment Details
              </Typography>
              <Grid container spacing={3} sx={{ mt: 1 }}>
                <Grid item xs={12} sm={6}>
                  <Typography variant="caption" color="text.secondary">
                    Hire Date
                  </Typography>
                  <Typography variant="body1" fontWeight={600}>
                    {new Date(employee.hireDate).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="caption" color="text.secondary">
                    Reporting To
                  </Typography>
                  <Typography variant="body1" fontWeight={600}>
                    {employee.reportingTo}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="caption" color="text.secondary">
                    Department
                  </Typography>
                  <Typography variant="body1" fontWeight={600}>
                    {employee.department}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="caption" color="text.secondary">
                    Team Size
                  </Typography>
                  <Typography variant="body1" fontWeight={600}>
                    {employee.teamSize} members
                  </Typography>
                </Grid>
              </Grid>
            </CardContent>
          </Card>

          <Card sx={{ mt: 3 }}>
            <CardContent>
              <Typography variant="h6" fontWeight={700} gutterBottom>
                Recent Activity
              </Typography>
              <List>
                <ListItem>
                  <ListItemText
                    primary="Leave request approved"
                    secondary="2 days ago"
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="Performance review completed"
                    secondary="1 week ago"
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="Training course: Cybersecurity Fundamentals completed"
                    secondary="2 weeks ago"
                  />
                </ListItem>
              </List>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};
