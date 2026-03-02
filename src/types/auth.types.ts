export interface LoginCredentials {
  username: string;
  password: string;
}

export interface AuthTokens {
  access: string;
  refresh: string;
}

export interface AuthUser {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  permissions: string[];
}

export enum UserRole {
  ADMIN = 'ADMIN',
  FINANCE = 'FINANCE',
  HR = 'HR',
  OPERATIONS = 'OPERATIONS',
  COMPLIANCE = 'COMPLIANCE',
  PROJECT_MANAGER = 'PROJECT_MANAGER',
  ANALYST = 'ANALYST',
  CONSULTANT = 'CONSULTANT',
  ACCOUNT_MANAGER = 'ACCOUNT_MANAGER',
  CLIENT_ADMIN = 'CLIENT_ADMIN',
  CLIENT_USER = 'CLIENT_USER',
  SOC_ANALYST = 'SOC_ANALYST',
  TRAINER = 'TRAINER',
}

export interface AuthState {
  user: AuthUser | null;
  tokens: AuthTokens | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => void;
  refreshToken: () => Promise<void>;
  setUser: (user: AuthUser) => void;
}
