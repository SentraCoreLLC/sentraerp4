import React from 'react';
import { Box, Typography, Chip } from '@mui/material';
import { Code, Person } from '@mui/icons-material';
import { useAuthStore } from '@/store/authStore';

const DEV_MODE = import.meta.env.VITE_DEV_MODE === 'true' || import.meta.env.DEV;

export const DevModeBanner: React.FC = () => {
  const { user } = useAuthStore();

  if (!DEV_MODE) return null;

  return (
    <Box
      sx={{
        position: 'fixed',
        bottom: 16,
        right: 16,
        zIndex: 9999,
        display: 'flex',
        gap: 1,
        flexDirection: 'column',
        alignItems: 'flex-end',
      }}
    >
      <Chip
        icon={<Code />}
        label="DEV MODE"
        color="success"
        size="small"
        sx={{
          fontWeight: 700,
          boxShadow: '0 4px 12px rgba(16, 185, 129, 0.4)',
          animation: 'pulse 2s ease-in-out infinite',
          '@keyframes pulse': {
            '0%, 100%': { opacity: 1 },
            '50%': { opacity: 0.7 },
          },
        }}
      />
      <Chip
        icon={<Person />}
        label={`${user?.firstName} ${user?.lastName} (${user?.role})`}
        size="small"
        variant="outlined"
        sx={{
          bgcolor: 'background.paper',
          borderColor: 'success.main',
          color: 'success.main',
          fontWeight: 600,
        }}
      />
    </Box>
  );
};
