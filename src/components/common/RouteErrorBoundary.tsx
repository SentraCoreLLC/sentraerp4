import React from 'react';
import { Box, Typography, Button, Card, CardContent } from '@mui/material';
import { useRouteError, useNavigate } from 'react-router-dom';
import { Home, Refresh } from '@mui/icons-material';

export const RouteErrorBoundary: React.FC = () => {
  const error = useRouteError() as any;
  const navigate = useNavigate();

  const errorMessage = error?.statusText || error?.message || 'An unexpected error occurred';
  const isNotFound = error?.status === 404;

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
      <Card sx={{ maxWidth: 600, width: '100%' }}>
        <CardContent sx={{ textAlign: 'center', py: 6, px: 4 }}>
          <Typography
            variant="h1"
            sx={{
              fontSize: isNotFound ? '120px' : '80px',
              fontWeight: 700,
              background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              mb: 2,
            }}
          >
            {isNotFound ? '404' : 'Oops!'}
          </Typography>
          <Typography variant="h4" fontWeight={700} gutterBottom>
            {isNotFound ? 'Page Not Found' : 'Something Went Wrong'}
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
            {isNotFound 
              ? "The page you're looking for doesn't exist or you don't have permission to access it."
              : "We're sorry, but something unexpected happened. Please try again."}
          </Typography>
          {!isNotFound && (
            <Typography variant="body2" color="text.secondary" sx={{ mb: 4, fontFamily: 'monospace' }}>
              Error: {errorMessage}
            </Typography>
          )}
          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Button
              variant="outlined"
              startIcon={<Refresh />}
              onClick={() => window.location.reload()}
            >
              Refresh Page
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
