import { UserRole } from './auth.types';

export interface User {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  isActive: boolean;
  dateJoined: string;
  lastLogin: string | null;
}
