import React from 'react';
import { Box, Typography, Card, CardContent, Tabs, Tab } from '@mui/material';

export const FinanceModule: React.FC = () => {
  const [tab, setTab] = React.useState(0);

  return (
    <Box>
      <Typography variant="h4" fontWeight={600} gutterBottom>
        Finance
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
        Manage invoices, payments, and financial reporting
      </Typography>

      <Card>
        <Tabs value={tab} onChange={(_, v) => setTab(v)}>
          <Tab label="Invoices" />
          <Tab label="Payments" />
          <Tab label="Reports" />
        </Tabs>
        <CardContent>
          {tab === 0 && (
            <Typography variant="body2">Invoice management interface</Typography>
          )}
          {tab === 1 && (
            <Typography variant="body2">Payment tracking interface</Typography>
          )}
          {tab === 2 && (
            <Typography variant="body2">Financial reports interface</Typography>
          )}
        </CardContent>
      </Card>
    </Box>
  );
};
