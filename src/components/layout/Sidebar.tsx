import React, { useState } from 'react';
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Divider,
  Box,
  IconButton,
  Tooltip,
  Collapse,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import {
  Dashboard as DashboardIcon,
  AccountBalance as FinanceIcon,
  Work as OperationsIcon,
  People as PeopleIcon,
  ChevronLeft as ChevronLeftIcon,
  Menu as MenuIcon,
  Person as HCMIcon,
  Folder as ProjectsIcon,
  BarChart as AnalyticsIcon,
  Gavel as ComplianceRiskIcon,
  Business,
  Security,
  Assignment,
  School,
  ExpandLess,
  ExpandMore,
} from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '@/store/authStore';
import { UserRole } from '@/types/auth.types';

const DRAWER_WIDTH = 260;
const DRAWER_WIDTH_COLLAPSED = 72;

interface NavItem {
  label: string;
  path: string;
  icon: React.ReactNode;
  roles?: UserRole[];
  children?: Omit<NavItem, 'children'>[];
}

const navItems: NavItem[] = [
  { label: 'Dashboard', path: '/dashboard', icon: <DashboardIcon /> },
  {
    label: 'Client Services',
    path: '/clients',
    icon: <Business />,
    roles: [UserRole.ADMIN, UserRole.ACCOUNT_MANAGER, UserRole.CONSULTANT, UserRole.SOC_ANALYST],
    children: [
      {
        label: 'Clients',
        path: '/clients',
        icon: <Business />,
        roles: [UserRole.ADMIN, UserRole.ACCOUNT_MANAGER, UserRole.CONSULTANT],
      },
      {
        label: 'SOC',
        path: '/soc',
        icon: <Security />,
        roles: [UserRole.ADMIN, UserRole.SOC_ANALYST, UserRole.COMPLIANCE],
      },
      {
        label: 'Engagements',
        path: '/engagements',
        icon: <Assignment />,
        roles: [UserRole.ADMIN, UserRole.CONSULTANT, UserRole.ACCOUNT_MANAGER],
      },
    ],
  },
  {
    label: 'Operations',
    path: '/operations',
    icon: <OperationsIcon />,
    roles: [UserRole.ADMIN, UserRole.OPERATIONS, UserRole.PROJECT_MANAGER, UserRole.HR],
    children: [
      {
        label: 'Projects',
        path: '/projects',
        icon: <ProjectsIcon />,
        roles: [UserRole.ADMIN, UserRole.OPERATIONS, UserRole.PROJECT_MANAGER],
      },
      {
        label: 'Human Capital',
        path: '/hcm',
        icon: <HCMIcon />,
        roles: [UserRole.ADMIN, UserRole.HR],
      },
      {
        label: 'Training',
        path: '/training',
        icon: <School />,
        roles: [UserRole.ADMIN, UserRole.TRAINER, UserRole.HR],
      },
    ],
  },
  {
    label: 'Governance',
    path: '/compliance-risk',
    icon: <ComplianceRiskIcon />,
    roles: [UserRole.ADMIN, UserRole.COMPLIANCE],
    children: [
      {
        label: 'Compliance & Risk',
        path: '/compliance-risk',
        icon: <ComplianceRiskIcon />,
        roles: [UserRole.ADMIN, UserRole.COMPLIANCE],
      },
    ],
  },
  {
    label: 'Finance',
    path: '/finance',
    icon: <FinanceIcon />,
    roles: [UserRole.ADMIN, UserRole.FINANCE],
  },
  {
    label: 'Analytics',
    path: '/analytics',
    icon: <AnalyticsIcon />,
    roles: [UserRole.ADMIN, UserRole.ANALYST],
  },
  {
    label: 'Users',
    path: '/users',
    icon: <PeopleIcon />,
    roles: [UserRole.ADMIN],
  },
];

interface SidebarProps {
  isCollapsed: boolean;
  onToggle: () => void;
  mobileOpen?: boolean;
  onMobileClose?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ 
  isCollapsed, 
  onToggle,
  mobileOpen = false,
  onMobileClose,
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuthStore();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [expandedGroups, setExpandedGroups] = useState<string[]>([]);

  const hasAccess = (roles?: UserRole[]): boolean => {
    if (!roles || !user) return true;
    return roles.includes(user.role);
  };

  const toggleGroup = (path: string) => {
    setExpandedGroups(prev =>
      prev.includes(path) ? prev.filter(p => p !== path) : [...prev, path]
    );
  };

  const isPathActive = (itemPath: string) => {
    return location.pathname.startsWith(itemPath);
  };

  const drawerWidth = isCollapsed ? DRAWER_WIDTH_COLLAPSED : DRAWER_WIDTH;

  const drawerContent = (
    <>
      <Toolbar sx={{ justifyContent: isCollapsed ? 'center' : 'space-between', minHeight: { xs: 56, sm: 64 } }}>
        {!isCollapsed && (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Box
              sx={{
                width: 36,
                height: 36,
                borderRadius: 2,
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontWeight: 700,
                fontSize: '1.2rem',
              }}
            >
              S
            </Box>
            <Box sx={{ 
              fontWeight: 700, 
              fontSize: { xs: '1rem', sm: '1.25rem' },
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}>
              SentraERP
            </Box>
          </Box>
        )}
        <IconButton onClick={isMobile ? onMobileClose : onToggle} size="small">
          {isCollapsed || isMobile ? <MenuIcon /> : <ChevronLeftIcon />}
        </IconButton>
      </Toolbar>
      <Divider />
      <List sx={{ px: 1, py: 1, overflow: 'auto', flexGrow: 1 }}>
        {navItems.map((item) => {
          if (!hasAccess(item.roles)) return null;
          
          const hasChildren = item.children && item.children.length > 0;
          const isExpanded = expandedGroups.includes(item.path);
          const isActive = isPathActive(item.path);

          return (
            <React.Fragment key={item.path}>
              <Tooltip 
                title={isCollapsed ? item.label : ''} 
                placement="right"
                arrow
              >
                <ListItem disablePadding sx={{ mb: 0.5 }}>
                  <ListItemButton
                    selected={isActive && !hasChildren}
                    onClick={() => {
                      if (hasChildren && !isCollapsed) {
                        toggleGroup(item.path);
                      } else {
                        navigate(item.path);
                        if (isMobile && onMobileClose) onMobileClose();
                      }
                    }}
                    sx={{
                      minHeight: 44,
                      justifyContent: isCollapsed ? 'center' : 'flex-start',
                      px: 2,
                      borderRadius: 2,
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        minWidth: 0,
                        mr: isCollapsed ? 0 : 2,
                        justifyContent: 'center',
                      }}
                    >
                      {item.icon}
                    </ListItemIcon>
                    {!isCollapsed && (
                      <>
                        <ListItemText 
                          primary={item.label} 
                          primaryTypographyProps={{ fontSize: '0.875rem' }}
                        />
                        {hasChildren && (
                          isExpanded ? <ExpandLess fontSize="small" /> : <ExpandMore fontSize="small" />
                        )}
                      </>
                    )}
                  </ListItemButton>
                </ListItem>
              </Tooltip>

              {hasChildren && !isCollapsed && (
                <Collapse in={isExpanded} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    {item.children!.map((child) => {
                      if (!hasAccess(child.roles)) return null;
                      return (
                        <ListItem key={child.path} disablePadding sx={{ mb: 0.5 }}>
                          <ListItemButton
                            selected={isPathActive(child.path)}
                            onClick={() => {
                              navigate(child.path);
                              if (isMobile && onMobileClose) onMobileClose();
                            }}
                            sx={{
                              minHeight: 40,
                              pl: 4,
                              borderRadius: 2,
                            }}
                          >
                            <ListItemIcon sx={{ minWidth: 0, mr: 2 }}>
                              {child.icon}
                            </ListItemIcon>
                            <ListItemText 
                              primary={child.label}
                              primaryTypographyProps={{ fontSize: '0.8125rem' }}
                            />
                          </ListItemButton>
                        </ListItem>
                      );
                    })}
                  </List>
                </Collapse>
              )}
            </React.Fragment>
          );
        })}
      </List>
    </>
  );

  if (isMobile) {
    return (
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={onMobileClose}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile
        }}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            width: DRAWER_WIDTH,
          },
        }}
      >
        {drawerContent}
      </Drawer>
    );
  }

  return (
    <Drawer
      variant="permanent"
      sx={{
        display: { xs: 'none', md: 'block' },
        width: drawerWidth,
        flexShrink: 0,
        transition: 'width 0.3s ease-in-out',
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
          transition: 'width 0.3s ease-in-out',
          overflowX: 'hidden',
        },
      }}
    >
      {drawerContent}
    </Drawer>
  );
};

export { DRAWER_WIDTH, DRAWER_WIDTH_COLLAPSED };
