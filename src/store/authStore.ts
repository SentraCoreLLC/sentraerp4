import { create } from 'zustand';
import { AuthState, LoginCredentials, AuthUser, AuthTokens } from '@/types/auth.types';
import { authService } from '@/api/services/auth.service';
import { setTokens, clearTokens, getUser, setUser as saveUser } from '@/utils/storage';
import { UserRole } from '@/types/auth.types';

// ============================================
// DEVELOPMENT MODE - AUTO BYPASS LOGIN
// ============================================
// When running in dev mode (npm run dev), authentication is bypassed
// Remove or set VITE_DEV_MODE=false for production
const DEV_MODE = import.meta.env.VITE_DEV_MODE === 'true' || import.meta.env.DEV;

// Mock admin user for development
const mockDevUser: AuthUser = {
  id: 1,
  username: 'admin',
  email: 'admin@sentracore.com',
  firstName: 'Admin',
  lastName: 'User',
  role: UserRole.ADMIN,
  permissions: ['*'],
};

// Initialize auth state based on dev mode
const getInitialUser = () => {
  if (DEV_MODE) {
    console.log('%c🚀 DEV MODE: Auto-login as Admin', 'background: #10b981; color: white; padding: 8px; border-radius: 4px; font-weight: bold;');
    return mockDevUser;
  }
  return getUser();
};

const getInitialAuthState = () => {
  if (DEV_MODE) {
    return true;
  }
  return !!getUser();
};

export const useAuthStore = create<AuthState>((set) => ({
  user: getInitialUser(),
  tokens: null,
  isAuthenticated: getInitialAuthState(),
  isLoading: false,
  error: null,

  login: async (credentials: LoginCredentials) => {
    set({ isLoading: true, error: null });
    try {
      const { tokens, user } = await authService.login(credentials);
      setTokens(tokens.access, tokens.refresh);
      saveUser(user);
      set({
        user,
        tokens,
        isAuthenticated: true,
        isLoading: false,
      });
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || 'Login failed';
      set({ error: errorMessage, isLoading: false });
      throw error;
    }
  },

  logout: () => {
    if (!DEV_MODE) {
      authService.logout().catch(console.error);
      clearTokens();
    }
    set({
      user: DEV_MODE ? mockDevUser : null,
      tokens: null,
      isAuthenticated: DEV_MODE,
      error: null,
    });
  },

  refreshToken: async () => {
    // Token refresh handled by API client interceptor
  },

  setUser: (user: AuthUser) => {
    saveUser(user);
    set({ user, isAuthenticated: true });
  },
}));
