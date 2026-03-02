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
import { Search, Visibility, Edit, Add } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

export const RiskRegister: React.FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [severityFilter, setSeverityFilter] = useState('all');

  const risks = [
    {
      id: 1,
      title: 'Data Breach - Customer Database',
      category: 'technology',
      severity: 'critical',
      likelihood: 'possible',
      status: 'mitigating',
      owner: 'Security Team',
      identifiedDate: '2024-01-10',
    },
    {
      id: 2,
      title: 'Regulatory Non-Compliance - GDPR',
      category: 'compliance',
      severity: 'high',
      likelihood: 'unlikely',
      status: 'monitoring',
      owner: 'Compliance Officer',
      identifiedDate: '2024-01-15',
    },
  ];

  const getSeverityColor = (severity: string) => {
    const colors: Record<string, any> = {
      low: 'info',
      medium: 'warning',
      high: 'error',
      critical: 'error',
    };
    return colors[severity] || 'default';
  };

  const getStatusColor = (status: string) => {
    const colors: Record<string, any> = {
      identified: 'default',
      assessed: 'info',
      mitigating: 'warning',
      monitoring: 'primary',
      closed: 'success',
    };
    return colors[status] || 'default';
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Box>
          <Typography variant="h4" fontWeight={700} gutterBottom>
            Risk Register
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Identify, assess, and mitigate organizational risks
          </Typography>
        </Box>
        <Button variant="contained" startIcon={<Add />}>
          Add Risk
        </Button>
      </Box>

      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                placeholder="Search risks..."
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
                <InputLabel>Severity</InputLabel>
                <Select
                  value={severityFilter}
                  label="Severity"
                  onChange={(e) => setSeverityFilter(e.target.value)}
                >
                  <MenuItem value="all">All Severities</MenuItem>
                  <MenuItem value="low">Low</MenuItem>
                  <MenuItem value="medium">Medium</MenuItem>
                  <MenuItem value="high">High</MenuItem>
                  <MenuItem value="critical">Critical</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={3}>
              <FormControl fullWidth>
                <InputLabel>Status</InputLabel>
                <Select value="all" label="Status">
                  <MenuItem value="all">All Statuses</MenuItem>
                  <MenuItem value="identified">Identified</MenuItem>
                  <MenuItem value="assessed">Assessed</MenuItem>
                  <MenuItem value="mitigating">Mitigating</MenuItem>
                  <MenuItem value="monitoring">Monitoring</MenuItem>
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
                  <TableCell>Risk Title</TableCell>
                  <TableCell>Category</TableCell>
                  <TableCell>Severity</TableCell>
                  <TableCell>Likelihood</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Owner</TableCell>
                  <TableCell>Identified</TableCell>
                  <TableCell align="right">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {risks.map((risk) => (
                  <TableRow key={risk.id} hover>
                    <TableCell>
                      <Typography variant="body2" fontWeight={600}>
                        {risk.title}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Chip label={risk.category.toUpperCase()} size="small" variant="outlined" />
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={risk.severity.toUpperCase()}
                        color={getSeverityColor(risk.severity)}
                        size="small"
                      />
                    </TableCell>
                    <TableCell>{risk.likelihood.replace('_', ' ')}</TableCell>
                    <TableCell>
                      <Chip
                        label={risk.status.toUpperCase()}
                        color={getStatusColor(risk.status)}
                        size="small"
                      />
                    </TableCell>
                    <TableCell>{risk.owner}</TableCell>
                    <TableCell>
                      {new Date(risk.identifiedDate).toLocaleDateString()}
                    </TableCell>
                    <TableCell align="right">
                      <IconButton size="small" onClick={() => navigate(`/compliance-risk/risk-register/${risk.id}`)}>
                        <Visibility fontSize="small" />
                      </IconButton>
                      <IconButton size="small">
                        <Edit fontSize="small" />
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
