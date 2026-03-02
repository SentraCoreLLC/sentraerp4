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
  TextField,
  InputAdornment,
  Grid,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from '@mui/material';
import { Search, Visibility, Add, AccessTime } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

export const ServiceTickets: React.FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');

  const tickets = [
    {
      id: 1,
      clientName: 'TechCorp Solutions',
      title: 'Firewall configuration review needed',
      type: 'service_request',
      priority: 'high',
      status: 'in_progress',
      assignedTo: 'Bob Smith',
      createdDate: '2024-01-27 09:15:00',
      slaDeadline: '2024-01-28 17:00:00',
    },
    {
      id: 2,
      clientName: 'FinSecure Banking',
      title: 'Potential phishing email reported',
      type: 'incident',
      priority: 'critical',
      status: 'open',
      assignedTo: 'Alice Johnson',
      createdDate: '2024-01-27 14:30:00',
      slaDeadline: '2024-01-27 18:30:00',
    },
    {
      id: 3,
      clientName: 'HealthData Inc',
      title: 'Question about HIPAA compliance requirements',
      type: 'question',
      priority: 'low',
      status: 'pending_client',
      assignedTo: 'Carol Williams',
      createdDate: '2024-01-26 11:20:00',
      slaDeadline: '2024-01-29 17:00:00',
    },
  ];

  const getPriorityColor = (priority: string) => {
    const colors: Record<string, any> = {
      low: 'info',
      medium: 'primary',
      high: 'warning',
      critical: 'error',
    };
    return colors[priority] || 'default';
  };

  const getStatusColor = (status: string) => {
    const colors: Record<string, any> = {
      open: 'error',
      in_progress: 'primary',
      pending_client: 'warning',
      resolved: 'success',
      closed: 'default',
    };
    return colors[status] || 'default';
  };

  const getTypeIcon = (type: string) => {
    return type.replace('_', ' ').toUpperCase();
  };

  const getSLAStatus = (deadline: string) => {
    const now = new Date();
    const sla = new Date(deadline);
    const hoursRemaining = (sla.getTime() - now.getTime()) / (1000 * 60 * 60);
    
    if (hoursRemaining < 0) return { color: 'error', text: 'OVERDUE' };
    if (hoursRemaining < 2) return { color: 'error', text: `${Math.round(hoursRemaining)}h remaining` };
    if (hoursRemaining < 4) return { color: 'warning', text: `${Math.round(hoursRemaining)}h remaining` };
    return { color: 'success', text: 'On Track' };
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Box>
          <Typography variant="h4" fontWeight={700} gutterBottom>
            Service Tickets
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Track client requests, incidents, and questions
          </Typography>
        </Box>
        <Button variant="contained" startIcon={<Add />}>
          New Ticket
        </Button>
      </Box>

      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                placeholder="Search tickets..."
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
                <InputLabel>Status</InputLabel>
                <Select
                  value={statusFilter}
                  label="Status"
                  onChange={(e) => setStatusFilter(e.target.value)}
                >
                  <MenuItem value="all">All Statuses</MenuItem>
                  <MenuItem value="open">Open</MenuItem>
                  <MenuItem value="in_progress">In Progress</MenuItem>
                  <MenuItem value="pending_client">Pending Client</MenuItem>
                  <MenuItem value="resolved">Resolved</MenuItem>
                  <MenuItem value="closed">Closed</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={3}>
              <FormControl fullWidth>
                <InputLabel>Priority</InputLabel>
                <Select
                  value={priorityFilter}
                  label="Priority"
                  onChange={(e) => setPriorityFilter(e.target.value)}
                >
                  <MenuItem value="all">All Priorities</MenuItem>
                  <MenuItem value="low">Low</MenuItem>
                  <MenuItem value="medium">Medium</MenuItem>
                  <MenuItem value="high">High</MenuItem>
                  <MenuItem value="critical">Critical</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      <Card>
        <CardContent>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Ticket ID</TableCell>
                  <TableCell>Title</TableCell>
                  <TableCell>Client</TableCell>
                  <TableCell>Type</TableCell>
                  <TableCell>Priority</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Assigned To</TableCell>
                  <TableCell>SLA</TableCell>
                  <TableCell align="right">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {tickets.map((ticket) => {
                  const slaStatus = getSLAStatus(ticket.slaDeadline);
                  return (
                    <TableRow key={ticket.id} hover>
                      <TableCell>
                        <Typography variant="body2" fontWeight={600}>
                          #{ticket.id.toString().padStart(4, '0')}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2" fontWeight={600}>
                          {ticket.title}
                        </Typography>
                      </TableCell>
                      <TableCell>{ticket.clientName}</TableCell>
                      <TableCell>
                        <Chip
                          label={getTypeIcon(ticket.type)}
                          size="small"
                          variant="outlined"
                        />
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={ticket.priority.toUpperCase()}
                          color={getPriorityColor(ticket.priority)}
                          size="small"
                        />
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={ticket.status.replace('_', ' ').toUpperCase()}
                          color={getStatusColor(ticket.status)}
                          size="small"
                        />
                      </TableCell>
                      <TableCell>{ticket.assignedTo}</TableCell>
                      <TableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                          <AccessTime sx={{ fontSize: 16, color: `${slaStatus.color}.main` }} />
                          <Typography
                            variant="caption"
                            sx={{ color: `${slaStatus.color}.main` }}
                            fontWeight={600}
                          >
                            {slaStatus.text}
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell align="right">
                        <IconButton
                          size="small"
                          onClick={() => navigate(`/engagements/tickets/${ticket.id}`)}
                        >
                          <Visibility fontSize="small" />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>
    </Box>
  );
};
