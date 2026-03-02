import React, { useState, useEffect } from 'react';
import {
  Box,
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  Alert,
  Container,
  InputAdornment,
  IconButton,
  Chip,
} from '@mui/material';
import { Visibility, VisibilityOff, Login as LoginIcon, Dashboard } from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '@/store/authStore';

const DEV_MODE = import.meta.env.VITE_DEV_MODE === 'true' || import.meta.env.DEV;

export const Login: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, isLoading, error, isAuthenticated, user } = useAuthStore();

  const [credentials, setCredentials] = useState({
    username: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);

  const from = (location.state as any)?.from?.pathname || '/dashboard';

  // Auto-redirect if already authenticated (dev mode)
  useEffect(() => {
    if (DEV_MODE && isAuthenticated) {
      console.log('🚀 Dev mode: Auto-redirecting to dashboard');
      const timer = setTimeout(() => {
        navigate(from, { replace: true });
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [DEV_MODE, isAuthenticated, navigate, from]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(credentials);
      navigate(from, { replace: true });
    } catch (err) {
      // Error handled by store
    }
  };

  const handleDevModeAccess = () => {
    navigate('/dashboard', { replace: true });
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        position: 'relative',
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'radial-gradient(circle at 20% 50%, rgba(120, 119, 198, 0.3), transparent 50%), radial-gradient(circle at 80% 80%, rgba(236, 72, 153, 0.3), transparent 50%)',
          animation: 'pulse 8s ease-in-out infinite',
        },
        '@keyframes pulse': {
          '0%, 100%': {
            opacity: 1,
          },
          '50%': {
            opacity: 0.8,
          },
        },
      }}
    >
      <Container maxWidth="sm">
        <Card 
          sx={{ 
            width: '100%', 
            maxWidth: 480,
            backdropFilter: 'blur(20px)',
            background: 'rgba(255, 255, 255, 0.95)',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
          }}
        >
          <CardContent sx={{ p: 5 }}>
            <Box sx={{ mb: 4, textAlign: 'center' }}>
              <Box
                sx={{
                  width: 64,
                  height: 64,
                  borderRadius: 3,
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  fontWeight: 700,
                  fontSize: '2rem',
                  margin: '0 auto 16px',
                  boxShadow: '0 10px 25px rgba(102, 126, 234, 0.4)',
                }}
              >
                S
              </Box>
              <Typography 
                variant="h3" 
                fontWeight={700} 
                gutterBottom
                sx={{
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                SentraERP
              </Typography>
              <Typography variant="body1" color="text.secondary" fontWeight={500}>
                Welcome back! Sign in to continue
              </Typography>
            </Box>

            {DEV_MODE && (
              <Alert 
                severity="success" 
                sx={{ 
                  mb: 3,
                  mt: 2,
                  borderRadius: 2,
                }}
                action={
                  <Button
                    color="inherit"
                    size="small"
                    startIcon={<Dashboard />}
                    onClick={handleDevModeAccess}
                    sx={{ fontWeight: 600 }}
                  >
                    Go to Dashboard
                  </Button>
                }
              >
                <Typography variant="body2" fontWeight={600}>
                  🚀 Development Mode Active
                </Typography>
                <Typography variant="caption" display="block">
                  Authentication bypassed. Logged in as: <strong>{user?.firstName} {user?.lastName} ({user?.role})</strong>
                </Typography>
              </Alert>
            )}

            {error && (
              <Alert 
                severity="error" 
                sx={{ 
                  mb: 3,
                  borderRadius: 2,
                }}
              >
                {error}
              </Alert>
            )}

            <form onSubmit={handleSubmit}>
              <TextField
                fullWidth
                label="Username"
                margin="normal"
                required
                value={credentials.username}
                onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
                autoComplete="username"
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 2,
                  }
                }}
              />
              <TextField
                fullWidth
                label="Password"
                type={showPassword ? 'text' : 'password'}
                margin="normal"
                required
                value={credentials.password}
                onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                autoComplete="current-password"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowPassword(!showPassword)}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 2,
                  }
                }}
              />
              <Button
                fullWidth
                type="submit"
                variant="contained"
                size="large"
                disabled={isLoading}
                startIcon={<LoginIcon />}
                sx={{ 
                  mt: 4,
                  py: 1.5,
                  fontSize: '1rem',
                }}
              >
                {isLoading ? 'Signing in...' : 'Sign In'}
              </Button>
            </form>

            <Box sx={{ mt: 3, textAlign: 'center' }}>
              <Typography variant="caption" color="text.secondary">
                SentraCore LLC © {new Date().getFullYear()}
              </Typography>
            </Box>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
};
