import React from 'react';
import { Box, Typography, Button, Card, CardContent } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Home, ArrowBack } from '@mui/icons-material';

export const NotFound: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        p: 2,
      }}
    >
      <Card sx={{ maxWidth: 500, width: '100%' }}>
        <CardContent sx={{ textAlign: 'center', py: 6, px: 4 }}>
          <Typography
            variant="h1"
            sx={{
              fontSize: '120px',
              fontWeight: 700,
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              mb: 2,
            }}
          >
            404
          </Typography>
          <Typography variant="h4" fontWeight={700} gutterBottom>
            Page Not Found
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
            The page you're looking for doesn't exist or you don't have permission to access it.
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center' }}>
            <Button
              variant="outlined"
              startIcon={<ArrowBack />}
              onClick={() => navigate(-1)}
            >
              Go Back
            </Button>
            <Button
              variant="contained"
              startIcon={<Home />}
              onClick={() => navigate('/dashboard')}
            >
              Go to Dashboard
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};
