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
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Grid,
} from '@mui/material';
import {
  Search,
  Visibility,
  Edit,
  PersonAdd,
  FilterList,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

export const EmployeeList: React.FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [departmentFilter, setDepartmentFilter] = useState('all');

  // Mock data structure - API will provide this
  const employees = [
    {
      id: 1,
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@sentracore.com',
      department: 'Engineering',
      role: 'Senior Developer',
      status: 'active',
      hireDate: '2022-03-15',
    },
    {
      id: 2,
      firstName: 'Jane',
      lastName: 'Smith',
      email: 'jane.smith@sentracore.com',
      department: 'Compliance',
      role: 'Compliance Officer',
      status: 'active',
      hireDate: '2021-07-20',
    },
    {
      id: 3,
      firstName: 'Bob',
      lastName: 'Johnson',
      email: 'bob.johnson@sentracore.com',
      department: 'Operations',
      role: 'Operations Manager',
      status: 'on_leave',
      hireDate: '2020-11-05',
    },
  ];

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

  const getStatusLabel = (status: string) => {
    return status.replace('_', ' ').toUpperCase();
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Box>
          <Typography variant="h4" fontWeight={700} gutterBottom>
            Employees
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Manage employee records and information
          </Typography>
        </Box>
        <Button
          variant="contained"
          startIcon={<PersonAdd />}
          onClick={() => navigate('/hcm/employees/new')}
        >
          Add Employee
        </Button>
      </Box>

      {/* Filters */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                placeholder="Search employees..."
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
            <Grid item xs={12} md={4}>
              <FormControl fullWidth>
                <InputLabel>Status</InputLabel>
                <Select
                  value={statusFilter}
                  label="Status"
                  onChange={(e) => setStatusFilter(e.target.value)}
                >
                  <MenuItem value="all">All Statuses</MenuItem>
                  <MenuItem value="active">Active</MenuItem>
                  <MenuItem value="on_leave">On Leave</MenuItem>
                  <MenuItem value="inactive">Inactive</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={4}>
              <FormControl fullWidth>
                <InputLabel>Department</InputLabel>
                <Select
                  value={departmentFilter}
                  label="Department"
                  onChange={(e) => setDepartmentFilter(e.target.value)}
                >
                  <MenuItem value="all">All Departments</MenuItem>
                  <MenuItem value="engineering">Engineering</MenuItem>
                  <MenuItem value="compliance">Compliance</MenuItem>
                  <MenuItem value="operations">Operations</MenuItem>
                  <MenuItem value="finance">Finance</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Employee Table */}
      <Card>
        <CardContent>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Department</TableCell>
                  <TableCell>Role</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Hire Date</TableCell>
                  <TableCell align="right">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {employees.map((employee) => (
                  <TableRow key={employee.id} hover>
                    <TableCell>
                      <Typography variant="body2" fontWeight={600}>
                        {employee.firstName} {employee.lastName}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" color="text.secondary">
                        {employee.email}
                      </Typography>
                    </TableCell>
                    <TableCell>{employee.department}</TableCell>
                    <TableCell>{employee.role}</TableCell>
                    <TableCell>
                      <Chip
                        label={getStatusLabel(employee.status)}
                        color={getStatusColor(employee.status) as any}
                        size="small"
                      />
                    </TableCell>
                    <TableCell>
                      {new Date(employee.hireDate).toLocaleDateString()}
                    </TableCell>
                    <TableCell align="right">
                      <IconButton
                        size="small"
                        onClick={() => navigate(`/hcm/employees/${employee.id}`)}
                      >
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
