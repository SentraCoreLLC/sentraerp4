import React, { useState } from 'react';
import { Box, Toolbar, useMediaQuery, useTheme } from '@mui/material';
import { Outlet } from 'react-router-dom';
import { Sidebar, DRAWER_WIDTH, DRAWER_WIDTH_COLLAPSED } from './Sidebar';
import { TopBar } from './TopBar';

export const MainLayout: React.FC = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  
  const drawerWidth = sidebarCollapsed ? DRAWER_WIDTH_COLLAPSED : DRAWER_WIDTH;

  return (
    <Box sx={{ display: 'flex' }}>
      <Sidebar 
        isCollapsed={sidebarCollapsed} 
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
        mobileOpen={mobileOpen}
        onMobileClose={() => setMobileOpen(false)}
      />
      <TopBar 
        drawerWidth={isMobile ? 0 : drawerWidth} 
        onMobileMenuClick={() => setMobileOpen(true)}
      />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: { xs: 2, sm: 3 },
          width: {
            xs: '100%',
            md: `calc(100% - ${drawerWidth}px)`,
          },
          minHeight: '100vh',
          bgcolor: 'background.default',
          transition: 'width 0.3s ease-in-out, margin 0.3s ease-in-out',
        }}
      >
        <Toolbar />
        <Outlet />
      </Box>
    </Box>
  );
};
