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
import { Search, Visibility, Add, Download } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

export const InvoiceList: React.FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const invoices = [
    { id: 1, number: 'INV-2024-001', client: 'TechCorp Solutions', amount: 25000, status: 'paid', dueDate: '2024-01-15', paidDate: '2024-01-10' },
    { id: 2, number: 'INV-2024-002', client: 'FinSecure Banking', amount: 35000, status: 'pending', dueDate: '2024-02-01', paidDate: null },
    { id: 3, number: 'INV-2024-003', client: 'HealthData Inc', amount: 18000, status: 'overdue', dueDate: '2024-01-20', paidDate: null },
  ];

  const getStatusColor = (status: string) => {
    const colors: Record<string, any> = {
      paid: 'success',
      pending: 'warning',
      overdue: 'error',
      cancelled: 'default',
    };
    return colors[status] || 'default';
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Box>
          <Typography variant="h4" fontWeight={700} gutterBottom>
            Invoices
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Manage client invoices and billing
          </Typography>
        </Box>
        <Button variant="contained" startIcon={<Add />}>
          New Invoice
        </Button>
      </Box>

      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={12} md={9}>
              <TextField
                fullWidth
                placeholder="Search invoices..."
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
                  <MenuItem value="paid">Paid</MenuItem>
                  <MenuItem value="pending">Pending</MenuItem>
                  <MenuItem value="overdue">Overdue</MenuItem>
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
                  <TableCell>Invoice #</TableCell>
                  <TableCell>Client</TableCell>
                  <TableCell>Amount</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Due Date</TableCell>
                  <TableCell>Paid Date</TableCell>
                  <TableCell align="right">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {invoices.map((invoice) => (
                  <TableRow key={invoice.id} hover>
                    <TableCell>
                      <Typography variant="body2" fontWeight={600}>
                        {invoice.number}
                      </Typography>
                    </TableCell>
                    <TableCell>{invoice.client}</TableCell>
                    <TableCell>
                      <Typography variant="body2" fontWeight={600}>
                        ${invoice.amount.toLocaleString()}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={invoice.status.toUpperCase()}
                        color={getStatusColor(invoice.status)}
                        size="small"
                      />
                    </TableCell>
                    <TableCell>
                      {new Date(invoice.dueDate).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      {invoice.paidDate ? new Date(invoice.paidDate).toLocaleDateString() : '-'}
                    </TableCell>
                    <TableCell align="right">
                      <IconButton size="small">
                        <Visibility fontSize="small" />
                      </IconButton>
                      <IconButton size="small">
                        <Download fontSize="small" />
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
