import { useMemo, Suspense } from 'react';
import { RouterProvider } from 'react-router-dom';
import { ThemeProvider, CssBaseline, Box, CircularProgress } from '@mui/material';
import { router } from './router';
import { createAppTheme } from './theme';
import { useThemeStore } from '@/store/themeStore';
import { ErrorBoundary } from '@/components/common/ErrorBoundary';
import { DevModeBanner } from '@/components/common/DevModeBanner';

function App() {
  console.log('🚀 App component rendering');
  const { mode } = useThemeStore();
  const theme = useMemo(() => createAppTheme(mode), [mode]);
  console.log('✅ App initialized with mode:', mode);

  return (
    <ErrorBoundary>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Suspense fallback={
          <Box sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center', 
            minHeight: '100vh',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          }}>
            <CircularProgress size={60} sx={{ color: 'white' }} />
          </Box>
        }>
          <RouterProvider router={router} />
          <DevModeBanner />
        </Suspense>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
