import React from 'react';
import { Box, Typography, Card, CardContent, Tabs, Tab } from '@mui/material';

export const OperationsModule: React.FC = () => {
  const [tab, setTab] = React.useState(0);

  return (
    <Box>
      <Typography variant="h4" fontWeight={600} gutterBottom>
        Operations
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
        Project and task management
      </Typography>

      <Card>
        <Tabs value={tab} onChange={(_, v) => setTab(v)}>
          <Tab label="Projects" />
          <Tab label="Tasks" />
          <Tab label="Resources" />
        </Tabs>
        <CardContent>
          {tab === 0 && (
            <Typography variant="body2">Project list and details</Typography>
          )}
          {tab === 1 && (
            <Typography variant="body2">Task board interface</Typography>
          )}
          {tab === 2 && (
            <Typography variant="body2">Resource allocation interface</Typography>
          )}
        </CardContent>
      </Card>
    </Box>
  );
};
