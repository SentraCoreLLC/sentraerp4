import React from 'react';
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Box,
  Menu,
  MenuItem,
  Avatar,
  Divider,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import {
  Brightness4 as DarkModeIcon,
  Brightness7 as LightModeIcon,
  AccountCircle,
  Menu as MenuIcon,
} from '@mui/icons-material';
import { useAuthStore } from '@/store/authStore';
import { useThemeStore } from '@/store/themeStore';

interface TopBarProps {
  drawerWidth: number;
  onMobileMenuClick?: () => void;
}

export const TopBar: React.FC<TopBarProps> = ({ drawerWidth, onMobileMenuClick }) => {
  const { user, logout } = useAuthStore();
  const { mode, toggleTheme } = useThemeStore();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    handleClose();
    logout();
  };

  return (
    <AppBar
      position="fixed"
      elevation={0}
      sx={{
        width: {
          xs: '100%',
          md: `calc(100% - ${drawerWidth}px)`,
        },
        ml: {
          xs: 0,
          md: `${drawerWidth}px`,
        },
        bgcolor: 'background.paper',
        color: 'text.primary',
        borderBottom: '1px solid',
        borderColor: 'divider',
        backdropFilter: 'blur(10px)',
        background: mode === 'light' 
          ? 'rgba(255, 255, 255, 0.8)'
          : 'rgba(30, 41, 59, 0.8)',
        transition: 'width 0.3s ease-in-out, margin 0.3s ease-in-out',
      }}
    >
      <Toolbar>
        {isMobile && (
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={onMobileMenuClick}
            sx={{ mr: 2, display: { md: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
        )}
        
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          {/* Page title can be dynamic */}
        </Typography>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 1, sm: 2 } }}>
          <IconButton 
            onClick={toggleTheme} 
            color="inherit"
            size={isMobile ? 'small' : 'medium'}
            sx={{
              bgcolor: 'action.hover',
              '&:hover': {
                bgcolor: 'action.selected',
              },
            }}
          >
            {mode === 'dark' ? <LightModeIcon /> : <DarkModeIcon />}
          </IconButton>

          <IconButton 
            onClick={handleMenu} 
            color="inherit"
            sx={{
              p: 0.5,
            }}
          >
            {user ? (
              <Avatar 
                sx={{ 
                  width: { xs: 32, sm: 40 }, 
                  height: { xs: 32, sm: 40 }, 
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  fontWeight: 700,
                  fontSize: { xs: '0.875rem', sm: '1rem' },
                }}
              >
                {user.firstName[0]}
                {user.lastName[0]}
              </Avatar>
            ) : (
              <AccountCircle />
            )}
          </IconButton>

          <Menu 
            anchorEl={anchorEl} 
            open={Boolean(anchorEl)} 
            onClose={handleClose}
            PaperProps={{
              sx: {
                mt: 1.5,
                minWidth: 200,
                borderRadius: 2,
              }
            }}
          >
            <Box sx={{ px: 2, py: 1.5 }}>
              <Typography variant="subtitle2" fontWeight={600}>
                {user?.firstName} {user?.lastName}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {user?.email}
              </Typography>
            </Box>
            <Divider />
            <MenuItem onClick={handleClose} sx={{ py: 1.5 }}>
              Profile Settings
            </MenuItem>
            <MenuItem onClick={handleLogout} sx={{ py: 1.5, color: 'error.main' }}>
              Logout
            </MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};
