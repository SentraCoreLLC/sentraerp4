import React from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';

interface KPICardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  color: string;
}

export const KPICard: React.FC<KPICardProps> = ({ title, value, icon, color }) => {
  return (
    <Card>
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <Box>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              {title}
            </Typography>
            <Typography variant="h4" fontWeight={600}>
              {value}
            </Typography>
          </Box>
          <Box
            sx={{
              bgcolor: `${color}20`,
              color: color,
              p: 1.5,
              borderRadius: 2,
            }}
          >
            {icon}
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};
